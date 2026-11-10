// KEY23 for Claude: runs the connector of the KEY23 installed on this computer.
const fs = require('fs');
const os = require('os');
const path = require('path');
// The folder chosen in Claude, else where KEY23 is usually put.
const places = [process.env.KEY23_DIR, path.join(os.homedir(), 'KEY23'), 'C:\\KEY23', path.join(os.homedir(), 'Desktop', 'KEY23')].filter(Boolean);
const dir = places.find((d) => fs.existsSync(path.join(d, 'mcp', 'server.js')));
if (!dir) {
  console.error('KEY23 not found (looked in: ' + places.join(', ') + '). In Claude, choose the KEY23 folder in this extension\'s settings.');
  process.exit(1);
}
require(path.join(dir, 'mcp', 'server.js'));
