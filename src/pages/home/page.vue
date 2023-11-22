<script setup lang="ts">
import { useRouter } from "vue-router";
import icon from "../../components/icon.vue"
import { onMounted, ref } from "vue";

const router = useRouter();
const logoRef = ref();

onMounted(() => {
    document.title = "Toni Kozarev";
});


</script>

<template>
    <div class=" p-large bg-base text-text h-screen w-screen overflow-auto">
        <div class="grid grid-cols-12 w-full">
            <div class="2xl:col-span-3 xl:col-span-3 lg:col-span-2 md:col-span-1"></div>
            <div class="2xl:col-span-6 xl:col-span-6 lg:col-span-8 md:col-span-10 col-span-12">
                <div class="flex flex-col items-center">
                    <img src="@images/animated.png" class="h-[220px] rounded-full" ref="logoRef" /> 
                    <div class="title">Toni Kozarev</div>
                </div>
                <div class="mt-6 bg-crust rounded-[12px] flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col overflow-hidden">
                    <button class="flex-grow p-3 flex flex-col items-center justify-center hover:bg-mantle"
                        @click="router.push('/projects')">
                        <icon name="laptop" class="h-14 w-14" />
                        <div class="text-lg">Projects</div>
                    </button>
                    <div class="verticalDivider"></div>
                    <button class="flex-grow p-3 flex flex-col items-center justify-center hover:bg-mantle"
                        @click="router.push('/technologies')">
                        <icon name="tools" class="h-14 w-14" />
                        <div class="text-lg">Technologies</div>
                    </button>
                    <div class="verticalDivider"></div>
                    <button class="flex-grow p-3 flex flex-col items-center justify-center hover:bg-mantle"
                        @click="router.push('/socials')">
                        <icon name="messages" class="h-14 w-14" />
                        <div class="text-lg">Get in touch</div>
                    </button>
                </div>
                <div class="card mt-1">
                    <div class="codeCard flex flex-col overflow-x-scroll">
                        <div class="flex oneLineText">
                            <div class="let">let&nbsp;</div> <div class="bio2">bio&nbsp;</div> = <div class="bio1">&nbsp;Bio</div>
                            <div class="bracket">&nbsp;{</div>
                        </div>
                        <div class="flex oneLineText">&emsp;name: <div class="string">&nbsp;"Toni Kozarev"</div>,</div>
                        <div class="flex oneLineText">&emsp;moons old: <div class="struct">&nbsp;340</div>,</div>
                        <div class="flex oneLineText">&emsp;motto: <div class="string">&nbsp;"VYBE: Visualize yourself better everyday!"</div>,</div>
                        <div class="flex oneLineText">&emsp;speaking: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">"English"</div>,&nbsp;
                            <div class="string">"German"</div>,&nbsp;
                            <div class="string">"Bulgarian"</div> 
                            <div class="bracket">]</div>,
                        </div>
                        <div class="flex oneLineText">&emsp;love: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">"Dogs 🐶"</div>,&nbsp;
                            <div class="string">"Gym 🏋️‍♂️"</div>,&nbsp;
                            <div class="string">"Coding 👨‍💻"</div>,&nbsp; 
                            <div class="string">"Martial arts 🥊"</div>,&nbsp;
                            <div class="string">"Video games 🎮"</div>
                            <div class="bracket">]</div>,
                        </div>
                        <div class="flex oneLineText">&emsp;favorite_languages: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">"Kotlin"</div>,&nbsp; <div class="string">"C#"</div>,&nbsp; <div
                                class="string">"Java"</div>
                            <div class="bracket">]</div>,
                        </div>
                        <div class="flex oneLineText">&emsp;hobbies: <div class="vec">&nbsp;</div>
                            <div class="bracket">[</div>
                            <div class="string">"Playing chess ♔"</div>,&nbsp; 
                            <div class="string">"Flying drone 🛪"</div>,&nbsp; 
                            <div class="string">"Reading 🕮"</div>
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