import getClientMemberships from './getClientMemberships'
import getClientsByEmail from './getClientsByEmail'

const buildIsUserActiveMember = mbClient => async email => {
  const clients = await getClientsByEmail({ mbClient, email })

  const client = clients.find(
    ({ Email, Status }) => Email === email && Status === 'Active'
  )

  if (!client) return false

  const clientMemberships = await getClientMemberships({
    mbClient,
    clientId: client.Id
  })

  const activeMemberships = clientMemberships.filter(
    ({ IconCode, Current }) => IconCode === '1' && Current
  )

  return activeMemberships.length > 0
}

export default buildIsUserActiveMember
