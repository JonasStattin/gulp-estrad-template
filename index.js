(function(){
	var 
		map = require('map-stream'),
		gutil = require('gulp-util'),
		partials = require("estrad-template"),
		extend = require("extend"),
		PluginError = gutil.PluginError;

	const PLUGIN_NAME = 'gulp-partials';

	module.exports = function(args) {
		var 
			defaults = {
				folder: 'modules'
			},
			obj;

		if(typeof args === 'object') {
			obj = extend(defaults, args);
		} else {
			obj = defaults;
		}

		return map(stream);

		function stream(file, callback) {
			var 
				self = this;

			if (file.isNull()) return callback(null, file);

			partials(file.contents, obj, function(err, content){
				file.contents = new Buffer(content);

				callback(null, file);
			});
		}
	}
})();