import getClientMemberships from './getClientMemberships'
import getClientsByEmail from './getClientsByEmail'

const isUserActiveMember = async (apiClient, email) => {
  const clients = await getClientsByEmail({ apiClient, email })

  const client = clients.find(
    ({ Email, Status }) => Email === email && Status === 'Active'
  )

  if (!client) return false

  const clientMemberships = await getClientMemberships({
    apiClient,
    clientId: client.Id
  })

  const activeMemberships = clientMemberships.filter(
    ({ IconCode, Current }) => IconCode === '1' && Current
  )

  return activeMemberships.length > 0
}

export default isUserActiveMember
