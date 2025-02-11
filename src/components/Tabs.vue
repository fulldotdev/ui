<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'fulldev-ui/components/ui/tabs'
</script>

<template>
  <Tabs
    default-value="account"
    class="w-[400px]"
  >
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="account"> Account </TabsTrigger>
      <TabsTrigger value="password"> Password </TabsTrigger>
    </TabsList>
    <TabsContent value="account"> Account </TabsContent>
    <TabsContent value="password"> Password </TabsContent>
  </Tabs>
</template>
