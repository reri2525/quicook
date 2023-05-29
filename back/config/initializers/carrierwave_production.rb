CarrierWave.configure do |config|
    config.asset_host = "http://44.201.153.171:3001"
    config.storage = :file
    config.cache_storage = :file
end