<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  let {
    defaultRefreshInterval = 60,
    onRefresh,
  }: { defaultRefreshInterval?: number; onRefresh: () => void } = $props()

  let selectedInterval: number = $state(defaultRefreshInterval)
  let refreshHandler: ReturnType<typeof setInterval> | undefined = $state(undefined)

  function setRefreshInterval() {
    if (refreshHandler) clearInterval(refreshHandler)
    refreshHandler = setInterval(() => onRefresh(), selectedInterval * 1000)
  }

  function handleRefreshIntervalChange() {
    onRefresh()
    setRefreshInterval()
  }

  onMount(() => {
    setRefreshInterval()
  })

  onDestroy(() => {
    if (refreshHandler) clearInterval(refreshHandler)
  })
</script>

<div class="hidden xl:block fixed left-4 bottom-5 card bg-base-100 shadow-sm">
  <div class="card-body p-2 flex flex-row items-center">
    <i class="bi bi-arrow-clockwise"></i>
    <select
      class="select select-xs"
      bind:value={selectedInterval}
      onchange={handleRefreshIntervalChange}
    >
      <option value={10}>10s</option>
      <option value={30}>30s</option>
      <option value={60}>1m</option>
      <option value={120}>2m</option>
      <option value={300}>5m</option>
      <option value={600}>10m</option>
    </select>
  </div>
</div>
