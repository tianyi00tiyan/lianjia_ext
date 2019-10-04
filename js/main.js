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
var district = ""; //当前的区域
var city_name = ""; //当前城市
var district_name = ""; //当前的区域

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
	//获取当前的分页状态
	let pages = JSON.parse($('.house-lst-page-box').attr('page-data'));
	city_name = $($.find('[name="location"]')).attr('content').match(/city=.*;/g)[0].replace("city=", '').replace(';','');
	district = window.location.pathname.replace('/chengjiao','').replace(/\/pg\d\//g, '');
	district_name = $('body').find(`[href="${window.location.pathname}"]`).html();
	totalPage = pages.totalPage;
	curPage = pages.curPage;
}

/**
 * 在页面上收集数据
 */
function collectData() {
	let promiselist = [];
	for (let i=1;i <= totalPage;i++) {
		promiselist.push(getPageContent(i));
	}

	Promise.all(promiselist).then(function(values) {
		let parser = new DOMParser();
		let domlist = values.map((n) => {
			return parser.parseFromString(n, "text/html")
		})

		doTotalPrice(domlist);
		doUnitPrice(domlist);
  	});
}

/**
 * 子处理：处理总价
 */
function doTotalPrice() {
	
}

/**
 * 子处理：处理单价
 */
function doUnitPrice(domlist) {
	var unitPriceList = [];
	var unitPriceDomLsit = [];
	for (let i=0;i<domlist.length;i++) {
		unitPriceDomLsit = $(domlist[i]).find('.unitPrice .number');

		for (let j=0; j < unitPriceDomLsit.length; j++) {
			unitPriceList.push(parseInt($(unitPriceDomLsit[j]).html(), 10));
		}
	}

	let sum = _.sum(unitPriceList);
	let avgUnitPrice = parseInt(sum/domlist.length/unitPriceDomLsit.length, 10)
	console.log(`${city_name}${district_name}的平均单价是${avgUnitPrice}`)
}


/**
 * 从主函数main开始执行
 */
function main () {
	//初始化
	init();

	//获得数据
	collectData();
}

/**
 * 等待服务加载完成再执行main()
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// console.log(request)
	switch (request.type) {
		case "BG.START":
			if (request.value) {
				main()
			}
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

/**
 * 发送请求获取页面内容
 */
function getPageContent(page) {
	return new Promise((resolve, reject) => {
		$.ajax({
			method: "POST",
			url: `https://wf.lianjia.com/chengjiao${district}/pg${curPage}/`	
		}).done(function( msg ) {
			resolve(msg);
		});
	})
}
