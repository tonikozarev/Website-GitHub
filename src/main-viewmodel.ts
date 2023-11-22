export function openLink(url: string) {
    window.open(url, "_blank");
}

export function getImageUrl(path: string): string {
    return new URL(`./assets/images/${path}`, import.meta.url).href;
}

export function getIconUrl(path: string): string {
    return new URL(`./assets/icons/${path}`, import.meta.url).href;
}