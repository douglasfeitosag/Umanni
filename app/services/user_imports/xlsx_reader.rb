module UserImports
  class XlsxReader < Reader
    def initialize(io)
      @io = io
    end

    def read
      workbook = Roo::Excelx.new(@io.path)
      sheets = workbook.sheets
      raise InvalidSource, :invalid_workbook unless sheets.one?

      sheet = workbook.sheet(0)
      raise InvalidSource, :invalid_workbook if sheet.last_row.blank? || sheet.last_row < 2

      headers = validate_headers!(sheet.row(1))
      (2..sheet.last_row).filter_map do |number|
        values = sheet.row(number)
        values = values.each_with_index.map { |value, index| sheet.celltype(number, index + 1) == :formula ? "=" : value }
        row_from(number, values, headers)
      end
    rescue Zip::Error, Roo::FileNotFound
      raise InvalidSource, :invalid_workbook
    end
  end
end
