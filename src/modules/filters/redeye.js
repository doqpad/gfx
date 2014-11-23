Pipeline.modules.filter.redeye = function ( params ) {
	var startX = params.start.x,
		startY = params.start.x,
		endX = params.end.x,
		endY = params.end.x;

	// TODO: use pixels array instead of getting and putting image data
	// TODO: operate on a circular area instead of a rectangle
	// TODO: fade effect out at the edges to avoid sharp artifacts
	return function ( /* pixels */ ) {
		var x, y, r, g, b, offset, redIntensity,
			imageData = this.context.getImageData(
				Math.min( startX, endX ),
				Math.min( startY, endY ),
				Math.abs( endX - startX ),
				Math.abs( endY - startY )
			);

		for ( x = 0; x < imageData.width; x++ ) {
			for ( y = 0; y < imageData.height; y++ ) {
				offset = ( y * imageData.width + x ) * 4;
				r = imageData.data[offset];
				g = imageData.data[offset + 1];
				b = imageData.data[offset + 2];
				if ( g || b ) {
					redIntensity = 2 * r / (g + b);
				} else if ( r ) {
					redIntensity = 2;
				} else {
					redIntensity = 0;
				}
				if ( redIntensity > 1.6 ) {
					if ( g || b ) {
						imageData.data[offset] = ( g + b ) / 2;
					} else {
						imageData.data[offset] = 0;
					}
				}
			}
		}
		this.context.putImageData( imageData, Math.min( startX, endX ), Math.min( startY, endY ) );
	};
};
