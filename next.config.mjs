/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // If deploying to https://<user>.github.io/<repo-name>/ (not a custom domain),
  // uncomment and set the repo name:
  // basePath: '/InterceptSuite-Doc',
  // assetPrefix: '/InterceptSuite-Doc/',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
