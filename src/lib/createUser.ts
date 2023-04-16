import { MockUser } from '@/lib/db'
const DEFAULT_API = '/api/auth/signup'
const useCreateUser = async (values: Partial<MockUser>, url?: string): Promise<void> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...values })
  }
  const response = await fetch(url || DEFAULT_API, requestOptions)
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Something went wrong!')
  return data
}

export default useCreateUser
