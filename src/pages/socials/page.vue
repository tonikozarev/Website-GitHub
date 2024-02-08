<script setup lang="ts">
import Icon from "@/components/icon.vue";
import HomeBar from "@/components/home-bar.vue";
import { onMounted, onBeforeUnmount, ref, watchEffect } from "vue";
import { openLink } from "@/main-viewmodel";
import { languages, Languages } from "@/languages";

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

const title = ref((languages as Languages).socials.title.en);
const email = ref((languages as Languages).socials.content.email.en);

const updateTitle = () => {
  title.value =
    window.selectedLanguage === 'de' ? (languages as Languages).socials.title.de : (languages as Languages).socials.title.en;
};

const updateEmail = () => {
  email.value =
    window.selectedLanguage === 'de' ? (languages as Languages).socials.content.email.de : (languages as Languages).socials.content.email.en;
};

function copy(text: string) {
    navigator.clipboard.writeText(text);
    alert(`Email: "${text}" copied! `);
}

watchEffect(() => {
  updateTitle();
  updateEmail();
});
</script>

<template>
    <div class="h-screen overflow-auto bg-base p-large text-text">
        <div class="grid grid-cols-12 w-full">
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-12 min-h-0">
                <HomeBar />
                <p class="text-3xl mt-8">{{ title }}</p>
                    <p class="mt-4 text-2xl">{{ email }}</p>
                <div class="contactsCard flex items-center mt-1">
                    <p class="flex-grow ellipsisText min-w-0">toni.kozarev.tech@gmail.com</p>
                    <button class="ml-4 bg-mantle hover:opacity-95 p-2 rounded-[5px]"
                        @click="copy('toni.kozarev.tech@gmail.com')">
                        <Icon name="copy" class="h-6 w-6" />
                    </button>
                </div>
                <p class="mt-4 text-2xl"></p>
                <button class="contactsCard hover:bg-mantle w-full" @click="openLink('https://github.com/tonikozarev')">
                    <div class="flex items-center">
                        <Icon name="github" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">GitHub</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-1" @click="openLink('https://www.linkedin.com/in/tonikozarev/')">
                    <div class="flex items-center">
                        <Icon name="linkedin" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">Linkedin</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-1" @click="openLink('https://www.xing.com/profile/Toni_Kozarev/')">
                    <div class="flex items-center">
                        <Icon name="xing" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">XING</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-1" @click="openLink('https://twitter.com/tonykozarev')">
                    <div class="flex items-center">
                        <Icon name="twitter" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">Twitter</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-1" @click="openLink('https://discord.com/users/439067023893594123')">
                    <div class="flex items-center">
                        <Icon name="discord" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">Discord</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
            </div>
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
        </div>
    </div>
</template>