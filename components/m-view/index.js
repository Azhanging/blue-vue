//set view scroll event
export function setViewEvent() {
  const viewElm = this.$el;
  const scrollElm = viewElm.children[0];
  let timer = 0;

  //view scroll event
  scrollElm.addEventListener('scroll', (event) => {
    const elm = event.target;
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.scroll.top = elm.scrollTop;
    }, 150);
  }, false);

  //ios move的时候产生卡顿的问题
  scrollElm.addEventListener('touchmove', () => {
    document.body.scrollTop = document.body.scrollHeight;
  });

}