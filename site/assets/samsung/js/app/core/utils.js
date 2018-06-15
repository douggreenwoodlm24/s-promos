// utilities 

//http://davidwalsh.name/device-state-detection-css-media-queries-javascript

function getDeviceState() {
    if(document.addEventListener){ // check for older IE (8 or lower)
    	if(typeof(window.getComputedStyle) !== 'undefined') {
    		return window.getComputedStyle(document.querySelector('.container'), ':after').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    	} else { 
    		return 'large';	
    	}
    } else {
        return 'large'; 
    }
}

//smooth scroll -- http://css-tricks.com/snippets/jquery/smooth-scrolling/

//same page hash
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top - 60
            }, 750);
            return false;
        }
    }
});

//scroll to a specific target
//<a class="autoscroll" data-scrollto=".nav--full" data-scrollspeed="500">link</a>
$('.autoscroll').click(function() {

    var target = $(this).data('scrollto');
    var speed = $(this).data('scrollspeed');

	//default speed not provided
    if (!$.isNumeric(speed)) {
    	speed = 750;
    } 

    autoScroll(target,speed);
});


function autoScroll(target,speed) {
    var targetPos = $(target).offset(); //assume we're targeting a class (should pick the first)
 
    if (targetPos.top > 0) {
        $('html,body').animate({
             scrollTop: targetPos.top - 10
        }, speed);
    } 
}

function autoScroll2(target,speed,custOffset) {
    var targetPos = $(target).offset(); //assume we're targeting a class (should pick the first)
 
    if (targetPos.top > 0) {
        $('html,body').animate({
             scrollTop: targetPos.top - custOffset 
        }, speed);
    } 
} 


//back to top
var btt_offset = 150;
var btt_duration = 250;

if(window.addEventListener) {
    window.addEventListener('scroll', debounce(function() {    
    if ($(this).scrollTop() > btt_offset) {
        $('.back-to-top').addClass('back-to-top--show');
    } else {
        $('.back-to-top').removeClass('back-to-top--show');
    }    
}, 500)); //run once every .5s
}

$('.back-to-top').click(function() {
    $(this).removeClass('back-to-top--show');
});


//http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    if (width > 960) { //only open popup if on larger screen otherwise fallback to default link
        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }

    } else { //vanilla new window (target blank style)
        window.open(url);
    } 

}

//http://davidwalsh.name/javascript-debounce-function
function debounce(a,b,c){var d;return function(){var e=this,f=arguments;clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b),c&&!d&&a.apply(e,f)}}
