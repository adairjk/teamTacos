var app = angular.module('contactCards', []);
app.controller('cardsCtrl', function($scope, $http) {
    $http.get("./contacts")
        .success(function(response){
            console.log(response)
            for(contact in response) {
                var email = response['email'];
                if(email){
                     var hash = md5(email);
                    response['image'] = "http://www.gravatar.com/avatar/" + hash;
                } else {
                    response['image'] = "images/no-image.png";
                }
            }


            $scope.cards = response;
        });
});