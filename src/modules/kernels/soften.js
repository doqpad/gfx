Pipeline.modules.convolve.soften = function ( params ) {
	var value = Number( params.value || 0 );

	return function () {
		return {
			value: value,
			kernel: [
				0.045, 0.122, 0.045,
				0.122, 0.332, 0.122,
				0.045, 0.122, 0.045
			]
		};
	};
};
