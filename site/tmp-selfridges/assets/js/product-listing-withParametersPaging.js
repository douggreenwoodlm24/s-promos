function initialisePagination(data){ // START pagination
    var pt__elementsForSecureSelectPage = 8; // number here is number of items to display on page. NB: if changed, also needs to be changed in jquery.easy-paging.js
	var pt__itemsForCurrentPage = [];
	var pt__totalNumberOfItems = data.length;  // number here is the total number of items. Changes dynamically based on current total.
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
	    }
	}); 
}// END pagination

// SEARCH BOX
$('#btn-product-search').click(function() {
	$('#update').empty();
	var searchField = $('#product-search').val();
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('/assets/js/product-listing-data.json', function(data) {  // need to update SRC of .json file when on server
		var output = '';
		$.each(data, function(key, val) {
			if ((val.name.search(myExp) != -1) || (val.description.search(myExp) != -1)) {
				//output += val.name + '<br/>';
				output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
					+ val.href
					+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
					+ val.imageName
					+ '"></a></div><div class="product-info"><h3><a href="'
					+ val.href
					+ '">'
					+ val.name
					+ '</a></h3><h6>'
					+ val.color + ' ' + val.storage 
					+ '</h6><p class="price">&#163;'
					+ val.price
					+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
					+ val.href
					+ '">Details</a></p></div></div></div>';
			}
		});
		$('#update').html(output);
	});
});


// CHECKBOX FILTERS
// Load all devices on initial page load
$(function(){
	$.getJSON('/assets/js/product-listing-data.json', function(data) { // need to update SRC of .json file when on server
		var output = '';
		
		
		
		for (var i = 0; i < data.length; i++) {	
			//output += data[i].name + '<br/>';
				data[i].pt__itemId = i+1;
						output += '<div class="list-table-item grid col-sm-6 pt__item" id="'
							+ (i+1)
							+ '"><div class="row"><div class="product-image"><a href="'
							+ data[i].href
							+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
							+ data[i].imageName
							+ '"></a></div><div class="product-info"><h3><a href="'
							+ data[i].href
							+ '">'
							+ data[i].name
							+ '</a></h3><h6>'
							+ data[i].color + ' ' + data[i].storage 
							+ '</h6><p class="price">&#163;'
							+ data[i].price
							+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
							+ data[i].href
							+ '">Details</a></p></div></div></div>';
					}; 
		
		
		$('#update').html(output);
		
		// initialise pagination
		initialisePagination(data);
		
	}); // end getJSON
});


