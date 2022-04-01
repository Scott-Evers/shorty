export type LoggedInUserType = {
  id_token: string,
  email: string,
  full_name: string,
  id: string,
  initials: string,
}

export type UrlType = {
  id: string
  host: string
  token: string
  target: string
  permissions: []
}

export enum AlertSeverityLevelsEnum {
  Info,
  Warn,
  Error,
}

export enum AlertModesEnum {
  Pending,
  Final,
}

export type AlertType = {
  message: string,
  mode: AlertModesEnum
  severity: AlertSeverityLevelsEnum
}

