//$('#btn-search-devices').click(function() {
//	$('#update').empty();
//	var searchField = $('#search').val();
//	var myExp = new RegExp(searchField, "i");
//	$.getJSON('data.json', function(data) {
//		var output = '<ul class="searchresults">';
//		$.each(data, function(key, val) {
//			if ((val.name.search(myExp) != -1) ||
//			(val.phoneDescription.search(myExp) != -1)) {
//				output += '<li>';
//				output += '<h2>'+ val.name +'</h2>';
//				output += '<img src="images/'+ val.imageName +'.png" alt="'+ val.name +'" />';
//				output += '<p>'+ val.phoneDescription +'</p>';
//				output += '</li>';
//			}
//		});
//		output += '</ul>';
//		$('#update').html(output);
//	});
//});

function resetPagination(){
	//console.log('resetPagination');
	$('#paging').css('display', 'none');
	$('#pt__currentInfoParagraph').css('display', 'none');
	$('#product-list-loading').css('display', 'inline');
	$('#paging').html(' <li>&lt;</li><li>#n</li><li>#n</li><li>#c</li><li>#n</li><li>#n</li><li>&gt;</li>');
};
function initialisePagination(output){ // START pagination
    var pt__elementsForSecureSelectPage = 8; // number here is number of items to display on page. NB: if changed, also needs to be changed in jquery.easy-paging.js
	var pt__itemsForCurrentPage = [];
	var counterField = $('#counter').val();// total number if records after Search.
	var pt__totalNumberOfItems = counterField;//data.length;  // number here is the total number of items. Changes dynamically based on current total.
	$("#paging").easyPaging(pt__totalNumberOfItems, {
		onSelect: function(page, pt__totalNumberOfItems) {
			$('.pt__item').removeClass('pt__itemDisplay');
	    	pt__itemsForCurrentPage = [];
	    	//$("#pt__currentInfoParagraph").html("Page " + page + ": Showing products "+(this.slice[0]+1) + "-" + this.slice[1]);
	    	$("#pt__currentInfoParagraph").html("Page " + page + ": Showing products "+((page*pt__elementsForSecureSelectPage)-(pt__elementsForSecureSelectPage-1)) + "-" + (page*pt__elementsForSecureSelectPage)); // page = page number (pt__totalNumberOfItems divided by 10); this.slice[0]+1) = Start of range; this.slice[1] = End of range
	    	var pt__itemsForCurrentPageMaxValue = (page * pt__elementsForSecureSelectPage)-(pt__elementsForSecureSelectPage-1);
	        for( var pt = 1 ; pt <= pt__elementsForSecureSelectPage; pt++ ){
	        	pt__itemsForCurrentPage.push(pt__itemsForCurrentPageMaxValue);
	        	$('#' + pt__itemsForCurrentPageMaxValue).addClass('pt__itemDisplay');
	        	pt__itemsForCurrentPageMaxValue++;
	        }; 
	        $('#product-list-loading').css('display', 'none');
	        $('#paging').css('display', 'block');
	        $('#pt__currentInfoParagraph').css('display', 'block');
	    }
	}); 
}// END pagination
// PHONE CLICK
$('#btn-analysis_handset-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_handset').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?analysis_b='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// ACCESSORY CLICK
$('#btn-analysis_accessory-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_accessory').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?analysis_b='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// DRONE CLICK
$('#btn-analysis_drone-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_drone').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// FEATURE CLICK
$('#btn-analysis_feature-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_feature').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// MBB CLICK
$('#btn-analysis_mbb-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_mbb').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// MDM CLICK
$('#btn-analysis_mdm-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_mdm').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// OTHER CLICK
$('#btn-analysis_other-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_other').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// SIM CLICK
$('#btn-analysis_sim-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_sim').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// SMARTPHONE CLICK
$('#btn-analysis_smartphone-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_smartphone').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// TABLET CLICK
$('#btn-analysis_tablet-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_tablet').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// VR CLICK
$('#btn-analysis_vr-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_vr').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});

// WEARABLE CLICK
$('#btn-analysis_wearable-search').click(function() {
	$('#update').empty();
	resetPagination();
	var searchField = $('#analysis_wearable').val();
	document.getElementById('analysis_type').value	=	searchField;
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
});


// SEARCH BOX
function initSearchBox(){
	console.log('initSearchBox() called');
	$('#update').empty();
	resetPagination();

	checkboxes = new Array();
	checkboxes = document.getElementsByTagName('input');
	for (var i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].type == 'checkbox') {
			checkboxes[i].checked = false;
		}
	}
	var searchField = $('#product-search').val();
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('ajax/ProductSearch.cfm?search='+searchField, function(data) {  // need to update SRC of .json file when on server
		var output = data;

		$('#update').html(output);
		initialisePagination(output);
	});
};

