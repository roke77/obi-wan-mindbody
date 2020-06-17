import axios from 'axios'

const mindbodyHttpClient = ({ key, siteId }) =>
  axios.create({
    baseURL: 'https://api.mindbodyonline.com/public/v6/',
    headers: {
      'Api-Key': key,
      SiteId: siteId,
      'Content-Type': 'application/json'
    },
    timeout: 0,
    maxContentLength: 4000000 // 4 MB
  })

export default mindbodyHttpClient
