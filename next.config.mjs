/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // images: {
    //     domains: ['cdn.myanimelist.net', 'myanimelist.net'],
    //   },
  
    // This is used for Images addition
    images: {
      remotePatterns: [
        {
          hostname: 'cdn.myanimelist.net'
        },
        {
          hostname: 'myanimelist.net'
        },
        {
          hostname: 'raw.githubusercontent.com'
        }
      ],
    },
  };
  
  export default nextConfig;
  