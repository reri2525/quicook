CarrierWave.configure do |config|
    config.asset_host = "http://52.91.239.168:3001"
    config.storage = :file
    config.cache_storage = :file
end