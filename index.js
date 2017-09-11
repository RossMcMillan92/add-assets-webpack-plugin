function AddAssetsWebpackPlugin(options) {
  this.options = options;
}

AddAssetsWebpackPlugin.prototype.apply = function(compiler) {
  const assetsToAdd = Array.isArray(this.options)
    ? this.options
    : [this.options];

  compiler.plugin("emit", function(compilation, callback) {
    assetsToAdd.forEach(assetToAdd => {
      const hasFilePath = assetToAdd.filePath != null;
      const hasContent = assetToAdd.content != null;
      if (!hasFilePath || !hasContent) {
        const optionNeeded = !hasContent ? "content" : "filePath";
        const message = `AddAssetsWebpackPlugin Error: The '${optionNeeded}' option must be passed`;
        return console.error("\n\n\x1b[41m", message, "\x1b[0m", "\n");
      }

      compilation.assets[assetToAdd.filePath] = {
        source: () => new Buffer(assetToAdd.content),
        size: () => Buffer.byteLength(assetToAdd.content)
      };
    });

    callback();
  });
};

module.exports = AddAssetsWebpackPlugin;
