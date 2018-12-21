import fastclick from 'fastclick';

export function useFastclick() {
  fastclick.attach(document.body);
}