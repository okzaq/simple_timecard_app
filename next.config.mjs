/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_ACTIONS && '/simple_timecard_app';
const nextConfig = {
    basePath: repoName,
    output: 'export',
    reactStrictMode: true,
};

export default nextConfig;
