const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const dataDir = path.join(__dirname, "..", "app-data");
const file = path.join(dataDir, "counter.txt");

function initCounter() {
	try {
		const content = fs.readFileSync(file, { encoding: "utf8" });

		return JSON.parse(content);
	} catch (e) {
		fs.appendFileSync(file, "{}", { encoding: "utf8" });

		return {};
	}
}

function saveCounter(counter) {
	const content = JSON.stringify(counter) + "\n";

	return fsPromises.writeFile(file, content, { encoding: "utf8" });
}

module.exports = { initCounter, saveCounter };
