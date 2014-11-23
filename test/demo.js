$( function () {
	var updating,
		graphic = new Graphic( '../images/example-2.jpg' ),
		pipeline = new Pipeline();

	function update() {
		var natural = $( '#param-render-mode' ).val() === 'natural';
		if ( natural ) {
			$( '#param-render-width' )
				.val( graphic.image.width );
			$( '#param-render-height' )
				.val( graphic.image.height );
		}
		$( '#param-render-width, #param-render-height' )
			.prop( 'disabled', natural );

		pipeline
			.reset()
			.setup( {
				modules: [
					{
						name: 'render',
						args: [ {
							mode: $( '#param-render-mode' ).val(),
							width: $( '#param-render-width' ).val(),
							height: $( '#param-render-height' ).val()
						} ]
					},
					{
						name: 'blur',
						args: [ {
							radius: $( '#param-blur-radius' ).val()
						} ]
					},
					{
						name: 'convolve',
						args: [
							[ 'sharpen', { value: $( '#param-convolve-sharpen' ).val() / 100 } ],
							[ 'soften', { value: $( '#param-convolve-soften' ).val() / 100 } ]
						]
					},
					{
						name: 'filter',
						args: [
							[ 'saturation', { value: $( '#param-filter-saturation' ).val() / 100 } ],
							[ 'vibrance', { value: $( '#param-filter-vibrance' ).val() / 100 } ],
							[ 'brightness', { value: $( '#param-filter-brightness' ).val() / 100 } ],
							[ 'contrast', { value: $( '#param-filter-contrast' ).val() / 100 } ]
						]
					}
				]
			} )
			.process( graphic );
		$( '.canvas' ).css( {
			width: $( '#param-render-width' ).val(),
			height: $( '#param-render-height' ).val()
		} );
	}

	function debouncedUpdate() {
		if ( updating ) {
			clearTimeout( updating );
			updating = null;
		}
		updating = setTimeout( function () {
			requestAnimationFrame( update );
		}, 10 );
	}

	graphic.load()
		.then( function () {
			$( '.canvas' ).append( graphic.canvas );
			$( '.param' ).on( 'change input', debouncedUpdate );
			debouncedUpdate();
		} )
		.catch( function ( e ) {
			console.log( e );
		} );
} );
