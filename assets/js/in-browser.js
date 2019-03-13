export default function inBrowser() {
  return process.client || process.browser;
}