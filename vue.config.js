
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
    });

    config.when(process.env.NODE_ENV === 'development', config=>{
      config.plugin('html').tap(args =>{
        args[0].isProd = false;
        return args;
      })
    })
  }
}