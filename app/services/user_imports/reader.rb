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
      raise InvalidSource, :invalid_headers unless valid_headers?(normalized)

      normalized
    end

    def row_from(number, values, headers)
      values = values.map { |value| value.nil? ? "" : value.to_s }
      return if values.all?(&:blank?)

      mapped = headers.zip(values).to_h
      error_code = row_error(values, mapped)

      Row.new(number:, full_name: mapped["full_name"], email: mapped["email"], role: mapped["role"], error_code:)
    end

    def valid_headers?(headers)
      headers.all? { |header| header.present? && header.bytesize <= 64 } &&
        headers.uniq.length == headers.length &&
        (headers - Preflight::HEADERS).empty? &&
        (Preflight::REQUIRED_HEADERS - headers).empty?
    end

    def row_error(values, mapped)
      return "formula_not_allowed" if values.any? { |value| value.start_with?("=") }
      return "row_too_large" if values.sum(&:bytesize) > 1_100

      "field_too_long" if field_too_long?(mapped)
    end

    def field_too_long?(mapped)
      full_name = mapped.fetch("full_name", "")
      email = mapped.fetch("email", "")
      role = mapped.fetch("role", "")
      full_name.length > 200 || full_name.bytesize > 800 || email.bytesize > 254 || role.bytesize > 7
    end
  end
end
