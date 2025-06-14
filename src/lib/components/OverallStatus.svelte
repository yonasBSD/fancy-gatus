<script lang="ts">
  import type { Status } from '$lib/types/api'

  let props: {
    failedStatuses: Status[]
  } = $props()

  let overallStatusText = $derived.by(() => {
    if (props.failedStatuses.length === 0) {
      return 'All services healthy.'
    } else if (props.failedStatuses.length === 2) {
      return 'Two services are experiencing issues.'
    } else if (props.failedStatuses.length === 3) {
      return 'Three services are experiencing issues.'
    } else if (props.failedStatuses.length > 3) {
      return 'Multiple services are experiencing issues.'
    } else {
      return 'One service is experiencing issues.'
    }
  })
</script>

<div class="card w-full mt-5 mb-10 bg-base-100 shadow-sm">
  <div class="card-body flex flex-row items-center">
    <div class="inline-grid *:[grid-area:1/1]">
      <div
        class={[
          'status',
          'status-lg',
          'animate-ping',
          props.failedStatuses.length === 0 ? 'status-success' : 'status-warning',
        ]}
      ></div>
      <div
        class={[
          'status',
          'status-lg',
          props.failedStatuses.length === 0 ? 'status-success' : 'status-warning',
        ]}
      ></div>
    </div>
    <p class="ml-2 text-lg">{overallStatusText}</p>
  </div>
</div>
