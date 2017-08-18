# add-assets-webpack-plugin
Add arbitrary assets to a Webpack build


## Usage
``` js
new AddAssetsWebpackPlugin({
  filePath: "static/file.txt",
  content: 'Contents of the file'
})
```

## Options
`filePath`: The file name (and path), relative to the webpack output directory

`contents`: The desired contents of the file

## Multiple files
The constructor can take an object, or an array of objects:

``` js
new AddAssetsWebpackPlugin([
  {
    filePath: ".env",
    content: process.env.NODE_ENV
  },
  {
    filePath: "other.txt",
    content: 'eyy lmao'
  }
])
```
