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
      rows = []
      (2..sheet.last_row).each do |number|
        values, malformed = row_values(sheet, number)
        parsed = row_from(number, values, headers, error_code: malformed ? "malformed_row" : nil)
        next unless parsed
        raise InvalidSource, :too_many_rows if rows.length >= Preflight::MAX_ROWS

        rows << parsed
      end
      rows
    end

    def row_values(sheet, number)
      cells = sheet.row(number).each_with_index.map { |value, index| [value, sheet.celltype(number, index + 1)] }
      [cells.map { |value, type| safe_cell_value(value, type) }, cells.any? { |_value, type| malformed_type?(type) }]
    end

    def safe_cell_value(value, type)
      return value if type.in?(%i[string empty])
      return "=" if type == :formula

      nil
    end

    def malformed_type?(type)
      !type.in?(%i[string empty formula])
    end
  end
end
