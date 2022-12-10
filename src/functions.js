

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

function getVariables() {
    var context = $jsapi.context();
    
    return {
        $context: context,
        $response: context.response,
        $request: context.request,
    }
}