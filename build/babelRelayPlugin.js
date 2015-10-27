var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../server/schema.json');

module.exports = getbabelRelayPlugin(schema.data);