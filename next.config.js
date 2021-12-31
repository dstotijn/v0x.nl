const { withPlausibleProxy } = require('next-plausible')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
}

module.exports = withPlausibleProxy({
    scriptName: "plausible",
})(nextConfig)
