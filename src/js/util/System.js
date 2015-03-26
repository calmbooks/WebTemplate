(function(win, doc, ns) {

    ns.setNS("util");
    
    //-----------------------
    // Static class
    //-----------------------
    function System() {
        throw "System cannot be instantiated.";
    }

    //-----------------------
    // Static function
    //-----------------------
    System.getRgbFromHsv = function( hsv ) {

        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var i = Math.floor(h / 60) % 6;
        var f = (h / 60) - Math.floor(h / 60);
        var p = Math.round(v * (1 - (s / 255)));
        var q = Math.round(v * (1 - (s / 255) * f));
        var t = Math.round(v * (1 - (s / 255) * (1 - f)));

        var rgb = {};

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

    System.clamp = function( val, min, max ) {
        if( val < min ) {
            return min;
        }
        else if( max < val) {
            return max;
        }
        else {
            return val;
        } 
    };

    System.central = function( p1, p2 ) {
        return (p2 - p1) * 0.5 + p1;
    };

    System.central2d = function( p1, p2 ) {
        return {
            x : (p2.x - p1.x) * 0.5 + p1.x,
            y : (p2.y - p1.y) * 0.5 + p1.y
        };
    };

    System.round = function( num ) {
        return Math.round(num * 10) / 10;
    };

    System.d2r = function( d ) {
        return d * (Math.PI / 180);
    };

    System.r2d = function( r ) {
        return r * (180 / Math.PI);
    };

    System.mix = function( p1, p2, r ) {
        return ( p2 - p1 ) * r + p1;
    };

    System.mix2d = function( p1, p2, r ) {
        return {
            x : ( p2.x - p1.x ) * r + p1.x,
            y : ( p2.y - p1.y ) * r + p1.y
        }
    };

    System.mix3d = function( p1, p2, r ) {
        return {
            x : ( p2.x - p1.x ) * r + p1.x,
            y : ( p2.y - p1.y ) * r + p1.y,
            z : ( p2.z - p1.z ) * r + p1.z
        }
    };

    System.vector2d = function( p1, p2 ) {
        return {
            x : p2.x - p1.x,
            y : p2.y - p1.y
        }
    };

    System.vector3d = function( p1, p2 ) {
        return {
            x : p2.x - p1.x,
            y : p2.y - p1.y,
            z : p2.z - p1.z
        }
    };

    System.normarize2d = function( p ) {
        var max = Math.max( Math.abs(p.x), Math.abs(p.y) );
        return {
            x : p.x / max,
            y : p.y / max
        }
    };

    System.normarize3d = function( p ) {
        var max = Math.max( Math.abs(p.x), Math.abs(p.y), Math.abs(p.z) );
        return {
            x : p.x / max,
            y : p.y / max,
            z : p.z / max
        }
    };

    System.malutify2d = function( p, r ) {
        return {
            x : p.x * r,
            y : p.y * r
        }
    };

    System.malutify3d = function( p, r ) {
        return {
            x : p.x * r,
            y : p.y * r,
            z : p.z * r
        }
    };

    //-----------------------
    // Export
    //-----------------------    
    ns.util.System = System;

})(window, document, window.App);

