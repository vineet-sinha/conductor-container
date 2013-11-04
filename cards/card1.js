Conductor.require('/vendor/jquery/jquery.js');
Conductor.requireCSS('/cards/card1.css');

Conductor.card({

  metadata : {
    cardInfo : function(){
      return {
        type: 'listViewer'
      };
    }
  },

  activate: function() {
    //debugger;
    //window.alert("Hello!");

    // conductor does auto DOM observing for setting the dimensions. if you need to manipulate the DOM explicitely, then you need to disable this
    //this.consumers.height.autoUpdate = false;
   },

  render: function() {
    //debugger;
    var $container = this.getContainerDiv();

    if (this.data && this.data.person && this.data.person.name) {
      $container.append($('<div/>').text('render: ' + this.data.person.name));
    }
    //$body.text('hello world!');

    this.consumers.xhr.request('get', '/data.json').then(function(responseBody) {
      var responseObj = JSON.parse(responseBody);
      $container.append($('<div/>').text('xhr: ' + responseObj.name));
    });
  },

  didUpdateData: function(name, data) {
    if (name === '*' && data.person ) {
      var $container = this.getContainerDiv();
      $container.append($('<div/>').text('updateData: ' + data.person.name || 'none'));
    }
  },

  // conductor height service needs card to have a single node as the parent (here .container)
  getContainerDiv: function() {
    var $body = $('body');
    var $container = $body.find('.container');

    if (!$container.length) {
      $container = $('<div class="container"/>');
      $body.append($container);
    }
    return $container;  
  }

});