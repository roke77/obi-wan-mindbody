import mindbodyHttpClient from './httpClient'
import addAuthorizationHeaders from './authorization'

const createSiteClient = async args => {
  const defaultClient = mindbodyHttpClient(args)

  return addAuthorizationHeaders(defaultClient, args)
}

export default createSiteClient
