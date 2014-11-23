Pipeline.modules.filter = function () {
	return Pipeline.multiPassModule( arguments, Pipeline.modules.filter, function ( passes ) {
		return function () {
			var i, len,
				pixels = this.context.getImageData( 0, 0, this.canvas.width, this.canvas.height );

			for ( i = 0, len = passes.length; i < len; i++ ) {
				passes[i].call( this, pixels );
			}

			this.context.putImageData( pixels, 0, 0 );
		};
	} );
};
