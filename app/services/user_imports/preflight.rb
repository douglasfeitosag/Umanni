require "csv"

module UserImports
  class Preflight
    MAX_FILE_BYTES = 10.megabytes
    MAX_ROWS = 10_000
    HEADERS = %w[full_name email role].freeze
    REQUIRED_HEADERS = %w[full_name email].freeze

    Result = Data.define(:rows, :error) do
      def success?
        error.nil?
      end
    end

    def self.call(upload)
      new(upload).call
    end

    def initialize(upload)
      @upload = upload
    end

    def call
      return failure(:missing_file) if @upload.blank?
      return failure(:file_too_large) if @upload.size > MAX_FILE_BYTES

      rows = reader.read
      return failure(:too_many_rows) if rows.length > MAX_ROWS

      Result.new(rows:, error: nil)
    rescue UserImports::Reader::InvalidSource => error
      failure(error.code)
    rescue CSV::MalformedCSVError, Encoding::InvalidByteSequenceError, Encoding::UndefinedConversionError
      failure(:invalid_file)
    ensure
      @upload.tempfile.rewind if @upload&.tempfile
    end

    private

    def reader
      extension = File.extname(@upload.original_filename.to_s).downcase
      return CsvReader.new(@upload.tempfile) if extension == ".csv" && csv_signature?
      return XlsxReader.new(@upload.tempfile) if extension == ".xlsx" && xlsx_signature?

      raise Reader::InvalidSource, :unsupported_file
    end

    def csv_signature?
      @upload.tempfile.rewind
      sample = @upload.tempfile.read(4_096)
      sample.force_encoding(Encoding::UTF_8).valid_encoding?
    ensure
      @upload.tempfile.rewind
    end

    def xlsx_signature?
      @upload.tempfile.rewind
      @upload.tempfile.read(4) == "PK\x03\x04"
    ensure
      @upload.tempfile.rewind
    end

    def failure(code)
      Result.new(rows: [], error: code)
    end
  end
end
