import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
  // /works was the public path until the section was renamed; keep old links alive.
  async redirects() {
    return [
      { source: "/works", destination: "/projects", permanent: true },
      // `[^.]+` keeps this off the gallery images that still live under
      // /public/works/*.webp — without it the redirect swallows every asset.
      { source: "/works/:id([^.]+)", destination: "/projects/:id", permanent: true },
    ];
  },
};

export default nextConfig;
