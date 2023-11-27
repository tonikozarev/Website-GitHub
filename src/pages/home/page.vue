<script setup lang="ts">
import LanguageSwitcher from "../../components/language-switcher.vue";
import icon from "../../components/icon.vue";
import { useRouter } from "vue-router";
import { onMounted, ref, watchEffect } from "vue";
import { languages, Languages } from "@/languages";

const router = useRouter();
const logoRef = ref();

onMounted(() => {
  document.title = title.value;
});

const title = ref((languages as Languages).home.title.en);

const updateTitle = () => {
  title.value =
    window.selectedLanguage === 'de' ? (languages as Languages).home.title.de : (languages as Languages).home.title.en;
};

const updateProjectsText = () => {
  return window.selectedLanguage === 'de' ? (languages as Languages).projects.title.de : (languages as Languages).projects.title.en;
};

const updateTechnologiesText = () => {
    return window.selectedLanguage === 'de' ? (languages as Languages).technologies.title.de : (languages as Languages).technologies.title.en;
};

const updateGetInTouchText = () => {
    return window.selectedLanguage === 'de' ? (languages as Languages).socials.title.de : (languages as Languages).socials.title.en;
};

const updateBioCard = () => {
    const arrayEn = [
        "name",
        "moons_old",
        "motto", "VYBE: Visualize yourself better everyday!",
        "speaking", '"English", "German", "Bulgarian"',
        "love", '"Dogs 🐶", "Gym 🏋️‍♂️", "Coding 👨‍💻", "Martial arts 🥊", "Video games 🎮"',
        "favorite_languages", '"Kotlin", "C#", "Java"',
        "hobbies", '"Playing chess ♔","Flying drone 🛪","Reading 🕮"',
    ];

    const arrayDe = [
        "name", 
        "monde_alt", 
        "motto", "VYBE: Visualisiere dich jeden Tag besser!",
        "sprechen", '"Englisch", "Deutsch", "Bulgarisch"',
        "liebe", '"Hunde 🐶", "Fitness 🏋️‍♂️", "Programmierung 👨‍💻", "Kampfsport 🥊", "Videospiele 🎮"',
        "lieblingsprogrammiersprachen", '"Kotlin", "C#", "Java"',
        "hobbys", '"Schach spielen ♔", "Drohne fliegen 🛪", "Lesen 🕮"',
    ];

    return window.selectedLanguage === 'de' ? arrayDe : arrayEn;
};


watchEffect(() => {
  updateTitle();
  updateProjectsText();
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
                <div class="mt-6 bg-crust rounded-[18px] flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col overflow-hidden">
                    <button class="flex-grow p-3 flex flex-col items-center justify-center hover:bg-mantle min-w-[150px]"
                        @click="router.push('/projects')">
                        <icon name="laptop" class="h-14 w-14" />
                        <div class="text-lg">{{ updateProjectsText() }}</div>
                    </button>
                    <div class="verticalDivider"></div>
                    <button class="flex-grow p-3 flex flex-col items-center justify-center hover:bg-mantle min-w-[150px]"
                        @click="router.push('/technologies')">
                        <icon name="tools" class="h-14 w-14" />
                        <div class="text-lg">{{ updateTechnologiesText() }}</div>
                    </button>
                    <div class="verticalDivider"></div>
                    <button class="flex-grow p-3 flex flex-col items-center justify-center hover:bg-mantle min-w-[150px]"
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
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[1] }}: <div class="struct">&nbsp;340</div>,</div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[2] }}: <div class="string">&nbsp;{{ updateBioCard()[3] }}</div>,</div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[4] }}: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">{{ updateBioCard()[5] }}</div>
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
                            <div class="bracket">]</div>,
                        </div>
                        <div class="flex oneLineText">&emsp;{{ updateBioCard()[10] }}: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">{{ updateBioCard()[11] }}</div>
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

.usize,
.bracket {
    color: theme("colors.peach");
}

.verticalDivider {
    position: relative;
    top: 0%;
    bottom: 0%;
    border: 2px solid theme("colors.mantle");
    border-radius: 48px;
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