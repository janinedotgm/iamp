/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'

    // Copy WASM files to the public directory
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('CopyWasmPlugin', () => {
          require('fs-extra').copySync('./pkg', './public/pkg')
        })
      }
    })

    return config
  },
}

module.exports = nextConfig 