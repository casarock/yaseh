(function(yaseh) {

    var queue = {};

    yaseh.register = function(identifier, callback) {

        if (typeof queue[identifier] === 'undefined') {
            queue[identifier] = [callback];
        }
        else {
            queue[identifier].push(callback);
        }

        return [identifier, callback];

    };

    yaseh.unregister = function(handle) {

        var identifier = handle[0],
            callback = handle[1],
            subscribed = queue[identifier] || [];

        for(var i = 0, len = subscribed.length; i<len; i++) {

            if (subscribed[i] === callback) {
                subscribed.splice(i, 1);
            }

        }

        if (subscribed.length === 0) {
            delete queue[identifier];
        }
        else {
            queue[identifier] = subscribed;
        }

    };

    yaseh.trigger = function(identifier, arguments) {

        arguments = arguments || [];

        var cbs = queue[identifier] || [],
            len = cbs.length || 0;


        for(var idx = 0; idx < len; idx++) {
            cbs[idx].apply(yaseh, arguments);
        }

    };

})(this);