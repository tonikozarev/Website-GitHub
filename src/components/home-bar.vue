<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, watchEffect } from "vue";
import { languages, Languages } from "@/languages";

const router = useRouter();

onMounted(() => {
  document.title = title.value;
});

const title = ref((languages as Languages).home.title.en);

const updateTitle = () => {
  title.value =
    window.selectedLanguage === 'de' ? (languages as Languages).home.title.de : (languages as Languages).home.title.en;
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