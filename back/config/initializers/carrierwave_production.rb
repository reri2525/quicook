CarrierWave.configure do |config|
    config.asset_host = "http://44.212.1.149:3001"
    config.storage = :file
    config.cache_storage = :file
end