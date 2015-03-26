(function(win, doc, ns) {

    ns.setNS("util");

    //-----------------------
    // Static class
    //-----------------------
    function ImageLoader() {
        throw "ImageLoader cannot be instantiated.";
    }

    //-----------------------
    // Static function
    //-----------------------
    ImageLoader.loadImage = function( path, callback ) {

        var image = new Image();

        image.addEventListener("load", function() {
            callback(image);
        }, false);

        image.src = path;
    };


    //-----------------------
    // Export
    //-----------------------    
    ns.util.ImageLoader = ImageLoader;

})(window, document, window.App);
