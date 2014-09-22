var Promise = require("bluebird"),
	fs = Promise.promisifyAll(require("fs")),
	yaml = require('js-yaml'),
	path = require("path");

var data_dir = __dirname + "/data",
	save_file = __dirname + "/happy-load.json",
	allowed_exts = [ ".yaml", ".yml", ".txt", ".json" ];

var data = {
	all: [],
	by_source: {},
	by_id: {}
};

fs.readdirAsync(data_dir).map(function(src) {
	return fs.readdirAsync(data_dir + "/" + src).map(function(filename) {
		var ext = path.extname(filename);
		if (!~allowed_exts.indexOf(ext)) return;

		return fs.readFileAsync(data_dir + "/" + src + "/" + filename, "utf-8")
		
		.then(function(contents) {
			var load;

			switch(ext.substr(1)) {
				case "yaml":
				case "yml":
				case "txt":
					load = yaml.safeLoad(contents);
					break;

				case "json":
					load = JSON.parse(contents);
					break;
			}

			if (typeof load !== "object") return;

			load.source = src;
			load.id = src + "/" + path.basename(filename, ext);
			
			// push
			var index = data.all.push(load) - 1;
			
			// index the source attribute
			if (data.by_source[src] == null) data.by_source[src] = [];
			data.by_source[src].push(index);

			// index the id attribute
			data.by_id[load.id] = index;
		});
	});
})

.then(function() {
	return fs.writeFileAsync(save_file, JSON.stringify(data));
})

.then(function() {
	console.log("%d messages written to '%s'", data.all.length, save_file);
});