export type LoggedInUser = {
  id_token: string,
  email: string,
  full_name: string,
  id: string,
  initials: string,
}

export type Url = {
  id: string
  host: string
  token: string
  target: string
  permissions: []
}