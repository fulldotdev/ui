<script setup lang="ts">
import Button from 'fulldev-ui/components/ui/button/Button.vue'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'fulldev-ui/components/ui/command'
import { SearchIcon } from 'lucide-vue-next'
import { ref } from 'vue'

interface Props {
  groups?: {
    heading?: string
    links?: {
      text?: string
      href?: string
    }[]
  }[]
}

const { groups } = defineProps<Props>()

const open = ref(false)

function handleOpenChange() {
  open.value = !open.value
}
</script>

<template>
  <Button
    @click="handleOpenChange"
    size="sm"
    class="gap-8"
    variant="outline"
  >
    Zoeken...
    <SearchIcon />
  </Button>
  <CommandDialog v-model:open="open">
    <CommandInput placeholder="Typ om te zoeken..." />
    <CommandList>
      <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
      <CommandGroup
        v-for="group in groups"
        :key="group.heading"
        :heading="group.heading"
      >
        <CommandItem
          v-for="item in group.links"
          :key="item.text"
          :value="item.text ?? ''"
          as-child
        >
          <a :href="item.href">
            {{ item.text }}
          </a>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
