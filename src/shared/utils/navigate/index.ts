export function navigate(url: string | URL | null) {
  window.history.pushState('', '', url);
}
