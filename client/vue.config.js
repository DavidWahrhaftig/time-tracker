const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            sass: { 
                prependData: `@import "./sass/main.scss";`,
            },
        },
    },
    // when we build the vue app, it will build to the server folder
    outputDir: path.resolve(__dirname, '../server/public')
    
  };