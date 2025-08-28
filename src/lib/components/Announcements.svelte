<script lang="ts">
  import type { Announcement } from '$lib/types/config'
  import { SvelteMap } from 'svelte/reactivity'

  let props: {
    announcements: Announcement[]
  } = $props()

  const days: SvelteMap<string, Announcement[]> = $derived.by(() => {
    const days = new SvelteMap<string, Announcement[]>()
    props.announcements.forEach((announcement) => {
      const date = new Date(announcement.timestamp).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      if (!days.get(date)) {
        days.set(date, [])
      }
      days.get(date)!.push(announcement)
    })
    return days
  })
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div tabindex="0" class="collapse collapse-plus mb-10 bg-base-100 border-base-300 border">
  <input type="checkbox" checked={true} />
  <div class="collapse-title text-lg flex flex-column">
    <i class="bi bi-megaphone-fill"></i>
    <p class="ml-3 font-semibold">Announcements</p>
  </div>
  <div class="collapse-content flex flex-col">
    {#each days as [day, announcements] (day)}
      <div class="card">
        <div class="card-body p-2">
          <div class="badge badge-lg badge-neutral">{day}</div>
          {#each announcements as announcement (announcement.message)}
            <div class="chat chat-start py-0">
              <div class="chat-image avatar flex justify-center items-center">
                <div class="w-10 rounded-full text-3xl">
                  <div class="h-full flex justify-center items-center">
                    <i
                      class={[
                        'bi',
                        announcement.type === 'outage' ? 'bi-x-circle-fill' : '',
                        announcement.type === 'warning' ? 'bi-exclamation-triangle-fill' : '',
                        announcement.type === 'information' ? 'bi-info-circle-fill' : '',
                        announcement.type === 'operational' ? 'bi-check-circle-fill' : '',
                        announcement.type === 'none' ? 'bi-info-circle-fill' : '',
                      ]}
                    ></i>
                  </div>
                </div>
              </div>
              <div
                class={[
                  'chat-bubble',
                  announcement.type === 'outage' ? 'chat-bubble-error' : '',
                  announcement.type === 'warning' ? 'chat-bubble-warning' : '',
                  announcement.type === 'information' ? 'chat-bubble-info' : '',
                  announcement.type === 'operational' ? 'chat-bubble-success' : '',
                  announcement.type === 'none' ? 'chat-bubble-neutral' : '',
                ]}
              >
                {announcement.message}
              </div>
              <div class="chat-footer opacity-50">
                Published at {new Date(announcement.timestamp).toLocaleTimeString()}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
