module UserImports
  class Reader
    InvalidSource = Class.new(StandardError) do
      attr_reader :code

      def initialize(code)
        @code = code
        super(code.to_s)
      end
    end

    Row = Data.define(:number, :full_name, :email, :role, :error_code)

    private

    def validate_headers!(headers)
      normalized = headers.map { |header| header.to_s.strip.downcase }
      raise InvalidSource, :invalid_headers if normalized.any?(&:blank?) || normalized.any? { |header| header.bytesize > 64 }
      raise InvalidSource, :invalid_headers unless normalized.uniq.length == normalized.length
      raise InvalidSource, :invalid_headers unless (normalized - Preflight::HEADERS).empty?
      raise InvalidSource, :invalid_headers unless (Preflight::REQUIRED_HEADERS - normalized).empty?

      normalized
    end

    def row_from(number, values, headers)
      values = values.map { |value| value.nil? ? "" : value.to_s }
      return if values.all?(&:blank?)

      mapped = headers.zip(values).to_h
      raw_bytes = values.sum(&:bytesize)
      error_code = if values.any? { |value| value.start_with?("=") }
        "formula_not_allowed"
      elsif raw_bytes > 1_100
        "row_too_large"
      elsif mapped.fetch("full_name", "").length > 200 || mapped.fetch("full_name", "").bytesize > 800 || mapped.fetch("email", "").bytesize > 254 || mapped.fetch("role", "").bytesize > 7
        "field_too_long"
      end

      Row.new(number:, full_name: mapped["full_name"], email: mapped["email"], role: mapped["role"], error_code:)
    end
  end
end
