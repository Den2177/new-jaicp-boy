function initVariables() {
    bind('preProcess', function($context) {
        var DEFAULT_VOLUME = 30;
        var GLOBAL_VALUE = 'global value';
        var SUPER_NAMING = 'super_naming';
        $context.session.volume = DEFAULT_VOLUME;
    });    
}



