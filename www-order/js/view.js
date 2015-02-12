var OrderConfirmView = function(){
   this.header  = "<div/>";
   this.content = "<div/>";
   this.initialize = function(){
      this.header  = Handlebars.compile($('#details-header-template').html());
      this.content = Handlebars.compile($('#confirm-content-template').html());
   };
   this.render = function(pizzaId){
      var pizza   = pizzas[pizzaId];
      var context = {
         messages: app.messages,
         pizza:   pizza
      };
      $('#header').html(this.header(context));
      $('.content').html(this.content(context));
      $('.parent-link').click(function(){
         app.pizzeriaView.menuView.pizzaView.render(pizzaId);
      });
   }
};

var PizzaView = function(){
   this.header  = "<div/>";
   this.content = "<div/>";
   this.orderView = new OrderConfirmView();
   this.initialize = function(){
      this.orderView.initialize();
      this.header  = Handlebars.compile($('#details-header-template').html());
      this.content = Handlebars.compile($('#details-content-template').html());
   }
   this.render = function(pizzaId){
      var pizza   = pizzas[pizzaId];
      var context = {
         messages: app.messages,
         pizza:   pizza
      }; 
      $('#header').html(this.header(context));
      $('.content').html(this.content(context));
      $('.parent-link').click(function(){
         app.pizzeriaView.menuView.render();
      });
      $('.order-form').submit(function(event){
         event.preventDefault();
         var values = {};
         var form = $(this);
         $.each(form.serializeArray(), function(i, field) {
            values[field.name] = field.value;
         });
         app.pizzeriaView.menuView.pizzaView.orderView.render(values.pizzaId);
      });
   }
};

var MenuView = function(){
   this.header  = "<div/>";
   this.content = "<div/>";
   this.pizzaView = new PizzaView();
   this.initialize = function(){
      this.pizzaView.initialize();
      this.header  = Handlebars.compile($('#menu-header-template').html());
      this.content = Handlebars.compile($('#menu-content-template').html());
   }
   this.render = function(){
      var context = {
         messages: app.messages,
         pizzas:   pizzas
      }; 
      $('#header').html(this.header(context));
      $('.content').html(this.content(context));
      $('.pizzas li a').click(function(){
      var pizzaId = $(this).data("pizzaid");
         app.pizzeriaView.menuView.pizzaView.render(pizzaId);
      });
   }
};

var PizzeriaView = function(){
   this.menuView = new MenuView();
   this.initialize = function(){
      this.menuView.initialize();
      this.menuView.render();
   }
};
