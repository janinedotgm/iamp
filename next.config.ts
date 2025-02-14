import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  webpack(config, { isServer, dev, webpack }) {
    config.output.webassemblyModuleFilename =
    isServer && !dev
        ? '../static/pkg/[modulehash].wasm'
        : 'static/pkg/[modulehash].wasm'

// Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
config.experiments = { ...config.experiments, asyncWebAssembly: true }

// Disable webpack cache in production to prevent the pack error
if (process.env.NODE_ENV === 'production') {
  config.cache = false
}

// Deubbing (vercel/next.js/issues/27650)
config.infrastructureLogging = { debug: /PackFileCache/ }

return config
  },
};

export default nextConfig;
