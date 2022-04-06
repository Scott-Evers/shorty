export interface UrlType{
  id: string,
  host: string,
  token: string,
  target: string,
  permissions: Array<Permission>
} 

export enum Principal_Types {
  User,
  Group,
  Organization,
}
export enum Operation_Types {
  View,
  Edit
}
export interface Permission {
  type: Principal_Types,
  id: string,
  operation: Operation_Types,
}

export type PrincipalType = {
  id: string,
  name: string,
  type: Principal_Types
  memberships: any
}