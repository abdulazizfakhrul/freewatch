const fs = require('fs');
const path = require('path');

const bareUrl = process.env.BARE_SERVER_URL || 'https://freewatch-bare.NAMAKAMU.workers.dev';

// Buat folder output
fs.mkdirSync('public/service/uv', { recursive: true });

// Copy file Ultraviolet dari node_modules
const uvSrc = path.join(__dirname, 'node_modules/@titaniumnetwork-dev/ultraviolet/dist');
fs.readdirSync(uvSrc).forEach(file => {
  fs.copyFileSync(path.join(uvSrc, file), path.join('public/service/uv', file));
  console.log('Copied:', file);
});

// Copy index.html
fs.copyFileSync('index.html', 'public/index.html');

// Buat uv.config.js dengan URL bare server
fs.writeFileSync('public/service/uv/uv.config.js', `
importScripts('/service/uv/uv.bundle.js');

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
`);

console.log('✅ Build selesai! Bare server:', bareUrl);
