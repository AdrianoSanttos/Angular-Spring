const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8080',
    secure: false,
    logLevel: 'debug',
  }
];

module.exports = PROXY_CONFIG;
// This configuration file sets up a proxy for API requests
// to avoid CORS issues during development.
