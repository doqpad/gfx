/**
 * Render the image to the canvas.
 *
 * @param {Object} params Parameters
 * @param {string} [mode=contain] Rendering mode
 *   - contain: canvas respects width and height constraints, aspect ratio is preserved
 *   - cover: canvas matches width and height constraints, image is cropped to cover
 *   - natural: canvas matches natrual image size, width and height constraints are ignored
 * @param {number} [width=100] Width constraint in the range of [1..4096]
 * @param {number} [height=100] Height constraint in the range of [1..4096]
 */
Pipeline.modules.render = function ( params ) {
	var pw = params.width !== undefined ? Number( params.width ) : 100,
		ph = params.height !== undefined ? Number( params.height ) : 100,
		pm = params.mode !== undefined ? String( params.mode ) : 'contain';

	// Clamp range
	pw = Math.min( Math.max( pw, 1 ), 4096 );
	ph = Math.min( Math.max( ph, 1 ), 4096 );

	return function () {
		var w, h, cw, ch, cr, ix, iy,
			iw = this.image.width,
			ih = this.image.height,
			ir = iw / ih;

		switch ( pm ) {
			case 'natural':
				cw = iw;
				ch = ih;
				ix = 0;
				iy = 0;
				break;
			case 'cover':
				cw = pw;
				ch = ph;
				cr = cw / ch;
				w = cr > ir ? cw : ch * ir;
				h = cr > ir ? cw / ir : ch;
				ix = ( cw - w ) / 2;
				iy = ( ch - h ) / 2;
				iw = w;
				ih = h;
				break;
			case 'contain':
				cr = pw / ph;
				w = cr < ir ? pw : ph * ir;
				h = cr < ir ? pw / ir : ph;
				cw = w;
				ch = h;
				ix = 0;
				iy = 0;
				iw = w;
				ih = h;
				break;
			default:
				throw new Error( 'Invalid crop mode: ' + params.mode );
		}

		this.canvas.width = Math.max( cw, 1 );
		this.canvas.height = Math.max( ch, 1 );
		this.context.drawImage( this.image, ix, iy, Math.max( iw, 1 ), Math.max( ih, 1 ) );
	};
};
