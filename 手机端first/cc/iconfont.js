;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xinpin" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M987.040227 533.208021c-15.951297-18.618033-12.414751-26.620287 0.946558-42.956348 69.210291-84.715427 31.695886-201.787796-74.549903-229.603305-26.705222-6.985088-38.046524-14.813381-28.855188-37.193087 2.7793-107.394962-100.818173-179.659823-201.706955-142.115742-23.696702 8.815783-32.079626 6.967692-46.298466-13.8351-61.223387-89.51064-188.549284-89.590458-249.311159 0.046049-14.452153 21.301142-23.542182 22.161742-46.412053 13.934361C237.452064 44.25697 132.728954 117.844965 139.7693 223.74283c1.77339 26.523073-6.729262 30.735002-29.426193 36.823674C4.276397 289.070698-34.411741 407.945109 35.925211 490.360144c15.470343 18.122753 13.656021 25.996071-0.449231 43.293015-70.264297 86.130659-30.090319 202.612581 79.444377 230.942813 20.222577 5.229095 26.622334 9.243525 25.279756 31.722492-6.747681 112.213711 95.963609 184.443779 205.301829 144.713916 20.502963-7.474228 27.513634-5.580089 39.59888 12.369725 63.320141 94.021374 190.484356 93.63968 253.871011-0.98749 12.648065-18.87386 19.97596-18.475793 39.682791-11.110035 108.264772 40.473807 214.389812-35.933397 204.702172-147.361209-1.785669-20.577664 3.608178-23.863501 22.703071-28.612665C1018.622526 737.38626 1060.33658 618.766652 987.040227 533.208021L987.040227 533.208021zM214.635405 718.206432l-58.778708-168.94376c-5.087878-14.650675 0.203638-24.951275 15.841803-30.860868 8.909927-1.166569 16.83134 0.137123 23.727401 3.870144l145.282874 92.081185 1.251503-0.417509-39.036062-112.223944c-5.094018-14.651698 0.197498-24.952298 15.841803-30.878265 15.357779-4.114714 25.991977 1.051959 31.94148 15.429411l58.742892 168.944783c4.002151 14.153348-1.552356 23.656793-16.633842 28.532847-8.382924 2.726088-16.021905 2.201132-22.930245-1.595334l-144.886855-90.8788-1.251503 0.399089 38.621623 111.074771c3.984754 14.159488-1.556449 23.656793-16.633842 28.556383C229.830479 736.462215 219.448014 732.094744 214.635405 718.206432L214.635405 718.206432zM436.72048 645.099391 379.972011 481.959823c-5.638417-16.216333-0.629333-27.260877 15.033391-33.18889l80.432891-26.002211c13.674441-3.587712 23.494087 0.560772 29.479405 12.350283 3.127224 14.431687-2.000564 23.819498-15.392572 28.157293l-56.562227 18.285458 14.895245 42.813085 52.79339-17.053398c14.799054-3.062755 25.146727 1.304715 31.133068 13.101389 2.858094 13.662161-2.661619 23.165606-16.633842 28.532847l-52.79339 17.076934 15.693424 45.113477 59.089793-19.082614c14.518668-3.824095 24.338315 0.318248 29.479405 12.340049 3.127224 14.425547-2.001587 23.813359-15.392572 28.151154l-82.951247 26.829042C452.885648 663.515832 442.371176 658.731876 436.72048 645.099391L436.72048 645.099391zM615.609753 588.558653l-97.827049-148.5902c-2.762927-2.520403-4.380774-5.847172-4.878101-10.024308-3.193739-11.831466 2.068102-20.802792 15.788591-26.954909 13.392008-4.321422 24.752754 0.155543 34.046421 13.44829l69.851904 116.436896 1.276063-0.415462-3.608178-143.006018c0.430812-12.131295 6.812149-20.647249 19.113313-25.476231 12.001335-3.02694 22.385846 0.063445 31.168883 9.213849l86.551238 116.210745 1.276063-0.409322-15.823384-133.8945c-3.145643-14.442944 2.696412-24.483624 17.507746-30.127158 13.919011-2.77316 23.744797 1.322112 29.460985 12.340049 1.360997 3.886517 2.115174 7.503904 2.366907 10.837836l16.134469 175.003779c-1.041726 15.783475-9.106402 26.1291-24.187889 30.970362-16.784268 5.436826-29.92966 2.408863-39.534412-9.081843l-77.537957-102.362342 2.13257 126.764102c-1.305739 15.003715-9.490142 24.934902-24.590048 29.810956C636.677581 604.913133 623.765503 601.37147 615.609753 588.558653L615.609753 588.558653zM615.609753 588.558653"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)