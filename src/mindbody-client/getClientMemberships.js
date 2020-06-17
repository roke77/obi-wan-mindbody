const ENDPOINT = 'client/activeclientmemberships'

const getClientMemberships = async ({ apiClient, clientId }) => {
  const queryConfig = {
    params: { ClientId: clientId }
  }
  const response = await apiClient.get(ENDPOINT, queryConfig)

  return response.data.ClientMemberships
}

export default getClientMemberships
