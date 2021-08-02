module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    firebaseApiKey: process.env.FIREBASE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
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
