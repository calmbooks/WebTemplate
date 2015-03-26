(function(win, doc, ns) {

    ns.setNS("util");

    //-----------------------
    // Singleton class
    //-----------------------
    var instance;
    var ResizeManager = (function() {
        return { 
            getInstance : function() {
                if(!instance) instance = new _ResizeManager();
                return instance;
            }
        }
    })();
    

    function _ResizeManager() {
        this.listeners = [];
        this.setup();
    }

    _ResizeManager.prototype.setup = function() {
        win.addEventListener("resize", this.resizeHandler.bind(this));
    };

    _ResizeManager.prototype.resizeHandler = function() {

        var winWidth = win.innerWidth;
        var winHeight = win.innerHeight;

        for( var i = 0, max = this.listeners.length; i < max; ++i ) {
            this.listeners[i]({
                windowWidth : winWidth,
                windowHeight : winHeight
            });
        }
    };

    _ResizeManager.prototype.addListener = function( listener, isFirst ) { 
        this.listeners.push(listener);
        if( isFirst ) {
            listener({
                windowWidth : win.innerWidth,
                windowHeight : win.innerHeight
            });
        }
    };

    _ResizeManager.prototype.removeListener = function( listener ) { 
        for( var i = 0, max = this.listeners.length; i < max; ++i ) {
            if( this.listeners[i] == listener ) {
                this.listeners.splice(i,1);
            }
        }
    };

    //-----------------------
    // Export
    //-----------------------
    ns.util.ResizeManager = ResizeManager;

})(window, document, window.App);






