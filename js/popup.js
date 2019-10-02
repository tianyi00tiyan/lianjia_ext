const BG = chrome.extension.getBackgroundPage(); //获得BG
const ALL_TABS = true; //是否所有的tab都要通知

/**
 * 初始化界面
 */
function init() {
    render()
}

/**
 * 绑定事件
 */
function bindEvent() {
    //开始计算
    $('#startBtn').on('click', function (evt) {
        BG.START = !BG.START;
        BG.sendMessage("BG.START", BG.START);
        render();
    })
}

/**
 * 更新页面
 */
function render() {
    $('#startBtn').html(BG.START == false ? "START" : "STOP");
}

/**
 * 入口函数
 */
function popup() {
    init();
    bindEvent();
}

popup();

