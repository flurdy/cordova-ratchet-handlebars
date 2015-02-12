var app = {
   isCordova: typeof cordova !== 'undefined',
   messages: {
      title: "Pizzeria",
      order: "Order"
   },
   initialize: function(){
      console.log('app initializing');
      this.pizzeriaView.initialize();
   },
   bindEvents: function() {
      if(this.isCordova){
         document.addEventListener('deviceready', app.onDeviceReady, false);
      }
   },
   onDeviceReady: function() {
      console.log('deviceready');
      FastClick.attach(document.body);
   },
   pizzeriaView: new PizzeriaView()
};
