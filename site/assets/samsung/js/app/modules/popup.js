//lightbox popup 
$(function() {
    

	$('.lightbox-popup').click(function() {
		var popUpId = $(this).data('popupid'); //get the id of the pop up we want to show
		$('#' + popUpId).show(); //show it ()
		
		var returnUrl = $(this).data('return-url'); //check if the calling link has set a return url
		
		if (returnUrl){
			$('#registURL').val(returnUrl); //update the value
		}
		
		//show dim layer
		$('#dimContainer').append('<div class="lightbox-skrim"></div>');
	});


	//#dimContainer click
	$('#dimContainer,.layer_popup .close-button').click(function() {
		$('#dimContainer').empty();
		$('.layer_popup').hide();
		return false;
	});

	$('.sign-in-btn').click(function () {

	    var checked = $('#acceptRemember').is(':checked');
	    var email = $('#UserEmail').val();

        if (!checked) {
            document.cookie = "_common_saveEmail=; domain=samsung.com;expires=" + Date();
        } else {
            var d = new Date(); 
            d.setDate(d.getDate() + 7);
            document.cookie = "_common_saveEmail=" + email + "; domain=samsung.com; path=/; expires=" + d;
        }
        $('#SloginForm').submit();
    });

    $('.sign-up-btn').click(function () {
        $('#actionID').val('SignupAP');
        $('#SloginForm').submit();
    });

    $('.input').keypress(function (e) {
        if (e.which == 13) {
            $('#SloginForm').submit();
            return false;  
        }
    });
});