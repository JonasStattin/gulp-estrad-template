(function(){
	var 
		through = require('async-through'),
		gutil = require('gulp-util'),
		partials = require("estrad-template"),
		extend = require("node-extend"),
		PluginError = gutil.PluginError;

	const PLUGIN_NAME = 'gulp-partials';

	module.exports = Partials;

	function Partials(args) {
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

		return through(function(file){
			var 
				self = this;

			if (file.isNull()) return;

			partials(file.contents, obj, function(err, content){
				file.contents = new Buffer(content);

				self.emit('data', file);
			});
			
		}, function(){
			this.emit('end');
		});
	}
})();