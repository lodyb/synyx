
var players = require('./players'), pl = new players.create();
var Commands = function() { };

Commands.prototype.check = function(client, cmd, args) {

    switch(cmd){
        case '.status':
            console.log('status');
            debugger;
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
}
Commands.prototype.status = function(client) {
    client.writelns('connected as ' + client.name + '~');
    client.writelns('connected with ' + pl.get_names().toString() + '~');    
}

Commands.prototype.setname = function(client, name) {
    if (name.length > 2) {
      if (pl.add(name, client)) {
          client.name = name;
          client.writelns('name set~');
      }
      else client.writelns('name already exists~');
    }
    else { client.writelns('name not long enough'); }
}

Commands.prototype.echo = function(client, args){
    console.log(args);
    client.writelns(args);
}

Commands.prototype.reject =  function(client, cmd, args) {
    console.log('rejected: ' + cmd + " " + args);
    client.writelns("[1;41mError:[1;40m[1;33m " +
    cmd + " " + args + "[0;39m is not a valid command!");
}

module.exports.create = Commands;
