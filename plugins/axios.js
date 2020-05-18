
export default function ({ $axios }, inject) {
  const api = $axios.create({
  })

  api.setBaseURL(process.env.API_URL || 'https://api.bagidu.id')

  inject('api', api)
}
