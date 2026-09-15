namespace :umanni do
  desc "Create the first local administrator once"
  task bootstrap_admin: :environment do
    result = FirstAdminBootstrap.call
    puts(result == :created ? "First administrator created." : "An administrator already exists; nothing changed.")
  rescue FirstAdminBootstrap::ConfigurationError => e
    abort e.message
  end
end
