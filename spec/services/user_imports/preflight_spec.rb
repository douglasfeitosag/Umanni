require "rails_helper"

RSpec.describe UserImports::Preflight do
  def upload(contents, filename: "people.csv", type: "text/csv")
    file = Tempfile.new(["user-import", File.extname(filename)])
    file.write(contents)
    file.close
    file.open
    file.rewind
    ActionDispatch::Http::UploadedFile.new(tempfile: file, filename:, type:)
  end

  # The fixture builds a minimal interoperable XLSX package instead of mocking Roo.
  # rubocop:disable-next Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity, Layout/LineLength
  def xlsx_upload(rows, sheets: ["People"])
    file = Tempfile.new(["user-import", ".xlsx"])
    Zip::File.open(file.path, create: true) do |zip|
      zip.get_output_stream("[Content_Types].xml") do |stream|
        stream.write <<~XML
          <?xml version="1.0" encoding="UTF-8"?>
          <Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
            <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
            <Default Extension="xml" ContentType="application/xml"/>
            <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
            <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
            #{sheets.each_index.map { |index| "<Override PartName=\"/xl/worksheets/sheet#{index + 1}.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>" }.join}
          </Types>
        XML
      end
      zip.get_output_stream("_rels/.rels") do |stream|
        stream.write '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
      end
      zip.get_output_stream("xl/workbook.xml") do |stream|
        stream.write "<workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"><sheets>#{sheets.each_with_index.map do |name, index|
          "<sheet name=\"#{name}\" sheetId=\"#{index + 1}\" r:id=\"rId#{index + 1}\"/>"
        end.join}</sheets></workbook>"
      end
      zip.get_output_stream("xl/_rels/workbook.xml.rels") do |stream|
        stream.write "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\">#{sheets.each_index.map do |index|
          "<Relationship Id=\"rId#{index + 1}\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet#{index + 1}.xml\"/>"
        end.join}<Relationship Id=\"rId#{sheets.length + 1}\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/></Relationships>"
      end
      zip.get_output_stream("xl/styles.xml") { |stream| stream.write xlsx_styles }
      sheets.each_with_index do |_name, index|
        body = if index.zero?
                 rows.each_with_index.map do |row, row_index|
                   "<row r=\"#{row_index + 1}\">#{row.each_with_index.map do |value, column_index|
                     xlsx_cell(value, column_index, row_index)
                   end.join}</row>"
                 end.join
               else
                 "<row r=\"1\"><c r=\"A1\" t=\"inlineStr\"><is><t>extra</t></is></c></row>"
               end
        zip.get_output_stream("xl/worksheets/sheet#{index + 1}.xml") { |stream| stream.write "<worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"><sheetData>#{body}</sheetData></worksheet>" }
      end
    end
    file.close
    file.open
    file.rewind
    ActionDispatch::Http::UploadedFile.new(tempfile: file, filename: "people.xlsx",
                                           type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  end

  it "accepts canonical UTF-8 CSV rows without persisting data" do
    result = described_class.call(upload("full_name,email,role\nAna Silva,ANA@example.com,regular\n"))

    expect(result).to be_success
    expect(result.rows).to contain_exactly(have_attributes(number: 2, full_name: "Ana Silva", email: "ANA@example.com",
                                                           role: "regular", error_code: nil))
  end

  it "rejects an unknown header before enqueue" do
    result = described_class.call(upload("full_name,email,department\nAna,ana@example.com,People\n"))

    expect(result).not_to be_success
    expect(result.error).to eq(:invalid_headers)
  end

  it "rejects a CSV whose declared MIME type conflicts with its extension and content" do
    result = described_class.call(upload("full_name,email,role\nAna,ana@example.com,regular\n",
                                         type: "application/pdf"))

    expect(result).not_to be_success
    expect(result.error).to eq(:unsupported_file)
  end

  it "stops at the first row beyond the import limit without parsing a trailing malformed byte" do
    rows = (1..(described_class::MAX_ROWS + 1)).map { |number| "Pessoa #{number},p#{number}@example.com,regular" }
    result = described_class.call(upload("full_name,email,role\n#{rows.join("\n")}\n\xFF"))

    expect(result).not_to be_success
    expect(result.error).to eq(:too_many_rows)
  end

  it "keeps formula input out of the valid processing path" do
    result = described_class.call(upload("full_name,email,role\n=SUM(A1),ana@example.com,regular\n"))

    expect(result).to be_success
    expect(result.rows.first.error_code).to eq("formula_not_allowed")
  end

  it "reads a single-sheet XLSX using the same allowed headers as CSV" do
    result = described_class.call(xlsx_upload([["full_name", "email", "role"],
                                               ["Ana Silva", "ana@example.com", "admin"]]))

    expect(result).to be_success
    expect(result.rows).to contain_exactly(have_attributes(number: 2, full_name: "Ana Silva", email: "ana@example.com",
                                                           role: "admin", error_code: nil))
  end

  it "records non-text and error XLSX cells as safe malformed rows" do
    rows = [["full_name", "email", "role"], [42, "ana@example.com", "regular"],
            [:error, "bia@example.com", "regular"]]
    result = described_class.call(xlsx_upload(rows))

    expect(result).to be_success
    expect(result.rows.map(&:error_code)).to eq(%w[malformed_row malformed_row])
  end

  it "rejects an XLSX workbook with more than one sheet" do
    result = described_class.call(xlsx_upload([["full_name", "email"], ["Ana Silva", "ana@example.com"]],
                                              sheets: %w[People Archive]))

    expect(result).not_to be_success
    expect(result.error).to eq(:invalid_workbook)
  end

  def xlsx_cell(value, column_index, row_index)
    reference = "#{(65 + column_index).chr}#{row_index + 1}"
    return "<c r=\"#{reference}\" t=\"e\"><v>#DIV/0!</v></c>" if value == :error
    return "<c r=\"#{reference}\"><v>#{value}</v></c>" if value.is_a?(Numeric)

    "<c r=\"#{reference}\" t=\"inlineStr\"><is><t>#{ERB::Util.html_escape(value)}</t></is></c>"
  end

  def xlsx_styles
    <<~XML.delete("\n")
      <styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="11"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellXfs></styleSheet>
    XML
  end
end
