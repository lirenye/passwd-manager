const JavascriptObfuscator = require('webpack-obfuscator');
module.exports = {
  chainWebpack: config =>{
    config.when(process.env.NODE_ENV === 'production', config=>{
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
      })

      config.plugin('html').tap(args =>{
        args[0].isProd = true;
        return args;
      })

      config.plugin('JavascriptObfuscator').use(JavascriptObfuscator,[
        {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 1,
          debugProtection: true,
          debugProtectionInterval: true,
          ignoreImports: true,
          numbersToExpressions: true
        }
      ])
    });

    config.when(process.env.NODE_ENV === 'development', config=>{
      config.plugin('html').tap(args =>{
        args[0].isProd = false;
        return args;
      })
    })
  }
}