angular.module('search', ['ionic'])
    .directive('searchDir', ['$stateParams', '$http', '$state', '$ionicLoading' ,
        function($stateParams, $http, $state, $ionicLoading) {
        var ctrl = ['$scope', function($scope) {


	        var vm = this;
	        // var vm.dailyWeather = {};



			  vm.showMeteo = function(city) {
			    console.log(city);
			    $state.go('meteo', {'l': city.l, 'name': city.name});
			  };

			  vm.cancel = function() {
			    vm.query = '';
			    vm.cities = '';
			  };

			  vm.getCities = function(query) {
			    if (vm.query.length > 2) {
			        $http({ method: 'GET', url: 'https://autocomplete.wunderground.com/aq?query=' + vm.query})
			          .then(function (data) {
			            vm.cities = data.data.RESULTS;
			            console.log(vm.cities);
			            console.log(data);
			          })
			          .catch(function (err) {
			            console.log(err);
			          });
			    }
			  };

			  vm.show = function() {
			    $ionicLoading.show({
			      template: 'Loading...',
			      duration: 3000
			    }).then(function() {
			    	vm.hide();
			       console.log("The loading indicator is now displayed");
			    });
			  };
			  
			vm.hide = function(){
			    $ionicLoading.hide().then(function(){
			       console.log("The loading indicator is now hidden");
			    });
			};
			vm.show();
			  var country = '', query = '';
      

        }];


        return {
            bindToController: true,
            controllerAs: 'vm',
            scope: {},
            controller: ctrl,
            replace: false,
            templateUrl: 'app/search/search-directive.html'
        }
    }]);
