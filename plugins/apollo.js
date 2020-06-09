import { onError } from 'apollo-link-error'

export default function ({ redirect }) {
  // https://stackoverflow.com/a/55452267/3086112
  const errorLink = onError(({ graphQLErrors }) => {
    graphQLErrors.forEach((err) => {
      // console.log('gql error', err)
      const ext = err.extensions
      if (ext && ext.exception && ext.exception.status) {
        if (ext.exception.status === 401) {
          // Mark as unauthenticataed
          localStorage.removeItem('authenticated')
          redirect('/login')
        }
      }
    })
  })
  return {
    link: errorLink,
    httpEndpoint: (process.env.API_URL || 'https://gql.bagidu.id') + '/graphql',
    httpLinkOptions: {
      credentials: 'omit'
    }
  }
}
