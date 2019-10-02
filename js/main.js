/**
 * 在链家成交页 例如https://wf.lianjia.com/chengjiao/ 
 * 统计分析成交数据，并可视化
 * 
 * TODO：
 * 1.实现成交数据的获取
 * 2.数据分析
 * 3.数据可视化
 * 
 * @author t.zhou
 */

var isSTART = false; //是否开始
var totalPage = 1; // 所有的页面
var curPage = 1; // 当前的页面
var region = ""; //当前的区域

/**
 * 绑定每个图片的点击事件
 */
// function bindEvent(dom) {
// 	let children = dom.children();

// 	//为每一个图片绑定点击事件
// 	children.on("click", function (evt) {
// 		if (!canUse) {
// 			return;
// 		}

// 		let urls = [];
// 		let tartget  = evt.currentTarget;
// 		let index = $(tartget).index();
// 		let imgs = $(tartget).parent().children();

// 		//阻止事件冒泡和<a>标签默认行为
// 		evt.stopPropagation();
// 		evt.preventDefault();

// 		//获得当前文章的所有图片链接
// 		for (let index = 0; index < imgs.length; index++) {
// 			const element = imgs[index];
// 			urls.push($(element).attr('style').match(/http(\S)*jpg/g)[0])
// 		}

// 		showSwiper(dourls(urls), index);
// 	});

// 	//绑定弹层关闭的事件
// 	$('.swiper').on('click', function (evt) {
// 		//阻止事件冒泡
// 		evt.stopPropagation();
// 	});
// 	$('body').on('click', function (evt) {
// 		if (!isShow) return;

// 		hideSwiper();
// 	});
// }

/**
 * 初始化滑动播放的窗体
 */
// function initSwiper() {
// 	//如果有就不需要重复绘制
// 	if ($('.swiper').length) {
// 		return
// 	}

// 	//引入样式
// 	var $linkTag = $('<link href="https://www.swiper.com.cn/dist/css/swiper.min.css" rel="stylesheet" type="text/css" charset="utf-8"/>');
// 	$('head').append($linkTag);
	
// 	//创建弹层
// 	var $wrapper = $(`<div class="swiper" style="display:none;position: fixed;width: ${WIDTH}px;height: ${HEIGHT}px;z-index: 3000;background-color: black;top: 50%;left: 50%;margin-left: -40%;margin-top: ${-HEIGHT/2}px;"></div>`);
// 	$('body').append($wrapper);
// }

/**
 * 展示弹层
 */
// function showSwiper(urls, index) {
// 	//判断当前是否有弹层展示,有则移除
// 	if (isShow) {
// 		hideSwiper();
// 	}

// 	//展示弹层
// 	$('.swiper').show();
// 	isShow = true;

// 	//容器
// 	var $swiperContainer = $(`<div class="swiper-container" style="height:${SWIPER_HEIGH}px;width:${SWIPER_WIDTH}px;margin-top:${(HEIGHT - SWIPER_HEIGH)/2}px"><div class="swiper-wrapper"></div></div>`);
// 	$('.swiper').append($swiperContainer);

// 	//播放按钮
// 	var str = `<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>`;
// 	$(".swiper-container").append($(str));

// 	var str = '';
// 	for (let index = 0; index < urls.length; index++) {
// 		str += `<div class="swiper-slide" style="display: flex;justify-content: center;">
// 			<img src="${urls[index]}" style="height: 100%">
// 		</div>`;
// 	}
// 	$(".swiper-wrapper").append($(str));

// 	var swiper = new Swiper('.swiper-container', {
// 		navigation: {
// 			nextEl: '.swiper-button-next',
// 			prevEl: '.swiper-button-prev',
// 		},
// 		initialSlide: index,
// 		mousewheel: true

// 	});
// }

/**
 * 收起弹层
 */
// function hideSwiper() {
// 	//关闭弹层 并消掉swiper-container
// 	$('.swiper').hide()
// 	$('.swiper-container').remove();
// 	isShow = false;
// }

