<script setup lang="ts">
import HomeBar from "@components/home-bar.vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from "vue";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { languages, translate } from "@/languages";
import {
  buildCertificateUrl,
  clearStoredAccessToken,
  fetchCertificateCatalog,
  getStoredAccessToken,
  getStoredAccessTokenExpiresAt,
  unlockCertificates,
} from "@/lib/content-api";
import type { CertificateDefinition, CertificateLanguage } from "@/lib/content-api";

type LanguageFilter = "all" | CertificateLanguage;

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

function disableRefresh(event: KeyboardEvent) {
  if ((event.ctrlKey && event.key === "r") || event.key === "F5") {
    event.preventDefault();
  }
}

const title = ref(languages.certifications.title.en);
const filterLabel = ref(languages.certifications.content.filter.en);
const allLabel = ref(languages.certifications.content.all.en);
const englishLabel = ref(languages.certifications.content.english.en);
const germanLabel = ref(languages.certifications.content.german.en);
const bulgarianLabel = ref(languages.certifications.content.bulgarian.en);
const selectText = ref(languages.certifications.content.select.en);
const previewText = ref(languages.certifications.content.preview.en);
const gateTitle = ref(languages.certifications.content.gate_title.en);
const gateText = ref(languages.certifications.content.gate_text.en);
const codeLabel = ref(languages.certifications.content.code_label.en);
const unlockText = ref(languages.certifications.content.unlock.en);
const lockText = ref(languages.certifications.content.lock.en);
const unlockedText = ref(languages.certifications.content.unlocked.en);
const lockedText = ref(languages.certifications.content.locked.en);
const unlockErrorText = ref(languages.certifications.content.unlock_error.en);
const unlockSuccessText = ref(languages.certifications.content.unlock_success.en);
const emptyText = ref(languages.certifications.content.empty.en);

const accessToken = ref(getStoredAccessToken() || "");
const accessTokenExpiresAt = ref<number | null>(getStoredAccessTokenExpiresAt());
const selectedCertificateId = ref("");
const activeLanguageFilter = ref<LanguageFilter>("all");
const accessCode = ref("");
const unlockInProgress = ref(false);
const unlockMessage = ref("");
const unlockMessageType = ref<"idle" | "error" | "success">("idle");
const now = ref(Date.now());
const certificateCatalog = ref<CertificateDefinition[]>([]);
const previewContainer = ref<HTMLDivElement | null>(null);
const previewLoading = ref(false);
const previewError = ref("");
let expiryTimer: ReturnType<typeof setInterval> | null = null;
let previewRunId = 0;
let activePdfDocument: PDFDocumentProxy | null = null;

