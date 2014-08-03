
(function(win, doc, ns) {

    ns.setNS("EVENT");

    var is_touch = "ontouchstart" in win ? true : false;

    ns.EVENT.POINTER_START = is_touch ? "touchstart" : "mousedown";
    ns.EVENT.POINTER_END   = is_touch ? "touchend"   : "mouseup";
    ns.EVENT.POINTER_MOVE  = is_touch ? "touchmove"  : "mousemove";

})(window, document, window.App);
