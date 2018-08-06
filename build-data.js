const fs = require("mz/fs");
const yaml = require('js-yaml');
const path = require("path");

const data_dir = path.join(__dirname, "data");
const save_file = path.join(__dirname, "happy-load.json");
const allowed_exts = [ ".yaml", ".yml", ".txt", ".json" ];

const data = {
	all: [],
	by_source: {},
	by_id: {}
};

(async function() {
	const dirs = await fs.readdir(data_dir);

	for (const src of dirs) {
		const src_dir = path.join(data_dir, src);
		const stat = await fs.stat(src_dir);
		if (!stat.isDirectory()) continue;

		const filenames = await fs.readdir(src_dir);
		for (const filename of filenames) {
			const ext = path.extname(filename);
			if (!~allowed_exts.indexOf(ext)) continue;

			const contents = await fs.readFile(path.join(src_dir, filename), "utf-8");
			let load;

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

			if (typeof load !== "object") continue;

			load.source = src;
			load.id = src + "/" + path.basename(filename, ext);

			// push
			var index = data.all.push(load) - 1;

			// index the source attribute
			if (data.by_source[src] == null) data.by_source[src] = [];
			data.by_source[src].push(index);

			// index the id attribute
			data.by_id[load.id] = index;
		}
	}

	await fs.writeFile(save_file, JSON.stringify(data));
	console.log("%d messages written to '%s'", data.all.length, save_file);
})();
