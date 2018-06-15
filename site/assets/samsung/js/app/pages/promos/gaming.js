////// INITIALISE ACCORDION //////
			/* INITIALISE ACCORDION */
			function calcWindowSize(){
				var windowWidth = ($(window).width())+17; 
				if (windowWidth < 1024  ) {
					$('.gam-accordion-link.active').removeClass('active');
					$('.gam-accordion-panel.show').removeClass('show');
					};
			};
			calcWindowSize();
			var acc = document.getElementsByClassName("gam-accordion-link");
			var i;
			for (i = 0; i < acc.length; i++) {
			    acc[i].onclick = function(){
			        this.classList.toggle("active");
			        this.nextElementSibling.classList.toggle("show");
			    }
			}