<script setup lang="ts">
import HomeBar from "@components/home-bar.vue";
import { onMounted, onBeforeUnmount, ref, watchEffect } from "vue";
import Card from "./card.vue";
import { languages, translate } from "@/languages";

function disableRefresh(event: KeyboardEvent) {
  if ((event.ctrlKey && event.key === 'r') || event.key === 'F5') {
    event.preventDefault();
  }
}

onMounted(async () => {
    document.title = title.value;
    document.addEventListener('keydown', disableRefresh);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', disableRefresh);
});

const title = ref(languages.technologies.title.en);
const os = ref(languages.technologies.content.os.en);
const ide = ref(languages.technologies.content.ide.en);
const language = ref(languages.technologies.content.programming_language.en);
const other = ref(languages.technologies.content.other.en);


const updateTitle = () => {
  title.value = translate(languages.technologies.title);
};

const updateOs = () => {
  os.value = translate(languages.technologies.content.os);
};

const updateIde = () => {
  ide.value = translate(languages.technologies.content.ide);
};

const updateLanguages = () => {
  language.value = translate(languages.technologies.content.programming_language);
};

const updateOther = () => {
    other.value = translate(languages.technologies.content.other);
};

watchEffect(() => {
  updateTitle();
  updateOs();
  updateIde();
  updateLanguages();
  updateOther();
});
</script>

<template>
    <div class="h-screen overflow-auto bg-base p-large text-text">
        <div class="grid grid-cols-12 w-full">
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-12">
                <HomeBar />
                <p class="text-2xl mt-6">{{ title }}</p>
                <p class="text-lg mt-4">{{ os }}</p>
                <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                    <Card class="wide" name="Windows" icon="windows.svg"/>
                    <Card class="wide" name="Android" icon="android.svg"/>
                </div>
                <p class="text-lg mt-4">{{ ide }}</p>
                <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                    <Card class="wide" name="Android Studio" icon="android-studio.svg"/>
                    <Card class="wide" name="IntelliJ Idea" icon="idea.svg"/>
                    <Card class="wide" name="VS Code" icon="vs-code.svg"/>
                    <Card class="wide" name="Unity" icon="unity.svg"/>
                    <Card class="wide" name="Visual Studio" icon="visual-studio.svg"/>
                </div>
                <p class="text-lg mt-4">{{ language }}</p>
                <div class="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                    <Card class="wide" name="Kotlin" icon="kotlin.svg"/>
                    <Card class="wide" name="Java" icon="java.svg"/>
                    <Card class="wide" name="C#" icon="c-sharp.svg"/>
                </div>
                <p class="text-lg mt-4">{{ other }}</p>
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