$('#btn-product-search').click(function() {
	console.log('Submit when click button');
	initSearchBox();
});

$('#product-search').keyup(function(event) {
    if (event.keyCode == 13) {
        console.log('Submit when press enter');
        initSearchBox();
        return false;
     }
});


// CHECKBOX FILTERS
// Load all devices on initial page load
$(function(){
	$('#product-list-loading').css('display', 'inline');
	
	var selected__os_length = $('input.filter-os:checkbox:checked').length;
	var selected__manufacturer_length = $('input.filter-manufacturer:checkbox:checked').length;
	var searchField = $('#product-search').val();
	
	if(searchField !=''){
		var myExp = new RegExp(searchField, 'i');
		$('#update').empty();
		resetPagination();
		$.getJSON('ajax/ProductSearch.cfm?search='+searchField, function(data) {  // need to update SRC of .json file when on server
			var output = data;
			$('#update').html(output);
			initialisePagination(output);
		});
	}else if(selected__os_length == 0 && selected__manufacturer_length == 0){
		var searchField1= $('#analysis_type').val();
		var fieldType 	= $('#product_type').val();
		if(searchField1 != ""){
			if(searchField1 == "HANDSET" || searchField1 == "ACCESSORY" || (searchField1=="ALL" &&fieldType=="ACCESSORY") ){
				$('#update').empty();
				resetPagination();
				$.getJSON('ajax/ProductSearch.cfm?analysis_b='+searchField1, function(data) {  // need to update SRC of .json file when on server
					var output = data;

					$('#update').html(output);
					initialisePagination(output);
				});
			}else if( fieldType == "" && (searchField1 == "FEATURE" || searchField1 == "DRONE" || searchField1 == "MBB" || searchField1 == "MDM" || searchField1 == "OTHER" || searchField1 == "SIM" || searchField1 == "SMARTPHONE" || searchField1 == "TABLET" || searchField1 == "VR" || searchField1 == "WEARABLE") ){
				$('#update').empty();
				resetPagination();
				$.getJSON('ajax/ProductSearch.cfm?eselect_cat1='+searchField1, function(data) {  // need to update SRC of .json file when on server
					var output = data;

					$('#update').html(output);
					initialisePagination(output);
				});
			}else if(fieldType == "ACCESSORY"){
				$('#update').empty();
				resetPagination();
				$.getJSON('ajax/ProductSearch.cfm?eselect_cat2='+searchField1, function(data) {  // need to update SRC of .json file when on server
					var output = data;

					$('#update').html(output);
					initialisePagination(output);
				});
			}else{
				$('#update').empty();
				resetPagination();
				$.getJSON('ajax/ProductSearch.cfm', function(data) { // need to update SRC of .json file when on server
					var output = data;
					
					$('#update').html(output);
					initialisePagination(output);
				}); // end getJSON
			}
		}else{
			$('#update').empty();
			resetPagination();
			$.getJSON('ajax/ProductSearch.cfm', function(data) { // need to update SRC of .json file when on server
				var output = data;
				
				$('#update').html(output);
				initialisePagination(output);
			}); // end getJSON
		}
	}else{
		var selected__os = [];
		var selected__os_manufacturer = [];
		var selected__manufacturer = [];
		var selected__manufacturer_os = [];
		
		// find number of os boxes checked
		selected__os_length = $('input.filter-os:checkbox:checked').length;
		
		// find number of manufacturer boxes checked
		selected__manufacturer_length = $('input.filter-manufacturer:checkbox:checked').length;
		
		// find out whether the last filter selected was os or manufacturer
		if ($(this).hasClass('filter-os')){
			var boxChecked = 'boxChecked_os';
		};
		if ($(this).hasClass('filter-manufacturer')){
			var boxChecked = 'boxChecked_manufacturer';
		};
		
		// add the selected os to os array
		$('input.filter-os:checked').each(function() {
			var sliceValue__os = this.value.slice(2);
			selected__os.push(sliceValue__os);
		});
		
		// add the selected manufacturer to manufacturer array
		$('input.filter-manufacturer:checked').each(function() {
			var sliceValue__manufacturer = this.value.slice(2);
			selected__manufacturer.push(sliceValue__manufacturer);
		});
		
		//	console.log(selected__os);
		//	console.log(selected__manufacturer);
		$.ajax({
		// The URL for the request
		url : "ajax/ProductSearch.cfm",

		// The data to send - will be converted to a query string, and passed in the URL
		data : {
			set__os : JSON.stringify(selected__os),
			set__manufacturer : JSON.stringify(selected__manufacturer)
//			set__os : $(selected__os).serialize(),
//			set__manufacturer : $(selected__manufacturer).serialize()
		},

		// Whether this is a POST or GET request
		type : "GET",

		// The type of data we expect back (may not work if asking for XML & data is json, and also *may* not throw an error)
		// make sure the server’s Content-type header is correct – in this case, would be application/json
		dataType : "json",

		// Code to run if the request succeeds;
		// the response is passed to the function
		// the json in the function parentheses function(json) COULD BE CALLED ANYTHING e.g. function(thisCanBeAnything)
		// dot syntax is used to then delve into the contents of the json file
		success : function(data) {
			
			//alert(data);
			var output = '';
			output = data;
			$('#update').empty();
			resetPagination();
			// update the contents of the page
			$('#update').html(output);
			initialisePagination(output);
			
			// display message if no products are returned
			if($('#update').is(':empty')){
				$('#update').html('No products match your search criteria. Please try another combination.');
			};
		},

		// Code to run if the request fails; the raw request and status codes are passed to the function
		// The xhr, status and errorThrown parameters *could* be anything - however, the order seems to be what's important. 1st = xhr, 2nd = status, 3rd = error type
		error : function(xhr, status, errorThrown) {
//			console.log("Sorry, there was a problem!");
			//console.log("Error: " + errorThrown);
			//console.log("Status: " + status);
		},

		// Code to run regardless of success or failure
		complete : function(xhr, status) {
			//console.log("The request is complete!");
			}
		});	
	}
});


