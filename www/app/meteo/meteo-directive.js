angular.module('meteo', ['ionic'])
    .directive('meteoDir', ['$stateParams', '$http', '$ionicLoading',
        function($stateParams, $http, $ionicLoading) {
        var ctrl = ['$scope', function($scope) {


	        var vm = this;
	        // var vm.dailyWeather = {};

	        vm.init = function() {
	        	console.log($stateParams);
	        	vm.show();
	        	if ($stateParams.l == '@') {
				    $stateParams.l = '/q/CA/San_Francisco'; 
				  }
				  var tags = $stateParams.name.split(',');
				  if ($stateParams.name == '@') {
				    $stateParams.name = 'San francisco';
				  }
	        	vm.getHourlyWeather();
	        	vm.queryBackgroundPhoto();
	        	vm.getDailyWeather();
	        	vm.getNowWeather();
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

			var oldDayIcons = [
			{old:'chanceflurries.gif', new: 'wi-day-snow', background:'https://s-media-cache-ak0.pinimg.com/736x/9e/26/2c/9e262cdb1e2bcff19a71237c21b024f3.jpg'} ,
			{old:'chancerain.gif', new: 'wi-day-rain', background:'http://www.hdiphonewallpapers.us/phone-wallpapers/1080x1920-1/1080x1920-samsung-htc-lg-mobile-hd-wallpapers-4038dg5zw.jpg'} ,
			{old:'chancesleet.gif', new: 'wi-day-sleet', background:'http://www.hdiphonewallpapers.us/phone-wallpapers/1080x1920-1/1080x1920-samsung-htc-lg-mobile-hd-wallpapers-4038dg5zw.jpg'} ,
			{old:'chancesnow.gif', new: 'wi-day-snow', background:'https://s-media-cache-ak0.pinimg.com/736x/9e/26/2c/9e262cdb1e2bcff19a71237c21b024f3.jpg'} ,
			{old:'chancetstorms.gif', new: 'wi-day-lightning', background:'http://www.desktopimages.org/pictures/2012/1231/1/orig_186112.jpg'} ,
			{old:'clear.gif', new: 'wi-day-sunny', background:'http://wallpapersonthe.net/wallpapers/b/1440x2560/1440x2560-tree_sun_sky_nature_lake_sunny_day_at_the_lake-15318.jpg'},
			{old:'cloudy.gif', new: 'wi-day-cloudy', background:'http://novozybkov.su/wp-content/uploads/2016/05/cb525f68-75e5-432b-937e-64692aa0c7be.jpg'} ,
			{old:'flurries.gif', new: 'wi-day-snow', background:'https://s-media-cache-ak0.pinimg.com/736x/9e/26/2c/9e262cdb1e2bcff19a71237c21b024f3.jpg'} ,
			{old:'fog.gif', new: 'wi-day-fog', background:'http://wallpapersonthe.net/wallpapers/b/1440x2560/1440x2560-tree_nature_foggy_forest_fog_forest-20766.jpg'} ,
			{old:'hazy.gif', new: 'wi-day-haze', background:'http://wallpapersonthe.net/wallpapers/b/1440x2560/1440x2560-tree_nature_foggy_forest_fog_forest-20766.jpg'} ,
			{old:'mostlycloudy.gif', new: 'wi-day-cloudy', background:'http://novozybkov.su/wp-content/uploads/2016/05/cb525f68-75e5-432b-937e-64692aa0c7be.jpg'} ,
			{old:'partlysunny.gif', new: 'wi-day-sunny', background:'http://wallpapersonthe.net/wallpapers/b/1440x2560/1440x2560-tree_sun_sky_nature_lake_sunny_day_at_the_lake-15318.jpg'} ,
			{old:'mostlysunny.gif', new: 'wi-day-sunny', background:'http://wallpapersonthe.net/wallpapers/b/1440x2560/1440x2560-tree_sun_sky_nature_lake_sunny_day_at_the_lake-15318.jpg'} ,
			{old:'partlycloudy.gif', new: 'wi-day-cloudy', background:'http://novozybkov.su/wp-content/uploads/2016/05/cb525f68-75e5-432b-937e-64692aa0c7be.jpg'},
			{old:'sleet.gif', new: 'wi-day-sleet', background:'http://www.hdiphonewallpapers.us/phone-wallpapers/1080x1920-1/1080x1920-samsung-htc-lg-mobile-hd-wallpapers-4038dg5zw.jpg'} ,
			{old:'rain.gif', new: 'wi-day-rain', background:'http://www.hdiphonewallpapers.us/phone-wallpapers/1080x1920-1/1080x1920-samsung-htc-lg-mobile-hd-wallpapers-4038dg5zw.jpg'} ,
			{old:'snow.gif', new: 'wi-day-snow', background:'https://s-media-cache-ak0.pinimg.com/736x/9e/26/2c/9e262cdb1e2bcff19a71237c21b024f3.jpg'} ,
			{old:'sunny.gif', new: 'wi-day-sunny', background:'http://wallpapersonthe.net/wallpapers/b/1440x2560/1440x2560-tree_sun_sky_nature_lake_sunny_day_at_the_lake-15318.jpg'} ,
			{old:'tstorms.gif', new: 'wi-day-lightning', background:'http://www.desktopimages.org/pictures/2012/1231/1/orig_186112.jpg'} ,
			{old:'cloudy.gif', new: 'wi-day-cloudy', background:'http://novozybkov.su/wp-content/uploads/2016/05/cb525f68-75e5-432b-937e-64692aa0c7be.jpg'} ,
			{old:'partlycloudy.gif', new: 'wi-day-cloudy', background:'http://novozybkov.su/wp-content/uploads/2016/05/cb525f68-75e5-432b-937e-64692aa0c7be.jpg'}];



              

  			vm.getWeatherIconClass = function(oldIconUrl) {
  				console.log(oldIconUrl);
  				for (var i = 0; i < oldDayIcons.length; ++i) {
  					if (oldIconUrl.indexOf(oldDayIcons[i].old) > -1) {
  						var iconClass = oldDayIcons[i].new;
  						if (oldIconUrl.indexOf('nt_') > -1) {
  							iconClass.replace('day', 'night');
  						}
  						console.log('returning ' + iconClass);
  						return iconClass;
  					}
  				}
  			};


  			vm.getBackgroundImage = function(oldIconUrl) {
  				for (var i = 0; i < oldDayIcons.length; ++i) {
  					if (oldIconUrl.indexOf(oldDayIcons[i].old) > -1) {
  						return oldDayIcons[i].background;
  					}
  				}
  			};

			// var oldNightIcons= [
			// {old:'/nt_chanceflurries.gif', new: ''} ,
			// {old:'/nt_chancerain.gif', new: ''} ,
			// {old:'/nt_chancesleet.gif', new: ''} ,
			// {old:'/nt_chancesnow.gif', new: ''} ,
			// {old:'/nt_chancetstorms.gif', new: ''} ,
			// {old:'/nt_clear.gif', new: ''} ,
			// {old:'/nt_cloudy.gif', new: ''} ,
			// {old:'/nt_flurries.gif', new: ''} ,
			// {old:'/nt_fog.gif', new: ''} ,
			// {old:'/nt_hazy.gif', new: ''} ,
			// {old:'/nt_mostlycloudy.gif', new: ''} ,
			// {old:'/nt_mostlysunny.gif', new: ''} ,
			// {old:'/nt_partlycloudy.gif', new: ''} ,
			// {old:'/nt_partlysunny.gif', new: ''} ,
			// {old:'/nt_sleet.gif', new: ''} ,
			// {old:'/nt_rain.gif', new: ''} ,
			// {old:'/nt_sleet.gif', new: ''} ,
			// {old:'/nt_snow.gif', new: ''} ,
			// {old:'/nt_sunny.gif', new: ''} ,
			// {old:'/nt_tstorms.gif', new: ''} ,
			// {old:'/nt_cloudy.gif', new: ''} ,
			// {old:'/nt_partlycloudy.gif', new: ''} ];

		  vm.getPhotoUrl = function(farmId, serverId, id, secret) {
		    return 'https://farm'+farmId+'.staticflickr.com/'+serverId+'/'+id+'_'+secret+'.jpg';
		  };

		  vm.queryBackgroundPhoto = function() {
		    console.log('stateParams.name: ' + $stateParams.name);
		    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=422eb7e3eda5bf94d73ad691a744c1db&nojsoncallback=?&format=json&tags='+$stateParams.name;
		    $http({ method: 'GET', url: url })
		      .then(function (data) {
		        var p = data.data.photos.photo[0];
		        vm.backgroundUrl = vm.getPhotoUrl(p.farm,p.server,p.id,p.secret);
		      })
		      .catch(function (err) {
		        console.log(err);
		      });
		  };



		  vm.getParamById = function(day, param) {
		    switch(param) {
		      case 0:
		      return vm.dailyWeather[day].date.weekday_short;
		      break;
		      case 1:
		      return vm.dailyWeather[day].icon_url;
		      break;
		      case 2:
		      return vm.dailyWeather[day].high.celsius;
		      break;
		      case 3:
		      return vm.dailyWeather[day].low.celsius;
		      break;
		      case 4:
		      return vm.dailyWeather[day].avehumidity;
		      break;
		    }
		  };

		 	vm.getDailyWeather = function() {
		 		var dailyForecastUrl = 'http://api.wunderground.com/api/d3dfe7306703a02a/forecast10day' + $stateParams.l + '.json';
			      $http({ method: 'GET', url: dailyForecastUrl })
			        .then(function (data) {
			          vm.dailyWeather = data.data.forecast.simpleforecast.forecastday;
			          console.log(vm.dailyWeather);

			        })
			        .catch(function (err) {
			          console.log(err);
			        });
		 	};

		 	vm.getHourlyWeather  = function() {
				var hourlyWeatherUrl = 'http://api.wunderground.com/api/d3dfe7306703a02a/hourly' + $stateParams.l + '.json';
				    $http({ method: 'GET', url: hourlyWeatherUrl })
				      .then(function (data) {
				        console.log(data.data);
				        vm.hourlyWeather = data.data.hourly_forecast;
				        
				      })
				      .catch(function (err) {
				        console.log(err);
				      });
		 	};

		 	vm.getNowWeather = function() {
		 		var weatherUrl = 'http://api.wunderground.com/api/d3dfe7306703a02a/conditions' + $stateParams.l + '.json';
		  
				  $http({ method: 'GET', url: weatherUrl })
				    .then(function (data) {
				      console.log(data.data);
				      vm.weatherData = data.data.current_observation;
				      
				    })
				    .catch(function (err) {
				      console.log(err);
				    });
		 	};

  

    		vm.init();

      

        }];


        return {
            bindToController: true,
            controllerAs: 'vm',
            scope: {
            },
            controller: ctrl,
            replace: true,
            templateUrl: 'app/meteo/meteo-directive.html'
        }
    }]);
