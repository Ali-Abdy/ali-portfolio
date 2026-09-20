import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  // Static Next.js hydration and next-themes require inline bootstrap scripts.
  // Do not add user-provided HTML; this is not a strict nonce-based XSS policy.
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "media-src 'none'",
  "worker-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Only the portrait needs optimization. Reject arbitrary local/remote URLs.
    localPatterns: [{ pathname: "/profile.webp", search: "" }],
    remotePatterns: [],
    deviceSizes: [480, 600, 800],
    imageSizes: [96, 112, 240, 300],
    qualities: [75],
    formats: ["image/webp"],
    maximumRedirects: 0,
    maximumResponseBody: 1_000_000,
    maximumDiskCacheSize: 25_000_000,
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), clipboard-write=(self)",
          },
          // Browsers apply HSTS only over HTTPS. Do not commit all subdomains
          // or preload a domain until its hosting and certificates are reviewed.
          ...(!isDevelopment
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
        ],
      },
    ];
  },
  async redirects() {
    return [{ source: "/", destination: "/de", permanent: true }];
  },
};
export default nextConfig;
