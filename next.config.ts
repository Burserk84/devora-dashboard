import withNextIntl from "next-intl/plugin";

const withIntl = withNextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // You can add other Next.js configurations here if needed.
};

export default withIntl(nextConfig);
