var API_ENGINE_URL;
var LOGIN_FACEBOOK_LINK;


switch (SERV_ENV) {
    case 'production':
        API_ENGINE_URL = 'http://serveaseme.local/index.php/api/';
        LOGIN_FACEBOOK_LINK = 'http://serveaseme.local/index.php/auth/facebook';
        break;
    default:
       API_ENGINE_URL = 'http://serveaseme.local/index.php/api/';
        LOGIN_FACEBOOK_LINK = 'http://serveaseme.local/index.php/auth/facebook';
    
}