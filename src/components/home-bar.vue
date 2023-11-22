<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <button class="flex items-center home-bar" @click="router.push('/')">
        <img src="@images/logo.png" class="h-8 w-8 rounded-full mr-2">
        <div class="text-lg">Home</div>
    </button>
</template>

<style>
.home-bar:hover{
    text-decoration: underline;
}
</style>