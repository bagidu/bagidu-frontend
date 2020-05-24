
export default function ({ $axios, redirect }, inject) {
  const api = $axios.create({
  })

  api.setBaseURL(process.env.API_URL || 'https://api.bagidu.id')

  api.onResponseError((error) => {
    if (error.response.status === 401) {
      redirect('/login')
    }
  })

  inject('api', api)
}
