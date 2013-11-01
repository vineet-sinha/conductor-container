Conductor.require('/vendor/jquery/jquery.js');
Conductor.requireCSS('/cards/card1.css');

Conductor.card({
  activate: function() {
    //debugger;
    //window.alert("Hello!");
  },

  render: function() {
    //debugger;
    $('body').text('hello world!');
  }
});