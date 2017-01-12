'use strict';

/* Routing to Redirect to jabong.html with ngRoute as dependency 
   Global Namespace Collision Prevention */

var jabongApp=jabongApp || {};
    jabongApp.productsView=jabongApp.productsView || angular.module('jabongApp',['ngRoute']);

  jabongApp.productsView.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/jabong.html',
        controller: 'jabongCtrl',
        controllerAs: 'jabong'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/*End of File */