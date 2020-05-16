/*!
* web Studio Code - 🎉 An Editor Used on the Browser Side.
* git+https://github.com/yelloxing/Web-Studio-Code.git
*
* author 心叶
*
* version 1.3.4
*
* build Fri May 08 2020
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Sat May 16 2020 15:11:50 GMT+0800 (GMT+08:00)
*/

"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

  var _dictionary;

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }
  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */


  function isPlainObject(value) {
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }
  /**
   * 判断一个值是不是结点元素。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isElement(value) {
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }
  /**
   * 判断一个值是不是Object。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */


  function isObject(value) {
    var type = _typeof(value);

    return value != null && (type === 'object' || type === 'function');
  }
  /**
   * 判断一个值是不是Function。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
  } // 计算文字长度


  function textWidth(text) {
    this.__helpDOM.innerText = text;
    return this.__helpDOM.offsetWidth;
  } // 计算最佳光标左边位置


  function bestLeftNum(x) {
    var text = this._contentArray[this.__lineNum];
    if (x <= 40) return 0;
    if (x - 40 >= this.$$textWidth(text)) return text.length;
    var dist = x - 40,
        i = 1;

    for (; i < text.length; i++) {
      var tempDist = Math.abs(x - 40 - this.$$textWidth(text.substr(0, i)));
      if (tempDist > dist) break;
      dist = tempDist;
    }

    return i - 1;
  } // 计算光标对应的x,y值


  function calcCanvasXY(leftNum, lineNum) {
    return {
      x: this.$$textWidth(this._contentArray[lineNum].substr(0, leftNum)),
      y: lineNum * 21
    };
  }

  var xhtml = {
    // 阻止冒泡
    "stopPropagation": function stopPropagation(event) {
      event = event || window.event;

      if (event.stopPropagation) {
        //这是其他非IE浏览器
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    // 阻止默认事件
    "preventDefault": function preventDefault(event) {
      event = event || window.event;

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    // 绑定事件
    "bind": function bind(el, eventType, callback) {
      if (window.attachEvent) {
        el.attachEvent("on" + eventType, callback); // 后绑定的先执行
      } else {
        el.addEventListener(eventType, callback, false); // 捕获
      }
    },
    // 触发事件
    "trigger": function trigger(dom, eventType) {
      var event; //创建event的对象实例。

      if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        event = document.createEventObject();
        dom.fireEvent('on' + eventType, event);
      } // 其他标准浏览器使用dispatchEvent方法
      else {
          event = document.createEvent('HTMLEvents'); // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为

          event.initEvent(eventType, true, false);
          dom.dispatchEvent(event);
        }
    },
    // 变成结点
    "toNode": function toNode(template) {
      var frame = document.createElement("div");
      frame.innerHTML = template;
      var childNodes = frame.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        if (isElement(childNodes[i])) return childNodes[i];
      }

      return null;
    },
    // 结点
    "appendTo": function appendTo(el, template) {
      var node = isElement(template) ? template : this.toNode(template);
      el.appendChild(node);
      return node;
    },
    // 修改样式
    "css": function css(el, styles) {
      for (var key in styles) {
        el.style[key] = styles[key];
      }
    },
    // 修改属性
    "attr": function attr(el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },
    // 获取鼠标相对特定元素左上角位置
    "position": function position(el, event) {
      event = event || window.event; // 返回元素的大小及其相对于视口的位置

      var bounding = el.getBoundingClientRect();
      if (!event || !event.clientX) throw new Error('Event is necessary!');
      var temp = {
        // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
        "x": event.clientX - bounding.left + el.scrollLeft,
        "y": event.clientY - bounding.top + el.scrollTop
      };
      return temp;
    }
  }; // 初始化结点

  function initDom() {
    var _this = this;

    xhtml.css(this._el, {
      "font-size": "12px",
      position: "relative",
      cursor: "text",
      "font-family": this._fontFamily,
      "background": this._colorBackground,
      overflow: "auto"
    });
    xhtml.bind(this._el, 'click', function () {
      _this.__focusDOM.focus();
    }); // 辅助标签

    this.__helpDOM = xhtml.appendTo(this._el, "<span></span>");
    xhtml.css(this.__helpDOM, {
      position: "absolute",
      "z-index": "-1",
      "white-space": "pre",
      "top": 0,
      "left": 0,
      "font-weight": this._fontWeight
    }); // 光标

    this.__focusDOM = xhtml.appendTo(this._el, "<textarea></textarea>");
    xhtml.css(this.__focusDOM, {
      position: "absolute",
      width: "6px",
      "margin-top": "3px",
      height: "15px",
      "line-height": "15px",
      resize: "none",
      overflow: "hidden",
      padding: "0",
      outline: "none",
      border: "none",
      background: "rgba(0,0,0,0)",
      color: this._colorCursor
    });
    xhtml.attr(this.__focusDOM, {
      wrap: "off",
      autocorrect: "off",
      autocapitalize: "off",
      spellcheck: "false"
    }); // 显示区域

    this.__showDOM = xhtml.appendTo(this._el, "<div></div>");
    xhtml.css(this.__showDOM, {
      padding: "10px 0"
    }); // 选中区域

    this.__selectCanvas = xhtml.appendTo(this._el, "<canvas></canvas>");
    xhtml.css(this.__selectCanvas, {
      position: "absolute",
      left: "40px",
      top: "10px"
    });
    this.$$updateCanvasSize(1, 1);
  } // 初始化视图


  function initView() {
    // 初始化定位光标位置
    xhtml.css(this.__focusDOM, {
      left: 40 + this.$$textWidth(this._contentArray[this.__lineNum]) + "px",
      top: 10 + this.__lineNum * 21 + "px"
    });

    this.__focusDOM.focus();
  } // 更新编辑器内容视图


  function updateView() {
    var _this2 = this;

    var template = "";

    this.__formatData.forEach(function (line, index) {
      var bgcolor = "";

      if (index == _this2.__lineNum) {
        bgcolor = "background-color:" + _this2._colorEdit;
      }

      template += "<div style='min-width: fit-content;white-space: nowrap;line-height:21px;height:21px;" + bgcolor + "'>";
      template += "<em style='color:" + _this2._colorNumber + ";user-select: none;display:inline-block;font-style:normal;width:35px;text-align:right;margin-right:5px;'>" + (index + 1) + "</em>";
      line.forEach(function (text) {
        var contentText = text.content; // 提前对特殊字符进行处理

        contentText = contentText.replace(/\&/g, "&amp;");
        /*[&]*/

        contentText = contentText.replace(/</g, "&lt;");
        contentText = contentText.replace(/>/g, "&gt;");
        /*[<,>]*/

        template += "<span style='user-select: none;font-weight:" + _this2._fontWeight + ";white-space: pre;color:" + text.color + "'>" + contentText + "</span>";
      });
      template += "</div>";
    });

    this.__showDOM.innerHTML = template;
  } // 更新编辑器选中视图


  function updateSelectView() {
    var _this3 = this;

    var ctx = this.__selectCanvas.getContext('2d');

    ctx.fillStyle = this._colorSelect;
    ctx.clearRect(0, 0, this.__selectCanvas.scrollWidth, this.__selectCanvas.scrollHeight); // 绘制二个区间

    var drawerSelect = function drawerSelect(beginLeftNum, endLeftNum, lineNum) {
      var xy1 = _this3.$$calcCanvasXY(beginLeftNum, lineNum);

      var xy2 = _this3.$$calcCanvasXY(endLeftNum, lineNum);

      ctx.fillRect(xy1.x, xy1.y, xy2.x - xy1.x, 21);
    }; // 如果选中区域为空，不用绘制


    if (this.__cursor1.lineNum == this.__cursor2.lineNum && this.__cursor1.leftNum == this.__cursor2.leftNum) return;
    ctx.beginPath(); // 如果在一行

    if (this.__cursor1.lineNum == this.__cursor2.lineNum) {
      drawerSelect(this.__cursor1.leftNum, this.__cursor2.leftNum, this.__cursor1.lineNum);
    } // 如果选中的多于一行
    else {
        var beginCursor, endCursor;

        if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
          beginCursor = this.__cursor1;
          endCursor = this.__cursor2;
        } else {
          beginCursor = this.__cursor2;
          endCursor = this.__cursor1;
        } // 绘制开始的结尾


        drawerSelect(beginCursor.leftNum, this._contentArray[beginCursor.lineNum].length, beginCursor.lineNum); // 绘制结束的开头

        drawerSelect(0, endCursor.leftNum, endCursor.lineNum); // 绘制两行之间

        for (var lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
          drawerSelect(0, this._contentArray[lineNum].length, lineNum);
        }
      }
  } // 输入的时候更新光标位置


  function updateCursorPosition(text) {
    xhtml.css(this.__focusDOM, {
      top: this.__lineNum * 21 + 10 + "px",
      left: 40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum)) + "px"
    });
  } // 更新画布尺寸


  function updateCanvasSize(width, height) {
    if (arguments.length < 2) {
      width = this._el.scrollWidth - 40;
      height = this._el.scrollHeight - 10;
    }

    xhtml.css(this.__selectCanvas, {
      width: width + "px",
      height: height + "px"
    });
    xhtml.attr(this.__selectCanvas, {
      width: width,
      height: height
    });
  } // 取消选区


  function cancelSelect() {
    this.$$updateCanvasSize(1, 1);
    this.__cursor1 = {
      leftNum: 0,
      lineNum: 0
    };
    this.__cursor2 = {
      leftNum: 0,
      lineNum: 0
    };
  } // 字典表


  var dictionary = (_dictionary = {
    // 数字
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    96: [0, 0],
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    // 字母
    65: ["a", "A"],
    66: ["b", "B"],
    67: ["c", "C"],
    68: ["d", "D"],
    69: ["e", "E"],
    70: ["f", "F"],
    71: ["g", "G"],
    72: ["h", "H"],
    73: ["i", "I"],
    74: ["j", "J"],
    75: ["k", "K"],
    76: ["l", "L"],
    77: ["m", "M"],
    78: ["n", "N"],
    79: ["o", "O"],
    80: ["p", "P"],
    81: ["q", "Q"],
    82: ["r", "R"],
    83: ["s", "S"],
    84: ["t", "T"],
    85: ["u", "U"],
    86: ["v", "V"],
    87: ["w", "W"],
    88: ["x", "X"],
    89: ["y", "Y"],
    90: ["z", "Z"],
    // 方向
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",
    // 控制键
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "command",
    92: "command",
    93: "command",
    9: "tab",
    20: "caps lock",
    32: "spacebar",
    8: "backspace",
    13: "enter",
    27: "esc",
    46: "delete",
    45: "insert",
    144: "number lock",
    145: "scroll lock",
    12: "clear"
  }, _defineProperty(_dictionary, "45", "insert"), _defineProperty(_dictionary, 19, "pause"), _defineProperty(_dictionary, 112, "f1"), _defineProperty(_dictionary, 113, "f2"), _defineProperty(_dictionary, 114, "f3"), _defineProperty(_dictionary, 115, "f4"), _defineProperty(_dictionary, 116, "f5"), _defineProperty(_dictionary, 117, "f6"), _defineProperty(_dictionary, 118, "f7"), _defineProperty(_dictionary, 119, "f8"), _defineProperty(_dictionary, 120, "f9"), _defineProperty(_dictionary, 121, "f10"), _defineProperty(_dictionary, 122, "f11"), _defineProperty(_dictionary, 123, "f12"), _defineProperty(_dictionary, 189, ["-", "_"]), _defineProperty(_dictionary, 187, ["=", "+"]), _defineProperty(_dictionary, 219, ["[", "{"]), _defineProperty(_dictionary, 221, ["]", "}"]), _defineProperty(_dictionary, 220, ["\\", "|"]), _defineProperty(_dictionary, 186, [";", ":"]), _defineProperty(_dictionary, 222, ["'", '"']), _defineProperty(_dictionary, 188, [",", "<"]), _defineProperty(_dictionary, 190, [".", ">"]), _defineProperty(_dictionary, 191, ["/", "?"]), _defineProperty(_dictionary, 192, ["`", "~"]), _dictionary); // 非独立键字典

  var help_key = ["shift", "ctrl", "alt"];
  /**
   * 键盘按键
   * 返回键盘此时按下的键的组合结果
   * @since V0.2.5
   * @public
   */

  function keyString(event) {
    event = event || window.event;
    var keycode = event.keyCode || event.which;
    var key = dictionary[keycode] || keycode;
    if (!key) return;
    if (key.constructor !== Array) key = [key, key];
    var shift = event.shiftKey ? "shift+" : "",
        alt = event.altKey ? "alt+" : "",
        ctrl = event.ctrlKey ? "ctrl+" : "";
    var resultKey = "",
        preKey = ctrl + shift + alt;

    if (help_key.indexOf(key[0]) >= 0) {
      key[0] = key[1] = "";
    } // 判断是否按下了caps lock


    var lockPress = event.code == "Key" + event.key && !shift; // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写

    resultKey = preKey + (preKey == '' && lockPress ? key[1] : key[0]);

    if (key[0] == "") {
      resultKey = resultKey.replace(/\+$/, '');
    }

    return resultKey;
  } // 绑定键盘和鼠标等交互事件处理


  function bindEvent() {
    var _this4 = this;

    var mouseDown = false; // 辅助计算选择光标位置

    var calcCursor = function calcCursor(event) {
      var position = xhtml.position(_this4._el, event);
      var topIndex = Math.round((position.y - 20.5) / 21);
      if (topIndex < 0) topIndex = 0;
      if (topIndex >= _this4._contentArray.length) topIndex = _this4._contentArray.length - 1;
      return {
        leftNum: _this4.$$bestLeftNum(position.x),
        lineNum: topIndex
      };
    }; // 鼠标按下的时候，记录开始光标位置并标记鼠标按下动作


    xhtml.bind(document, 'mousedown', function (event) {
      mouseDown = true;
      _this4.__cursor2 = _this4.__cursor1 = calcCursor(event);

      _this4.$$updateCanvasSize(); // 绘制选中效果


      _this4.$$updateSelectView();
    }); // 移动的时候不停的同步结束光标位置

    xhtml.bind(document, 'mousemove', function (event) {
      if (!mouseDown) return;
      _this4.__cursor2 = calcCursor(event); // 绘制选中效果

      _this4.$$updateSelectView();
    }); // 鼠标分开或移出的时候，标记鼠标放开

    xhtml.bind(document, 'mouseup', function () {
      return mouseDown = false;
    });
    xhtml.bind(document, 'mouseout', function () {
      return mouseDown = false;
    }); // 点击编辑界面

    xhtml.bind(this._el, 'click', function (event) {
      var position = xhtml.position(_this4._el, event);
      var topIndex = Math.round((position.y - 20.5) / 21); // 如果超过了内容区域

      if (topIndex < 0 || topIndex >= _this4._contentArray.length) return;
      _this4.__lineNum = topIndex;
      _this4.__leftNum = _this4.$$bestLeftNum(position.x);

      _this4.$$updateCursorPosition();

      _this4.$$updateView();
    });

    var update = function update(text) {
      // 获取输入内容
      text = text || _this4.__focusDOM.value;
      _this4.__focusDOM.value = ""; // 如果输入的是回车，切割文本

      if (/^\n$/.test(text)) {
        if (_this4.__leftNum >= _this4._contentArray[_this4.__lineNum].length) {
          _this4._contentArray.splice(_this4.__lineNum + 1, 0, "");
        } else {
          _this4._contentArray.splice(_this4.__lineNum + 1, 0, _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum));

          _this4._contentArray[_this4.__lineNum] = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum);
        }

        _this4.__lineNum += 1;
        _this4.__leftNum = 0;
      } // 否则就是一堆文本（包括复制来的）
      else {
          var textArray = text.split(/\n/); // 如果只有一行文本(分开是为了加速)

          if (textArray.length <= 1) {
            _this4._contentArray[_this4.__lineNum] = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum) + text + _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum);
            _this4.__leftNum += text.length;
          } // 如果是复制的多行文本
          else {
              var _this4$_contentArray;

              // 需要切割的行两边文本
              var leftText = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum);

              var rightText = _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum); // 旧行文本拼接进来


              textArray[0] = leftText + textArray[0];
              textArray[textArray.length - 1] += rightText; // 新内容记录下来

              (_this4$_contentArray = _this4._contentArray).splice.apply(_this4$_contentArray, [_this4.__lineNum, 1].concat(_toConsumableArray(textArray)));

              _this4.__lineNum += textArray.length - 1;
              _this4.__leftNum = textArray[textArray.length - 1].length - rightText.length;
            }
        } // 着色并更新视图


      _this4.__formatData = _this4.$shader(_this4._contentArray.join('\n'), _this4._langColors);

      _this4.$$updateCursorPosition();

      _this4.$$updateView();
    }; // 中文输入开始


    xhtml.bind(this.__focusDOM, 'compositionstart', function () {
      _this4.__needUpdate = false;
      _this4.__focusDOM.style.color = "rgba(0,0,0,0)";
      _this4.__focusDOM.style.borderLeft = '1px solid ' + _this4._colorCursor;
    }); // 中文输入结束

    xhtml.bind(this.__focusDOM, 'compositionend', function () {
      _this4.__needUpdate = true;
      _this4.__focusDOM.style.color = _this4._colorCursor;
      _this4.__focusDOM.style.borderLeft = "none";
      update();
    }); // 输入

    xhtml.bind(this.__focusDOM, 'input', function () {
      // 如果是中文输入开始，不应该更新
      if (_this4.__needUpdate) update();
    }); // 处理键盘控制

    xhtml.bind(this._el, 'keydown', function (event) {
      switch (keyString(event)) {
        case "tab":
          {
            // tab用来控制输入多个空格，默认事件需要禁止
            xhtml.stopPropagation(event);
            xhtml.preventDefault(event); // 计算空格

            var blanks = "";

            for (var i = 0; i < _this4._tabSpace; i++) {
              blanks += " ";
            }

            update(blanks);
            break;
          }

        case "up":
          {
            // 如果是第一行不需要任何处理
            if (_this4.__lineNum <= 0) return; // 向上一行

            _this4.__lineNum -= 1;
            _this4.__leftNum = _this4.$$bestLeftNum(_this4.$$textWidth(_this4._contentArray[_this4.__lineNum + 1].substr(0, _this4.__leftNum)) + 40);

            _this4.$$updateCursorPosition();

            _this4.$$updateView();

            _this4._el.scrollTop -= 21;
            break;
          }

        case "down":
          {
            if (_this4.__lineNum >= _this4._contentArray.length - 1) return; // 向下一行

            _this4.__lineNum += 1;
            _this4.__leftNum = _this4.$$bestLeftNum(_this4.$$textWidth(_this4._contentArray[_this4.__lineNum - 1].substr(0, _this4.__leftNum)) + 40);

            _this4.$$updateCursorPosition();

            _this4.$$updateView();

            _this4._el.scrollTop += 21;
            break;
          }

        case "left":
          {
            if (_this4.__leftNum <= 0) {
              if (_this4.__lineNum <= 0) return;
              _this4.__lineNum -= 1;
              _this4.__leftNum = _this4._contentArray[_this4.__lineNum].length;
            } else {
              _this4.__leftNum -= 1;
            }

            _this4.$$updateCursorPosition();

            break;
          }

        case "right":
          {
            if (_this4.__leftNum >= _this4._contentArray[_this4.__lineNum].length) {
              if (_this4.__lineNum >= _this4._contentArray.length - 1) return;
              _this4.__lineNum += 1;
              _this4.__leftNum = 0;
            } else {
              _this4.__leftNum += 1;
            }

            _this4.$$updateCursorPosition();

            break;
          }

        case "backspace":
          {
            // 如果有选区
            if (_this4.__cursor1.lineNum != _this4.__cursor2.lineNum || _this4.__cursor1.leftNum != _this4.__cursor2.leftNum) {
              // 假定cursor2是结束光标
              var beginCursor = _this4.__cursor2,
                  endCursor = _this4.__cursor1; // 根据行号来校对

              if (_this4.__cursor1.lineNum < _this4.__cursor2.lineNum) {
                beginCursor = _this4.__cursor1;
                endCursor = _this4.__cursor2;
              } else if (_this4.__cursor1.lineNum == _this4.__cursor2.lineNum) {
                // 根据列号来校对
                if (_this4.__cursor1.leftNum < _this4.__cursor2.leftNum) {
                  beginCursor = _this4.__cursor1;
                  endCursor = _this4.__cursor2;
                }
              }

              var newLineText = _this4._contentArray[beginCursor.lineNum].substr(0, beginCursor.leftNum) + _this4._contentArray[endCursor.lineNum].substr(endCursor.leftNum);

              _this4._contentArray.splice(beginCursor.lineNum, endCursor.lineNum - beginCursor.lineNum + 1, newLineText); // 校对光标和选区


              _this4.__leftNum = _this4.__cursor1.leftNum = _this4.__cursor2.leftNum = beginCursor.leftNum;
              _this4.__lineNum = _this4.__cursor1.lineNum = _this4.__cursor2.lineNum = beginCursor.lineNum;
            } // 无选区的常规操作
            else {
                if (_this4.__leftNum <= 0) {
                  if (_this4.__lineNum <= 0) return;
                  _this4.__lineNum -= 1;
                  _this4.__leftNum = _this4._contentArray[_this4.__lineNum].length; // 一行的开头应该删除本行（合并到前一行）

                  _this4._contentArray[_this4.__lineNum] += _this4._contentArray[_this4.__lineNum + 1];

                  _this4._contentArray.splice(_this4.__lineNum + 1, 1);
                } else {
                  _this4.__leftNum -= 1;
                  _this4._contentArray[_this4.__lineNum] = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum) + _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum + 1);
                }
              } // 由于内容改变，需要重新调用着色


            _this4.__formatData = _this4.$shader(_this4._contentArray.join('\n'), _this4._langColors); // 更新视图

            _this4.$$updateCursorPosition();

            _this4.$$updateView();

            break;
          }
      }

      _this4.$$cancelSelect();
    });
  }

  function html_shader(textString, colors) {
    return [];
  }

  function html_format(textString) {
    return textString;
  }

  function css_shader(textString, colors) {
    return [];
  }

  function css_format(textString) {
    return textString;
  }

  function javascript_shader(textString, colors) {
    return [];
  }

  function javascript_format(textString) {
    return textString;
  }

  var wscode = function wscode(options) {
    var _this5 = this;

    /**
     * 
     * [格式化配置]
     * 
     * 所有的配置校验和默认值设置等都应该在这里进行
     * 经过这里处理以后，后续不需要再进行校验了
     * 因此这里的内容的更改一定要慎重
     * 
     */
    // 编辑器挂载点
    if (isElement(options.el)) {
      // 着色器
      var shader = {
        html: html_shader,
        css: css_shader,
        javascript: javascript_shader,
        normal: function normal() {
          var resultData = [];

          _this5._contentArray.forEach(function (text) {
            resultData.push([{
              content: text,
              color: _this5._colorText
            }]);
          });

          return resultData;
        }
      }; // 格式化

      var format = {
        html: html_format,
        css: css_format,
        javascript: javascript_format,
        normal: function normal(textString) {
          return textString;
        }
      };
      this._el = options.el; // 着色

      options.color = options.color || {};
      this._colorBackground = options.color.background || "#d6d6e4";
      /*编辑器背景*/

      this._colorText = options.color.text || "#000000";
      /*普通文本颜色*/

      this._colorNumber = options.color.number || "#888484";
      /*行号颜色*/

      this._colorEdit = options.color.edit || "#eaeaf1";
      /*编辑行颜色*/

      this._colorCursor = options.color.cursor || "#ff0000";
      /*光标颜色*/

      this._colorSelect = options.color.select || "#6c6cf155";
      /*选择背景*/

      this._fontFamily = options["font-family"] || "新宋体";
      /*字体*/

      this._fontWeight = options["font-weight"] || 600;
      /*字重*/

      this._tabSpace = options.tabSpace || 4;
      /*设置一个tab表示多少个空格*/
      // 语言类型

      var lang = options.lang || {};
      this._langType = lang.type || "normal";
      /*默认普通文本*/

      this._langColors = lang.color || {};
      this._langColors.text = this._colorText; // 文本

      this._contentArray = isString(options.content) ? (options.content + "").split("\n") : [""]; // 着色方法

      this.$shader = isFunction(options.shader) ? options.shader : shader[this._langType]; // 格式化方法

      this.$format = isFunction(options.format) ? options.format : format[this._langType];
    } else {
      // 挂载点是必须的，一定要有
      throw new Error('options.el is not a element!');
    } // 先初始化DOM


    this.$$initDom(); // 初始化控制变量

    this.__needUpdate = true;
    this.__lineNum = this._contentArray.length - 1;
    this.__leftNum = this._contentArray[this.__lineNum].length;
    this.__formatData = this.$shader(this._contentArray.join('\n'), this._langColors); // 初始化视图

    this.$$initView(); // 更新视图

    this.$$updateView(); // 绑定操作

    this.$$bindEvent();

    this.valueOf = function () {
      return _this5._contentArray.join('\n');
    };

    this.format = function () {
      // 格式化内容
      _this5._contentArray = _this5.$format(_this5._contentArray.join('\n')).split('\n');
      _this5.__lineNum = _this5._contentArray.length - 1;
      _this5.__leftNum = _this5._contentArray[_this5.__lineNum].length; // 着色

      _this5.__formatData = _this5.$shader(_this5._contentArray.join('\n'), _this5._langColors); // 更新视图

      _this5.$$updateView(); // 更新光标位置


      _this5.$$initView();
    };
  }; // 挂载辅助方法


  wscode.prototype.$$textWidth = textWidth;
  wscode.prototype.$$bestLeftNum = bestLeftNum;
  wscode.prototype.$$calcCanvasXY = calcCanvasXY; // 挂载核心方法

  wscode.prototype.$$initDom = initDom;
  wscode.prototype.$$initView = initView;
  wscode.prototype.$$updateView = updateView;
  wscode.prototype.$$updateSelectView = updateSelectView;
  wscode.prototype.$$updateCursorPosition = updateCursorPosition;
  wscode.prototype.$$updateCanvasSize = updateCanvasSize;
  wscode.prototype.$$cancelSelect = cancelSelect;
  wscode.prototype.$$bindEvent = bindEvent;
  wscode.author = '心叶（yelloxing@gmail.com）';

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = wscode;
  } else {
    window.WSCode = wscode;
  }
})();