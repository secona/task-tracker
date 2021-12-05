const fs = require('fs');
const path = require('path');

const serverRoot = path.resolve(__dirname, '..');

fs.copyFileSync(
  path.join(serverRoot, '.env.example'),
  path.join(serverRoot, '.env')
);