export default function (context) {
  console.log('plugin context', process.env.API_URL)
  return {
    httpEndpoint: (process.env.API_URL || 'https://api.bagidu.id') + '/graphql',
    httpLinkOptions: {
      credentials: 'omit'
    }
  }
}
