var $mobileNav = $('header .container .mobile');
var $menuTrigger = $('.menu-trigger');

$menuTrigger.on('click', function() {
  $mobileNav.toggleClass('active');
});

$(window).resize(function() {
  if ($(window).height() > 530) {
    $mobileNav.removeClass('active');
  }
});
