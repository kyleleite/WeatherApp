
var weatherWidget = {
};

// RETURNS LOCATION / GEOLOCATION  //
//--------------------------------//

navigator.geolocation.getCurrentPosition(function(position){
	console.log(position);
})


//The form is submitted and the default page refresh is prevented//

weatherWidget.init = function(){
	$('.userSelection').on('submit', function(event){
	event.preventDefault();

	//We store the users Country/State and City input in variables//
	var usersCountry = $('input[name=country]').val();
	var usersCity = $('input[name=city]').val();

	weatherWidget.getData(usersCountry,usersCity);
//We empty the weatherWidget every time a new city is searched and replace it with the new 
	$('.weatherWidget').empty();

	});
};

//We retrieve data by making an Ajax call to the Wundergrounds API & pass in the Users Country/State and City Parameters.//

weatherWidget.getData = function(usersCountry,usersCity){

	weatherWidget.apiUrl = 'http://api.wunderground.com/api/4e898c6bce1bd811/conditions/q/' + usersCountry + '/' + usersCity +'.json';

	$.ajax({
		url:weatherWidget.apiUrl,
		method:'GET',
		dataType:'jsonp'
	})

//We run this function and pass through a weatherData parameter & store the current observation data in a variable.// 

	.then(function(weatherData){
		var weatherObject = weatherData.current_observation;

//We run an if/else statement so if the weatherObject is equal to undefined, we alert the user with a pop up alert & message. If else, we pass the data through to be displayed.//

	if (typeof weatherObject === 'undefined') {
		alert('Error. Please make sure the information you entered is correct');
	} else {
		weatherWidget.displayWeather(weatherObject);
		}
	});
};

//Once our Data returns, We want to display it to the user. We pass our data over to our HTML page. We create a new div and append all the data together and insert it into the weatherWidget//

weatherWidget.displayWeather = function(weather){
	var image = $('<img>').attr('src', weather.icon_url);

	var city =  $('<p>').text(weather.display_location.city);

	var conditions = $('<p>').text(weather.weather);

	var temperature = $('<p>').text(weather.temp_c + 'C');

	var time = $('<p>').text(weather.local_time_rfc822)

	var weatherInfo = $('<div>').append(image,temperature,city,conditions,time);

	$('.weatherWidget').append(weatherInfo)
};

//We run out Document//

$(document).ready(function(){
  weatherWidget.init();
});


