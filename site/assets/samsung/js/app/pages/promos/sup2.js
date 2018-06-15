///////////////////////////
// Samsung Upgrade Programme 2 JS
///////////////////////////

$(function() {	
	
	//////  SUBMIT STAY UP TO DATE BOX //////
	
	//////  MODAL BOX //////
	$('.sup2-popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
	
	//////// SUBMIT > THANK YOU SCREEN //////////
	$('#sup2-stayuptodate-register').click(function(){
		$('#sup2-stayuptodate-form').show();
		$('#sup2-stayuptodate-thanks').hide();
	})
	
	$('#sup2-stayuptodate-thanks').hide();
	function sup2StayUpToDateConfirm(){
		$('#sup2-stayuptodate-form').hide();
		$('#sup2-stayuptodate-thanks').show();
	};
	$('#sup2-stayuptodate-submit').click(function(){
		sup2StayUpToDateConfirm();
		return false;
	});
}); 
