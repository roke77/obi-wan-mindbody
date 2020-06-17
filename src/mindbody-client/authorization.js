const addAuthorizationHeaders = async (axios, { username, password }) => {
  const response = await axios.post('/usertoken/issue', {
    Username: username,
    Password: password
  })
  const { AccessToken } = response.data
  axios.defaults.headers.common['Authorization'] = AccessToken

  return axios
}

export default addAuthorizationHeaders
