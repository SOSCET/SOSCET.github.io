'use strict';

(function () {
  var typewriter = function typewriter(node, str) {
    var latency = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;

    node.innerHTML = "# &nbsp;";
    var pos = 0;
    var currentEvent = node.getAttribute('next_event');
    var interval = setInterval(function () {
      node.innerHTML = node.innerText + str[pos++];
      if (pos == str.length) clearInterval(interval);
    }, latency);
    return interval;
  };

  /**
   * Event Controller
   */
  (function () {
    var navBox = document.querySelector('.nav-box');
    var balloon = navBox.querySelector('.balloon');
    var xiaomi = navBox.querySelector('#xiaomi');
    var content = balloon.querySelector('.balloon-content');

    // States of chatting
    var States = {
      init: {
        getIn: function getIn() {
          //content.innerText = "摸摸頭！";
          States.init.interrupt = typewriter(content, "摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！摸摸頭！");
          xiaomi.setAttribute('next_event', 'intro');
        },
        getOut: function getOut() {
          xiaomi.setAttribute('next_event', '');
          if (States.init.interrupt != undefined) clearInterval(States.init.interrupt);
        }
      },
      intro: {
        getIn: function getIn() {
          States.intro.interrupt = [typewriter(content, "你好～我是來自東部開源學生社群的小彌，我們是由一群喜歡資訊的學生組成的開源社群，每個月都會聚會聊資訊談技術、分享經驗，如果你也是同樣熱愛資訊的夥伴，歡迎參加定期聚"), setTimeout(function () {
            xiaomi.click();console.log(1);
          }, 8500)];
          xiaomi.setAttribute('next_event', 'nav');
        },
        getOut: function getOut() {
          if (States.intro.interrupt != undefined) {
            clearInterval(States.intro.interrupt[0]);
            clearTimeout(States.intro.interrupt[1]);
          }
        }
      },
      nav: {
        getIn: function getIn() {
          content.innerHTML = '$ \u5C0E\u89BD\n            <ul>\n              <li><a href="https://fb.me/SOSCET/">Facebook \u7C89\u7D72\u5718</a></li>\n              <li><a href="#open-source">\u8A8D\u8B58\u958B\u6E90</a></li>\n              <li><a href="#events">\u8FD1\u671F\u6D3B\u52D5</a></li>\n            </ul>';
        }
      }
    };

    // initial state
    States.init.getIn();
    var currentState = States.init;

    // bind event to container, emit event according to 'next_event' attribute
    navBox.addEventListener('click', function (e) {
      var target = e.target;
      console.log(target);
      var next = target.getAttribute('next_event');
      if (next != undefined && States[next] != null && next != '') {
        if (currentState.getOut) currentState.getOut();
        if (States[next].getIn()) States[next].getIn();
        currentState = States[next];
      }

      e.stopPropagation();
    });
  })();

  /**
   * Event Crawler for KKTIX
   */
  (function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://soscet.kktix.cc/events.json');
    xhr.send(null);
    xhr.addEventListener('load', function () {
      var eventsNode = document.querySelector('#events').querySelector('p');
      var data = JSON.parse(xhr.response);

      console.log(eventsNode);
      console.log(data);

      var events = [];
      var t = data.entry;
      for (var i = 0; i < 10; ++i) {
        events.push('<li><a href="' + t[i].url + '">' + t[i].title + '</a></li>');
      }

      eventsNode.innerHTML = eventsNode.innerHTML + '<ul>' + events.join('<br>') + '</ul>';
    });
  })();
})();
//# sourceMappingURL=../../main.js.map
