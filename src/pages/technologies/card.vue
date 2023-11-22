<script setup lang="ts">
import {getIconUrl} from "@/main-viewmodel"


defineProps({
    name:{
        required: true,
        type: String
    },
    icon:{
        required: true,
        type: String
    },
    strokeIcon:{
        required: false,
        type: Boolean
    }
});
</script>
<template>
    <div class="card flex flex-col justify-center items-center">
        <img :src="getIconUrl(icon)" class="h-[65px] w-[65px] aspect-square object-contain">
        <div class="mt-4">{{ name }}</div>
    </div>
</template>