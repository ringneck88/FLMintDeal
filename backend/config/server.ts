export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', ''),
  proxy: env.bool('IS_PROXIED', true),
  admin: {
    url: env('PUBLIC_URL') ? `${env('PUBLIC_URL')}/admin` : '/admin',
    serveAdminPanel: true,
  },
});
