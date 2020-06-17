const ENDPOINT = 'client/clients'

const getClientsByEmail = async ({ mbClient, email }) => {
  const queryConfig = {
    params: { SearchText: email }
  }
  const response = await mbClient.get(ENDPOINT, queryConfig)

  return response.data.Clients
}

export default getClientsByEmail
