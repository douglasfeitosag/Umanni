class DeliveryExceptionsApp
  PUBLIC_EXCEPTIONS = ActionDispatch::PublicExceptions.new(Rails.public_path)

  class << self
    def call(env)
      status = exception_status(env)
      return PUBLIC_EXCEPTIONS.call(env) if status < 500

      Rails.logger.error("delivery.exception.fallback")
      return_path = safe_return_path(env)
      return inertia_response(status, return_path) if env["HTTP_X_INERTIA"] == "true"

      ErrorsController.action(:show).call(safe_html_env(env, status, return_path))
    end

    def page(status, return_path)
      {
        component: "Errors/Show",
        props: { status: status, returnPath: return_path },
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

    def inertia_response(status, return_path)
      body = JSON.generate(page(status, return_path))
      headers = {
        "content-type" => "application/json; charset=utf-8",
        "content-length" => body.bytesize.to_s,
        "cache-control" => "no-store",
        "vary" => "X-Inertia",
        "x-inertia" => "true"
      }
      [status, headers, [body]]
    end

    def safe_return_path(env)
      path = env.fetch("action_dispatch.original_path", env.fetch("PATH_INFO", "")).split("?", 2).first
      return "/admin/dashboard" if path == "/admin" || path.start_with?("/admin/")
      return "/profile" if path == "/profile" || path.start_with?("/profile/")

      "/sign-in"
    end

    def safe_html_env(env, status, return_path)
      env.except(
        "CONTENT_LENGTH", "CONTENT_TYPE", "HTTP_AUTHORIZATION", "HTTP_COOKIE"
      ).merge(
        "REQUEST_METHOD" => "GET",
        "PATH_INFO" => "/",
        "QUERY_STRING" => "",
        "HTTP_ACCEPT" => "text/html",
        "action_dispatch.original_path" => "/",
        "umanni.error_status" => status,
        "umanni.error_return_path" => return_path
      )
    end
  end
end
