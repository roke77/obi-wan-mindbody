const addAuthorizationHeaders = async (apiClient, { username, password }) => {
  const response = await apiClient.post('/usertoken/issue', {
    Username: username,
    Password: password
  })
  const { AccessToken } = response.data
  apiClient.defaults.headers.common['Authorization'] = AccessToken

  return apiClient
}

export default addAuthorizationHeaders
