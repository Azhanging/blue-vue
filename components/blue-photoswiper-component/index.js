var utils = require('blue-utils');
var PhotoSwipe = require('./photoswipe');
var PhotoSwipeUI_Default = require('./photoswipe-ui-default.min');
var photoSwipeComponent = require('./blue-photoswipe.vue');

//use photo swiper
function photoSwipe(opts) {

  // parse slide data (url, title, size ...) from DOM elements
  // (children of opts.el)
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      itemElm,
      imgEl,
      size,
      item;

    for (var i = 0; i < numNodes; i++) {

      itemElm = thumbElements[i]; // <figure> element

      // include only element nodes
      if (itemElm.nodeType !== 1 || itemElm.nodeName !== opts.itemTag) {
        continue;
      }

      //item中的img
      imgEl = itemElm.children[0]; // img element

      //获取到图片的size
      size = (imgEl.getAttribute('data-size') || '0x0').split('x');

      //不是图片标签跳出
      if (imgEl.tagName !== 'IMG') continue;

      // create slide object
      item = {
        src: imgEl.getAttribute('msrc'),
        w: parseInt(size[0] || 0, 10),
        h: parseInt(size[1] || 0, 10)
      };

      item.title = imgEl.getAttribute('title') || '';

      item.msrc = imgEl.getAttribute('msrc') || '';

      item.el = itemElm; // save link to element for getThumbBoundsFn

      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function (el) {
      return (el.tagName && el.tagName.toUpperCase() === opts.itemTag);
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }


    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {

      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function (index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      }

    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

  // loop through all gallery elements and bind events
  var galleryElements = (function () {
    if (opts.el && opts.el.nodeType === 1) {
      return [opts.el];
    } else {
      return document.querySelectorAll(opts.el);
    }
  })();

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }

}

//绑定自定义指令
function photoDirective(opts, el, binding) {
  if (el.nodeType !== 1) return;
  [].forEach.call(el.querySelectorAll('img'), function (imgElm) {
    if (imgElm.bluePhotoSwiper) return;
    imgElm.bluePhotoSwiper = {
      status: true
    };
    var _img = new Image();
    _img.src = imgElm.src;
    _img.onload = function () {
      var w = this.width;
      var h = this.height;
      imgElm.dataset['size'] = w + 'x' + h;
    };
    photoSwipe(utils.extend({
      el,
      itemTag: opts.itemTag || "LI"
    }, binding.value || {}));
  });
}

//photo swiper in vue use install
photoSwipe.install = function (Vue, opts) {
  opts = opts ? opts : {};
  Vue.directive('blue-photo-swiper', {
    inserted: function (el, binding) {
      setTimeout(function () {
        photoDirective(opts, el, binding);
      }, 0);
    },
    update: function (el, binding) {
      setTimeout(function () {
        photoDirective(opts, el, binding);
      }, 0);
    }
  });
};

module.exports = {
  photoSwipe,
  photoSwipeComponent
};

