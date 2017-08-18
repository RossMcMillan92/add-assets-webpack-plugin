module.exports = function AddAssetsWebpackPlugin (options) {
  return {
    apply: (compiler) => {
      const assetsToAdd = Array.isArray(options)
        ? options
        : [options]

      compiler.plugin('emit', function(compilation, callback) {
        assetsToAdd
          .forEach(assetToAdd => {
            const hasFilePath = assetToAdd.filePath != null
            const hasContent = assetToAdd.content != null
            if (!hasFilePath || !hasContent) {
              const optionNeeded = !hasContent
                ? 'content'
                : 'filePath'
              const message = `AddAssetsWebpackPlugin Error: The '${optionNeeded}' option must be passed`
              return console.error("\n\n\x1b[41m", message, "\x1b[0m", "\n")
            }

            compilation.assets[assetToAdd.filePath] = {
              source: () => new Buffer(assetToAdd.content),
              size: () => Buffer.byteLength(assetToAdd.content),
            }
          })

        callback()
      })
    }
  }
}
