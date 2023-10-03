class ApplicationController < ActionController::Base
    include SessionsHelper
    include ActionController::Cookies
end
