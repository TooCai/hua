$(function(){
	var turn = {
		//jQuery元素对象,包含img
		ele:null,
		//jQuery元素对象,轮播器导航
		eleNav:null,
		//轮播器导航选中的class
		currentNavClassName:"",
		//间隔
		interval:3000,
		//动画持续的时间
		duration:0,
		//图片个数
		size:0,
		//当前图片的索引
		currentNum:0,
		//图片宽度
		width:0,
		//定时器引用
		handler:null,
		init:function(obj){
			var errorStr = "参数错误...";
			if(!obj.ele || !obj.width){
				throw new Error(errorStr);
			}
			this.ele = obj.ele;
			if(obj.size && obj.size > 0){
				this.size = this.ele.children("li").size() - 1;
			}
			if(obj.eleNav && obj.currentNavClassName){
				this.eleNav = obj.eleNav;
				this.currentNavClassName = obj.currentNavClassName;
			}
			if(obj.interval && obj.interval > 0){
				this.interval = obj.interval;
			}
			if(obj.duration || obj.duration > 0){
				this.duration = obj.duration;
			}
			this.width = obj.width;

			this.initClick();
		},
		initClick:function(){
			var _self = this;
			this.ele.parent().on("mouseover",function(){
				clearInterval(_self.handler);
				_self.handler = null;
			}).on("mouseout",function(){
				_self.start();
			});
			this.eleNav.on("click","li",function(){
				//如果点击的是当前的,则直接返回
				if($(this).hasClass(_self.currentNavClassName)){
					return ;
				}
				/*此处还是有点问题
				var index = parseInt($(this).attr("data-index"));
				console.log(index);
				console.log(_self.currentNum);
				_self.currentNum = index === _self.size?0:index;
				_self.one();
				_self.oneNav();
				*/
			});
		},
		one:function(){
			this.currentNum++;
			//为了使动画能够循环,在图片最后添加第一张,即此处需+1
			//执行到最后一张时,回到第一张
			if(this.currentNum === this.size + 1){
				this.currentNum = 0;
				//最后一张到第一张时不执行动画
				this.ele.css({
					"transform":"translate3d(0px,0px,0px)",
					"transition-duration":"0s"
				});
				this.currentNum++;
			}
			var _self = this;
			//setTimeout为了解决最后一张到第一张时,动画执行是反的问题
			setTimeout(function(){
				_self.ele.css({
					"transition":"transform " + _self.duration +"s ease-in",
					"transform":"translate3d(-" + (_self.currentNum * _self.width) + "px,0px,0px)"
				});
			});
		},
		oneNav:function(){
			var temp = this.currentNum === this.size?0:this.currentNum;
			this.eleNav.children("." + this.currentNavClassName).toggleClass(this.currentNavClassName);
			this.eleNav.children().eq(temp).addClass(this.currentNavClassName);
		},
		start:function(){
			var fun = this.eleNav && this.currentNavClassName?function(){
				this.one();
				this.oneNav();
			}:function(){
				this.one();
			};
			//绑定当前对象this
			this.handler = setInterval(fun.bind(this),this.interval);
		}
	};
	turn.init({
		ele:$(".turn-container>.turn").eq(0),
		eleNav:$(".turn-nav").eq(0),
		currentNavClassName:"active",
		width:790,
		size:4,
		duration:0.8
	});
	turn.start();
});