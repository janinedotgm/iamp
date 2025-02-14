/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'

    // Only try to copy WASM files if the pkg directory exists
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('CopyWasmPlugin', () => {
          const fs = require('fs-extra')
          if (fs.existsSync('./pkg')) {
            fs.copySync('./pkg', './public/pkg')
          }
        })
      }
    })

    return config
  },
}

module.exports = nextConfig 