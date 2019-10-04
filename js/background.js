/**
 * 需要在后台设计记录当前配置状态
 */
var START = false; //是否开始
var START_TIME = ""; //开始时间
var RESULT = undefined; //查询结果

/**
 * 绑定事件
 */
// function bindEvent() {
//     /**
//      * 监听网络请求和发送网络请求完毕信号
//      * Request URL: https://wf.lianjia.com/chengjiao/
//      */
//     chrome.webRequest.onCompleted.addListener(function(details) {
//             //通知加载完毕
//             // sendMessage("BG.onCompleted");


//             console.log("BG.onCompleted")

//             sendMessage("BG.START", START);
//         },
//         {urls: [ "https://wf.lianjia.com/chengjiao/*" ]}
//     );
// }


/**
 * 向前台发送消息
 */
function sendMessage(type, value) {
    chrome.tabs.query({url: "https://wf.lianjia.com/chengjiao/*" }, function(tabs) {
        for (let index = 0; index < tabs.length; index++) {
            chrome.tabs.sendMessage(tabs[index].id, {type: type, value: value});
        }
    });
}

/**
 * 接受前台通知的消息
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch (request.type) {
		case "FN.INIT":
            START = false; //是否开始
            RESULT = undefined;
            break;
        case "FN.collectData":
            START = false;
            RESULT = request.value;
            break;
		default:
			break;
	}
});

/**
 * 入口函数
 */
function background() {
    // bindEvent();
}

background();