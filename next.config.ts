import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep SSG from opening more Prisma connections than a small MySQL pool allows
  // (Aiven / free-tier often ~few connections; Vercel build is 2 cores).
  experimental: {
    staticGenerationMaxConcurrency: 1,
    staticGenerationRetryCount: 3,
    staticGenerationMinPagesPerWorker: 50,
  },
};

export default nextConfig;
