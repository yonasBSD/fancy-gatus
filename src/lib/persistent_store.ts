import { writable } from 'svelte/store'

interface PersistedSettings {
  darkmode: boolean
}

const settingsDefault: PersistedSettings = {
  darkmode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
}

export const persistentSettings = writable<PersistedSettings>(
  JSON.parse(localStorage.getItem('persistentSettings') || JSON.stringify(settingsDefault))
)

persistentSettings.subscribe((value) => (localStorage.persistentSettings = JSON.stringify(value)))
