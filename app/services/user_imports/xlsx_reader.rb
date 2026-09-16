module UserImports
  class XlsxReader < Reader
    def initialize(io)
      super()
      @io = io
    end

    def read
      sheet = single_sheet
      headers = validate_headers!(sheet.row(1))
      rows_from(sheet, headers)
    rescue Zip::Error, Roo::FileNotFound
      raise InvalidSource, :invalid_workbook
    end

    def single_sheet
      workbook = Roo::Excelx.new(@io.path)
      raise InvalidSource, :invalid_workbook unless workbook.sheets.one?

      sheet = workbook.sheet(0)
      raise InvalidSource, :invalid_workbook if sheet.last_row.blank? || sheet.last_row < 2

      sheet
    end

    def rows_from(sheet, headers)
      (2..sheet.last_row).filter_map { |number| row_from(number, row_values(sheet, number), headers) }
    end

    def row_values(sheet, number)
      sheet.row(number).each_with_index.map do |value, index|
        sheet.celltype(number, index + 1) == :formula ? "=" : value
      end
    end
  end
end
