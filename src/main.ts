import "@/root.css"

import Home from "@pages/home/page.vue"
import Projects from "@pages/projects/page.vue"
import Technologies from "@pages/technologies/page.vue"
import Socials from "@pages/socials/page.vue"
import Root from "@/root.vue"
import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/projects", name: "projects", component: Projects },
    { path: "/technologies", name: "technologies", component: Technologies },
    { path: "/socials", name: "socials", component: Socials },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(Root);
app.use(router);

const userLanguagePreference = localStorage.getItem('userLanguagePreference');
window.selectedLanguage = userLanguagePreference || "en";

app.mount("#app");
