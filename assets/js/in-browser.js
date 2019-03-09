export function inBrowser() {
  return process.client || process.browser;
}