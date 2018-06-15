$('input[name^=filter-]').change(function(){
	// clear existing results
	
	// show loading animation
	
	// get all OS checked boxes
	var filtersOSChecked = $("#filter-os input:checkbox:checked").map(function(){
      return $(this).attr('id');
    }).get(); 
    var totalCheckedOS = filtersOSChecked.length;
    for(i=0;i<totalCheckedOS;i++){
    	filtersOSChecked[i];
    	console.log(filtersOSChecked[i]);
    };
	    
	// get all Manufacturer checked boxes
	var filtersManufacturerChecked = $("#filter-manufacturer input:checkbox:checked").map(function(){
      return $(this).attr('id');
    }).get(); 
    //console.log(filtersManufacturerChecked);
    
    
	
	// get JSON
	$.getJSON('assets/js/productListing.json', function(data) {
		var productsData = data;
		//console.log(productsData.items[2]);	
		
		var returnedData = $.grep(productsData.items, function (element, index) {
		    return element.operating_system == "android";
		});

		console.log(returnedData[0].operating_system + "  " + returnedData[0].manufacturer);
	}); 


});