/************************
 *
 * Serif TV Configurator 
 *
 ************************/
$(function() {
	/* Definde Variables */
	var seriftvLP 		= $('.bespoke__seriftvLP');
	var optionList		= $('.bespoke__seriftvLP-options-list');
	var optionInfo 		= $('.bespoke__seriftvLP-options-info');
	var tvdetails 		= $('.bespoke__seriftvLP-config-tvdetails');
	var delivery 		= $('.bespoke__seriftvLP-config-delivery');
	var total 			= $('.bespoke__seriftvLP-config-total');
	var gallery			= $('.bespoke__seriftvLP-gallery');
	var tvsize 			= optionList.find('.checked').find('img').data('tvsize');
	var tvprice			= optionList.find('.checked').find('img').data('tvprice');
	var tvdelivery		= optionList.find('.checked').find('img').data('tvdelivery');
	var tvcolor			= optionList.find('.checked').find('span').data('tvcolor');
	var checkedIcon 	= '<div class="checked-icon"></div>';
	var spinner 		= '<div class="bespoke__seriftvLP-spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
	/** Get the sku by looking up the selected TV size and pulling the SKU out of the matching colour data attribute */
	var sku				= optionList.find('.checked').find('img').data('sku-' + tvcolor.replace(" ", "-").toLowerCase());
	/* Out of Stock */
	function oos_coloritem(){
		var oos_class 	= 'bespoke__seriftvLP-options-coloritem';
		var oos_msg		= '<span class="'+oos_class+'-oos-soldout">Sold Out</span>';
		// Deactivate Serif 40" Red 
		if (tvsize == '40'){
			var oos_item_add_40R = $('.'+oos_class+'-darkred').parent().addClass('serif_oos oos_40R');
				oos_item_add_40R.find('.'+oos_class+'-darkred').removeAttr('class').addClass(oos_class+'-oos');
		}else{
			var oos_item_off_40R = $('.oos_40R');
				oos_item_off_40R.find('.'+oos_class+'-oos').removeAttr('class').addClass(oos_class+'-darkred');
				oos_item_off_40R.removeClass('serif_oos oos_40R')
		}
		// Deactivate Serif 24" Dark Blue 
		if (tvsize == '24'){
			var oos_item_add_40R = $('.'+oos_class+'-darkblue').parent().addClass('serif_oos oos_24B');
				oos_item_add_40R.find('.'+oos_class+'-darkblue').removeAttr('class').addClass(oos_class+'-oos');
		}else{
			var oos_item_off_40R = $('.oos_24B');
				oos_item_off_40R.find('.'+oos_class+'-oos').removeAttr('class').addClass(oos_class+'-darkblue');
				oos_item_off_40R.removeClass('serif_oos oos_24B')
		}
		return;
	}
	oos_coloritem();
	/**/
	/* Set the instance for 3d image rotator -- REEL */
	function showRotator(){
		gallery.find('img').attr('style', 'display:none');
		gallery.append(spinner);
		if(tvsize == '26'){ 
			optionInfo.find('.bespoke__seriftvLP-options-info-legs').addClass('show'); 
		} else{ 
			optionInfo.find('.bespoke__seriftvLP-options-info-legs').removeClass('show'); 
		}
		$('#image').reel({ 
			images:'https://i-sabre.expansys.net/assets/samsung/img/bespoke/seriftv/seriftv_ue'+tvsize+'_'+tvcolor.replace(/\s+/g, '').toLowerCase()+'_###.png|1..6' }
		).bind("loaded", function(ev){ 
			ev.preventDefault(); 
			$('.bespoke__seriftvLP-spinner').fadeOut(300, function() {$(this).remove();});
			gallery.find('img').removeAttr('style');
		}); 
		return;
	}
	showRotator();
	/**/
	/* Clear previous instance for 3d image rotator -- REEL */
	function clearRotator(selected){
		$('#image').unreel();  /* Kill 3d rotator prev instance */
		gallery.find('img').attr('style', 'display:none');
		gallery.append(spinner);
		selected.parent().find('li').removeClass('checked');
		selected.parent().find('.checked-icon').remove();
		selected.addClass('checked');
		selected.append(checkedIcon);
		return;
	}
	/**/
	/* Screen size selector */
	seriftvLP.on( "click", '.bespoke__seriftvLP-options-sizeitem', function (e){ 
		e.preventDefault(); 
		clearRotator($(this));/*Clear old instance for 3d image rotator */
		tvsize = $(this).find('img').data('tvsize');
		tvprice = $(this).find('img').data('tvprice');
		tvdelivery = $(this).find('img').data('tvdelivery');
		sku = $(this).find('img').data('sku-' + tvcolor.replace(" ", "-").toLowerCase());
		tvdetails.find('.serif_size').html(tvsize);
		delivery.find('.serif_delivery').html(tvdelivery);
		total.find('.serif_price').html(tvprice);
		showRotator();/*Set new instance for 3d image rotator */
		oos_coloritem();
	});
	/**/
	/* Colour selector */
	seriftvLP.on( "click", '.bespoke__seriftvLP-options-coloritem', function (e){ 
		e.preventDefault(); 
		clearRotator($(this));/*Clear old instance for 3d image rotator */
		tvcolor = $(this).find('span').data('tvcolor');
		sku	= optionList.find('.checked').find('img').data('sku-' + tvcolor.replace(" ", "-").toLowerCase());
		tvdetails.find('.serif_color').html(tvcolor);
		showRotator();/*Set new instance for 3d image rotator */
		oos_coloritem();
	});
	/**/
	/* Buy Now button */
	seriftvLP.on( "click", '.bespoke__seriftvLP-config-button', function (e){ 
		if (sku != -1) {
			window.location.href = "/uk/basket/add/?i=" + sku;
		} else {
			alert ('Sorry, this Serif TV combination isn\'t available');
		}
	});
});
/** END Serif TV Configurator */