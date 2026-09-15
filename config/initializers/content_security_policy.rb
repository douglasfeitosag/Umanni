Rails.application.configure do
  config.content_security_policy do |policy|
    policy.default_src :self
    policy.script_src :self
    policy.style_src :self
    policy.img_src :self, :data
    policy.object_src :none
    policy.base_uri :self
    policy.frame_ancestors :none
    policy.connect_src :self

    if Rails.env.development?
      policy.script_src :self, "http://localhost:3036"
      policy.style_src :self, "http://localhost:3036"
      policy.connect_src :self, "http://localhost:3036", "ws://localhost:3036"
    end
  end

  config.content_security_policy_nonce_generator = ->(_request) { SecureRandom.base64(16) }
  config.content_security_policy_nonce_directives = %w[script-src style-src]
end
