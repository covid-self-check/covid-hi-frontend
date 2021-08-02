module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    firebaseApiKey: process.env.FIREBASE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    liffID: process.env.DEVELOPMENT_LIFF_ENV
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/register',
        permanent: true,
      },
    ]
  },
}
