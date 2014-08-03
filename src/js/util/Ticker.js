
(function(win, doc, ns) {

    ns.setNS("util");

    //-----------------------
    // Singleton class
    //-----------------------
    var instance;

    var Ticker = (function() {

        return {
            
            getInstance : function( FPS ) {

                if(!instance) {

                    instance = new _Ticker(FPS);
                }

                return instance;
            }
        }

    })();
    
    function _Ticker( FPS ) {

        this.interval;

        this.listeners = [];
        this.times     = [];
        this.timeoutID = null;

        this.startTime = this.lastTime = this.getTime();

        this.times.push( this.startTime );

        this.setFPS( FPS || 60 );

        this._setTicke();
    }

    //-----------------------
    // Public function
    //-----------------------
    var now = win.performance && ( performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow );

    _Ticker.prototype.addListener = function( handler ) {

        var arr = this.listeners;

        if(arr.length) {
            this.removeListener( handler ); // Prevent duplicates
        }

        handler.startTime = this.getTime();

        arr.push(handler);
    };

    _Ticker.prototype.removeListener = function( handler ) {

        var arr = this.listeners;

        for(var i = 0, max = arr.length; i < max; ++i) {

            if(arr[i] == handler) arr.splice(i,1);
        }
    };

    _Ticker.prototype.removeAllListeners = function() {

        this.listeners = [];
    };

    _Ticker.prototype.setFPS = function( FPS ) {

        this.interval = 1000 / FPS;
    };

    _Ticker.prototype.getFPS = function() {

        return 1000 / this.interval;
    };

    _Ticker.prototype.getTime = function() {

        return ( now && now.call( performance ) ) || ( new Date().getTime() );
    };

    _Ticker.prototype.getMeasuredFPS = function() {

        var times = this.times;
        var ticks = times.length - 1;

        return 1000 / ( ( times[ticks] - times[0] ) / ticks );
    };


    //-----------------------
    // Private function
    //-----------------------    
    _Ticker.prototype._setTicke = function() {

        if(this.timeoutID != null) return; // Prevent duplicates

        var _this = this;

        this.timeoutID = setTimeout(function() {

            _this.timeoutID = null;
            _this._setTicke();
            _this._tick();

        }, this.interval);
    };

    _Ticker.prototype._tick = function() {

        var nowTime = this.getTime();

        var event_object = {

            delta       : nowTime - this.lastTime,
            measuredFPS : this.getMeasuredFPS()
        };

        var listeners = this.listeners;

        for(var i = 0; i < ( listeners ? listeners.length : 0 ); ++i) {

            var listener = listeners[i];

            event_object.runTime = nowTime - listener.startTime;

            listener(event_object);
        }

        this.lastTime = nowTime;

        this.times.push(nowTime);

        if(this.times.length > 100) this.times.shift();
    };

    //-----------------------
    // Export
    //-----------------------    
    ns.util.Ticker = Ticker; 


})(window, document, window.App);

