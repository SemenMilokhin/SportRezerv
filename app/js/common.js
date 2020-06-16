$(document).ready(function(){
	initCommonSliders();
	initSelects();
	initSearchRow();
	initRegionHeader();
	initMinimap();
	
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
		});
	}
	function initSelects() {
		var selects = $('.select');

		selects.each(function(selectIndex,select) {
			var selectItem       = $(select),
				selectLabel      = selectItem.find('.select__label'),
				selectLabelValue = selectLabel.find('.select__label-value'),
				selectInput      = selectItem.find('.select__hidden-input'),
				selectList       = selectItem.find('.select__list'),
				selectListItem   = selectList.find('.select__list-item'),
				closeSelect = function() {
					selectList.css({
						clip: 'rect(0, 9999px , 0, 0)'
					});
					selectItem.removeClass('opened');
				},
				openSelect = function() {
					selectList.css({
						clip: 'rect(0, 9999px , '+selectList.outerHeight(true)+'px , 0)'
					});
					selectItem.addClass('opened');
				},
				closeAllSelects = function(count) {
					selects.each(function(c,elem) {
						if(count !== c) {
							$(elem).find('.select__list').css({
								clip: 'rect(0, 9999px , 0, 0)'
							});
							$(elem).removeClass('opened');
						}
					});
				};

			selectLabel.on('click', function(evt) {
				closeAllSelects(selectIndex);
				evt.preventDefault();
				if (!selectItem.hasClass('opened')) {
					openSelect();
				} else {
					closeSelect();
				};
			});

			selectListItem.each(function(i,el) {
				$(el).on('click', function(evt) {
					var value = $(el).attr('data-value'),
						text  = $(el).text();
					evt.preventDefault();
					selectInput.val(value);
					selectLabelValue.text(text);
					closeSelect();
				})
			})
		});
	}
	function initSearchRow() {
		var seacrhButtons = $('.header-search-button');

		seacrhButtons.each( function( seacrhButtonIndex, seacrhButton ) {
			var parent = $(seacrhButton).parent('.header-search-button-wrapper'),
				wrapper = parent.find('.search-row-wrapper'),
				closeBtn = wrapper.find('.close-search-btn');
			$(seacrhButton).on('click', function( event ) {
				event.preventDefault();
				wrapper.addClass('search-row-wrapper_active');
				event.stopPropagation();
				$(window).on('click.custom', function( evt ) {
					wrapper.removeClass('search-row-wrapper_active');
				});
			} )
			parent.on('click', function( event ) {
				event.stopPropagation();
			} );
			closeBtn.on('click', function( event ) {
				event.preventDefault();
				wrapper.removeClass('search-row-wrapper_active');
			});
		} );
	}
	function initRegionHeader() {
		var header = $('.select-region-header'),
			closeBtn = header.find('.select-region-close-btn');

		closeBtn.on('click', function(event) {
			event.preventDefault();
			header.remove();
		})
	}
	function initMinimap() {
		var mapWrapper = $('.minimap'),
			map = mapWrapper.find("map[name='map']"),
			areas = map.find('area'),
			locationsList = mapWrapper.find('.locations-on-map-list');

		areas.each( function(areaIndex, area) {
			var location = locationsList.find(".map-location[data-location='"+ $(area).attr('data-location') +"']");

			$(area).on('mouseenter', function(event) {
				event.preventDefault();
				location.css({display: 'block'});
			});
			$(area).on('mouseleave', function(event) {
				event.preventDefault();
				location.css({display: 'none'});
			});
		});
	}
});