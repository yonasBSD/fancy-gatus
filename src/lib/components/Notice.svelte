<script lang="ts">
  import type { Notice } from '$lib/types/config'

  let props: {
    notice: Notice
  } = $props()
</script>

<div
  class={[
    'alert',
    'w-full',
    'mb-10',
    'p-0',
    'shadow-sm',
    props.notice.type === undefined ? 'bg-base-100' : '',
    props.notice.type === 'success' ? 'alert-success' : '',
    props.notice.type === 'warning' ? 'alert-warning' : '',
    props.notice.type === 'error' ? 'alert-error' : '',
  ]}
>
  <div class="card-body">
    <h2 class="card-title">{props.notice.title}</h2>
    <p>{props.notice.content}</p>
    <div class="mt-2">
      <p><span class="font-bold">Created at:</span> {props.notice.createdAt}</p>
      {#if props.notice.updatedAt}
        <p><span class="font-bold">Last updated:</span> {props.notice.updatedAt}</p>
      {/if}
    </div>
  </div>
</div>
