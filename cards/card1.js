Conductor.require('/vendor/jquery/jquery.js');
Conductor.requireCSS('/cards/card1.css');

Conductor.card({
  activate: function() {
    //debugger;
    //window.alert("Hello!");
  },

  render: function() {
    //debugger;
    var $body = $('body');

    if (this.data && this.data.person && this.data.person.name) {
      $body.append($('<div/>').text('render: ' + this.data.person.name));
    }
    //$body.text('hello world!');

    this.consumers.xhr.request('get', '/data.json').then(function(responseBody) {
      var responseObj = JSON.parse(responseBody);
      $body.append($('<div/>').text('xhr: ' + responseObj.name));
    });
  },

  didUpdateData: function(name, data) {
    if (name === '*' && data.person ) {
      var $body = $('body');
      $body.append($('<div/>').text('updateData: ' + data.person.name || 'none'));
    }
  }

});