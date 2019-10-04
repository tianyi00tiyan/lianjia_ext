const BG = chrome.extension.getBackgroundPage(); //获得BG

var TIMER = "";
var startTime = "";

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
        if (BG.START) {
            return;
        }
        BG.START = true;
        startTime = new Date().getTime();
        BG.sendMessage("BG.START", BG.START);
        TIMER =  setInterval(() => {
            render();
        }, 1000);
       
    })
}

/**
 * 接受前后台通知的消息
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch (request.type) {
		case "FN.collectData":
            BG.START = false;
            clearInterval(TIMER);
            render();
			break;
		default:
			break;
	}
});

/**
 * 更新页面
 */
function render() {
    $('#startBtn').html(BG.START == false ? "START" : "耗时：" + (parseInt(new Date().getTime() - startTime)/1000) + 's');
}

/**
 * 入口函数
 */
function popup() {
    init();
    bindEvent();
}

popup();

