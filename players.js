
var Player = function() { this.client_ls = {}; };

Player.prototype.add = function(name, client) {
    if (!this.client_ls[name]) {
        this.client_ls[name] = client;
        return true;
    }
    return false;
};

Player.prototype.remove = function(name) {
    if (this.client_ls[name]) {
        delete this.client_ls[name];
    }
};

Player.prototype.get_names =  function() {
    return Object.keys(this.client_ls);
};

Player.prototype.get_clients = function() {
    var result = [];
    var keys = Object.keys(this.client_ls);
    for (var i = 0; i < keys.length; i++) {
        result.push(this.client_ls[keys[i]]);
    }
    return result;
};

module.exports.create = Player;
