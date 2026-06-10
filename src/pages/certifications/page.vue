<script setup lang="ts">
import HomeBar from "@components/home-bar.vue";
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import { languages, translate } from "@/languages";
import { fileStem, formatCertificateTitle, type CertificationEntry } from "./vm";

interface Certificate {
  id: string;
  title: string;
  url: string;
  file: string;
  language: "en" | "de" | "bg";
}

function disableRefresh(event: KeyboardEvent) {
  if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
    event.preventDefault();
  }
}

const englishPdfAssets = import.meta.glob("../../assets/certifications/en/*.pdf", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const germanPdfAssets = import.meta.glob("../../assets/certifications/de/*.pdf", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const bulgarianPdfAssets = import.meta.glob("../../assets/certifications/bg/*.pdf", {
  eager: true,
  as: "url",
}) as Record<string, string>;

const configuredCertificates: CertificationEntry[] = [];

const title = ref(languages.certifications.title.en);
const filterLabel = ref(languages.certifications.content.filter.en);
const allLabel = ref(languages.certifications.content.all.en);
const englishLabel = ref(languages.certifications.content.english.en);
const germanLabel = ref(languages.certifications.content.german.en);
const bulgarianLabel = ref(languages.certifications.content.bulgarian.en);
const selectText = ref(languages.certifications.content.select.en);
const previewText = ref(languages.certifications.content.preview.en);
const emptyText = ref(languages.certifications.content.empty.en);

const selectedCertificateId = ref("");
const activeLanguageFilter = ref<"all" | "en" | "de" | "bg">("all");

function certificatesFromAssets(assets: Record<string, string>): Certificate[] {
  return Object.entries(assets)
    .map(([path, url]) => {
      const stem = fileStem(path);
      const configured = configuredCertificates.find((entry) => entry.file === stem || entry.file === `${stem}.pdf`);
      const language: "en" | "de" | "bg" = path.includes("/de/")
        ? "de"
        : path.includes("/bg/")
          ? "bg"
          : "en";

      return {
        id: path,
        title: configured?.title || formatCertificateTitle(path),
        url,
        file: stem,
        language,
      };
    })
    .sort((left, right) => left.title.localeCompare(right.title));
}

const allCertificates = computed(() => {
  return [...certificatesFromAssets(englishPdfAssets), ...certificatesFromAssets(germanPdfAssets), ...certificatesFromAssets(bulgarianPdfAssets)]
    .sort((left, right) => {
      const languageOrder = { en: 0, de: 1, bg: 2 };
      return languageOrder[left.language] - languageOrder[right.language] || left.title.localeCompare(right.title);
    });
});

const filteredCertificates = computed(() => {
  if (activeLanguageFilter.value === "all") {
    return allCertificates.value;
  }

  return allCertificates.value.filter((certificate) => certificate.language === activeLanguageFilter.value);
});

const selectedCertificate = computed(() => {
  return filteredCertificates.value.find((certificate) => certificate.id === selectedCertificateId.value) || filteredCertificates.value[0] || null;
});

function updateText() {
  title.value = translate(languages.certifications.title);
  filterLabel.value = translate(languages.certifications.content.filter);
  allLabel.value = translate(languages.certifications.content.all);
  englishLabel.value = translate(languages.certifications.content.english);
  germanLabel.value = translate(languages.certifications.content.german);
  bulgarianLabel.value = translate(languages.certifications.content.bulgarian);
  selectText.value = translate(languages.certifications.content.select);
  previewText.value = translate(languages.certifications.content.preview);
  emptyText.value = translate(languages.certifications.content.empty);
}

function pickCertificate(id: string) {
  selectedCertificateId.value = id;
}

function pickFilter(language: "all" | "en" | "de" | "bg") {
  activeLanguageFilter.value = language;
  selectedCertificateId.value = "";
}

onMounted(() => {
  document.title = title.value;
  document.addEventListener("keydown", disableRefresh);

  if (filteredCertificates.value.length > 0) {
    selectedCertificateId.value = filteredCertificates.value[0].id;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", disableRefresh);
});

watchEffect(() => {
  updateText();

  if (filteredCertificates.value.length > 0 && !selectedCertificate.value) {
    selectedCertificateId.value = filteredCertificates.value[0].id;
  }
});
</script>

<template>
  <div class="h-screen overflow-auto bg-base p-large text-text">
    <div class="grid grid-cols-12 w-full">
      <div class="2xl:col-span-2 xl:col-span-2 lg:col-span-1 md:col-span-1"></div>
      <div class="2xl:col-span-8 xl:col-span-8 lg:col-span-10 md:col-span-10 col-span-12">
        <HomeBar />
        <div class="mt-6 flex flex-col gap-3 lg:mt-5 lg:flex-row lg:items-center lg:justify-between">
          <p class="text-3xl">{{ title }}</p>
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:flex-wrap">
            <p class="text-sm opacity-70 lg:mr-2">{{ filterLabel }}</p>
            <div class="flex flex-wrap gap-2">
              <button class="filter-chip" :class="activeLanguageFilter === 'all' ? 'filter-chip-active' : ''" @click="pickFilter('all')">
                {{ allLabel }}
              </button>
              <button class="filter-chip" :class="activeLanguageFilter === 'en' ? 'filter-chip-active' : ''" @click="pickFilter('en')">
                {{ englishLabel }}
              </button>
              <button class="filter-chip" :class="activeLanguageFilter === 'de' ? 'filter-chip-active' : ''" @click="pickFilter('de')">
                {{ germanLabel }}
              </button>
              <button class="filter-chip" :class="activeLanguageFilter === 'bg' ? 'filter-chip-active' : ''" @click="pickFilter('bg')">
                {{ bulgarianLabel }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredCertificates.length" class="mt-3 grid grid-cols-12 gap-2">
          <div class="col-span-12 lg:col-span-3 bg-crust rounded-[18px] p-2">
            <p class="px-2 py-1 text-lg">{{ selectText }}</p>
            <div class="flex flex-col gap-2 mt-2">
              <button
                v-for="certificate in filteredCertificates"
                :key="certificate.id"
                class="text-left rounded-[12px] p-3 hover:bg-mantle"
                :class="certificate.id === selectedCertificate?.id ? 'bg-mantle' : 'bg-crust'"
                @click="pickCertificate(certificate.id)"
              >
                <p class="ellipsisText">{{ certificate.title }}</p>
                <p class="text-sm opacity-70 ellipsisText">{{ certificate.file }}.pdf · {{ certificate.language.toUpperCase() }}</p>
              </button>
            </div>
          </div>

          <div class="col-span-12 lg:col-span-9 bg-crust rounded-[18px] p-3">
            <div class="flex items-center justify-between gap-2">
              <p class="text-lg">{{ previewText }}</p>
              <p class="text-sm opacity-70 ellipsisText text-right">
                {{ selectedCertificate?.title }}
              </p>
            </div>

            <div v-if="selectedCertificate" class="mt-2 rounded-[14px] overflow-hidden bg-mantle">
              <iframe
                :src="`${selectedCertificate.url}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`"
                class="w-full h-[68vh] min-h-[540px] border-0"
                title="certification-preview"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        <div v-else class="mt-4 rounded-[18px] bg-crust p-4">
          <p class="opacity-70">{{ emptyText }}</p>
        </div>
      </div>
      <div class="2xl:col-span-2 xl:col-span-2 lg:col-span-1 md:col-span-1"></div>
    </div>
  </div>
</template>

<style scoped>
.filter-chip {
  border-radius: 999px;
  padding: 8px 14px;
  background-color: theme("colors.mantle");
  color: theme("colors.text");
  border: 1px solid transparent;
  transition: background-color 140ms ease, color 140ms ease, transform 140ms ease;
}

.filter-chip:hover {
  background-color: theme("colors.mauve");
  color: theme("colors.crust");
  transform: translateY(-1px);
}

.filter-chip-active {
  background-color: theme("colors.mauve");
  color: theme("colors.crust");
  border-color: theme("colors.peach");
}
</style>
