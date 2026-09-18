import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow both localhost and 127.0.0.1 in `next dev` so client hydration /
  // HMR are not blocked when the browser opens either host.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Keep SSG from opening more Prisma connections than a small MySQL pool allows
  // (Aiven / free-tier often ~few connections; Vercel build is 2 cores).
  experimental: {
    staticGenerationMaxConcurrency: 1,
    staticGenerationRetryCount: 3,
    staticGenerationMinPagesPerWorker: 50,
  },
};

export default nextConfig;
