import $ from "jquery";
import LazyLoad from "vanilla-lazyload";
// eslint-disable-next-line no-unused-vars
import fancybox from "@fancyapps/fancybox";

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

let headerHeight = $('.header').height();
let windowWidth = $(window).width();

$('.header__burger').on('click', function() {
    $('.header').toggleClass('open');
    $('body, html').toggleClass('overflow-y-hidden');
});

$("[data-fancybox]").fancybox({
    scrolling   : 'hidden',
    helpers: {
        overlay: {
            locked: true 
        }
    },
    autoFocus: false,
});

$('a.scroll').on('click', function() {
    $('.header').toggleClass('open');
    $('body, html').toggleClass('overflow-y-hidden');

    let link = $(this);
    
    $("html, body").animate({
        scrollTop: $(link.attr("href")).offset().top - headerHeight + "px"
    }, {
        duration: 800
    });
    return false;    
});

$(window).on('scroll', function() {
    let scrollTop = $(window).scrollTop();
    
    if (scrollTop > 1) {
        $('.header').addClass('js-fixed');
        $('body').addClass('js-fixed');
    } else {
        $('.header').removeClass('js-fixed');
        $('body').removeClass('js-fixed');
    }
});

$(window).on('resize', function() {
    let widthWindow = $(window).width();
    mobileContact(widthWindow);
});

mobileContact(windowWidth);

function mobileContact(widthOfWindow) {
    switch(true) {
        case widthOfWindow < 991:
            if ($('.header__menu-contact-mobile .header__menu-links').length == 0) {
                $('.header__menu-contact-mobile').append($('.header__menu-links'));
                console.log('1')
            }
        break; 
        case widthOfWindow > 991:
            if ($('.header__menu-contact .header__menu-links').length == 0) {
                $('.header__menu-contact').append($('.header__menu-links'));
                console.log('2')
            }
        break;
    }
}

$('.lang__list-item').each(function(i) {
    if (windowWidth > 600) {
        if (i == 0) {
        }
    } else {
        if (i == 0) {
            $(this).addClass('active');
        }
    }
});

$('.lang__list-item').on('click', function() {
    if (windowWidth > 600) {
        $('.lang__list-item').show();
    } else {
        $('.lang__list-item').removeClass('lang__list-item--active');
        $(this).addClass('lang__list-item--active');

    }
});

function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      }
    });
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  for (let elm of elements) {
    observer.observe(elm);
}