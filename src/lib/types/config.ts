export type Announcement = {
  type: 'outage' | 'warning' | 'information' | 'operational' | 'none'
  message: string
  timestamp: string
}

export type GatusConfig = {
  oidc: boolean
  authenticated: boolean
  announcements: Announcement[]
}

export type FrontendConfig = {
  title?: string
  gatusBaseUrl?: string
  hiddenGroups?: string[]
  hiddenStatuses?: string[]
  groupOrder?: string[]
  defaultExpandGroups?: boolean
  defaultRefreshInterval?: 10 | 30 | 60 | 120 | 300 | 600
}
