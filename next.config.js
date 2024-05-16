/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lqkcetrqfmsvcgxakfqv.supabase.co',
            port: '',
            pathname: '/**/**',
          },
        ],
      },
};

module.exports = nextConfig;
