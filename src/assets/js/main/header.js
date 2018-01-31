'use strict';

header();

function header(){
	var slideTime = 400;

	var breakpoint = 768;
	var windowWidth = $(window).width();
	var mobileView = windowWidth <= breakpoint;

	var $body = $('body');
	var $header = $('.header');
	var $trigger = $header.find('.trigger');
	var $menuList = $('.menu__list');
	var $items = $menuList.children('li');
	var $toggles = $('.menu__toggle');
	var $activeItems = $menuList.children('.active');
	var $activeLists = $activeItems.children('ul');

	// tracks screen width
	$(window).on('resize', function() {
		windowWidth = $(window).width();
		mobileView = windowWidth <= breakpoint;
	});

	itemHover();
	itemClick();
	navToggle();
	navReset();

	// toggles nav visibility
	function navToggle(){
		function toggleNav(){
			$activeItems = $menuList.children('.active');
			$activeLists = $activeItems.children('ul');

			var overlayHtml = '<div class="nav__overlay"></div>';

			if($body.hasClass('nav-active') == false){
				$header.append(overlayHtml);
				setTimeout(function(){
					$body.addClass('nav-active');
				}, 20);
			} else {
				$body.removeClass('nav-active');
				$activeLists.stop().slideUp(slideTime);
				$activeItems.removeClass('active');
				setTimeout(function(){
					$('.nav__overlay').remove();
				}, 300);
			}
		}
		$trigger.on('click', toggleNav);
		$(document).on('click','.nav__overlay', toggleNav);
	}

	// controls menu item hover events
	function itemHover(){
		$items.hover(function(){
			var $item = $(this);
			var $toggle = $item.children('.menu__toggle');
			var $list = $toggle.siblings('ul');

			if(mobileView == false) {
				$list.stop().slideDown(slideTime);
			}
		}, function(){
			var $item = $(this);
			var $toggle = $item.children('.menu__toggle');
			var $list = $toggle.siblings('ul');
			var $items = $toggle.parents();
			var $subLists = $item.find('.menu__list3');
			var $subItems = $subLists.parent('li');

			if(mobileView == false) {
				$list.stop().slideUp(slideTime);
				$items.removeClass('active');

				$subLists.stop().slideUp(slideTime);
				$subItems.removeClass('active');
			}
		});
	}

	// controls menu item clicking events
	function itemClick(){
		$toggles.on('click', function(){
			$activeItems = $menuList.find('.active');
			$activeLists = $activeItems.children('ul');

			var $toggle = $(this);
			var $container = $toggle.parent('li').parent('ul');
			var $item = $toggle.parent('li');
			var $list = $toggle.siblings('ul');

			var $activeSiblingLists = $item.siblings('.active').children('ul');
			var $activeSiblingItems = $item.siblings('.active');

			var topLevel = $container.hasClass('menu__list');

			if ($item.hasClass('active') == false) {
				if (topLevel == false) {
					$container.css('height', 'auto');
				}
				if (mobileView) {
					if (topLevel) {
						$activeLists.stop().slideUp(slideTime);
						$activeItems.removeClass('active');
					} else {
						$activeSiblingLists.stop().slideUp(slideTime);
						$activeSiblingItems.removeClass('active');
					}
				}
				$list.stop().slideDown(slideTime);
				$item.addClass('active');
			} else {
				$list.stop().slideUp(slideTime);
				$item.removeClass('active');
			}
		});
	}

	// resets menu on window resize
	function navReset(){
		$(window).on('resize', function(){
			$activeItems = $menuList.children('.active');
			$activeLists = $activeItems.children('ul');

			$activeLists.stop().slideUp(slideTime);
			$activeItems.removeClass('active');
			$('.nav__overlay').remove();
			$body.removeClass('nav-active');
		});
	}
}