/**
 * 处理图片链接（小图转大图）
 */
// function dourls(urls) {
// 	/**
// 	 * 根据配置的图片分辨率逐项做URL处理
// 	 * https://img3.doubanio.com/view/status/m/public/55165169-1f85dceb253be32.jpg
// 	 * https://img1.doubanio.com/view/status/l/public/364c1a0fc6f448a.webp
// 	 * https://img1.doubanio.com/view/status/raw/public/364c1a0fc6f448a.jpg
// 	 */
// 	for (let index = 0; index < urls.length; index++) {
// 		urls[index] = urls[index].replace(/\/[m|s]\//, '/raw/').replace(/(\d)*-/, '');
// 	}

// 	if (curRatio == HD) {
// 		for (let index = 0; index < urls.length; index++) {
// 			urls[index] = urls[index].replace(/\/raw\//, '/l/').replace(/\.jpg/, '.webp');
// 		}
// 	}

// 	return urls;
// }

/**
 * 初始化
 */
function init () {
	
}

/**
 * 收集数据
 */
function collectData() {
	//获取当前的分页状态
	let pages = JSON.parse($('.house-lst-page-box').attr('page-data'));
	totalPage = pages.totalPage;
	curPage = pages.curPage;

	var pricelist = [];
	for (let i=0; i < $('.unitPrice .number').length; i++) {
		pricelist.push($($('.unitPrice .number')[i]).html());
	}
	
	// 通知后台拿到的数据
	sendMessage("FN.collectData", {pricelist, curPage, totalPage})

	//跳转到下一个页面
	region = window.location.pathname.replace('/chengjiao','').replace(/\/pg\d\//g, '');
	curPage = curPage + 1;
	if (curPage < totalPage) {
		window.location.href = `https://wf.lianjia.com/chengjiao${region}/pg${curPage}/`;
	}
}

/**
 * 从主函数main开始执行
 */
function main () {
	//初始化
	init();
}

/**
 * 等待服务加载完成再执行main()
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request)
	switch (request.type) {
		// case "BG.onCompleted":
		// 	main();
		// 	break;
		case "BG.START":
			isSTART = request.value;
			//获得数据
			collectData();
			break;
		default:
			break;
	}
});

/**
 * 向后台发送消息
 */
function sendMessage(type, value) {
	chrome.runtime.sendMessage({type: type, value: value});
}



// ["11409", "5785", "7308", "8404", "7805", "9733", "7665", "6834", "8218", "6990", "7139", "7108", "8572", "6381", "6427", "7685", "8462", "7000", "4480", "7684", "7778", "8164", "7778", "8742", "6028", "7060", "7000", "9021", "9836", "7348"]
// ["7688", "7018", "8307", "7348", "7253", "9323", "12506", "8363", "9231", "8106", "8626", "7905", "10477", "8991", "11096", "7172", "8180", "9037", "7446", "7304", "6000", "8209", "7286", "7918", "7470", "9482", "7799", "8837", "8441", "8133"]
// ["6863", "6848", "6624", "7946", "6968", "4890", "8708", "5469", "7484", "21236", "7659", "7943", "7858", "9253", "7116", "7584", "5359", "6827", "5566", "9306", "8737", "4640", "7677", "4734", "8362", "7245", "7620", "7980", "8000", "8034"]
// ["8040", "7476", "9500", "7052", "10379", "8557", "8797", "7593", "6744", "8972", "8690", "8204", "7419", "8154", "8000", "9807", "7660", "9100", "7195", "7749", "8123", "8788", "8767", "6886", "8791", "5863", "9039", "7833", "6737", "8248"]
// ["8858", "8199", "7651", "6646", "8123", "7942", "7756", "8935", "10052", "9190", "8800", "9106", "8215", "9338", "6859", "8815", "7161", "7563", "7484", "8077", "11000", "9159", "7166", "8281", "6483", "7313", "8010", "9439", "7038", "9674"]


