// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'meteo', 'search'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
// .config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider

//     .state('search', {
//     url: '/app/search',
//     templateUrl: 'templates/search.html',
//     controller: 'SearchCtrl'
//   })
//     .state('meteo', {
//     url: '/app/meteo',
//     params: {
//       l: '@',
//       name: '@'
//     },
//     templateUrl: 'templates/meteo.html',
//     controller: 'MeteoCtrl'
//   })
//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/app/search');
// })
// .controller('SearchCtrl', function($state, $scope, $ionicModal, $timeout, $http) {


//   $scope.showMeteo = function(city) {
//     console.log(city);
//     $state.go('meteo', {'l': city.l, 'name': city.name});
//   };

//   $scope.cancel = function() {
//     $scope.query = '';
//     $scope.cities = '';
//   };

//   $scope.getCities = function(query) {
//     if (query.length > 2) {
//         $http({ method: 'GET', url: 'https://autocomplete.wunderground.com/aq?query=' + query})
//           .then(function (data) {
//             $scope.cities = data.data.RESULTS;
//             console.log($scope.cities);
//             console.log(data);
//           })
//           .catch(function (err) {
//             console.log(err);
//           });
//     }
//   };

//   var country = '', query = '';

// })
// .controller('MeteoCtrl', function($state, $scope, $ionicModal, $timeout, $http, $stateParams) {

//   console.log('meteo controller');
//   $scope.dailyParams = ['date.weekday_short', 'icon_url', 'high.celsius', 'low.celsius', 'avehumidity'];

//   if ($stateParams.l == '@') {
//     $stateParams.l = '/q/CA/San_Francisco'; 
//   }
//   var tags = $stateParams.name.split(',');
//   if ($stateParams.name == '@') {
//     $stateParams.name = 'San francisco';
//   }
//   $scope.getPhotoUrl = function(farmId, serverId, id, secret) {
//     return 'https://farm'+farmId+'.staticflickr.com/'+serverId+'/'+id+'_'+secret+'.jpg';
//   };

//   $scope.queryPhoto = function() {
//     console.log('stateParams.name: ' + $stateParams.name);
//     var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=422eb7e3eda5bf94d73ad691a744c1db&nojsoncallback=?&format=json&tags='+$stateParams.name;
//     $http({ method: 'GET', url: url })
//       .then(function (data) {
//         var p = data.data.photos.photo[0];
//         console.log(data.data);
//         $scope.backgroundUrl = $scope.getPhotoUrl(p.farm,p.server,p.id,p.secret);
//         console.log($scope.backgroundUrl);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   };

//   $scope.queryPhoto();

//   $scope.getParamById = function(day, param) {
//     switch(param) {
//       case 0:
//       return $scope.dailyWeather[day].date.weekday_short;
//       break;
//       case 1:
//       return $scope.dailyWeather[day].icon_url;
//       break;
//       case 2:
//       return $scope.dailyWeather[day].high.celsius;
//       break;
//       case 3:
//       return $scope.dailyWeather[day].low.celsius;
//       break;
//       case 4:
//       return $scope.dailyWeather[day].avehumidity;
//       break;
//     }
//   };

//   var weatherUrl = 'http://api.wunderground.com/api/d3dfe7306703a02a/conditions' + $stateParams.l + '.json';
//   console.log('url : ' + weatherUrl);
//   $http({ method: 'GET', url: weatherUrl })
//     .then(function (data) {
//       console.log(data.data);
//       $scope.weatherData = data.data.current_observation;
      
//     })
//     .catch(function (err) {
//       console.log(err);
//     });

//     var hourlyWeatherUrl = 'http://api.wunderground.com/api/d3dfe7306703a02a/hourly' + $stateParams.l + '.json';
//     $http({ method: 'GET', url: hourlyWeatherUrl })
//       .then(function (data) {
//         console.log(data.data);
//         $scope.hourlyWeather = data.data.hourly_forecast;
        
//       })
//       .catch(function (err) {
//         console.log(err);
//       });

//       var dailyForecastUrl = 'http://api.wunderground.com/api/d3dfe7306703a02a/forecast10day' + $stateParams.l + '.json';
//       $http({ method: 'GET', url: dailyForecastUrl })
//         .then(function (data) {
//           $scope.dailyWeather = data.data.forecast.simpleforecast.forecastday;
//           console.log($scope.dailyWeather);

//         })
//         .catch(function (err) {
//           console.log(err);
//         });

// });