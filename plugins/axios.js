
export default function ({ $axios }, inject) {
  const api = $axios.create({
  })

  api.setBaseURL(process.env.API_URL || 'https://donasi-app.herokuapp.com/')

  inject('api', api)
}
