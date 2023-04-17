import { MockUserCredentials } from '@/lib/db'

const loginUser = async (
  values: Partial<MockUserCredentials>,
  url: string
): Promise<{ token: string }> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...values })
  }
  const response = await fetch(url, requestOptions)
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Something went wrong!')
  return data
}

export default loginUser
