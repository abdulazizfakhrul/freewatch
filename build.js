const fs = require('fs');
const path = require('path');

// Copy Ultraviolet files ke folder public
const uvDist = path.join(__dirname, 'node_modules/@titaniumnetwork-dev/ultraviolet/dist');
const uvOut  = path.join(__dirname, 'public/service/uv');

fs.mkdirSync(uvOut, { recursive: true });

// Copy semua file UV
const files = fs.readdirSync(uvDist);
files.forEach(file => {
  fs.copyFileSync(
    path.join(uvDist, file),
    path.join(uvOut, file)
  );
  console.log('Copied:', file);
});

// Copy index.html ke public/
fs.copyFileSync(
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'public/index.html')
);

// Buat uv.config.js dengan URL bare server kamu
const bareUrl = process.env.BARE_SERVER_URL || 'https://freewatch-bare.abdulazizfakhrul-aaf.workers.dev';

const uvConfig = `
self.__uv$config = {
  prefix: '/service/uv/',
  bare: '${bareUrl}/',
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: '/service/uv/uv.handler.js',
  bundle: '/service/uv/uv.bundle.js',
  config: '/service/uv/uv.config.js',
  sw: '/service/uv/uv.sw.js',
};
`;

fs.writeFileSync(path.join(uvOut, 'uv.config.js'), uvConfig);
console.log('uv.config.js dibuat dengan bare server:', bareUrl);
console.log('Build selesai!');
