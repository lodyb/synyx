
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
    debugger;
    console.log(this.client_ls); // why does this work
    console.log(this);
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

Player.prototype.relay = function(client, message) {
    debugger;
    //var keys = Object.keys(this.client_ls);
    //console.log(keys.length);
    //console.log(keys.toString());
    //console.log(' b : ' + this.client_ls.length);
    console.log(this.client_ls); // and this doesn't
    console.log(this);
    /*for (var i = 0; i < keys.length; i++) {
        console.log(keys[i] + ' == ' + client.name);
        if (keys[i] != client.name) {
            console.log(' pancake : ' + this.client_ls[keys[i]].name);
            this.client_ls[keys[i]].writelns(client.name + ': ' + message);
        }
    }*/
};

module.exports.create = Player;
