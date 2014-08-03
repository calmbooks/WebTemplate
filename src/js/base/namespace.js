
(function(win, doc, exports) {

    var name = "App";

    win[name] = win[name] || {};

    function setNS(definition) {

        var ns  = win[name];
        var arr = definition.split(".");
        var prt = ns;

        for(var i = 0, max = arr.length; i < max; ++i) {

            var def = arr[i];

            prt[def] = prt[def] || {};
            prt = prt[def];
        }
    }

    // ------------------------------
    // Export
    // ------------------------------
    exports[name].setNS = setNS;

})(window, document, window);
