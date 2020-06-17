const ENDPOINT = 'client/activeclientmemberships'

const getClientMemberships = async ({ mbClient, clientId }) => {
  const queryConfig = {
    params: { ClientId: clientId }
  }
  const response = await mbClient.get(ENDPOINT, queryConfig)

  return response.data.ClientMemberships
}

export default getClientMemberships
