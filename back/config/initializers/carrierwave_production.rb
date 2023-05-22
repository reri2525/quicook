CarrierWave.configure do |config|
    config.asset_host = "http://54.152.15.192:3001"
    config.storage = :file
    config.cache_storage = :file
end