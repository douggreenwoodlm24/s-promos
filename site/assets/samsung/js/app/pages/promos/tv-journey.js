///////////////////////////
// TV Journey JS
///////////////////////////

//      const inputs = [].slice.call(document.querySelectorAll('.controls input'));
//
//      // listen for changes
//      inputs.forEach(input => input.addEventListener('change', handleUpdate));
//      inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
//
//      function handleUpdate(e) {
//        // append 'px' to the end of spacing and blur variables
//        const suffix = (this.id === 'base' ? '' : '%');
//        console.log(suffix);
//        document.documentElement.style.setProperty(`--${this.id}`, this.value + suffix);
//      }

      
      
      /////////////////////

// Move to next stage
  	// Page load defaults
  	$('#tvj-animation-stage1').show();
	$('#tvj-animation-stage2').hide();
	$('#tvj-animation-stage3').hide();
	$('#tvj-animation-results').hide();
  	
  	// Stage 1 > 2
  	$('#tvj-animation-moveTo2').click(function(){
  		$('#tvj-animation-stage1').hide();
  		$('#tvj-animation-stage2').show();
  		$('.tvj-animation-stages ul li').removeClass('current');
  		$('#stageIndicator2').addClass('current');
  	});
  	// Stage 2 > 3
  	$('#tvj-animation-moveTo3').click(function(){
  		$('#tvj-animation-stage2').hide();
  		$('#tvj-animation-stage3').show();
  		$('.tvj-animation-stages ul li').removeClass('current');
  		$('#stageIndicator3').addClass('current');
  	});
 // Stage 3 > Show results
  	$('#tvj-animation-moveToResults').click(function(){
  		$('#tvj-animation-stage3').hide();
  		$('#tvj-animation-results').show();
  		//$('.tvj-animation-stages ul li').removeClass('current');
  		//$('#stageIndicator3').addClass('current');
  	});
  	
  	// Start again
  	$('.tvj-animation-startAgain').click(function(){
  		$('#tvj-animation-stage1').show();
  		$('#tvj-animation-stage2').hide();
  		$('#tvj-animation-stage3').hide();
  		$('.tvj-animation-stages ul li').removeClass('current');
  		$('#stageIndicator1').addClass('current');
  	});
  	
  	// STAGE 1
	// initialise slider and set the range, steps, etc
    var stepSlider = document.getElementById('tvj-slider-height');
  	noUiSlider.create(stepSlider, {
  		start: [ 1 ],
  		step: 1,
  		range: {
  			'min': [  1 ],
  			'max': [ 7 ]
  		}
  	});
  	
  	// remove any existing classes from wall before re-applying a new class
  	function resetDistanceStep(){
  		$('.tvj-animation').removeClass('tvj-animation-1').removeClass('tvj-animation-2').removeClass('tvj-animation-3').removeClass('tvj-animation-4').removeClass('tvj-animation-5').removeClass('tvj-animation-6').removeClass('tvj-animation-7');
  	};
  	
  	// set the location of the tv images
  	var hd = 'assets/samsung/img/promotions/tv-journey/tvj-anim-tv-hd.png';
  	var uhd = 'assets/samsung/img/promotions/tv-journey/tvj-anim-tv-uhd.png';
  	var curved = 'assets/samsung/img/promotions/tv-journey/tvj-anim-tv-curved.png';

  	stepSlider.noUiSlider.on('update', function( values, handle ) {
  		//console.log(values[handle]);
  		var currentDistanceStep = Math.round(values[handle]);
  		//console.log(currentDistanceStep);
  		//var invertedValue = (1920 - values[handle]);
  		//console.log(invertedValue);
  		//$('#tvj-animation-wall').css('border', values[handle] + 'px solid blue');
  		//$('#tvj-animation-wall').css('width', invertedValue + 'px');
  		switch(currentDistanceStep){
  			case 1:
  				resetDistanceStep();
  				console.log('slider is at 1');
  				$('.tvj-animation').addClass('tvj-animation-1');
  				break;
  			case 2:
  				resetDistanceStep();
  				console.log('slider is at 2');
  				$('.tvj-animation').addClass('tvj-animation-2');
  				break;
  			case 3:
  				resetDistanceStep();
  				console.log('slider is at 3');
  				$('.tvj-animation').addClass('tvj-animation-3');
  				break;
  			case 4:
  				resetDistanceStep();
  				console.log('slider is at 4');
  				$('.tvj-animation').addClass('tvj-animation-4');
  				break;
  			case 5:
  				resetDistanceStep();
  				console.log('slider is at 5');
  				$('.tvj-animation').addClass('tvj-animation-5');
  				break;
  			case 6:
  				resetDistanceStep();
  				console.log('slider is at 6');
  				$('.tvj-animation').addClass('tvj-animation-6');
  				break;
  			case 7:
  				resetDistanceStep();
  				console.log('slider is at 7');
  				$('.tvj-animation').addClass('tvj-animation-7');
  				break;
  			default:
  				console.log('default triggered');
  		}
  	});


  	// STAGE 2
  	var rememberResolutionForStage3;
  	
  	 $('input[type=radio][name=screenResolution]').change(function() {
  		if(this.value == 'hd'){
  			$('#tvj-animation-tv').attr('src',hd);
  			rememberResolutionForStage3 = hd;
  		};
  		if(this.value == 'uhd'){
  			$('#tvj-animation-tv').attr('src',uhd);
  			rememberResolutionForStage3 = uhd;
  		}
  	});
  	 
  // STAGE 3
  	 $('input[type=radio][name=screenType]').change(function() {
  		if(this.value == 'flat'){
  			console.log('Flat selected');
  			$('#tvj-animation-tv').attr('src',rememberResolutionForStage3);
  		};
  		if(this.value == 'curved'){
  			console.log('Curved selected');
  			$('#tvj-animation-tv').attr('src',curved);
  		};
  		if(this.value == 'serif'){
  			console.log('Serif selected');
  			//$('#tvj-animation-tv').attr('src',uhd);
  		}
  	});
  	
  
  // product row swiper/carousel 1
  	var galleryTop = new Swiper('#tvj-swiper-product1 .gallery-top', {
  		nextButton : '#tvj-swiper-product1 .swiper-button-next',
  		prevButton : '#tvj-swiper-product1 .swiper-button-prev',
  		spaceBetween : 10
  	});
  	var galleryThumbs = new Swiper('#tvj-swiper-product1 .gallery-thumbs', {
  		spaceBetween : 0,
  		centeredSlides : true,
  		slidesPerView : 'auto',
  		touchRatio : 0.2,
  		slideToClickedSlide : true,
  		direction: 'vertical'
  	});
  	galleryTop.params.control = galleryThumbs;
  	galleryThumbs.params.control = galleryTop;