import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    server: {
      host: '0.0.0.0',
      allowedHosts: ['flmintdeal-dev.fly.dev', '.fly.dev'],
      hmr: false, // Disable HMR to prevent reload loops in production
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
};