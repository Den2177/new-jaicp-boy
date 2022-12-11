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
    var $parseTree = $jsapi.context().request;
    log($parseTree._City)
}