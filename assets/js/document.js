import config from '@config';

export function docTitle(title) {
  document.title = title || config.app.title;
}