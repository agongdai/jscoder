import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import bundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ]
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  productionBrowserSourceMaps: true,
  compress: true,
  experimental: {
    serverActions: {
      // edit: updated to new key. Was previously `allowedForwardedHosts`
      allowedOrigins: ['jscoder.io'],
    },
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

const config = withMDX(nextConfig);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(config);
