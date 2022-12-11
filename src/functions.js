function identifyUser() {
    var $client = $jsapi.context().client;
    var $parseTree = $jsapi.context().parseTree; 
    
    if ($client.wasGreeted) {
        sendTextResponse('Снова привет, ' + $client.name);
    } else {
        sendTextResponse('Как тебя зовут?');
    }
}

function saveUser() {
    var $client = $jsapi.context().client;
    var $parseTree = $jsapi.context().parseTree;
    
    $client.wasGreeted = true;
    $client.name = $parseTree._Name;
}

function sendTextResponse(text) {
    var $response = $jsapi.context().response;
    $response.replies = $response.replies || [];
    
    $response.replies.push({
            type: "text",
            text: text,
    });
}

function getWeatherData() {
    var $request = $jsapi.context().request;
    var $parseTree = $jsapi.context().parseTree;
    
    var cords = getCords($parseTree._City);
    var lat = cords.data[0].lat;
    var lon = cords.data[0].lon;
    
    var loadedWeather = loadWeather(lat, lon);
    
    var state = loadedWeather.data.list[0].weather[0].main;
    
    
    switch(state) {
        case "Clouds":
            state = "Облачно";
            break;
        case "Snowy":
            state = "Снежно";
            break;
        case "Sunny": 
            state = "Солнечно";
            break;
    }
    
    var temp = loadedWeather.data.list[0].main.temp;
    sendTextResponse('У вас сейчас ' + state + '\n температура: ' + temp + 'градусов');

}

function loadWeather(lat, lon) {
    return $http.query('api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&appid=6838f29871380f5b96e70075eb3f5613&units=metric')
}

function getCords(city) {
    return $http.query('http://api.openweathermap.org/geo/1.0/direct?q='+city+'&appid=6838f29871380f5b96e70075eb3f5613');
}