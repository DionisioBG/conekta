require File.expand_path('../boot', __FILE__)

require 'rails/all'
require 'conekta'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Winfitt
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    # Conekta
    # This change the Accept-Language Header to the locale specified
    Conekta.locale = :es

    # Or via an initializer in config/initializers/conekta.rb
    Conekta.config do |c|
      c.locale = :es
      c.api_key = Rails.application.secrets.conekta_private
      c.api_version = '2.0.0'
    end
    #Mode of production. False: Test mode
    config.live_mode = false
    # end conekta


  end
end