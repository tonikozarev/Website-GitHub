<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, watchEffect } from "vue";
import { languages, translate } from "@/languages";

const router = useRouter();

onMounted(() => {
  document.title = title.value;
});

const title = ref(languages.home.title.en);

const updateTitle = () => {
  title.value = translate(languages.home.title);
};

watchEffect(() => {
  updateTitle();
});
</script>

<template>
    <button class="flex items-center home-bar" @click="router.push('/')">
        <img src="@images/logo.png" class="h-8 w-8 rounded-full mr-2">
        <div class="text-lg">{{ title }}</div>
    </button>
</template>

<style>
.home-bar:hover{
    text-decoration: underline;
}
</style>
