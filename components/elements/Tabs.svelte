<script lang="ts">
  import { onMount } from 'svelte'

  export let tabs: any

  let selectedTabIndex = 0
  let htmlTabs: any

  onMount(async () => {
    htmlTabs = document.querySelectorAll('.tabs>*:nth-child(n)')
    hideTabs(selectedTabIndex)
  })

  function showTab(selectedTabIndex: number) {
    if (htmlTabs[selectedTabIndex] !== null)
      htmlTabs[selectedTabIndex].style.display = 'grid'
  }

  function hideTabs(selectedTabIndex: number) {
    tabs.map((tab: any, index: number) => {
      if (index !== selectedTabIndex && htmlTabs[index] !== null)
        htmlTabs[index].style.display = 'none'
    })
  }

  function onClick(index: any) {
    selectedTabIndex = index
    showTab(selectedTabIndex)
    hideTabs(selectedTabIndex)
  }
</script>

<div class="gap-size5 flex w-full flex-col">
  <div>
    {#each tabs as tab, index}
      <button
        on:click={() => onClick(index)}
        class={`${
          selectedTabIndex === index ? 'button-primary' : 'button-secondary'
        }`}
      >
        {tab.title}
      </button>
    {/each}
  </div>
  <div class="tabs">
    <slot />
  </div>
</div>
