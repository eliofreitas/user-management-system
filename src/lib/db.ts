export type GenericJson = Record<string, unknown>

export interface MockUser extends GenericJson {
  email: string
  password: string
}
