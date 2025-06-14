<script lang="ts">
  import { persistentSettings } from '$lib/persistent_store'

  let { title = 'Infrastructure Status' } = $props()
</script>

<div class="mb-10 flex items-center justify-center md:justify-start">
  <img src="/img/logo.png" alt="Logo" class="w-14 md:w-16 h-auto" />
  <h2 class="ml-4 text-xl md:text-2xl font-semibold">{title}</h2>
  <span class="hidden md:block grow"></span>
  <label class="invisible md:visible md:text-3xl swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" bind:checked={$persistentSettings.darkmode} />

    <!-- sun icon -->
    <i class="bi bi-sun swap-off"></i>

    <!-- moon icon -->
    <i class="bi bi-moon swap-on"></i>
  </label>
</div>
