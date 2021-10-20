const fs = require('fs');
const open = require('open');
const findCacheDir = require('find-cache-dir');

const portArg = process.argv.find((arg) => arg.startsWith('port='));
const port = (portArg && portArg.split('=')[1]) || process.env.REACT_APP_ENV || '4000';

const chromeProfileDirectory = findCacheDir({ name: 'google-profile' }); // findCacheDir locates node_modules folder and add cache under .cache folder
fs.rmdirSync(chromeProfileDirectory, { recursive: true });

open(`https://rf2.ecfk8saas.dev.wx-d.net:${port}/`, {
  newInstance: true, // needed for macOS only, it open a new instance of the app even it's already running.  Other platforms always open new instance by default.
  app: {
    name: open.apps.chrome,
    arguments: [
      '--disable-web-security', // to bypass CORS/Cookie restrictions rules
      '--ignore-certificate-errors',
      '--user-data-dir=' + chromeProfileDirectory,
    ],
  },
});
