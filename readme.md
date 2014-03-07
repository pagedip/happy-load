# Happy Load

This is a collection of loading screen messages. We're not a fan of dull loading screens, so we created this repository to hold a  collection of entertaining messages to show users while they wait. The raw data is kept in the data folder and categorized by source (usually a domain). We have the pre-compiled the raw data into the file `happy-load.json` for easy consumption.

If you have loading messages you'd like to add, please submit a pull request!

### JavaScript Usage

This package is equipped with a small JavaScript library for consuming the data in Node.js or the browser with Browserify. It can be installed via NPM.

	$ npm install happy-load --save

The core API is an object with a `data` property representing the contents of `happy-load.json` as well as three methods:

```javascript
var happy = require("happy-load");

happy.data; // The raw data.
happy.all([ source ]); // Returns an array of all messages. Optionally filter by source.
happy.get(id); // Returns a single message by id.
happy.random([ source ]); // Returns a random message, optionally by source.
```