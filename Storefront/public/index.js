/*
$( document.body ).on( 'click', '.dropdown-menu li', function( event ) {
 
   var $target = $( event.currentTarget );

   $target.closest( '.btn-group' )
      .find( '[data-bind="label"]' ).text( $target.text() )
         .end()
      .children( '.dropdown-toggle' ).dropdown( 'toggle' );
 

   return false;
 
});




*/

/*
  $('.selectpicker').on('change', function(){
    var selected = $(this).find("option:selected").val();
    alert(selected);
  });
  */

  $('.selectpicker').on('click',function() {
  alert($(this).val());
  console.log($(this).val());
});



//retrieve the label of a dropdown/ #selecter is the dropdown html id
//$('#selecter :selected').attr('label'); 



//var user = {}; // the user whose junk to display

angular.module('websiteApp', [])
   .controller('websiteController', function($scope, $http) {
      // $scope.greeting = "Hello World";

//controller variables
  $scope.storeItems = [{hello:'yes'},{hello:'no'}];

  $scope.user = {loggedIn:false,cart:[]};




//manipulation of store items to build store, break this out into methods at your convenience
 $http.get('/storeItems.json')
       .then(function(res){
          $scope.storeItems = res.data;     
      //    console.log($scope.storeItems);
            
            for (var i = $scope.storeItems.length - 1; i >= 0; i--) {

                var storeItem = $scope.storeItems[i];
              storeItem.userPrototype = {}; // the user prototype stores information about what item specifics the user has selected. for instance, if they want a black puppy, the item would be a puppy, and the user prototype stores the fact that it's black. this is what gets put in the users cart.
           var userPrototype =  storeItem.userPrototype;
           userPrototype.selectedOptions = {};
           userPrototype.name = storeItem.name;

              //for each set of options, have a string in the prototype to record the users selection
              for (var j = storeItem.options.length - 1; j >= 0; j--) {
                var optionSet = storeItem.options[j];

                userPrototype.selectedOptions[optionSet] = ""; // it's like a hash and the entire optionset is the key. easy to remember.

              }



            }
              console.log($scope.storeItems)       ;
        });


       
       //retrieve user! this is mainly the cart but can include other info too. this hasn't been tested yet so watch out.
       //i i
       $http.get('/user.json')
       .then(function(res){
          $scope.user = res.data;  //update the client side user with server user info.   
      //    console.log($scope.cart);
          
                     
        });

/*
 $scope.newUser = function () {
          var fucked = false; //generic abort-on-error flag
     var data = $.param({newUser:{
            username: $("#loginModal #newUserName").val(),
            password : $("#loginModal #newUserPassword").val(),
            email : $("#loginModal #newUserEmail").val()
       } });

      $http.post("/newUser", data).then(
  function (response) {
    var data = response.data;
     console.log(data);
   newUserSuccess();
  }, function (error) {
    var data = error.data;
    console.log(data);
   newUserError();
 });
   }
*/

$scope.addToCart = function(item){

         $scope.user.cart.push(item.userPrototype);
 

var cartButton = $('#cartButton');
cartButton.collapse('show');
cartButton[0].innerHTML = "Cart(" + $scope.user.cart.length + ")";

console.log($scope.user.cart);

}

$scope.newUser = function (){
    $.ajax({
        url:'/newUser',
        type:'post',
        data:$.param({newUser:{
            username: $("#loginModal #newUserName").val(),
            password : $("#loginModal #newUserPassword").val(),
            email : $("#loginModal #newUserEmail").val()
       } }),
       success: function(data){

        if (data == 'Success') {
    newUserSuccess(data)
  }
  else {
newUserError(data)
  }
  },
  error: function(){
    newUserError('Error sending data.')
  }
    });
}


$scope.userLogin = function (){
    $.ajax({
        url:'/userLogin',
        type:'post',
        data:$.param({userLogin:{
            username: $("#loginModal #userName").val(),
            password : $("#loginModal #userPassword").val(),
           // email : $("#loginModal #newUserEmail").val()
       } }),
       success: function(data){

        if (typeof data == 'object') {
    loginSuccess(data);
  }
  else {
loginFailure(data)
  }
  },
  error: function(){
    newUserError('Error sending data.')
  }
    });
}


function loginFailure(data) {


var loginSuccessAlert = $('#loginSuccessAlert');
loginSuccessAlert.collapse('hide');

//uncollapse the success alert and add the data message to it

var loginFailureAlert = $('#loginFailureAlert');
loginFailureAlert.collapse('show');
loginFailureAlert[0].innerHTML =  String(data);

}


function loginSuccess(data) {


var loginFailureAlert = $('#loginFailureAlert');
loginFailureAlert.collapse('hide');

//uncollapse the success alert and add the data message to it

var loginSuccessAlert = $('#loginSuccessAlert');
loginSuccessAlert.collapse('show');
loginSuccessAlert[0].innerHTML =  String('Logging in.');

$scope.user = data;
$scope.user.loggedIn = true;


var cartButton = $('#cartButton');
cartButton.collapse('show');
cartButton[0].innerHTML = "Cart(" + $scope.user.cart.length + ")";

}


function newUserSuccess(data) {


var registrationFailureAlert = $('#registrationFailureAlert');
registrationFailureAlert.collapse('hide');

//uncollapse the success alert and add the data message to it

var registrationSuccessAlert = $('#registrationSuccessAlert');
registrationSuccessAlert.collapse('show');
registrationSuccessAlert[0].innerHTML =  String(data);

}

function newUserError(data) {




var registrationSuccessAlert = $('#registrationSuccessAlert');
registrationSuccessAlert.collapse('hide');

//uncollapse the error alert and add the data message to it



var registrationFailureAlert = $('#registrationFailureAlert');
registrationFailureAlert.collapse('show');
registrationFailureAlert[0].innerHTML =  String(data);
}

 document.getElementById("register").onclick = function() {$scope.newUser()};

document.getElementById("loginButton").onclick = function() {$scope.userLogin()};





});




//


//http://stackoverflow.com/questions/19440589/parsing-json-data-from-a-url
// ----receive function----v


/*

         // -----------the url---v         ------------the callback---v
var mydata = get_json("http://webapp.armadealo.com/home.json", function (resp) {
    console.log(resp);
});

*/


//sidebar JS from https://www.w3schools.com/howto/howto_js_sidenav.asp

var cartVisible = false;

function toggleNav() {

if (cartVisible) {
closeNav();

cartVisible = false;
}

else {
openNav();
cartVisible = true;
}

}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}



