import keyString from '@yelloxing/core.js/tools/keyString';
import xhtml from '../xhtml';

// 绑定键盘和鼠标等交互事件处理

export default function () {

    // 点击编辑界面
    xhtml.bind(this._el, 'click', event => {

        let position = xhtml.position(this._el, event);
        let topIndex = Math.round((position.y - 20.5) / 21);

        // 如果超过了内容区域
        if (topIndex < 0 || topIndex >= this._contentArray.length) return;

        this.__lineNum = topIndex;

        this.__leftNum = this._contentArray[this.__lineNum].length;
        xhtml.css(this.__focusDOM, {
            left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
            top: (10 + this.__lineNum * 21) + "px",
        });

        this.$$updateView();
    });

    let update = text => {

        // 获取输入内容
        text = text || this.__focusDOM.value;
        this.__focusDOM.value = "";

        // 更新光标位置
        this.$$updateCursorPosition(text);

        if (/^\n$/.test(text)) {

            if (this.__leftNum >= this._contentArray[this.__lineNum].length) {
                this._contentArray.splice(this.__lineNum + 1, 0, "");
            } else {
                this._contentArray.splice(this.__lineNum + 1, 0, this._contentArray[this.__lineNum].substring(this.__leftNum));
                this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum);
            }
            this.__lineNum += 1;
            this.__leftNum = 0;

        } else {
            this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum) + text + this._contentArray[this.__lineNum].substring(this.__leftNum);
            this.__leftNum += text.length;
        }

        // 着色并更新视图

        this.__formatData = this.$shader(this._contentArray.join('\n'));
        this.$$updateView();

    };

    // 中文输入开始
    xhtml.bind(this.__focusDOM, 'compositionstart', () => {
        this.__needUpdate = false;
    });

    // 中文输入结束
    xhtml.bind(this.__focusDOM, 'compositionend', () => {
        this.__needUpdate = true;
        update();
    });

    // 输入
    xhtml.bind(this.__focusDOM, 'input', () => {
        // 如果是中文输入开始，不应该更新
        if (this.__needUpdate) update();
    });

    // 处理键盘控制
    xhtml.bind(this._el, 'keydown', event => {

        //  console.log(keyString(event));

        switch (keyString(event)) {

            case "tab": {

                // tab用来控制输入多个空格，默认事件需要禁止
                xhtml.stopPropagation(event);
                xhtml.preventDefault(event);

                // 四个空格
                update("    ");

                break;
            }

            case "up": {

                // 如果是第一行不需要任何处理
                if (this.__lineNum <= 0) return;

                // 向上一行回退
                this.__lineNum -= 1;
                this.__leftNum = this._contentArray[this.__lineNum].length;

                // 光标聚焦在改行结尾
                xhtml.css(this.__focusDOM, {
                    left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
                    top: (10 + this.__lineNum * 21) + "px",
                });

                // 更新编辑行背景
                this.$$updateView();

                this._el.scrollTop -= 21;

                break;
            }

            case "down": {

                if (this.__lineNum >= this._contentArray.length - 1) return;
                this.__lineNum += 1;
                this.__leftNum = this._contentArray[this.__lineNum].length;
                xhtml.css(this.__focusDOM, {
                    left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
                    top: (10 + this.__lineNum * 21) + "px",
                });
                this.$$updateView();

                this._el.scrollTop += 21;

                break;
            }

            case "left": {

                if (this.__leftNum <= 0) return;
                this.__leftNum -= 1;
                let leftP = this.__focusDOM.style.left.replace('px', '') - this.$$textWidth(this._contentArray[this.__lineNum][this.__leftNum]);
                this.__focusDOM.style.left = leftP + "px";

                break;
            }

            case "right": {

                if (this.__leftNum >= this._contentArray[this.__lineNum].length) return;
                this.__leftNum += 1;
                let leftP = this.__focusDOM.style.left.replace('px', '') - -this.$$textWidth(this._contentArray[this.__lineNum][this.__leftNum - 1]);
                this.__focusDOM.style.left = leftP + "px";

                break;
            }

            case "backspace": {

                if (this.__leftNum <= 0) {
                    if (this.__lineNum <= 0) return;
                    // 一行的结尾应该删除本行
                    this._contentArray.splice(this.__lineNum, 1);

                    this.__lineNum -= 1;
                    this.__leftNum = this._contentArray[this.__lineNum].length;
                    xhtml.css(this.__focusDOM, {
                        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
                        top: (10 + this.__lineNum * 21) + "px",
                    });

                } else {
                    this.__leftNum -= 1;
                    let leftP = this.__focusDOM.style.left.replace('px', '') - this.$$textWidth(this._contentArray[this.__lineNum][this.__leftNum]);
                    this.__focusDOM.style.left = leftP + "px";
                    this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum) + this._contentArray[this.__lineNum].substring(this.__leftNum + 1);
                }

                // 由于内容改变，需要重新调用着色
                this.__formatData = this.$shader(this._contentArray.join('\n'));

                // 更新视图
                this.$$updateView();

                break;
            }
        }

    });

};