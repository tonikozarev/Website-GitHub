<script setup lang="ts">
import { getSelectedLanguage, type LanguageCode } from "@/languages";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "bg", label: "BG", name: "Български" },
] as const;

const activeLanguage = getSelectedLanguage();

function changeLanguage(lang: LanguageCode) {
  localStorage.setItem("userLanguagePreference", lang);
  window.selectedLanguage = lang;
  window.location.reload();
}
</script>

<template>
  <div class="language-switcher" aria-label="Language selector">
    <button
      v-for="language in languages"
      :key="language.code"
      class="language-button"
      :class="language.code === activeLanguage ? 'language-button-active' : ''"
      :title="language.name"
      @click="changeLanguage(language.code)"
    >
      {{ language.label }}
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  position: fixed;
  top: 25px;
  right: 25px;
  z-index: 10;
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid theme("colors.mantle");
  border-radius: 999px;
  background-color: theme("colors.crust");
  box-shadow: 0 10px 30px rgb(0 0 0 / 18%);
}

.language-button {
  min-width: 42px;
  border-radius: 999px;
  padding: 8px 10px;
  color: theme("colors.text");
  font-size: 14px;
  line-height: 1;
  transition: background-color 140ms ease, color 140ms ease, transform 140ms ease;
}

.language-button:hover {
  background-color: theme("colors.mantle");
  color: theme("colors.text");
  transform: translateY(-1px);
}

.language-button-active {
  background-color: theme("colors.mauve");
  color: theme("colors.crust");
}
</style>
