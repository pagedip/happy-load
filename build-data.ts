import fs from "mz/fs";
import yaml from "js-yaml";
import path from "path";

const data_dir = path.join(__dirname, "data");
const save_file = path.join(__dirname, "happy-load.json");
const allowed_exts = [".yaml", ".yml", ".txt", ".json"];

interface LoadMessage {
  text?: string;
  subtext?: string;
  id: string;
  source: string;
}

interface Data {
  all: LoadMessage[];
  by_source: {
    [source: string]: number[];
  };
  by_id: {
    [id: string]: number;
  };
}

const data: Data = {
  all: [],
  by_source: {},
  by_id: {},
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

      switch (ext.substr(1)) {
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
      const index = data.all.push(load) - 1;

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
