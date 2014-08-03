(function(win, doc, ns) {

    ns.setNS("util");

    //-----------------------
    // Static class
    //-----------------------
    function System() {

        throw "System cannot be instantiated.";
    }

    //-----------------------
    // Public function
    //-----------------------
    System.convertHsvToRgb = function( hsv ) {

        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var i = Math.floor(h / 60) % 6;
        var f = (h / 60) - Math.floor(h / 60);
        var p = Math.round(v * (1 - (s / 255)));
        var q = Math.round(v * (1 - (s / 255) * f));
        var t = Math.round(v * (1 - (s / 255) * (1 - f)));

        switch( i ) {
            case 0: rgb = { r: v, g: t, b: p }; break;
            case 1: rgb = { r: q, g: v, b: p }; break;
            case 2: rgb = { r: p, g: v, b: t }; break;
            case 3: rgb = { r: p, g: q, b: v }; break;
            case 4: rgb = { r: t, g: p, b: v }; break;
            case 5: rgb = { r: v, g: p, b: q };
        }

        return rgb;
    };

    System.clamp = function( min, max ) {

        return Math.random() * (max - min) + min;
    };

    System.central = function( p1, p2 ) {

        return (p2 - p1) * 0.5 + p1;
    };

    System.central2d = function( p1, p2 ) {

        return {
            x: (p2.x - p1.x) * 0.5 + p1.x,
            y: (p2.y - p1.y) * 0.5 + p1.y
        };
    };

    System.round = function( num ) {

        return Math.round(num * 10) / 10;
    };

    System.dtr = function( d ) {

        return d * (Math.PI / 180);
    };

    System.rtd = function( r ) {

        return r * (180 / Math.PI);
    };

    //-----------------------
    // Export
    //-----------------------    
    ns.util.System = System; 

})(window, document, window.App);
