<script setup lang="ts">
import { getApiBaseUrl } from "@/lib/content-api";
import { onMounted } from "vue";

onMounted(() => {
    window.location.replace(`${getApiBaseUrl()}/admin`);
});
</script>

<template>
    <main class="admin-redirect">
        <p>Opening certificate admin...</p>
    </main>
</template>

<style scoped>
.admin-redirect {
    min-height: 60vh;
    display: grid;
    place-items: center;
    color: #cad3f5;
    font-weight: 700;
}
</style>
