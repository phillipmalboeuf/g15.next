/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['fr-CA', 'en-CA'],
    defaultLocale: 'fr-CA',
    localeDetection: false,
  }
}

module.exports = nextConfig
