
var telnet = require('telnet');
var commands = require('./commands'), cmd = new commands.create();
var players = require('./players'), ply = new players.create();

telnet.createServer(function (client) {
    client.do.transmit_binary();
    client.do.window_size();
    
    // todo: why doesn't write functions work on putty telnet
    // which is supposedly a better telnet client
    // does this work on other telnet implementations?
    // does the server still respond to events when using
    // other telnet clients
    // needs research
    // -- open to anyone
    client.writes = function(str) {
      client.write(str);
    }

    client.writelns = function(str) {
      client.write('[1;35m ~: [1;37m' + str + '\r\n');
    }

    var name = 'unnamed'
    ,   buffer = ''
    ,   width = 80
    ,   version = '0.0.1';

    // todo: add back error handler
    // it needs to remove client from players list
    // same as on exit, close, data etc.
    // -- open to anyone
  
    client.on('window size', function (e) {
       if (e.command === 'sb') {
            width = e.width;
    }});

    client.on('exit', function (e) {
        console.log(client.name + " has left [exit]");
        ply.remove(client.name);

    });

    client.on('close', function (e) {
        console.log(client.name + " has left [close]");
        ply.remove(client.name);
    });

    client.on('end', function (e) {
        console.log(client.name + " has left [end]");
        ply.remove(client.name);
    });

    client.on('data', function (b) {
        if (b == '\b') {
            if (buffer.length == 0) return;
            client.write(b + ' \b');
            buffer = buffer.substr(0, buffer.length - 1);
            return;
        }
        client.write(b);
        if (b == '\r\n') {
          console.log(client.name + ": " + buffer);
          if (buffer[0] == '.') { 
              process_cmd(buffer);
          }
          ply.relay_msg(client, buffer);
          buffer =  '';
          client.write('[1;36m >: [1;0m');
        }
        else {
            buffer += b; 
        }
    });

    function process_cmd(buffer){
        var args = buffer.split(' ');
        var cmd_actual = args.shift();
        cmd.check(client, cmd_actual, args);
    }

    function write_center(b){
        var data_length = b.length
        ,   spaces = Array(Math.ceil(width/2 - data_length/2)).join(" ");
        client.write(spaces);
        client.write(b);
    }

    // todo: rainbow colour strips also a clear line before
    // so its not too near the top
    // -- open to anyone
    write_center(' .oooo.o oooo    ooo ooo. .oo.   oooo    ooo oooo    ooo\n');
    write_center('d88(  \"8  `88.  .8\'  `888P\"Y88b   `88.  .8\'   `88b..8P\' \n');
    write_center('`\"Y88b.    `88..8\'    888   888    `88..8\'      Y888\'  \n');
    write_center('o.  )88b    `888\'     888   888     `888\'     .o8\"\'88b \n');
    write_center('8\"\"888P\'     .8\'     o888o o888o     .8\'     o88\'   888o\n');
    write_center('.o..P\'                  .o..P\'       \n');
    write_center('`Y8P\'      v'+version+'       `Y8P\'        \n\n');

    client.write('[1;36m >: [1;0m');

    // todo: perhaps add a greet message or some useful information
    // for newly connecting users
    // -- open to anyone

}).listen(27015);
