/** @type {import('next').NextConfig} **/
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}

const fullConfig = {
  ...nextConfig,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    if (isServer) {
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
      })
    }
    return config
  },
}

export default fullConfig
