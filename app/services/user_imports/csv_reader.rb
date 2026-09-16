module UserImports
  class CsvReader < Reader
    def initialize(io)
      @io = io
    end

    def read
      @io.rewind
      table = CSV.read(@io, headers: true, encoding: "bom|utf-8", col_sep: ",")
      headers = validate_headers!(table.headers || [])
      table.each_with_index.filter_map do |row, index|
        row_from(index + 2, headers.map { |header| row[header] }, headers)
      end
    rescue CSV::MalformedCSVError
      raise InvalidSource, :invalid_file
    end
  end
end
