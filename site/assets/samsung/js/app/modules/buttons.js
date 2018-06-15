//button logic
$(function() {
    
    $('#signOutButton').click(function () {
		
		var region = $(this).data('region');
		
		var url = '/' + region + '/signout/'
		
        $.ajax({
            url: url
        }).done(function (data) {
            if (data) {
                $('#signOutButton').css("display", "none");
                $('#signInButton').css("display", "block");

                $('#usersShoppingBasket').css("display", "none");

				if (region == "uk-epp" || region == "uk-staff") {
					window.location.replace('/'+region+'/epp-signin/');
				}
			
            }
        });
		
	});

});

