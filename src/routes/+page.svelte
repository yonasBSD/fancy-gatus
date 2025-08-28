<script lang="ts">
  import axios from 'axios'
  import type { AxiosError } from 'axios'
  import { onMount } from 'svelte'
  import type { FrontendConfig, GatusConfig } from '$lib/types/config'
  import type { Status } from '$lib/types/api'
  import Loader from '$lib/components/Loader.svelte'
  import Header from '$lib/components/Header.svelte'
  import Announcements from '$lib/components/Announcements.svelte'
  import OverallStatus from '$lib/components/OverallStatus.svelte'
  import EndpointGroup from '$lib/components/StatusGroup.svelte'
  import RefreshSettings from '$lib/components/RefreshSettings.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { SvelteMap } from 'svelte/reactivity'

  let loading = $state(true)
  let frontendConfig: FrontendConfig = $state({})
  let statuses: Status[] = $state([])
  let gatusConfig: GatusConfig = $state({ oidc: false, authenticated: false, announcements: [] })

  async function getFrontendConfig() {
    try {
      const response = await axios.get('config.json', { baseURL: '/' })

      frontendConfig = response.data
      // Set title if defined in config
      if (frontendConfig.title) {
        document.title = frontendConfig.title
      }
    } catch (err) {
      const error = err as AxiosError
      if (error.response && error.response.status === 404) {
        console.warn('No config.json file found. Using default values.')
      }
      console.log('Error getting config: ' + error)
    }
  }

  async function getApiData() {
    // Set base URL for API calls if defined in config
    if (frontendConfig.gatusBaseUrl && axios.defaults.baseURL !== frontendConfig.gatusBaseUrl) {
      axios.defaults.baseURL = frontendConfig.gatusBaseUrl
    }

    try {
      const statusesResponse = await axios.get('/api/v1/endpoints/statuses')
      statuses = statusesResponse.data

      const gatusConfigResponse = await axios.get('/api/v1/config')
      gatusConfig = gatusConfigResponse.data

      loading = false
    } catch (error) {
      console.log(error)
    }
  }

  async function refresh() {
    await getApiData()
  }

  async function startup() {
    await getFrontendConfig()
    await refresh()
  }

  // Group statuses by their group name
  // and sort them according to the config if specified
  let groups: { title: string; statuses: Status[] }[] = $derived.by(() => {
    // Group statuses by group name
    let groups: SvelteMap<string, Status[]> = new SvelteMap<string, Status[]>()
    statuses.map((status) => {
      // Filter statuses that should be hidden
      if (frontendConfig.hiddenStatuses?.includes(status.name)) return
      if (!status.group) {
        status.group = 'Ungrouped'
      }
      // Filter groups that should be hidden
      if (frontendConfig.hiddenGroups?.includes(status.group)) return
      let groupStatuses = groups.get(status.group) || []
      groupStatuses.push(status)
      groups.set(status.group, groupStatuses)
    })

    // Sort by config
    let tmp = groups
    let sortedGroups: { title: string; statuses: Status[] }[] = []
    if (frontendConfig.groupOrder) {
      frontendConfig.groupOrder.forEach((key) => {
        if (tmp.has(key)) {
          sortedGroups.push({ title: key, statuses: tmp.get(key)! })
          tmp.delete(key)
        }
      })
    }

    // Sort remaining group alphabetically
    let sortedKeys = [...tmp.keys()].sort((a, b) => a.localeCompare(b))
    sortedKeys.map((key) => {
      let statuses = tmp.get(key)!
      sortedGroups.push({ title: key, statuses })
    })
    return sortedGroups
  })

  // Array of statuses where the last result has success = false
  let failedStatuses = $derived.by(() => {
    const filteredStatuses = groups.flatMap((item) => item.statuses)
    return filteredStatuses.filter((status) => {
      return !status.results[status.results.length - 1].success
    })
  })

  onMount(() => {
    startup()
  })
</script>

{#if loading}
  <Loader />
{:else}
  <Header title={frontendConfig.title} />
  {#if gatusConfig.announcements.length > 0}
    <Announcements announcements={gatusConfig.announcements} />
  {/if}
  <OverallStatus {failedStatuses} />
  {#each groups as group (group.title)}
    <EndpointGroup
      title={group.title}
      statuses={group.statuses}
      expandByDefault={frontendConfig.defaultExpandGroups}
    />
  {/each}
  <RefreshSettings
    defaultRefreshInterval={frontendConfig.defaultRefreshInterval}
    onRefresh={refresh}
  />
  <Footer />
{/if}
