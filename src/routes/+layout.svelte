<script>
  import { persistentSettings } from '$lib/persistent_store'
  let { children } = $props()
  import '../app.css'
</script>

<div
  class="h-fit min-h-screen flex flex-col items-center bg-base-200"
  data-theme={$persistentSettings.darkmode ? 'darkgray' : 'emerald'}
>
  <div class="md:w-5/6 xl:w-3/5 max-w-5xl h-full pl-4 md:pl-0 pr-4 md:pr-0 pt-5 pb-5">
    {@render children()}
  </div>
</div>
