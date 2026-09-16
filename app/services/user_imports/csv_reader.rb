module UserImports
  class CsvReader < Reader
    def initialize(io)
      super()
      @io = io
    end

    def read
      @io.rewind
      csv = CSV.new(@io, headers: true, encoding: "bom|utf-8", col_sep: ",")
      first_row = csv.shift
      headers = validate_headers!(first_row&.headers || csv.headers || [])
      rows = []
      append_row(rows, first_row, 2, headers)
      csv.each_with_index { |row, index| append_row(rows, row, index + 3, headers) }
      rows
    rescue CSV::MalformedCSVError
      raise InvalidSource, :invalid_file
    end

    def append_row(rows, row, number, headers)
      return unless row

      parsed = row_from(number, headers.map { |header| row[header] }, headers)
      return unless parsed
      raise InvalidSource, :too_many_rows if rows.length >= Preflight::MAX_ROWS

      rows << parsed
    end
  end
end
