function Graphic( src ) {
	// Properties
	this.image = new Image();
	this.canvas = document.createElement( 'canvas' );
	this.context = this.canvas.getContext( '2d' );
	this.src = src;
	this.loading = null;
}

/* Methods */

Graphic.prototype.load = function () {
	var image = this.image;

	if ( !this.loading ) {
		this.loading = new Promise( function ( resolve, reject ) {
			image.onload = function () {
				( this.width === 0 && this.height === 0 ? reject : resolve )();
			};
			image.onerror = reject;
		} );

		this.image.src = this.src;
	}

	return this.loading;
};
