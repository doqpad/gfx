Pipeline.modules.filter.brightness = function ( params ) {
	var value = Math.floor( 255 * ( Number( params.value ) ) );

	return function ( pixels ) {
		var i, len,
			d = pixels.data;

		for ( i = 0, len = d.length; i < len; i += 4 ) {
			d[i] += value;
			d[i + 1] += value;
			d[i + 2] += value;
		}
	};
};
