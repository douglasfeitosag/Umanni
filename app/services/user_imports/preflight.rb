require "csv"

module UserImports
  class Preflight
    MAX_FILE_BYTES = 10.megabytes
    MAX_ROWS = 10_000
    HEADERS = %w[full_name email role].freeze
    REQUIRED_HEADERS = %w[full_name email].freeze
    CONTENT_TYPES = {
      ".csv" => %w[text/csv application/csv].freeze,
      ".xlsx" => ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"].freeze
    }.freeze

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

      return failure(:file_too_large) if too_large?

      success_result
    rescue UserImports::Reader::InvalidSource => e
      failure(e.code)
    rescue CSV::MalformedCSVError, Encoding::InvalidByteSequenceError, Encoding::UndefinedConversionError
      failure(:invalid_file)
    ensure
      @upload&.tempfile&.rewind
    end

    private

    def too_large?
      @upload.size > MAX_FILE_BYTES
    end

    def parsed_rows
      reader.read
    end

    def success_result
      rows = parsed_rows
      Result.new(rows:, error: nil)
    end

    def reader
      extension = File.extname(@upload.original_filename.to_s).downcase
      return CsvReader.new(@upload.tempfile) if valid_type?(extension) && extension == ".csv" && csv_signature?
      return XlsxReader.new(@upload.tempfile) if valid_type?(extension) && extension == ".xlsx" && xlsx_signature?

      raise Reader::InvalidSource, :unsupported_file
    end

    def valid_type?(extension)
      allowed_types = CONTENT_TYPES.fetch(extension, [])
      declared_type = @upload.content_type.to_s
      detected_type = Marcel::MimeType.for(@upload.tempfile, name: @upload.original_filename.to_s)
      allowed_types.include?(declared_type) && allowed_types.include?(detected_type)
    ensure
      @upload.tempfile.rewind
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
