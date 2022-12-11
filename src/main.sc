require: slotfilling/slotFilling.sc
  module = sys.zb-common
require: index.js
require: functions.js
init: 
    initVariables();
patterns: 
    $Name = *
    $City = *
theme: /
    state: Start
        q!: $regex</start>
        script:
            $client.wasGreeted = false;
            identifyUser()
    state: GetName
        q: (меня зовут $Name/мое имя $Name/$Name) || fromState = "/Start", onlyThisState = true
        script: 
            saveUser()
        a: Приятно познакомиться, {{$parseTree._Name}}
        a: Я электронный помощник. Ты можешь спросить сегодняшнюю дату, а так-же узнать погоду
    state: GetWeather
        intent!: /погода
        a: Хорошо, назови город
    state: GetCity
        q: (мой город $City/город $City/живу в $City/$City) || fromState = "/GetWeather"
        go!: /GetWeatherData
    state: GetWeatherData
        a: ищу город...
        script: 
            getWeatherData();
    state: NoMatch
        event!: noMatch
        a: Я вас не понял. Повторите фразу или задайте другой вопрос
        