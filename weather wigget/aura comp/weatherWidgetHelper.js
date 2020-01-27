({
    timeconvert_UTF : function(code){
      var a = new Date(code * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = hour + ':' + min;
      return time;
	},
	parseData : function(jsondata) {
		var weatherForCurentCity = JSON.parse(jsondata);
        if(weatherForCurentCity.cod == 404 ){ 
          	return 'error';
        }else {
            weatherForCurentCity.coord.lon =  'coords: '+'['+weatherForCurentCity.coord.lat +'/'+ weatherForCurentCity.coord.lon+']';
            weatherForCurentCity.sys.sunrise = 'sunrise: '+(this.timeconvert_UTF(weatherForCurentCity.sys.sunrise));
            weatherForCurentCity.sys.sunset = 'sunset: '+(this.timeconvert_UTF(weatherForCurentCity.sys.sunset));
            weatherForCurentCity.mainnn =   weatherForCurentCity.weather[0].description;
            weatherForCurentCity.main.temp = ((weatherForCurentCity.main.temp-273.15).toFixed(0))+'℃' ;
            weatherForCurentCity.main.feels_like ='feels like: '+((weatherForCurentCity.main.feels_like-273.15).toFixed(0))+'℃';
            weatherForCurentCity.name = weatherForCurentCity.name +','+ weatherForCurentCity.sys.country
            weatherForCurentCity.main.humidity ='humidity: '+weatherForCurentCity.main.humidity + ' %';
            weatherForCurentCity.main.pressure = 'pressure: '+((weatherForCurentCity.main.pressure *  0.75).toFixed(2)) +' mmHg'
            weatherForCurentCity.wind.speed ='wind speed: '+ weatherForCurentCity.wind.speed +' m/s'
        	return weatherForCurentCity;
        }       
    }
})