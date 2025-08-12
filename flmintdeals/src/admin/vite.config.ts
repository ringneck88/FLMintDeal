import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      allowedHosts: [
        'flmintdeals-dev-289505292602.us-central1.run.app',
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
      ],
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};