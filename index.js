module.exports = {

	data: require("./happy-load.json"),

	all: function(source) {
		var data = this.data;

		if (source != null) {
			var indexes = data.by_source[source];
			if (indexes == null) throw new Error("Missing source '" + source + "'");

			return indexes.map(function(i) { return data.all[i]; });
		} else {
			return data.all;
		}
	},

	get: function(id) {
		var index = this.data.by_id[id];
		if (index == null) throw new Error("Missing entry with id '" + id + "'");
		return this.data.all[index];
	},

	random: function(source) {
		var data = this.all(source);
		return data[Math.floor(Math.random() * data.length)];
	}

};