
(function() {

    this.client_ls = {};

    function add(client, name) {
        if (!this.client_ls[name]) {
            this.client_ls[name] = client;
            return true;
        }
        return false;
    }

    function remove(name) {}

}());

module.exports = {
    foo: function(){
        console.log('foo');
    },
    bar: function(){
        console.log('bar');   
    }
}

var test = function(){console.log('test');}