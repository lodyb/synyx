
// Handle commands (see check function for core handler)

var players = require('./players'), ply = new players.create();

var Commands = function() {
    // ensure single instance
    if (arguments.callee._singleton)
        return arguments.callee._singleton;
    arguments.callee._singleton = this
};

Commands.prototype.set_player_data = function() {

};

Commands.prototype.check = function(client, cmd, args) {

    switch(cmd){
        case '.status':
            console.log('status');
            this.status(client);
            break;
        case '.setname':
            console.log('setname');
            console.log(args[0]);
            this.setname(client, args[0]);
            break;
        case '.echo':
            console.log('echoing ' + args.join(' '));
            this.echo(client, args.join(' '));
            break;
        default:
            this.reject(client, cmd, args.join(' '));
    }
};

// todo: make this a bit prettier with whitespace
// and make sure it doesn't print their own name only others
// it should say no one else is connected or something
// if no other people connected instead of blank string
// -- open to anyone
Commands.prototype.status = function(client) {
    client.writelns('connected as ' + client.name + '~');
    client.writelns('connected with ' + ply.get_names().toString() + '~');    
};

// todo: stop users from being able to add name if they already
// have one, instead change the current name
// Player class needs a change_name function perhaps
// since it must be updated there too
// -- open to anyone
Commands.prototype.setname = function(client, name) {
    if (name.length > 2) {
      if (ply.add(name, client)) {
          client.name = name;
          client.writelns('name set~');
      }
      else client.writelns('name already exists~');
    }
    else { client.writelns('name not long enough'); }
};

Commands.prototype.echo = function(client, args){
    console.log(args);
    client.writelns(args);
};

Commands.prototype.reject =  function(client, cmd, args) {
    console.log('rejected: ' + cmd + " " + args);
    client.writelns("[1;41mError:[1;40m[1;33m " +
    cmd + " " + args + "[0;39m is not a valid command!");
};

module.exports.create = Commands;
