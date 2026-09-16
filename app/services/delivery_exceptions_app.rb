class DeliveryExceptionsApp
  PUBLIC_EXCEPTIONS = ActionDispatch::PublicExceptions.new(Rails.public_path)

  class << self
    def call(env)
      status = exception_status(env)
      return PUBLIC_EXCEPTIONS.call(env) if status < 500

      Rails.logger.error("delivery.exception.fallback")
      return inertia_response(status) if env["HTTP_X_INERTIA"] == "true"

      ErrorsController.action(:show).call(safe_html_env(env, status))
    end

    def page(status)
      {
        component: "Errors/Show",
        props: { status: status },
        url: "/",
        version: InertiaRails.configuration.version,
        clearHistory: false,
        encryptHistory: false
      }
    end

    private

    def exception_status(env)
      exception = env.fetch("action_dispatch.exception")
      ActionDispatch::ExceptionWrapper.new(env["action_dispatch.backtrace_cleaner"], exception).status_code
    end

    def inertia_response(status)
      body = JSON.generate(page(status))
      headers = {
        "content-type" => "application/json; charset=utf-8",
        "content-length" => body.bytesize.to_s,
        "cache-control" => "no-store",
        "vary" => "X-Inertia",
        "x-inertia" => "true"
      }
      [status, headers, [body]]
    end

    def safe_html_env(env, status)
      env.except(
        "CONTENT_LENGTH", "CONTENT_TYPE", "HTTP_AUTHORIZATION", "HTTP_COOKIE"
      ).merge(
        "REQUEST_METHOD" => "GET",
        "PATH_INFO" => "/",
        "QUERY_STRING" => "",
        "HTTP_ACCEPT" => "text/html",
        "action_dispatch.original_path" => "/",
        "umanni.error_status" => status
      )
    end
  end
end
