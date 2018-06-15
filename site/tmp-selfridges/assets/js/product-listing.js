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


// SEARCH BOX
$('#btn-product-search').click(function() {
	$('#update').empty();
	var searchField = $('#product-search').val();
	var myExp = new RegExp(searchField, 'i');
	$.getJSON('/Secure Select v1/assets/js/product-listing-data.json', function(data) {  // need to update SRC of .json file when on server
		var output = '';
		$.each(data, function(key, val) {
			if ((val.name.search(myExp) != -1) || (val.description.search(myExp) != -1)) {
				output += val.name + '<br/>';
			}
		});
		$('#update').html(output);
	});
});


// CHECKBOX FILTERS
// Load all devices on initial page load
$(function(){
	$.getJSON('/Secure Select v1/assets/js/product-listing-data.json', function(data) { // need to update SRC of .json file when on server
		var output = '';
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
		$('#update').html(output);
	}); // end getJSON
});


$('input.filter-product-listing[type=checkbox]').change(function(){
	
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
		selected__os.push(this.value);
	});
	
	// add the selected manufacturer to manufacturer array
	$('input.filter-manufacturer:checked').each(function() {
		selected__manufacturer.push(this.value);
	});
	// To call ColdFusion file and get the record set in Json format.
	$.getJSON('/BPSecureSelect/assets/js/product-listing-data.json', function(data) { // need to update SRC of .json file when on server
		alert(data);
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
									console.log('papap');
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
										console.log('papap');
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
										console.log('papap');
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
		
		// display message if no products are returned
		if($('#update').is(':empty')){
			$('#update').html('No products match your search criteria. Please try another combination.');
		};
		
	}); // end getJSON
});

