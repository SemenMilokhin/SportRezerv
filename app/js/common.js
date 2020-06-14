$(document).ready(function(){
	initMainSlider();
	initWidgetSliders();

	function initMainSlider() {
		var container = $('.container_main-slider'),
			slider = container.find('.main-slider'),
			arrows = container.find('.main-slider-arrows'),
			nextArr = arrows.find('.main-slider-arrow_next'),
			prevArr = arrows.find('.main-slider-arrow_prev');

		slider.slick({
			arrows: true,
			dots: true,
			draggable: false,
			nextArrow: nextArr,
			prevArrow: prevArr
		});
	}
	function initWidgetSliders() {
		var widgets = $('.widget-slider');

		widgets.each(function(widgetIndex,widget) {
			var slides = $(widget).find('.widget-slider__slides'),
				controls = $(widget).find('widget-slider__controls'),
				prevArr = controls.find('widget-slider__arrow_prev'),
				nextArr = controls.find('widget-slider__arrow_next');

			slides.slick();

		});
	}
});