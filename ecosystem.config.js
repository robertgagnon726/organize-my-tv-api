module.exports = {
  apps: [
    {
      name: 'organize-my-tv-api',
      script: 'npm run start:prod',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