$('input[type=checkbox]').change(function(){
	
	// remove any existing handsets
	$('#update').empty();
	
	// create arrays
	var selected__os = [];
	var selected__os_manufacturer = [];
	var selected__manufacturer = [];
	var selected__manufacturer_os = [];
	
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
	
	//console.log(selected__os);
	//console.log(selected__manufacturer);
	
	$.ajax({
		
		// The URL for the request
		url : "/assets/js/product-listing-data.json",

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
			
			
			var output = '';
			
			
			// if last filter selected was os
			if (boxChecked == 'boxChecked_os'){
				
				//if there are no more os filters checked
				if(selected__os_length == 0) {
					
					if (selected__manufacturer_length == 0){
						
						// loop through number of items in json data
						for (var i = 0; i < data.length; i++) {	
							//output += data[i].name + '<br/>';
							output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
							+ data[i].href
							+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
							+ data[i].imageName
							+ '"></a></div><div class="product-info"><h3><a href="'
							+ data[i].href
							+ '">'
							+ data[i].name
							+ '</a></h3><h6>'
							+ data[i].color + ' ' + data[i].storage 
							+ '</h6><p class="price">&#163;'
							+ data[i].price
							+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
							+ data[i].href
							+ '">Details</a></p></div></div></div>';
						};
					} else {
						
						for (var i = 0; i < data.length; i++) {			
							
							// loop through number of os checkboxes selected
							for (var j = 0; j < selected__manufacturer.length; j++) {				
								
								// if a os in the json file equals a os checkbox selected
								if (data[i].manufacturer == selected__manufacturer[j]) {
									//output += data[i].name + '<br/>';
									output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
									+ data[i].href
									+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
									+ data[i].imageName
									+ '"></a></div><div class="product-info"><h3><a href="'
									+ data[i].href
									+ '">'
									+ data[i].name
									+ '</a></h3><h6>'
									+ data[i].color + ' ' + data[i].storage 
									+ '</h6><p class="price">&#163;'
									+ data[i].price
									+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
									+ data[i].href
									+ '">Details</a></p></div></div></div>';
									
						        };
						        
						    } // end for j
						} // end for i
					};
				
				} else { // if there are any os filters checked	
					
					// are any manufacturer checkboxes selected Yes/No? If Yes:
					if(selected__manufacturer_length != 0){	
						
						// loop through number of items in json data
						for (var i = 0; i < data.length; i++) {			
							
							for (var j = 0; j < selected__manufacturer.length; j++) {				

								// if an manufacturer in the json file equals a manufacturer checkbox selected
								if ((data[i].manufacturer == selected__manufacturer[j]) && (data[i].os == selected__os)) {
									//output += data[i].name + '<br/>';
									output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
									+ data[i].href
									+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
									+ data[i].imageName
									+ '"></a></div><div class="product-info"><h3><a href="'
									+ data[i].href
									+ '">'
									+ data[i].name
									+ '</a></h3><h6>'
									+ data[i].color + ' ' + data[i].storage 
									+ '</h6><p class="price">&#163;'
									+ data[i].price
									+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
									+ data[i].href
									+ '">Details</a></p></div></div></div>';
									
						        } else {
						        	
						        	// display a result when have multiple os AND multiple manufacturers 
						        	if (selected__os.length > 1) {	
						        		for (var n = 0; n < selected__os.length; n++) {					
											if ((data[i].os == selected__os[n]) && (data[i].manufacturer == selected__manufacturer[j])) {
												//output += data[i].name + '<br/>';
												output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
												+ data[i].href
												+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
												+ data[i].imageName
												+ '"></a></div><div class="product-info"><h3><a href="'
												+ data[i].href
												+ '">'
												+ data[i].name
												+ '</a></h3><h6>'
												+ data[i].color + ' ' + data[i].storage 
												+ '</h6><p class="price">&#163;'
												+ data[i].price
												+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
												+ data[i].href
												+ '">Details</a></p></div></div></div>';
											 };
											        
										}; // end for n
						        		
						        	};
						        };
						        
						    } // end for j
							

							
						} // end for i
						
						
					} else { // are any manufacturer checkboxes selected Yes/No? If No:
						
						// loop through number of items in json data
						for (var i = 0; i < data.length; i++) {			
							
							// loop through number of os checkboxes selected
							for (var j = 0; j < selected__os.length; j++) {				
								
								// if a os in the json file equals a os checkbox selected
								if (data[i].os == selected__os[j]) {
									//output += data[i].name + '<br/>';
									output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
									+ data[i].href
									+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
									+ data[i].imageName
									+ '"></a></div><div class="product-info"><h3><a href="'
									+ data[i].href
									+ '">'
									+ data[i].name
									+ '</a></h3><h6>'
									+ data[i].color + ' ' + data[i].storage 
									+ '</h6><p class="price">&#163;'
									+ data[i].price
									+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
									+ data[i].href
									+ '">Details</a></p></div></div></div>';
									
						        };
						        
						    } // end for j
						} // end for i
					}; 
				};
				
				
			}; // end last filter selected was os
			
			////////////////////////
			
			// if last filter selected was manufacturer 
			if (boxChecked == 'boxChecked_manufacturer'){
				
				//if there are no more manufacturer filters checked
				if(selected__manufacturer_length == 0) {
					
					// if there are no os filters checked
					if (selected__os_length == 0){

						// loop through number of items in json data
						for (var i = 0; i < data.length; i++) {	
							//output += data[i].name + '<br/>';
							output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
							+ data[i].href
							+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
							+ data[i].imageName
							+ '"></a></div><div class="product-info"><h3><a href="'
							+ data[i].href
							+ '">'
							+ data[i].name
							+ '</a></h3><h6>'
							+ data[i].color + ' ' + data[i].storage 
							+ '</h6><p class="price">&#163;'
							+ data[i].price
							+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
							+ data[i].href
							+ '">Details</a></p></div></div></div>';
							
						};
					} else { // if there are os filters checked
						
						
						
						for (var i = 0; i < data.length; i++) {			
							
							// loop through number of manufacturer checkboxes selected
							for (var j = 0; j < selected__os.length; j++) {				
								
								// if a manufacturer in the json file equals a manufacturer checkbox selected
								if (data[i].os == selected__os[j]) {
									//output += data[i].name + '<br/>';
									output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
									+ data[i].href
									+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
									+ data[i].imageName
									+ '"></a></div><div class="product-info"><h3><a href="'
									+ data[i].href
									+ '">'
									+ data[i].name
									+ '</a></h3><h6>'
									+ data[i].color + ' ' + data[i].storage 
									+ '</h6><p class="price">&#163;'
									+ data[i].price
									+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
									+ data[i].href
									+ '">Details</a></p></div></div></div>';
									
						        };
						        
						    } // end for j
						} // end for i
					};
					
					
				
				} else { // if there are any manufacturer filters checked
					
					
					
					
					// are any os checkboxes selected Yes/No? If Yes:
					if(selected__os_length != 0){
						
						//console.log('selected__os_length is: ' + selected__os_length);
						if(selected__os_length > 1){
							// loop through number of items in json data
							for (var i = 0; i < data.length; i++) {			
								
								for (var j = 0; j < selected__manufacturer.length; j++) {				

									// if an manufacturer in the json file equals a manufacturer checkbox selected
									if ((data[i].manufacturer == selected__manufacturer[j]) && (data[i].os == selected__os)) {
										//output += data[i].name + '<br/>';
										output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
										+ data[i].href
										+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
										+ data[i].imageName
										+ '"></a></div><div class="product-info"><h3><a href="'
										+ data[i].href
										+ '">'
										+ data[i].name
										+ '</a></h3><h6>'
										+ data[i].color + ' ' + data[i].storage 
										+ '</h6><p class="price">&#163;'
										+ data[i].price
										+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
										+ data[i].href
										+ '">Details</a></p></div></div></div>';
										
							        } else {
							        	
							        	// display a result when have multiple os AND multiple manufacturers 
							        	if (selected__os.length > 1) {	
							        		for (var n = 0; n < selected__os.length; n++) {					
												if ((data[i].os == selected__os[n]) && (data[i].manufacturer == selected__manufacturer[j])) {
													//output += data[i].name + '<br/>';
													output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
													+ data[i].href
													+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
													+ data[i].imageName
													+ '"></a></div><div class="product-info"><h3><a href="'
													+ data[i].href
													+ '">'
													+ data[i].name
													+ '</a></h3><h6>'
													+ data[i].color + ' ' + data[i].storage 
													+ '</h6><p class="price">&#163;'
													+ data[i].price
													+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
													+ data[i].href
													+ '">Details</a></p></div></div></div>';	
												 };
												        
											}; // end for n
							        		
							        	};
							        };
							        
							    } // end for j
								

								
							} // end for i
						};
						
						if(selected__os_length == 1){
							console.log('exactly 1 os already selected');
							// loop through number of items in json data
							for (var i = 0; i < data.length; i++) {			
								
								for (var j = 0; j < selected__manufacturer.length; j++) {				

									// if an manufacturer in the json file equals a manufacturer checkbox selected
									if ((data[i].manufacturer == selected__manufacturer[j]) && (data[i].os == selected__os)) {
										//output += data[i].name + '<br/>';
										output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
										+ data[i].href
										+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
										+ data[i].imageName
										+ '"></a></div><div class="product-info"><h3><a href="'
										+ data[i].href
										+ '">'
										+ data[i].name
										+ '</a></h3><h6>'
										+ data[i].color + ' ' + data[i].storage 
										+ '</h6><p class="price">&#163;'
										+ data[i].price
										+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
										+ data[i].href
										+ '">Details</a></p></div></div></div>';
										
							        } else {
							        	
							        	// display a result when have multiple os AND multiple manufacturers 
							        	if (selected__os.length > 1) {	
							        		for (var n = 0; n < selected__os.length; n++) {					
												if ((data[i].os == selected__os[n]) && (data[i].manufacturer == selected__manufacturer[j])) {
													//output += data[i].name + '<br/>';
													output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
													+ data[i].href
													+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
													+ data[i].imageName
													+ '"></a></div><div class="product-info"><h3><a href="'
													+ data[i].href
													+ '">'
													+ data[i].name
													+ '</a></h3><h6>'
													+ data[i].color + ' ' + data[i].storage 
													+ '</h6><p class="price">&#163;'
													+ data[i].price
													+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
													+ data[i].href
													+ '">Details</a></p></div></div></div>';
												 };
												        
											}; // end for n
							        		
							        	};
							        };
							        
							    } // end for j
								

								
							} // end for i
							
						}
						
						
						
						
					} else { // are any os checkboxes selected Yes/No? If No:
						console.log('No os already selected');
						
						// loop through number of items in json data
						for (var i = 0; i < data.length; i++) {			
							
							// loop through number of manufacturer checkboxes selected
							for (var j = 0; j < selected__manufacturer.length; j++) {				
								
								// if a manufacturer in the json file equals a manufacturer checkbox selected
								if (data[i].manufacturer == selected__manufacturer[j]) {
									//output += data[i].name + '<br/>';
									output += '<div class="list-table-item grid col-sm-6"><div class="row"><div class="product-image"><a href="'
									+ data[i].href
									+ '"><img class="img-responsive" alt="Product image" src="images/products/thumbs/'
									+ data[i].imageName
									+ '"></a></div><div class="product-info"><h3><a href="'
									+ data[i].href
									+ '">'
									+ data[i].name
									+ '</a></h3><h6>'
									+ data[i].color + ' ' + data[i].storage 
									+ '</h6><p class="price">&#163;'
									+ data[i].price
									+ '</p><p class="details">Insurance: From &#163;7.99/month</p><p class="details">Finance: From &#163;24.95/month</p><p class="more"><a href="'
									+ data[i].href
									+ '">Details</a></p></div></div></div>';
									
						        };
						        
						    } // end for j
						} // end for i
					}; 
				};

			}; // end last filter selected was manufacturer
			
			
			// update the contents of the page
			$('#update').html(output);
			initialisePagination(data);
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

});

