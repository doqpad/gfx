Pipeline.modules.filter.vibrance = function ( params ) {
	var value = Number( params.value ) * -1;

	return function ( pixels ) {
		var i, len, max, avg, amt,
			d = pixels.data;

		for ( i = 0, len = d.length; i < len; i += 4 ) {

			max = Math.max( d[i], d[i + 1], d[i + 2] );
			avg = ( d[i] + d[i + 1] + d[i + 2] ) / 3;
			amt = ( ( Math.abs( max - avg ) * 2 / 255 ) * value );

			d[i] += ( max - d[i] ) * amt;
			d[i + 1] += ( max - d[i + 1] ) * amt;
			d[i + 2] += ( max - d[i + 2] ) * amt;
		}
	};
};
