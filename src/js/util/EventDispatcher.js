
(function(win, doc, ns) {

    ns.setNS("util");

    //-----------------------
    // Class
    //-----------------------
    function EventDispatcher() {

        this.listeners = {};
    }

    EventDispatcher.prototype.addEventListener = function( type, handler ) {

        var obj = this.listeners;
        var arr = obj[type];

        if(!arr) {

            arr = obj[type] = [];
        }
        else {
            this.removeEventListener(type, handler);
        }

        arr.push(handler);
    };

    EventDispatcher.prototype.removeEventListener = function( type, handler ) {

        var obj = this.listeners;
        var arr = obj[type];

        if(!arr) return;

        if(!handler) {

            delete obj[type];
        }
        else {

            for(var i = 0, max = arr.length; i < max; ++i) {

                if(arr[i] == handler) {

                    if(max == 1) {
                        delete obj[type];
                    }
                    else {
                        arr.splice(i,1);
                    }
                    break;
                }
            }
        }
    };

    EventDispatcher.prototype.removeAllEventListeners = function( type ) {

        if(!type) {
            this.listeners = {};
        }
        else {
            delete this.listeners[type];
        }
    };

    EventDispatcher.prototype.dispatchEvent = function( type, event_object ) {

        var obj = this.listeners;
        var arr = obj[type];

        if(!arr) return;

        var event_object = event_object || {};

        event_object.type = type;

        for(var i = 0, max = arr.length; i < max; ++i) {

            arr[i](event_object);
        }
    };

    EventDispatcher.prototype.on = EventDispatcher.prototype.addEventListener;
    EventDispatcher.prototype.off = EventDispatcher.prototype.removeEventListener;
    EventDispatcher.prototype.trigger = EventDispatcher.prototype.dispatchEvent;

    //-----------------------
    // Export
    //-----------------------
    ns.util.EventDispatcher = EventDispatcher;

})(window, document, window.App);

