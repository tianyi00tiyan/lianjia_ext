const BG = chrome.extension.getBackgroundPage(); //获得BG
var TIMER = ""; //计时器

/**
 * 初始化界面
 */
function init() {
    TIMER =  setInterval(() => {
        render();
    }, 1000);
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
        BG.RESULT = undefined;
        BG.START_TIME = new Date().getTime();
        BG.sendMessage("BG.START", BG.START);
    })
}


/**
 * 更新页面
 */
function render() {
    $('#startBtn').html(BG.START == false ? "START" : "COST：" + (parseInt(new Date().getTime() - BG.START_TIME)/1000) + 's');

    if (BG.RESULT) {
        const {city_name, district_name, avgUnitPrice, toalHouse, succeed } = BG.RESULT;
        $('#result').html(succeed ? `${city_name}${district_name}${toalHouse}套房子的平均单价是${avgUnitPrice}` : "ERROR！！！!")
    } else {
        $('#result').html("开始后会进行统计，结果会在这里显示")
    }
}

/**
 * 入口函数
 */
function popup() {
    init();
    bindEvent();
}

popup();

