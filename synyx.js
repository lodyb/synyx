
// singleton instances
_players_instance = null;
_commands_instance = null;

// singleton initializations
var players = require('./players');
if (!_players_instance) { _players_instance = new players.create(); }
var commands = require('./commands');
if (!_commands_instance) { _commands_instance = new commands.create(); }

// exports
module.exports.Players = _players_instance;
module.exports.Commands = _commands_instance;
