function Pipeline() {
	// Properties
	this.modules = [];
}

Pipeline.modules = {};

Pipeline.multiPassModule = function ( args, lookup, module ) {
	var i, len, pass, name,
		passes = Array.prototype.slice.call( args );

	// Expand pass lookups
	for ( i = 0, len = passes.length; i < len; i++ ) {
		pass = passes[i];

		if ( Array.isArray( pass ) ) {
			name = pass[0];
			if ( !lookup[name] ) {
				throw new Error( 'Unsupported provider: ' + name );
			}
			passes[i] = lookup[name]( pass[1] );

			if ( typeof passes[i] !== 'function' ) {
				throw new Error( 'Invalid provider; function expected' );
			}
		}
	}

	return module( passes );
};

Pipeline.prototype.setup = function ( config ) {
	var key, i, len, module,
		modules = this.constructor.modules;

	for ( key in config ) {
		switch ( key ) {
			case 'modules':
				for ( i = 0, len = config[key].length; i < len; i++ ) {
					module = config[key][i];
					if ( modules.hasOwnProperty( module.name ) ) {
						this.use( modules[module.name].apply( modules, module.args ) );
					} else {
						throw new Error( 'Unsupported module: ' + module.name );
					}
				}
				break;
		}
	}

	return this;
};

Pipeline.prototype.use = function ( module ) {
	if ( typeof module !== 'function' ) {
		throw new Error( 'Invalid module, function expected' );
	}
	this.modules.push( module );

	return this;
};

Pipeline.prototype.reset = function () {
	this.modules = [];

	return this;
};

Pipeline.prototype.process = function ( image ) {
	var i, len;

	for ( i = 0, len = this.modules.length; i < len; i++ ) {
		this.modules[i].call( image );
	}

	return this;
};
