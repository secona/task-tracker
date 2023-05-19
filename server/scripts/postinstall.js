const fs = require('fs');
const path = require('path');

function copyEnvExample() {
  const serverRoot = path.resolve(__dirname, '..');
  const envPath = path.join(serverRoot, '.env');
  const envExamplePath = path.join(serverRoot, '.env.example');

  if (fs.existsSync(envPath)) {
    console.log('`.env` file already exists...');
  } else {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('Copied `.env.example` to `.env`...');
  }
}

copyEnvExample();
