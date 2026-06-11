<script setup lang="ts">
import LanguageSwitcher from "../../components/language-switcher.vue";
import icon from "../../components/icon.vue";
import { useRouter } from "vue-router";
import { onMounted, ref, watchEffect } from "vue";
import { getImageUrl } from "@/main-viewmodel";
import { languages, translate } from "@/languages";

const router = useRouter();
const logoRef = ref();

onMounted(() => {
  document.title = title.value;
});

const title = ref(languages.home.title.en);
const speakingLanguages = [
    { name: "English", flag: getImageUrl("english-flag.png") },
    { name: "German", flag: getImageUrl("german-flag.png") },
    { name: "Bulgarian", flag: getImageUrl("bulgarian-flag.svg") },
];

const updateTitle = () => {
  title.value = translate(languages.home.title);
};

const updateProjectsText = () => {
  return translate(languages.projects.title);
};

const updateCertificationsText = () => {
  return translate(languages.certifications.title);
};

const updateTechnologiesText = () => {
    return translate(languages.technologies.title);
};

const updateGetInTouchText = () => {
    return translate(languages.socials.title);
};

function getMoonsOld() {
    const synodicMonthDays = 29.53059;
    const birthDateUtc = Date.UTC(1996, 4, 13);
    const nowUtc = Date.now();
    const elapsedDays = (nowUtc - birthDateUtc) / (1000 * 60 * 60 * 24);

    return Math.max(0, Math.floor(elapsedDays / synodicMonthDays));
}

const updateBioCard = () => {
    return [
        "name",
        "moons_old",
        "motto", '"VYBE: Visualize yourself better everyday!"',
        "speaking", '"English", "German", "Bulgarian"',
        "love", '"Dogs 🐶", "Gym 🏋️‍♂️", "Coding 👨‍💻", "Mountain biking 🚵", "Chess ♟️", "Friends & family 🤝"',
        "favorite_languages", '"Java", "Kotlin", "C#"',
    ];
};

watchEffect(() => {
  updateTitle();
  updateProjectsText();
  updateCertificationsText();
  updateTechnologiesText();
  updateGetInTouchText();
  updateBioCard();
});
</script>


<template>
    <div class=" p-large bg-base text-text h-screen w-screen overflow-auto">
        <LanguageSwitcher />
        <div class="grid grid-cols-12 w-full">
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-12">
                <div class="flex flex-col items-center">
                    <img src="@images/animated.png" class="h-[220px] rounded-full" ref="logoRef" /> 
                    <div class="title">{{ title }}</div>
                </div>
                <div class="mt-6 bg-crust rounded-[18px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 overflow-hidden">
                    <button class="tile-button"
                        @click="router.push('/projects')">
                        <icon name="laptop" class="h-14 w-14" />
                        <div class="text-lg">{{ updateProjectsText() }}</div>
                    </button>
                    <button class="tile-button"
                        @click="router.push('/certifications')">
                        <icon name="certificate" class="h-14 w-14" />
                        <div class="text-lg">{{ updateCertificationsText() }}</div>
                    </button>
                    <button class="tile-button"
                        @click="router.push('/technologies')">
                        <icon name="tools" class="h-14 w-14" />
                        <div class="text-lg">{{ updateTechnologiesText() }}</div>
                    </button>
                    <button class="tile-button"
                        @click="router.push('/socials')">
                        <icon name="messages" class="h-14 w-14" />
                        <div class="text-lg">{{ updateGetInTouchText() }}</div>
                    </button>
                </div>
                <div class="card mt-1">
                    <div class="codeCard flex flex-col overflow-x-scroll">
                        <div class="flex oneLineText">
                            <div class="let">let&nbsp;</div> <div class="bio2">bio&nbsp;</div> = <div class="bio1">&nbsp;Bio</div>
                            <div class="bracket">&nbsp;{</div>
                        </div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[0] }}: <div class="string">&nbsp;"Toni Kozarev"</div>,</div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[1] }}: <div class="struct">&nbsp;{{ getMoonsOld() }}</div>,</div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[2] }}: <div class="string">&nbsp;{{ updateBioCard()[3] }}</div>,</div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[4] }}: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string flex items-center gap-2 flex-wrap">
                                <template v-for="(language, index) in speakingLanguages" :key="language.name">
                                    <span class="inline-flex items-center gap-1 whitespace-nowrap">
                                        <span>"{{ language.name }}</span>
                                        <img :src="language.flag" :alt="`${language.name} flag`" class="inlineFlag" />
                                        <span>"{{ index < speakingLanguages.length - 1 ? "," : "" }}</span>
                                    </span>
                                </template>
                            </div>
                            <div class="bracket">]</div>,
                        </div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[6] }}: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">{{ updateBioCard()[7] }}</div>
                            <div class="bracket">]</div>,
                        </div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[8] }}: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">{{ updateBioCard()[9] }}</div>
                            <div class="bracket">]</div>
                        </div>
                        <div class="flex bracket oneLineText">}</div>
                    </div>
                </div>
            </div>
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
        </div>
    </div>
</template>

<style scoped>
.let {
    color: theme("colors.mauve");
}

.struct {
    color: theme("colors.yellow");
}

.bio1 {
    color: theme("colors.blue");
}

.bio2 {
    color: theme("colors.lightblue");
}

.string {
    color: theme("colors.green");
}

.inlineFlag {
    width: 1rem;
    height: 1rem;
    object-fit: contain;
    display: inline-block;
    flex-shrink: 0;
}

.usize,
.bracket {
    color: theme("colors.peach");
}

.tile-button {
    min-height: 116px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
}

.tile-button:hover {
    background-color: theme("colors.mantle");
}

.tile-button:not(:last-child) {
    border-right: 2px solid theme("colors.mantle");
}

@media (max-width: 639px) {
    .tile-button:not(:last-child) {
        border-right: 0;
        border-bottom: 2px solid theme("colors.mantle");
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>


