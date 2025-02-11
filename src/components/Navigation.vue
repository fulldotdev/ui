<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from 'fulldev-ui/components/ui/navigation-menu'
import { ref, type HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  items?: {
    text?: string
    href?: string
    links?: { text?: string; href?: string }[]
  }[]
}

const { items, class: className } = defineProps<Props>()

const offset = ref()

const handleUpdate = (value: string) => {
  // If value is falsy (emptry string when closing), set offset to undefined to prevent initial transition
  if (!value) offset.value = undefined
  // FIXME: may not be working with multiple Navigations on the page.
  const trigger = document.querySelector(`#radix-navigation-menu-v0-0-trigger-${value}`)
  if (trigger instanceof HTMLElement) {
    const triggerOffset = trigger.offsetLeft
    offset.value = triggerOffset
  }
}
</script>

<template>
  <NavigationMenu
    @update:model-value="handleUpdate"
    :class="className"
  >
    <NavigationMenuList class="gap-0">
      <NavigationMenuItem
        v-for="item in items"
        :key="item.text"
      >
        <NavigationMenuTrigger
          v-if="item.links"
          class="px-3 py-0 h-9"
        >
          <NavigationMenuLink
            v-if="item.href"
            :href="item.href"
            class="text-muted-foreground hover:text-foreground transition-colors font-normal"
          >
            {{ item.text }}
          </NavigationMenuLink>
          <span v-else>{{ item.text }}</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent v-if="item.links">
          <ul class="w-full min-w-48 gap-3 p-6 flex flex-col">
            <li v-for="link in item.links">
              <NavigationMenuLink
                :href="link.href"
                class="text-muted-foreground hover:text-foreground transition-colors font-normal"
              >
                {{ link.text }}
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
        <NavigationMenuLink
          v-else
          :href="item.href"
          :class="[navigationMenuTriggerStyle(), 'px-3 py-0 h-9']"
          class="text-muted-foreground hover:text-foreground transition-colors font-normal"
        >
          {{ item.text }}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuViewport
      :style="{
        // Avoid transitioning from initial position when first opening
        display: offset === undefined ? 'none' : undefined,
        transform: `translateX(${offset}px)`,
        transition: 'transform 0.15s',
      }"
    />
  </NavigationMenu>
</template>
