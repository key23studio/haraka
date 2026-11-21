// KEY23 for Claude: runs the connector of the KEY23 installed on this computer.
const fs = require('fs');
const os = require('os');
const path = require('path');
// The folder chosen in Claude, else where KEY23 is usually put.
const places = [process.env.KEY23_DIR, path.join(os.homedir(), 'KEY23'), 'C:\\KEY23', path.join(os.homedir(), 'Desktop', 'KEY23')].filter(Boolean);
const dir = places.find((d) => fs.existsSync(path.join(d, 'mcp', 'server.js')));
if (!dir) {
  // Said plainly (the owner, 21-11, on a Mac: only «KEY23 couldn't start»): this
  // extension joins Claude to the KEY23 program on this same computer; it is
  // not the program, and it can't reach the web version.
  console.error('KEY23 not found on this computer (looked in: ' + places.join(', ') + '). This extension connects Claude to the KEY23 (Haraka) program installed on this same computer; it is not the program itself, and it cannot reach the web version. Install KEY23 first, then in Claude open Settings, Extensions, KEY23, Configure, and choose its folder (the one that holds start-studio).');
  process.exit(1);
}
require(path.join(dir, 'mcp', 'server.js'));
