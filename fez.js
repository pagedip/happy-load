var fez = require("fez"),
	Promise = require("bluebird"),
	yaml = require('js-yaml'),
	path = require("path");

exports.build = function(spec) {
	var data = {
		all: [],
		by_source: {},
		by_id: {}
	};

	spec.with("data/*/*.+(txt|json)").all(function(file) {
		spec.rule(file, "happy-load.json", function(inputs) {
			var files = inputs.map(function(i) {
				var filename = i.getFilename(),
					ext = path.extname(filename);

				return Promise.props({
					filename: filename,
					source: path.basename(path.dirname(filename)),
					id: path.basename(filename, ext),
					type: ext.substr(1),
					data: i.asBuffer()
				});
			})

			return Promise.all(files)
				.map(function(file) {
					var load = file.data.toString("utf-8"),
						source = file.source;

					switch(file.type) {
						case "yml":
						case "txt":
							load = yaml.safeLoad(load);
							break;

						case "json":
							load = JSON.parse(load);
							break;
					}

					if (typeof load !== "object") return;

					load.source = source;
					load.id = source + "/" + file.id;

					// push
					var index = data.all.push(load) - 1;
					
					// index the source attribute
					if (data.by_source[source] == null) data.by_source[source] = [];
					data.by_source[source].push(index);

					// index the id attribute
					data.by_id[load.id] = index;
				})
				.then(function(){
					return JSON.stringify(data, null, 2);
				});
		});
	});

}

exports.default = exports.build;

fez(module);