import { MockUser } from '@/lib/db'
const API = 'https://reqres.in/api/login'

const loginUser = async (values: Partial<MockUser>): Promise<{ token: string }> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...values })
  }
  const response = await fetch(API, requestOptions)
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Something went wrong!')
  return data
}

export default loginUser
