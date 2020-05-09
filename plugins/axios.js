
export default function ({ $axios }, inject) {
  const api = $axios.create({
  })

  api.setBaseURL(process.env.API_URL || 'http://localhost:3333')

  inject('api', api)
}
