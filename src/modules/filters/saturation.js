Pipeline.modules.filter.saturation = function ( params ) {
	var value = Number( params.value ) * -1;

	return function ( pixels ) {
		var i, len, lum,
			d = pixels.data;

		for ( i = 0, len = d.length; i < len; i += 4 ) {
			// CIE luminance
			lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

			d[i] += ( lum - d[i] ) * value;
			d[i + 1] += ( lum - d[i + 1] ) * value;
			d[i + 2] += ( lum - d[i + 2] ) * value;
		}
	};
};
