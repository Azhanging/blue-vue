import config from '@config';

export function setViewport() {
  if (config.env.isWap) {
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('data-mobile-device', 'true');
  }
}