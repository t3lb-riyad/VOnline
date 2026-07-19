var fs = require('fs');
var vars = [
  'SUPABASE_URL', 'SUPABASE_ANON_KEY', 'IMGGB_API_KEY',
  'SUPABASE_MENU_TABLE', 'SUPABASE_ORDERS_TABLE',
  'RESTAURANT_NAME', 'CURRENCY_SYMBOL',
  'ADMIN_USERNAME', 'ADMIN_PIN',
  'ORDER_STATUS_POLL_INTERVAL',
];
var missing = vars.filter(function (k) { return !process.env[k]; });
if (missing.length) {
  console.error('Missing env vars: ' + missing.join(', '));
  process.exit(1);
}
var config = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  IMGGB_API_KEY: process.env.IMGGB_API_KEY,
  SUPABASE_MENU_TABLE: process.env.SUPABASE_MENU_TABLE || 'menu_items',
  SUPABASE_ORDERS_TABLE: process.env.SUPABASE_ORDERS_TABLE || 'orders',
  RESTAURANT_NAME: process.env.RESTAURANT_NAME || 'Restaurant Name',
  CURRENCY_SYMBOL: process.env.CURRENCY_SYMBOL || 'DA',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PIN: process.env.ADMIN_PIN,
  ORDER_STATUS_POLL_INTERVAL: parseInt(process.env.ORDER_STATUS_POLL_INTERVAL, 10) || 8000,
};
var lines = [
  'window.APP_CONFIG = ' + JSON.stringify(config, null, 2) + ';',
];
vars.forEach(function (k) {
  lines.push('var ' + k + ' = window.APP_CONFIG.' + k + ';');
});
fs.writeFileSync('config.js', lines.join('\n') + '\n');
console.log('config.js generated from environment variables');
