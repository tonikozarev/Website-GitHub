export interface CertificationEntry {
  file: string;
  title: string;
}

export function formatCertificateTitle(path: string): string {
  const fileName = path.split("/").pop() || path;
  const stripped = fileName.replace(/\.pdf$/i, "");

  return stripped
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

export function fileStem(path: string): string {
  return path.split("/").pop()?.replace(/\.pdf$/i, "") || path;
}
