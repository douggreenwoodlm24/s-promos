///////////////////////////
// Fridges JS
///////////////////////////

$(function() {	
	
	/* NOUI SLIDER */
	/*  height slider */
	var stepSlider = document.getElementById('fridgef-slider-height');

	noUiSlider.create(stepSlider, {
		start: [ 1800 ],
		step: 100,
		range: {
			'min': [  1700 ],
			'max': [ 2000 ]
		}
	});

	/*  width slider */
	var stepSlider = document.getElementById('fridgef-slider-width');

	noUiSlider.create(stepSlider, {
		start: [ 600 ],
		step: 300,
		range: {
			'min': [  600 ],
			'max': [ 900 ]
		}
	});


	/* INITIALISE ACCORDION */
	function calcWindowSize(){
		var windowWidth = ($(window).width())+17; 
		if (windowWidth < 1024  ) {
			$('.f-accordion.active').removeClass('active');
			$('.f-panel.show').removeClass('show');
			};
	};
	calcWindowSize();
	
	var acc = document.getElementsByClassName("f-accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	    acc[i].onclick = function(){
	        this.classList.toggle("active");
	        this.nextElementSibling.classList.toggle("show");
	    }
	}

	/* ADD/REMOVE SELECTED OPTIONS */
	function fridgefAddSelection(yourSelectionCategory){
		$('.fridgef-selection-boxes').append('<li class="box">' + yourSelectionCategory + '<img src="assets/samsung/img/promotions/fridges/close-icon.png" alt="Close" onclick="$(this).parent(\'.box\').remove();" style="cursor: pointer;margin-left: 6px"/></li>')
	};
	fridgefAddSelection('Multi-door'); // Temporary function call for static demo
	fridgefAddSelection('All freshness'); //  Temporary function call for static demo
	
}); 
