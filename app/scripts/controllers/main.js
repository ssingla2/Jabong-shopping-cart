'use strict';

/* jabongApp controller
   Global Namespace Collision Prevention */

var jabongApp=jabongApp || {};
    jabongApp.productsView=jabongApp.productsView || angular.module('jabongApp',['ngRoute']);

jabongApp.productsView.controller('jabongCtrl', function ($scope,$http) {

/* Toggle Accordion in Mobile View */
    var toggle = true;
    $('.order-heading').on('click', function(){
        if(toggle){
            $('.detail-order-list').slideDown(100);
            toggle = false;
            $(this).find('span').removeClass('plus').addClass('minus');
        }else{
            $('.detail-order-list').slideUp(100);
            $(this).find('span').removeClass('minus').addClass('plus');
            toggle = true;
        }
    });

	var self = this;
    self.productDetails = {};
    self.productData = [];
    self.editMode = false;

    /* Update Price on editing quantity */
    self.updatePrice = function(index, newQty){
    	self.productData[index].quantity = newQty;
    	self.productData[index].editMode = false;
    	self.productData[index].regPrice = parseInt(self.productData[index].countedRegPrice) * parseInt(self.productData[index].quantity),
        self.productData[index].discPrice = parseInt(self.productData[index].countedDiscPrice) * parseInt(self.productData[index].quantity);
        self.basePrice = 0;
    	for(var i=0;i<self.productData.length;i++){
				self.basePrice = self.basePrice + parseInt(self.productData[i].countedDiscPrice) * parseInt(self.productData[i].quantity);
			} 
		    self.totalPrice = parseInt(self.basePrice) + parseInt(self.productDetails.tax);
    } 	
    self.removeProduct = function(index){
		self.basePrice = self.basePrice - parseInt(self.productData[index].countedDiscPrice) * parseInt(self.productData[index].quantity);;
		self.totalPrice = parseInt(self.basePrice) + parseInt(self.productDetails.tax);
		self.productData.splice(index, 1);
    } 	

    /* Ajax call to get json data of products */
    $http.get("../json/product_details.json")
        .success(function(response){
			self.productDetails = response;
			self.totalPrice = 0;
		    self.basePrice = 0;
			self.productData = self.productDetails.productData;  

			for(var i=0;i<self.productData.length;i++){
				self.productData[i].editMode = false;
                self.productData[i].newQty = self.productData[i].availQty[0];
				self.basePrice = self.basePrice + parseInt(self.productData[i].discPrice) * parseInt(self.productData[i].quantity);
			} 
			self.totalPrice = parseInt(self.basePrice) + parseInt(self.productDetails.tax);
     	});
});