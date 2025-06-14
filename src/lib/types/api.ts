export type Result = {
  status?: number
  hostname?: string
  duration: number
  conditionResults: {
    condition: string
    success: boolean
  }[]
  success: boolean
  timestamp: string
}

export type Status = {
  name: string
  group?: string
  key: string
  results: Result[]
}
