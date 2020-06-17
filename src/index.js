import mindbodyHttpClient from './mindbody-client/httpClient'
import addAuthorizationHeaders from './mindbody-client/authorization'
import buildIsUserActiveMember from './mindbody-client/isUserActiveMember'

const createSiteClient = async args => {
  const defaultClient = mindbodyHttpClient(args)
  const authorizedClient = await addAuthorizationHeaders(defaultClient, args)

  return {
    isUserActiveMember: buildIsUserActiveMember(authorizedClient)
  }
}

export default createSiteClient
