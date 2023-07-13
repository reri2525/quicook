CarrierWave.configure do |config|
  if ENV['RAILS_ENV'] == 'production'
    config.aws_bucket = 'quicook-backet'
    config.storage :aws
    config.aws_authenticated_url_expiration = 60 * 60 * 24 * 7
    config.aws_acl    = 'public-read'
    config.aws_attributes = {
        expires: 1.week.from_now.httpdate,
        cache_control: 'max-age=604800'
      }
    config.aws_credentials = {
      access_key_id: ENV['S3_ACCESS_KEY'], # アクセスキー
      secret_access_key: ENV['S3_SECRET_ACCESS_KEY'], # シークレットアクセスキー
      region: 'us-east-1', # リージョン
    }  
  else
    config.asset_host = "http://localhost:3001"
    config.storage = :file
    config.cache_storage = :file
  end
end