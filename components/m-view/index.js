//set view scroll event
export function setViewEvent() {
  const viewElm = this.$el;
  const scrollElm = viewElm.children[0];
  let timer = 0;
  scrollElm.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.scroll.top = scrollElm.scrollTop;
    }, 150);
  }, false);
}