Pipeline.modules.filter.contrast = function ( params ) {
	var value = Math.pow( ( Number( params.value ) + 1 ), 2 );

	return function ( pixels ) {
		var i, len,
			d = pixels.data;

		for ( i = 0, len = d.length; i < len; i += 4 ) {
			d[i] = ( ( ( ( d[i] / 255 ) - 0.5 ) * value ) + 0.5 ) * 255;
			d[i + 1] = ( ( ( ( d[i + 1] / 255 ) - 0.5 ) * value ) + 0.5 ) * 255;
			d[i + 2] = ( ( ( ( d[i + 2] / 255 ) - 0.5 ) * value ) + 0.5 ) * 255;
		}
	};
};
