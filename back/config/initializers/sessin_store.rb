if Rails.env === 'production'
    Rails.application.config.session_store :cookie_store, key: '_Quicook', domain: 'quicook.online'
else
    Rails.application.config.session_store :cookie_store, key:'_Quiccok'
end