<script setup lang="ts">
import { CircleChevronRight, CircleChevronLeft } from "lucide-vue-next";
</script>

<template>
  <main class="grid grid-cols-1 lg:grid-cols-2 m-[10px]">
    <section
      class="bg-light-bg h-[calc(100vh-20px)] lg:mr-[5px] border border-stroke-color rounded-[10px] flex flex-col"
    >
      <ContentDoc v-slot="{ doc }" class="flex-grow">
        <div class="flex-grow m-[10px] overflow-auto">
          <ContentRenderer :value="doc" />
        </div>
        <div buttons class="flex justify-between m-[10px] mt-auto">
          <a
            :href="doc && doc.previousPath ? `/${doc.previousPath}` : null"
            :class="{
              'pointer-events-none text-gray-400': !doc || !doc.previousPath,
            }"
            class="flex items-center"
          >
            <CircleChevronLeft :size="30" />
          </a>

          <a
            :href="doc && doc.nextPath ? `/${doc.nextPath}` : null"
            :class="{
              'pointer-events-none text-gray-400': !doc || !doc.nextPath,
            }"
            class="flex items-center"
          >
            <CircleChevronRight :size="30" />
          </a>
        </div>
      </ContentDoc>
    </section>
    <section
      class="bg-light-bg h-[calc(100vh-20px)] lg:ml-[5px] p-[10px] border border-stroke-color rounded-[10px]"
    >
      EDITOR VA AQUI
    </section>
  </main>
</template>

