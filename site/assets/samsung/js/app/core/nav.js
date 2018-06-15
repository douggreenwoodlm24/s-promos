// navigation
$(function() {

	////////////////////////
	// mobile nav 
	////////////////////////

	$('.js-small-store-nav').click(function() {
		$('.nav__list').toggleClass('nav__list--show');
		$(this).toggleClass('nav__small--active');
		$('.expand', this).toggleClass('expand--active');
		return false;
	});


	////////////////////////
	// sticky nav 
	////////////////////////

	if ($('.header__row--storenav').length > 0) {
		var stickyNavTop = $('.header__row--storenav').offset().top;
	 
		var stickyNav = function(){
			var scrollTop = $(window).scrollTop() + 5;
			      
			if (scrollTop > stickyNavTop) { 
			    $('.header__row--storenav').addClass('sticky');
			} else {
			    $('.header__row--storenav').removeClass('sticky'); 
			}
		};
		 
		stickyNav();

		if(window.addEventListener) { //don't run on every scroll event
		    window.addEventListener('scroll', debounce(function() {    
		       stickyNav();
			    //console.log('scroll');  
		}, 16.7)); //run once every .5s
		}
	}

	////////////////////////
	// nav sub menus (level 1)
	////////////////////////
	$('.header__globalnav-item--hasmenu').on( "mousedown touchstart", function(e){ //click slow in Firefox due to client stuff firing
		
		if (e.target.className == "header__globalnav-link") {
			$('.header__globalnav-menu').removeClass('header__globalnav-menu--show'); 
		}

		if (!$(this).hasClass('header__globalnav-item--active')) {
			$(this).addClass('header__globalnav-item--active');
			$('.header__globalnav-menu',this).addClass('header__globalnav-menu--show');
			$('.header__globalnav-item--hasmenu').not(this).removeClass('header__globalnav-item--active');
		} else {
			$('.header__globalnav-item--hasmenu').removeClass('header__globalnav-item--active');
			$(this).removeClass('header__globalnav-item--active');
		}

	});

  	// (level 2)
  	$('.header__globalnav-menu-item--hassub').hover(function() {
  		//$('.header__globalnav-menu-sub').removeClass('header__globalnav-menu-sub--show');
		$('.header__globalnav-menu-sub',this).addClass('header__globalnav-menu-sub--show');
	}, function() {
   		$('.header__globalnav-menu-sub',this).removeClass('header__globalnav-menu-sub--show');
  	});
 
 	//hide visible menus if user clicks outside of nav area
  	//http://stackoverflow.com/questions/1403615/use-jquery-to-hide-a-div-when-the-user-clicks-outside-of-it
  	$('body').click(function (e)
	{
	    var container = $('.header__globalnav-item--hasmenu');
	    if (!container.is(e.target) // if the target of the click isn't the container...
	        && container.has(e.target).length === 0) // ... nor a descendant of the container
	    {
	        $('.header__globalnav-item--hasmenu').removeClass('header__globalnav-item--active');
	        $('.header__globalnav-menu').removeClass('header__globalnav-menu--show');
	    }
	});

  	////////////////////////
  	// store nav menus
  	////////////////////////


  	//mobile
	$('.nav__item--hasmenu').click(function() {
		var initState = getDeviceState();

		if (initState == "default" || initState == "small" || initState == "medium")  {
			var thisMenu = $(this);
			var thisSubNav = $('.subnav_wrap',this);

			if (thisMenu.hasClass('nav__item--hasmenu--active')) { //hide/close all

				$('.subnav_wrap').removeClass('subnav_wrap--show');
				$('.nav__item--hasmenu').removeClass('nav__item--hasmenu--active');

			} else {

				//turn off old
				$('.subnav_wrap').removeClass('subnav_wrap--show');
				$('.nav__item--hasmenu').removeClass('nav__item--hasmenu--active');

				//turn on current
				thisMenu.addClass('nav__item--hasmenu--active');
				thisSubNav.addClass('subnav_wrap--show');
			}
		
			return false;


		} 
	});

	$(".nav__item--hasmenu .subnav_wrap a").click(function(e) { e.stopPropagation(); });


	$(".nav__item--hasmenu").hoverIntent({
	    over: navMenuOn,
	    out: navMenuOff,
	    timeout: 200,
	    sensitivity: 25,
	    interval: 150

	});


	function navMenuOn() {
		var initState = getDeviceState();
		if (initState != "default" && initState != "small" && initState != "medium")  {
	    	
			$('.subnav_wrap',this).addClass('subnav_wrap--show');

			//reset global nav
			$('.header__globalnav-item--hasmenu').removeClass('header__globalnav-item--active');
	        $('.header__globalnav-menu').removeClass('header__globalnav-menu--show');

	  		//if we have multiple menus, get the tallest and set the other to the same height
	  		var menus = $('.subnav_wrap .sub:not(.sub--heightfix)',this);
	  		
	  		var thisMenuHeight = 0;
	  		var maxMenuHeight = 0;

	  		if (menus.length > 1) {
	  			$(menus).each(function() {
	  				thisMenuHeight = $(this).height();
	  				if (thisMenuHeight > maxMenuHeight) {
	  					maxMenuHeight = thisMenuHeight;
	  				}
				});

	  			menus.addClass("sub--heightfix");
	  			menus.css( "height", maxMenuHeight + 5);

	  		}
	  	 }		
	}

	function navMenuOff() {
		var initState = getDeviceState();
		if (initState != "default" && initState != "small" && initState != "medium")  {
   			$('.subnav_wrap',this).removeClass('subnav_wrap--show');
   		}
	}

});