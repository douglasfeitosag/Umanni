InertiaRails.configure do |config|
  config.always_include_errors_hash = true
  config.use_script_element_for_initial_page = true
  config.version = if Rails.env.production? && Rails.root.join("config/vite-digest").file?
                     Rails.root.join("config/vite-digest").read.strip
                   else
                     ViteRuby.digest
                   end
end