$('input[type=checkbox]').change(function(){
	
	// remove any existing handsets
	$('#update').empty();
	resetPagination();
	$("input[type=checkbox]").prop("disabled", true);
	// create arrays
	var selected__os = [];
	var selected__os_manufacturer = [];
	var selected__manufacturer = [];
	var selected__manufacturer_os = [];
	
	document.getElementById('product-search').value='';
	// find number of os boxes checked
	var selected__os_length = $('input.filter-os:checkbox:checked').length;
	
	// find number of manufacturer boxes checked
	var selected__manufacturer_length = $('input.filter-manufacturer:checkbox:checked').length;
	
	// find out whether the last filter selected was os or manufacturer
	if ($(this).hasClass('filter-os')){
		var boxChecked = 'boxChecked_os';
	};
	if ($(this).hasClass('filter-manufacturer')){
		var boxChecked = 'boxChecked_manufacturer';
	};
	
	// add the selected os to os array
	$('input.filter-os:checked').each(function() {
		var sliceValue__os = this.value.slice(2);
		selected__os.push(sliceValue__os);
	});
	
	// add the selected manufacturer to manufacturer array
	$('input.filter-manufacturer:checked').each(function() {
		var sliceValue__manufacturer = this.value.slice(2);
		selected__manufacturer.push(sliceValue__manufacturer);
	});
	
//	console.log(selected__os);
//	console.log(selected__manufacturer);
	$.ajax({
		// The URL for the request
		url : "ajax/ProductSearch.cfm",

		// The data to send - will be converted to a query string, and passed in the URL
		data : {
			set__os : JSON.stringify(selected__os),
			set__manufacturer : JSON.stringify(selected__manufacturer)
//			set__os : $(selected__os).serialize(),
//			set__manufacturer : $(selected__manufacturer).serialize()
		},

		// Whether this is a POST or GET request
		type : "GET",

		// The type of data we expect back (may not work if asking for XML & data is json, and also *may* not throw an error)
		// make sure the server�s Content-type header is correct � in this case, would be application/json
		dataType : "json",

		// Code to run if the request succeeds;
		// the response is passed to the function
		// the json in the function parentheses function(json) COULD BE CALLED ANYTHING e.g. function(thisCanBeAnything)
		// dot syntax is used to then delve into the contents of the json file
		success : function(data) {
			
			//alert(data);
			var output = '';
			output = data;
			$('#update').empty();
			resetPagination();			
			// update the contents of the page
			$('#update').html(output);
			initialisePagination(output);
			// display message if no products are returned
			if($('#update').is(':empty')){
				$('#update').html('No products match your search criteria. Please try another combination.');
			};
		},

		// Code to run if the request fails; the raw request and status codes are passed to the function
		// The xhr, status and errorThrown parameters *could* be anything - however, the order seems to be what's important. 1st = xhr, 2nd = status, 3rd = error type
		error : function(xhr, status, errorThrown) {
//			//console.log("Sorry, there was a problem!");
			//console.log("Error: " + errorThrown);
			//console.log("Status: " + status);
		},
		// Code to run regardless of success or failure
		complete : function(xhr, status) {
			//console.log("The request is complete!");
			$("input[type=checkbox]").prop("disabled", false);
			}
		});
		

});

