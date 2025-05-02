// next.config.js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images:
  {
    domains:["dwrejzaczknpsnhwswid.supabase.co"]
  }
  
}

module.exports = nextConfig
