function sayHello() {
    var $request = getVariables().$request;
    var $response = getVariables().$response;
    
    var text = $request.query;
    
    $response.replies = $response.replies || [];
    
    $response.replies.push({
        type: "text",
        text: "Меня зовут евдаким",
    });
}


function sayWeather() {
    var $query = getVariables().$request.query;
    var $response = getVariables().$response;
    $response.replies = $response.replies || [];
    
    var result = $http.query("http://api.openweathermap.org/geo/1.0/direct?q=Kazan&appid=6838f29871380f5b96e70075eb3f5613", {
        method: "GET",
    });
    var $lat = result.data[0].lat;
    var $lon = result.data[0].lon;
    
    var weather = $http.query("api.openweathermap.org/data/2.5/forecast?lat=55.782&lon=49.124&appid=6838f29871380f5b96e70075eb3f5613&units=metric", {
        method: "GET"
    });
    
    var answer = "У вас сейчас ровно: " + weather.data.list[0].main.temp;
    
    $response.replies.push({
        type: "text",
        text: answer,
    });
}
function getVariables() {
    var context = $jsapi.context();
    
    return {
        $context: context,
        $response: context.response,
        $request: context.request,
    }
}