Pipeline.modules.convolve.sharpen = function ( params ) {
	var value = Number( params.value || 0 );

	return function () {
		return {
			value: value,
			kernel: [
				0, -1, 0,
				-1, 5, -1,
				0, -1, 0
			]
		};
	};
};