const allCertificates = computed(() => {
  return [...certificateCatalog.value].sort((left, right) => {
    const languageOrder = { en: 0, de: 1, bg: 2 } as const;
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

const isUnlocked = computed(() => Boolean(accessToken.value) && Boolean(accessTokenExpiresAt.value) && now.value < (accessTokenExpiresAt.value || 0));

function updateText() {
  title.value = translate(languages.certifications.title);
  filterLabel.value = translate(languages.certifications.content.filter);
  allLabel.value = translate(languages.certifications.content.all);
  englishLabel.value = translate(languages.certifications.content.english);
  germanLabel.value = translate(languages.certifications.content.german);
  bulgarianLabel.value = translate(languages.certifications.content.bulgarian);
  selectText.value = translate(languages.certifications.content.select);
  previewText.value = translate(languages.certifications.content.preview);
  gateTitle.value = translate(languages.certifications.content.gate_title);
  gateText.value = translate(languages.certifications.content.gate_text);
  codeLabel.value = translate(languages.certifications.content.code_label);
  unlockText.value = translate(languages.certifications.content.unlock);
  lockText.value = translate(languages.certifications.content.lock);
  unlockedText.value = translate(languages.certifications.content.unlocked);
  lockedText.value = translate(languages.certifications.content.locked);
  unlockErrorText.value = translate(languages.certifications.content.unlock_error);
  unlockSuccessText.value = translate(languages.certifications.content.unlock_success);
  emptyText.value = translate(languages.certifications.content.empty);
}

function pickCertificate(id: string) {
  selectedCertificateId.value = id;
}

function pickFilter(language: LanguageFilter) {
  activeLanguageFilter.value = language;
  selectedCertificateId.value = "";

  if (isUnlocked.value && filteredCertificates.value.length > 0) {
    selectedCertificateId.value = filteredCertificates.value[0].id;
  }
}

async function unlockGate() {
  const code = accessCode.value.trim();

  if (!code) {
    unlockMessageType.value = "error";
    unlockMessage.value = unlockErrorText.value;
    return;
  }

  unlockInProgress.value = true;
  unlockMessageType.value = "idle";
  unlockMessage.value = "";

  try {
    const result = await unlockCertificates(code);
    accessToken.value = result.accessToken;
    accessTokenExpiresAt.value = result.expiresAt;
    accessCode.value = "";
    unlockMessageType.value = "success";
    unlockMessage.value = unlockSuccessText.value;

    if (filteredCertificates.value.length > 0) {
      selectedCertificateId.value = filteredCertificates.value[0].id;
    }
  } catch {
    clearStoredAccessToken();
    accessToken.value = "";
    accessTokenExpiresAt.value = null;
    unlockMessageType.value = "error";
    unlockMessage.value = unlockErrorText.value;
  } finally {
    unlockInProgress.value = false;
  }
}

function relock() {
  clearStoredAccessToken();
  accessToken.value = "";
  accessTokenExpiresAt.value = null;
  selectedCertificateId.value = "";
  unlockMessageType.value = "idle";
  unlockMessage.value = "";
}

defineExpose({ relock });

async function clearPreview() {
  previewRunId += 1;
  previewError.value = "";

  if (activePdfDocument) {
    await activePdfDocument.destroy();
    activePdfDocument = null;
  }

  if (previewContainer.value) {
    previewContainer.value.innerHTML = "";
  }
}

async function renderCertificatePreview() {
  const certificate = selectedCertificate.value;
  const token = accessToken.value;
  const container = previewContainer.value;

  await clearPreview();

  if (!certificate || !token || !container) {
    return;
  }

  const runId = previewRunId;
  previewLoading.value = true;

  try {
    const response = await fetch(buildCertificateUrl(certificate, token), {
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Could not load certificate preview. (${response.status})`);
    }

    const data = new Uint8Array(await response.arrayBuffer());
    const pdfDocument = await pdfjsLib.getDocument({ data }).promise;

    if (runId !== previewRunId) {
      await pdfDocument.destroy();
      return;
    }

    activePdfDocument = pdfDocument;

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
      if (runId !== previewRunId) {
        return;
      }

      const page = await pdfDocument.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(320, container.clientWidth - 24);
      const scale = Math.min(1.6, availableWidth / baseViewport.width);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not render certificate preview.");
      }

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.className = "pdf-preview-page";
      container.appendChild(canvas);

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;
    }
  } catch (error) {
    if (runId === previewRunId) {
      previewError.value = error instanceof Error ? error.message : "Could not load certificate preview.";
    }
  } finally {
    if (runId === previewRunId) {
      previewLoading.value = false;
    }
  }
}

onMounted(() => {
  document.title = title.value;
  document.addEventListener("keydown", disableRefresh);
  expiryTimer = setInterval(() => {
    now.value = Date.now();
  }, 60_000);

  if (isUnlocked.value && filteredCertificates.value.length > 0) {
    selectedCertificateId.value = filteredCertificates.value[0].id;
  }

  fetchCertificateCatalog()
    .then((certificates) => {
      certificateCatalog.value = certificates;

      if (isUnlocked.value && certificates.length > 0 && !selectedCertificateId.value) {
        selectedCertificateId.value = filteredCertificates.value[0]?.id || "";
      }
    })
    .catch(() => {
      certificateCatalog.value = [];
    });
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", disableRefresh);
  if (expiryTimer) {
    clearInterval(expiryTimer);
  }
  void clearPreview();
});

watch([selectedCertificateId, accessToken], () => {
  void nextTick(renderCertificatePreview);
});

watchEffect(() => {
  updateText();

  if (!isUnlocked.value) {
    selectedCertificateId.value = "";
    return;
  }

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
          <div v-if="isUnlocked" class="flex items-center gap-3">
            <p class="text-sm opacity-70">{{ unlockedText }}</p>
            <button class="filter-chip" @click="relock">
              {{ lockText }}
            </button>
          </div>
          <p v-else class="text-sm opacity-70">{{ lockedText }}</p>
        </div>

        <div v-if="!isUnlocked" class="mt-4 rounded-[18px] bg-crust p-5">
          <div class="max-w-2xl">
            <p class="text-2xl">{{ gateTitle }}</p>
            <p class="mt-2 opacity-70">{{ gateText }}</p>

            <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label class="flex-1">
                <span class="mb-2 block text-sm opacity-70">{{ codeLabel }}</span>
                <input
                  v-model="accessCode"
                  type="password"
                  class="w-full rounded-[14px] bg-mantle px-4 py-3 outline-none ring-1 ring-transparent focus:ring-peach"
                  autocomplete="one-time-code"
                  @keydown.enter="unlockGate"
                />
              </label>
              <button class="filter-chip sm:min-w-[140px]" :disabled="unlockInProgress" @click="unlockGate">
                {{ unlockInProgress ? "..." : unlockText }}
              </button>
            </div>

            <p v-if="unlockMessage" class="mt-3 text-sm" :class="unlockMessageType === 'error' ? 'text-red' : 'text-green'">
              {{ unlockMessage }}
            </p>
          </div>
        </div>

        <template v-else>
          <div class="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div class="flex items-center gap-3 flex-wrap">
              <p class="text-sm opacity-70">{{ filterLabel }}</p>
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
                  <p class="text-sm opacity-70 ellipsisText">{{ certificate.file }} · {{ certificate.language.toUpperCase() }}</p>
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

              <div
                v-if="selectedCertificate"
                class="pdf-preview-surface mt-2 rounded-[14px] overflow-auto bg-mantle"
                @contextmenu.prevent
              >
                <p v-if="previewLoading" class="py-6 text-center text-sm opacity-70">Loading preview...</p>
                <p v-if="previewError" class="py-6 text-center text-sm text-red">{{ previewError }}</p>
                <div ref="previewContainer" class="pdf-preview-pages"></div>
              </div>
            </div>
          </div>

          <div v-else class="mt-4 rounded-[18px] bg-crust p-4">
            <p class="opacity-70">{{ emptyText }}</p>
          </div>
        </template>
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

.filter-chip:hover:not(:disabled) {
  background-color: theme("colors.mauve");
  color: theme("colors.crust");
  transform: translateY(-1px);
}

.filter-chip:disabled {
  opacity: 0.6;
  cursor: wait;
}

.filter-chip-active {
  background-color: theme("colors.mauve");
  color: theme("colors.crust");
  border-color: theme("colors.peach");
}

.pdf-preview-surface {
  height: 68vh;
  min-height: 540px;
}

.pdf-preview-pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 12px;
}

:deep(.pdf-preview-page) {
  display: block;
  max-width: 100%;
  height: auto;
  background-color: white;
  box-shadow: 0 10px 30px rgb(0 0 0 / 30%);
}
</style>
