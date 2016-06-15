var projectWebpackConfig = require('../build-conf/webpack-structor.config');

module.exports = function (options) {
    return Object.assign({}, projectWebpackConfig, {
        entry: [
            options.deskEntryPoint,
            options.deskEntryPointFilePath
        ],
        output: {
            path: options.deskEntryPointOutputPath,
            filename: options.deskEntryPointOutputFileName,
            publicPath: options.deskEntryPointOutputPublicPath
        },
        resolve: {
            root: [options.nodeModulesDirPath, options.serverNodeModulesDirPath]
        }
            
        
    });
};
