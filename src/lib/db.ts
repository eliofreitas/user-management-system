export type GenericJson = Record<string, unknown>

export interface MockUserCredentials extends GenericJson {
  email: string
  password?: string
}

export interface MockUser extends GenericJson {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface ServerResponse extends GenericJson {
  response: {
    data: MockUser[]
    page: number
    per_page: number
    support: {
      url: string
      text: string
    }
    total: number
    total_pages: number
  }
}
