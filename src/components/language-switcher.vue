<template>
  <div class="language-switcher">
    <button @click="changeLanguage('en')" class="language-button">
      <span class="language-name">English</span>
      <img src="@/assets/images/english-flag.png" alt="English" class="language-icon" />
    </button>
    <button @click="changeLanguage('de')" class="language-button">
      <span class="language-name">German</span>
      <img src="@/assets/images/german-flag.png" alt="German" class="language-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
  const changeLanguage = (lang: string) => {
    localStorage.setItem('userLanguagePreference', lang);
    window.selectedLanguage = lang;
    window.location.reload();
  };
</script>