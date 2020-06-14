$(document).ready(function(){
	initCommonSliders();
	
	function initCommonSliders() {
		var sliders = $('.common-slider');

		sliders.each(function(sliderIndex,slider) {
			var slides = $(slider).find('.common-slider__slides'),
				controls = $(slider).find('.common-slider__controls'),
				prevArr = controls.find('.common-slider__arrow_prev'),
				nextArr = controls.find('.common-slider__arrow_next');

			if ($(slider).hasClass('common-slider_dots')) {
				slides.slick({
					arrows: true,
					dots: true,
					draggable: false,
					prevArrow: prevArr,
					nextArrow: nextArr
				});
			} else {
				slides.slick({
					arrows: true,
					draggable: false,
					prevArrow: prevArr,
					nextArrow: nextArr
				});
			}
			
			console.log(controls);

		});
	}
});