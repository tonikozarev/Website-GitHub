<script setup lang="ts">
import HomeBar from "@components/home-bar.vue";
import Icon from "@/components/icon.vue";
import { onMounted, onBeforeUnmount, ref, watchEffect } from "vue";
import { Project, projects as PROJECTS } from "@pages/projects/vm"
import { openLink, getImageUrl } from "@/main-viewmodel";
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

const title = ref((languages as Languages).projects.title.en);
const source = ref((languages as Languages).projects.content.source.en);
const all = ref((languages as Languages).projects.content.all.en);

const updateTitle = () => {
  title.value =
    window.selectedLanguage === 'de' ? (languages as Languages).projects.title.de : (languages as Languages).projects.title.en;
};

const updateSource = () => {
  source.value =
    window.selectedLanguage === 'de' ? (languages as Languages).projects.content.source.de : (languages as Languages).projects.content.source.en;
};

const updateAll = () => {
    all.value = 
    window.selectedLanguage === 'de' ? (languages as Languages).projects.content.all.de : (languages as Languages).projects.content.all.en;
    filters.value[0] = all.value;
};

const filters = ref(["All", "Android", "Web", "AR"]);
const currentFilterEn = ref("All");
const currentFilterDe = ref("Alle");
const currentFilter = window.selectedLanguage === 'de' ? currentFilterDe : currentFilterEn;
const projects = ref<Project[]>(PROJECTS);
const currentProjects = ref<Project[]>(PROJECTS)


function filterProjects(filter: string) {
    currentFilter.value = filter;

    if (filter == "All" || filter == "Alle") {
        currentProjects.value = projects.value
        return
    }
    currentProjects.value = projects.value.filter(project => project.tags.includes(filter));
}

watchEffect(() => {
  updateTitle();
  updateSource();
  updateAll();
});
</script>

<template>
    <div class="max-h-screen h-screen overflow-auto bg-base p-large text-text">
        <div class="grid grid-cols-12 w-full">
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-12 flex flex-col">
                <HomeBar />
                <p class="mt-8 text-3xl">{{ title }}</p>
                <div class="flex overflow-auto mt-2">
                    <button v-for="filter in filters" :key="filter"
                        class="bg-crust pt-2 pb-2 pl-4 pr-4 mr-1 rounded-full hover:bg-mantle"
                        :class="filter == currentFilter ? 'bg-mantle' : 'bg-crust'" @click="filterProjects(filter)">
                        <p>{{ filter }}</p>
                    </button>
                </div>
                <div class="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-2 mt-4">

                    <div v-for="project in currentProjects" class="card grid grid-cols-2">
                        <div class="bg-mantle p-2 rounded-[10px]">
                            <img :src="getImageUrl(project.image)" class="w-full aspect-square object-contain">
                        </div>
                        <div class="flex flex-col ml-[16px]">
                            <p class="w-full text-center text-xl ellipsisText">{{ project.name }}</p>
                            <div class="flex flex-grow flex-col justify-center items-center">
                                <button
                                    class="flex items-center pt-2 pb-2 pl-4 pr-4 bg-mantle rounded-full hover:opacity-95"
                                    @click="openLink(project.url)">
                                    <p>{{ source }}</p>
                                    <Icon name="github" class="h-4 w-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
        </div>
    </div>
</template>