Pipeline.modules.convolve = function () {
	return Pipeline.multiPassModule( arguments, Pipeline.modules.convolve, function ( passes ) {
		return function () {
			var i, len, r, g, b, a, ii, oi, pass, size, half, weight, pixelX, pixelY,
				kernelX, kernelY, neighborX, neighborY, od, output, id, input, kernel, value, tmp,
				width = this.canvas.width,
				height = this.canvas.height;

			for ( i = 0, len = passes.length; i < len; i++ ) {
				pass = passes[i]();
				if ( pass.value === 0 ) {
					continue;
				}
				if ( !input ) {
					// Setup initial buffers
					input = this.context.getImageData( 0, 0, width, height );
					output = this.context.createImageData( width, height );
				} else {
					// Swap buffers
					tmp = input;
					input = output;
					output = tmp;
				}
				id = input.data;
				od = output.data;
				kernel = pass.kernel;
				value = 1 - pass.value;
				size = Math.sqrt( kernel.length );
				half = Math.floor( size / 2 );
				for ( pixelY = 0; pixelY < height; ++pixelY) {
					for ( pixelX = 0; pixelX < width; ++pixelX) {
						r = 0;
						g = 0;
						b = 0;
						a = 0;
						for ( kernelY = 0; kernelY < size; ++kernelY) {
							for ( kernelX = 0; kernelX < size; ++kernelX) {
								weight = kernel[kernelY * size + kernelX];
								neighborY = Math.min(
										height - 1, Math.max(0, pixelY + kernelY - half));
								neighborX = Math.min(
										width - 1, Math.max(0, pixelX + kernelX - half));
								ii = (neighborY * width + neighborX) * 4;
								r += id[ii] * weight;
								g += id[ii + 1] * weight;
								b += id[ii + 2] * weight;
								a += id[ii + 3] * weight;
							}
						}
						oi = ( pixelY * width + pixelX ) * 4;
						od[oi] = r + value * ( id[oi] - r );
						od[oi + 1] = g + value * ( id[oi + 1] - g );
						od[oi + 2] = b + value * ( id[oi + 2] - b );
						od[oi + 3] = a + value * ( id[oi + 3] - a );
					}
				}
			}

			if ( output ) {
				this.context.putImageData( output, 0, 0 );
			}
		};
	} );
};
