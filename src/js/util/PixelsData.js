(function(win, doc, ns) {

    ns.setNS("util");

    //-----------------------
    // Class
    //-----------------------    
    function PixelsData( image, width, height ) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.data = [];
        this.setup();
    }

    PixelsData.prototype.setup = function() {

        var cvs = doc.createElement("canvas");
        var ctx = cvs.getContext("2d");

        cvs.width  = this.width;
        cvs.height = this.height;

        ctx.drawImage(this.image, 0, 0);

        var input = ctx.getImageData(0, 0, this.width, this.height);

        for( var i = 0, max = input.data.length; i < max; i += 4 ) {

            var r = input.data[i];
            var g = input.data[i + 1];
            var b = input.data[i + 2];
            var a = input.data[i + 3];

            this.data.push([r, g, b, a]);
        }
    };

    PixelsData.prototype.getLength = function() {
        return this.data.length;
    }

    PixelsData.prototype.getPixelFromIndex = function( index ) {
        return this.data[index];
    }

    PixelsData.prototype.getPixelFromPosition = function( x, y ) {
        if( x < 0 || this.width < x ) return null;
        if( y < 0 || this.height < y ) return null;

        var index = this.width * y + x;
        return this.data[index];
    }


    //-----------------------
    // Export
    //-----------------------
    ns.util.PixelsData = PixelsData;

})(window, document, window.App);
