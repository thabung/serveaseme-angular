var API_ENGINE_URL = 'http://serveaseme.local/index.php/api/';

var APP_URL = {
    login: API_ENGINE_URL + "authenticate",
    signup: API_ENGINE_URL + "users",
    update: API_ENGINE_URL + "users",
    delete: API_ENGINE_URL + "users",
    
    order_item: API_ENGINE_URL + "orders",
    order_read: API_ENGINE_URL + "orders/:id",
    order_update: API_ENGINE_URL + "orders/:id",
    order_delete: API_ENGINE_URL + "orders/:id",
    
    add_item:API_ENGINE_URL + "items",
    update_item:API_ENGINE_URL + "items",
    read_item:API_ENGINE_URL + "items/:id",
    delete_item:API_ENGINE_URL + "items/:id",
    get_category_items:API_ENGINE_URL + "category/:id/items",
    change_password:API_ENGINE_URL + "changepassword/:id",
    
    
    
};


