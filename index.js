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
		if (typeof id === "number") return this.data.all[id];
		var index = this.data.by_id[id];
		if (index != null) return this.data.all[index];
	},

	random: function(source) {
		var data = this.all(source);
		return data[Math.floor(Math.random() * data.length)];
	}

};