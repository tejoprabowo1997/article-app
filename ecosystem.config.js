module.exports = {
  apps: [
    {
      name: 'article-app',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      args: 'preview',
    },
  ],
}
