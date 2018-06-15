/* Swiper /start */ 
/* Popup(lightbox) /start */ 
$(document).ready(function() {
	$('.open-popup-link').magnificPopup({ type:'inline', midClick: true });
});
$(function(){
	/* Quickview buttons & show/hide panel for DESKTOPS */
	$('.kitchen-quickview').click(function(event){   
		if($(this).hasClass('cat-1')){
			$(this).parents().find(".kitchen-quickview-current.cat-1").removeClass("kitchen-quickview-current");
			$(this).parents().find(".quickview-arrow.cat-1").remove();
			$(this).addClass("kitchen-quickview-current");
			$(this).after('<div class="quickview-arrow cat-1"></div>');
			var tab = $(this).attr("data-quickviewid");
			$(".kitchen-quickview-tab-content.cat-1").not(tab).css("display", "none");
			$(tab).css("display", "inline-block");
		};
		if($(this).hasClass('cat-2')){
			$(this).parents().find(".kitchen-quickview-current.cat-2").removeClass("kitchen-quickview-current");
			$(this).parents().find(".quickview-arrow.cat-2").remove();
			$(this).addClass("kitchen-quickview-current");
			$(this).after('<div class="quickview-arrow cat-2"></div>');
			var tab = $(this).attr("data-quickviewid");
			$(".kitchen-quickview-tab-content.cat-2").not(tab).css("display", "none");
			$(tab).css("display", "inline-block");
		};
		if($(this).hasClass('cat-3')){
			$(this).parents().find(".kitchen-quickview-current.cat-3").removeClass("kitchen-quickview-current");
			$(this).parents().find(".quickview-arrow.cat-3").remove();
			$(this).addClass("kitchen-quickview-current");
			$(this).after('<div class="quickview-arrow cat-3"></div>');
			var tab = $(this).attr("data-quickviewid");
			$(".kitchen-quickview-tab-content.cat-3").not(tab).css("display", "none");
			$(tab).css("display", "inline-block");
		};
		if($(this).hasClass('cat-4')){
			$(this).parents().find(".kitchen-quickview-current.cat-4").removeClass("kitchen-quickview-current");
			$(this).parents().find(".quickview-arrow.cat-4").remove();
			$(this).addClass("kitchen-quickview-current");
			$(this).after('<div class="quickview-arrow cat-4"></div>');
			var tab = $(this).attr("data-quickviewid");
			$(".kitchen-quickview-tab-content.cat-4").not(tab).css("display", "none");
			$(tab).css("display", "inline-block");
		};
	});
	/* Quickview buttons & show/hide panel for MOBILES */
	$('.kitchen-quickview-mb').click(function(event){
		var kitchenPanel = $(this).parent(".kitchen-bundle-item-mobile").find(".kitchen-quickview-tab-mb-content");
		if(kitchenPanel.css("display","none")){
			$(this).addClass("tab-opened");
			kitchenPanel.css("display","block");
		}
	});
	$('.kitchen-quickview-tab-mb-close').click(function(event){
		var kitchenPanel = $(this).parents(".kitchen-bundle-item-mobile").find(".kitchen-quickview-tab-mb-content");
		kitchenPanel.css("display","none");
	});
	/* Set display type depending on how many products in row */
	$(".kitchen-bundle-list").each(function(){
		var bundleItems = $(this).find(".kitchen-bundle-item").length;
		$(this).addClass("kitchen-bundle-list-items-" + bundleItems);
	});
});