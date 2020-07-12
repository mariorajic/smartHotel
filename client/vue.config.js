var path = require('path');

module.exports = {


   // Configure webpack to resolve chunks
   configureWebpack: {
      output: {
         filename: 'main.js' // Name of the entry bundle
      },

      performance: {
         hints: false
      },

   },

   // Prevent CSS extraction so that you get CSS hot reload during development
   css: {
      extract: false
   },

   // Configure devServer to proxy our IIS endpoint and enable hot module reloading
   devServer: {
      proxy: {
         'api/*': {
            target: 'http://localhost:3002', // This is the IIS-express site url
           changeOrigin: true
         }
      },
   },

   // Linting on save
   lintOnSave: true,

}