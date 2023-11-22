<script setup lang="ts">
import HomeBar from "@components/home-bar.vue"
import { onMounted } from "vue";
import Card from "./card.vue";

onMounted(()=>{
    document.title = "Technologies";
});
</script>

<template>
    <div class="h-screen overflow-auto bg-base p-large text-text">
        <div class="grid grid-cols-12 w-full">
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-12">
                <HomeBar />
                <p class="text-2xl mt-6">Technologies</p>
                <p class="text-lg mt-4">OS</p>
                <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                    <Card class="wide" name="Windows" icon="windows.svg"/>
                    <Card class="wide" name="Android" icon="android.svg"/>
                </div>
                <p class="text-lg mt-4">IDEs / Game Engines / Editors</p>
                <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                    <Card class="wide" name="Android Studio" icon="android-studio.svg"/>
                    <Card class="wide" name="IntelliJ Idea" icon="idea.svg"/>
                    <Card class="wide" name="VS Code" icon="vs-code.svg"/>
                    <Card class="wide" name="Unity" icon="unity.svg"/>
                    <Card class="wide" name="Visual Studio" icon="visual-studio.svg"/>
                </div>
                <p class="text-lg mt-4">Languages</p>
                <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                    <Card class="wide" name="Kotlin" icon="kotlin.svg"/>
                    <Card class="wide" name="Java" icon="java.svg"/>
                    <Card class="wide" name="C#" icon="c-sharp.svg"/>
                </div>
                <p class="text-lg mt-4">Other</p>
                <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                    <Card class="wide" name="Jetpack Compose" icon="jetpack-compose.svg"/>
                    <Card class="wide" name="Firebase" icon="firebase.svg"/>
                    <Card class="wide" name="Gradle" icon="gradle.svg"/>
                    <Card class="wide" name="Git" icon="git.svg"/>
                    <Card class="wide" name="ARCore Unity" icon="ar.svg"/>
                </div>
            </div>
            <div class="xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
        </div>
    </div>
</template>