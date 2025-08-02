import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns:[
            {
                protocol:'https',
                hostname:'res.cloudinary.com'
            } 
        ]
  },
    experimental:{
        serverActions: {
            bodySizeLimit: '20mb' // Set desired value here
        }
    },
    typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
