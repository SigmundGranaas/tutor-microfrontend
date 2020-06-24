var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    disableHostCheck: true,
    host: 'blueprint.local.overhang.io',
    allowedHosts:[
        'localhost',
        'blueprint.local.overhang.io',
        'local.overhang.io',
    ],
  }
};