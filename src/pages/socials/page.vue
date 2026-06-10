<script setup lang="ts">
import Icon from "@/components/icon.vue";
import HomeBar from "@/components/home-bar.vue";
import { onMounted, onBeforeUnmount, ref, watchEffect } from "vue";
import { openLink } from "@/main-viewmodel";
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

const title = ref(languages.socials.title.en);
const contactEmail = ref("toni.kozarev.96@gmail.com");
const copyToastVisible = ref(false);
let copyToastTimeout: ReturnType<typeof setTimeout> | null = null;

const updateTitle = () => {
  title.value = translate(languages.socials.title);
};

function copy(text: string) {
    navigator.clipboard.writeText(text);

    if (copyToastVisible.value) {
      return;
    }

    copyToastVisible.value = true;

    if (copyToastTimeout) {
      clearTimeout(copyToastTimeout);
    }

    copyToastTimeout = setTimeout(() => {
      copyToastVisible.value = false;
      copyToastTimeout = null;
    }, 1700);
}

watchEffect(() => {
  updateTitle();
});

onBeforeUnmount(() => {
  if (copyToastTimeout) {
    clearTimeout(copyToastTimeout);
  }
});
</script>

<template>
    <div class="h-screen overflow-auto bg-base p-large text-text">
        <div class="grid grid-cols-12 w-full">
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-12 min-h-0">
                <HomeBar />
                <p class="text-3xl mt-8">{{ title }}</p>
                <div class="contactsCard flex items-center mt-2">
                    <div class="flex flex-grow min-w-0 items-center gap-4">
                        <Icon name="mail" class="h-8 w-8 shrink-0" />
                        <span class="ellipsisText min-w-0">{{ contactEmail }}</span>
                    </div>
                    <button class="ml-4 bg-mantle hover:opacity-95 p-2 rounded-[5px] shrink-0"
                        @click="copy(contactEmail)">
                        <Icon name="copy" class="h-6 w-6" />
                    </button>
                </div>
                <p class="mt-4 text-2xl"></p>
                <button class="contactsCard hover:bg-mantle w-full mt-2" @click="openLink('https://github.com/tonikozarev')">
                    <div class="flex items-center">
                        <Icon name="github" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">GitHub</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-2" @click="openLink('https://www.linkedin.com/in/tonikozarev/')">
                    <div class="flex items-center">
                        <Icon name="linkedin" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">Linkedin</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-2" @click="openLink('https://www.xing.com/profile/Toni_Kozarev/')">
                    <div class="flex items-center">
                        <Icon name="xing" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">XING</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-2" @click="openLink('https://twitter.com/tonykozarev')">
                    <div class="flex items-center">
                        <Icon name="twitter" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">Twitter</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
                <button class="contactsCard hover:bg-mantle w-full mt-2" @click="openLink('https://discord.com/users/439067023893594123')">
                    <div class="flex items-center">
                        <Icon name="discord" class="h-8 w-8" />
                        <p class="ml-4 flex-grow text-start">Discord</p>
                        <Icon name="link" class="h-8 w-8 stroke-text stroke-2" />
                    </div>
                </button>
            </div>
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
        </div>

        <transition name="toast-fade">
          <div v-if="copyToastVisible" class="copy-toast">
            Email copied
          </div>
        </transition>
    </div>
</template>

<style scoped>
.copy-toast {
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  background: theme("colors.crust");
  color: theme("colors.text");
  border: 1px solid theme("colors.mantle");
  border-radius: 999px;
  padding: 10px 14px;
  box-shadow: 0 12px 28px rgb(0 0 0 / 20%);
  z-index: 50;
  pointer-events: none;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}
</style>
