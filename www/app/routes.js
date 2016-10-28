angular.module('starter')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('search', {
        url: '/search',
        templateUrl: 'app/pages/search.html',
        // controller: 'SearchCtrl'
    })
    .state('meteo', {
        url: '/meteo',
        params: {
          l: '@',
          name: '@'
        },
        templateUrl: 'app/pages/meteo.html',
        // controller: 'MeteoCtrl'
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/search');
})