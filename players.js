
// Handle/manage connected clients

var Player = function() {
    // ensure single instance
    if (arguments.callee._singleton)
    return arguments.callee._singleton;
    arguments.callee._singleton = this
    // init
    this.client_ls = {};
};

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

// to do: check if client is typing
// if typing clear line and post message
// before writing cleared line (buffer) back to screen
// -- ami will work on later
Player.prototype.relay_msg = function(client, message) {
    var keys = Object.keys(this.client_ls);
    console.log(keys.length);
    console.log(keys.toString());
    console.log(' b : ' + this.client_ls.length);
    console.log(this.client_ls); // and this doesn't
    console.log(this);
    for (var i = 0; i < keys.length; i++) {
        console.log(keys[i] + ' == ' + client.name);
        if (keys[i] != client.name) {
            console.log(' pancake : ' + this.client_ls[keys[i]].name);

            this.client_ls[keys[i]].writelns(client.name + ': ' + message);
        }
    }
};

module.exports.create = Player;
