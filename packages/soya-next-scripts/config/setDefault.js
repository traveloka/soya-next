const config = require('config');
config.server = config.server || {};
config.server.host = config.server.host || '0.0.0.0';
config.server.port = config.server.port || 3000;
