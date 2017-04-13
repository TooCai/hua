$(function(){
	var turn = $(".turn-container>.turn").eq(0);
	var current = 0;
	var turnSize = 4;
	var intervalHand = setInterval(function(){
		current = current === turnSize?0:(current+1);
		var distance = -current * 790;
		var t = {
			transform:"translate(" + distance + "px,0)",
			transition:"transform 2s ease-out"
		}
		turn.css(t);
		if(current === 0){
			turn.css({
				transform:"translate(0,0)",
				transition:"transform 0s ease-out"
			});
		}
	},3000);
});