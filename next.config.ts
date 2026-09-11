import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /** §5.7.2: スロット幅に応じた AVIF / WebP を配信する（DECISION U-45）。素材は public/ の原寸 jpg / png のまま */
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
