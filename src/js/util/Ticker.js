(function(win, doc, ns) {

    ns.setNS("util");

    //-----------------------
    // Class
    //----------------------- 
    function Ticker () {

        this.interval;

        this.listeners = [];
        this.times     = [];
        this.timeoutID = null;
        this.rafReq = null;

        this.now = win.performance && ( performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow );
        win.requestAnimationFrame = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame;
        win.cancelAnimationFrame = win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame;

        this.startTime = this.lastTime = this.getTime();

        this.times.push( this.startTime );

        if( win.requestAnimationFrame ) {
            this._setTickeRAF();
        }
        else {
            this._setTicke();
        }
    }

    Ticker.prototype.addListener = function( handler ) {

        var arr = this.listeners;

        if(arr.length) {
            this.removeListener( handler ); // Prevent duplicates
        }

        handler.startTime = this.getTime();

        arr.push(handler);
    };

    Ticker.prototype.removeListener = function( handler ) {

        var arr = this.listeners;

        for(var i = 0, max = arr.length; i < max; ++i) {

            if(arr[i] == handler) arr.splice(i,1);
        }
    };

    Ticker.prototype.removeAllListeners = function() {
        this.listeners = [];
    };

    Ticker.prototype.setFPS = function( FPS ) {
        this.interval = 1000 / FPS;
    };

    Ticker.prototype.getFPS = function() {

        return 1000 / this.interval;
    };

    Ticker.prototype.getTime = function() {

        return ( this.now && this.now.call( performance ) ) || ( new Date().getTime() );
    };

    Ticker.prototype.getMeasuredFPS = function() {

        var times = this.times;
        var ticks = times.length - 1;

        return 1000 / ( ( times[ticks] - times[0] ) / ticks );
    };

    Ticker.prototype.stop = function() {
        if( win.cancelAnimationFrame ) {
            win.cancelAnimationFrame(this.rafReq);
        }
        else {
            clearTimeout(this.timeoutID);
            this.timeoutID = null;
        }
    };

    Ticker.prototype._setTicke = function() {

        if(this.timeoutID != null) return; // Prevent duplicates

        var _this = this;

        this.timeoutID = setTimeout(function() {

            _this.timeoutID = null;
            _this._setTicke();
            _this._tick();

        }, this.interval);
    };

    Ticker.prototype._setTickeRAF = function() {

        var _this = this;

        function step() {

            _this._tick();
            _this.rafReq = win.requestAnimationFrame(step);
        }

        this.rafReq = win.requestAnimationFrame(step);
    };

    Ticker.prototype._tick = function() {

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
