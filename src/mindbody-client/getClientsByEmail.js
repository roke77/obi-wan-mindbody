const ENDPOINT = 'client/clients'

const getClientsByEmail = async ({ apiClient, email }) => {
  const queryConfig = {
    params: { SearchText: email }
  }
  const response = await apiClient.get(ENDPOINT, queryConfig)

  return response.data.Clients
}

export default getClientsByEmail
