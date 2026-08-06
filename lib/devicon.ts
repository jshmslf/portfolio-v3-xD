export function getDeviconClassName(slug: string): string {
  const [base, ...modifiers] = slug.trim().split(/\s+/);
  return [`devicon-${base}`, ...modifiers].join(" ");
}

export function isIconUrl(value: string): boolean {
  return /^https?:\/\//.test(value.trim());
}
