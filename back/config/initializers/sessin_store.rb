if Rails.env === 'production'
    Rails.application.config.session_store :cookie_store, key: '_Quicook', domain: 'フロントエンドのドメイン'
else
    Rails.application.config.session_store :cookie_store, key:'_Quiccok'
end