import Conductor from "conductor";

var PaneView = Ember.View.extend({

  didInsertElement: function() {
    console.log('card url: ' + this.get('controller.url'));

    var conductor = this.get('container').lookup('conductor:main');

    var url = this.get('controller.url');
    var id = this.get('controller.id');

    $.getJSON('/data2.json').then(function(response){
      setTimeout(function(){
        conductor.loadData(url, id, response);
      }, 1000);
    });
    conductor.loadData(url, id, {
      "person" : {
        "name": 'Luke'
      }
    });

    var card = conductor.load(url, id, {capabilities: ['hello']});

    card.appendTo(this.get('element')).
      then(function(card) {
        card.render();

        //card needs to be activated before we can get metadata. which it will be by the time the appendTo promise resolves
        card.metadataFor('cardInfo').then(function(metadata) {
            console.log('metadata.type:' + metadata.type);
        });

        return card;
      }).fail(Ember.RSVP.rethrow);

      card.wiretap(function(service, msgEvt){
         console.log("wiretap : ", service , msgEvt);
      });

  }

});

export default PaneView;