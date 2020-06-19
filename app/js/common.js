$(document).ready(function(){
	initCommonSliders();
	initSelects();
	initSearchRow();
	initRegionHeader();
	initMinimap();
	initModalWindows();
	initMobileMenu();
	initStickyHeader();
	initCentersLocation();
	initArticlesHeadings();
	initFAQ();
	
	function initCommonSliders() {
		var sliders = $('.common-slider');

		sliders.each(function(sliderIndex,slider) {
			var slides = $(slider).find('.common-slider__slides'),
				controls = $(slider).find('.common-slider__controls'),
				prevArr = controls.find('.common-slider__arrow_prev'),
				nextArr = controls.find('.common-slider__arrow_next'),
				dotsValue = false,
				autoplayValue = false;

			if ($(slider).hasClass('common-slider_dots')) {
				dotsValue = true;
			}
			if ($(slider).hasClass('common-slider_autoplay')) {
				autoplayValue = true;
			}

			slides.slick({
				arrows: true,
				dots: dotsValue,
				autoplay: autoplayValue,
				draggable: false,
				prevArrow: prevArr,
				nextArrow: nextArr
			});
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
				closeBtn = wrapper.find('.close-search-btn'),
				dimming = parent.find('.search-dimming');
			$(seacrhButton).on('click', function( event ) {
				event.preventDefault();
				wrapper.addClass('search-row-wrapper_active');
				dimming.addClass('search-dimming_active');
				event.stopPropagation();
				$(window).on('click.custom', function( evt ) {
					wrapper.removeClass('search-row-wrapper_active');
					dimming.removeClass('search-dimming_active');
					$(window).off('click.custom');
				});
			} )
			wrapper.on('click', function( event ) {
				event.stopPropagation();
			} );
			closeBtn.on('click', function( event ) {
				event.preventDefault();
				wrapper.removeClass('search-row-wrapper_active');
				dimming.removeClass('search-dimming_active');
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
	function initModalWindows() {
		var wrapper = $('.modal-windows'),
			modalWindows = wrapper.find('.modal-window'),
			closeAllModalWindows = function() {
				$( 'body' ).removeClass( 'no-scroll' );
				wrapper.removeClass( 'modal-windows_opened' );
				modalWindows.each( function( modalWindowIndex, modalWindow ) {
					$( modalWindow ).removeClass( 'modal-window_opened' );
				} );
			}

		modalWindows.each( function( modalWindowIndex, modalWindow ) {
			var typeOfModalWidnow = $( modalWindow ).attr( 'data-type-of-modal-window' ),
				triggers = $( "[data-modal='"+ typeOfModalWidnow +"']" ),
				closeBtn = $( modalWindow ).find( '.modal-window-close-btn' ),
				closeWindow = function() {
					$( 'body' ).removeClass( 'no-scroll' );
					wrapper.removeClass( 'modal-windows_opened' );
					$( modalWindow ).removeClass( 'modal-window_opened' );
				},
				openWindow = function() {
					$( 'body' ).addClass( 'no-scroll' );
					wrapper.addClass( 'modal-windows_opened' );
					$( modalWindow ).addClass( 'modal-window_opened' );
					$( window ).on( 'click.modalWindow', function( event ) {
						closeWindow();
						$( window ).off( 'click.modalWindow' );
					} );
				};

			triggers.each( function( triggerIndex, trigger ) {
				$( trigger ).on( 'click', function( event ) {
					event.preventDefault();
					event.stopPropagation();
					closeAllModalWindows();
					openWindow();
				} );
			} );

			$( modalWindow ).on( 'click', function( event ) {
				event.stopPropagation();
			} );

			closeBtn.on( 'click', function( event ) {
				closeWindow();
			} );
		} );
	}
	function initMobileMenu() {
		var menu = $( '.mobile-menu' ),
			openBtn = $('.mobile-header-menu-btn'),
			closeBtn = $('.mobile-menu__close-btn');

		openBtn.on( 'click', function( event ) {
			$('body').addClass('opened-menu');
			menu.addClass('mobile-menu_opened');
		} );
		closeBtn.on( 'click', function( event ) {
			$('body').removeClass('opened-menu');
			menu.removeClass('mobile-menu_opened');
		} );
	}
	function initStickyHeader() {
		var header  = $('.header'),
			content = $('.main-content'),
			isSticky = false,
			lastHeaderPosition = undefined;

		$(window).on('scroll', function() {
			if (header.offset().top <= $(window).scrollTop() && !isSticky) {
				lastHeaderPosition = header.offset().top;
				header.addClass('header_sticky');
				content.css({
					paddingTop: header.outerHeight()+'px'
				});
				isSticky = true;
			} else if ( $(window).scrollTop() <= lastHeaderPosition && isSticky) {
				header.removeClass('header_sticky');
				content.css({
					paddingTop: '0'
				});
				lastHeaderPosition = undefined;
				isSticky = false;
			}
		});
	}
	function initCentersLocation() {
		var locationsList = $('.locations-list'),
			locations = locationsList.find('.locations-item'),
			closeAll = function(count) {
				locations.each(function(locationIndex,location) {
					if(count !== locationIndex) {
						$(location).removeClass('locations-item_opened');
					}
				});
			};

		locations.each( function( locationIndex, location ) {
			var locationText = $(location).find('.locations-text');
			locationText.on( 'click', function( event ) {
				if ($(location).hasClass('locations-item_opened')) {
					$(location).removeClass('locations-item_opened');
				} else {
					closeAll(locationIndex);
					$(location).addClass('locations-item_opened');
				}
			} );
		});
	}
	function initArticlesHeadings() {
		var classPart = 'articles-heading',
			headingBlocks = $( '.' + classPart );

		headingBlocks.each( function( headingBlockIndex, headingBlock ) {
			var heading        = $( headingBlock ).find( '.' + classPart + '__text' ),
				categoriesList = $( headingBlock ).find( '.' + classPart + '__categories-list' ),
				headingWidth   = heading.outerWidth( true ),
				isWasReformed  = false,
				check          = function () {
					if ( categoriesList.outerWidth( true ) > ( $( headingBlock ).outerWidth() - headingWidth ) / 2 && !isWasReformed ) {
						$( headingBlock ).addClass( classPart + '_no-space' );
						isWasReformed = true;
					} else if ( categoriesList.outerWidth( true ) <= ( $( headingBlock ).outerWidth() - headingWidth ) / 2 && isWasReformed ) {
						$( headingBlock ).removeClass( classPart + '_no-space' );
						isWasReformed = false;
					}
				};

			check();
			$( window ).on( 'resize', check );
		} );
	}
	function initFAQ() {
		var classPart = 'faq';
		$( '.' + classPart ).each( function( faqIndex, faq ) {
			var items     = $( faq ).find( '.' + classPart + '__list-item' ),
				faqHeigth = $( faq ).outerHeight();

			items.each( function( itemIndex, item) {
				if ( faqHeigth - $(item).position().top < $(item).find( '.' + classPart + '__answer' ).outerHeight() ) {
					$(item).addClass( classPart + '__list-item_bottom' );
				}
			} );
		} );
	}
});