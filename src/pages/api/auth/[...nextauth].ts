import { NextApiRequest, NextApiResponse } from 'next'

export function getUsers(request: NextApiRequest, response: NextApiResponse) {
  const users = [
    { id: 1, name: 'caleb' }
  ]
  return response.json(users)
}
