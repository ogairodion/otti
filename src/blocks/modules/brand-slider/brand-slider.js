import {Swiper, Pagination, Mousewheel, Thumbs, EffectFade, Lazy} from "swiper";
import $, { data } from "jquery";


Swiper.use([Pagination, Mousewheel, Thumbs, EffectFade, Lazy]);


let brandSlider = new Swiper(".brand-slider__logos", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    thumbs: {
        swiper: brandSlider,
    },
    direction: "horizontal",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    grabCursor: true,
    lazy: true,
    mousewheel: true,
    slideToClickedSlide: true,
    breakpoints: {
        991: {
            slidesPerView: 5,
            direction: "vertical",
        }
    }
});

let brandSliderLogos = new Swiper(".brand-slider__logos-main", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    effect: 'fade',
    allowTouchMove: false,
    lazy: true,
    fadeEffect: {
        crossFade: true
    },
    watchOverflow: true,
    pagination: true,
});

let windowWidth = $(window).width();

brandSlider.on('slideChange', function() {
    brandSliderLogos.slideTo(this.realIndex);
});

brandSlider.on('slideChangeTransitionEnd', function() {
    getProduct(this);
});

let brands = $('.brand-slider__img');
// let brandsWrapperWidth = $('.brand-slider__wrapper-brands').width();
// let brandsWrapperHeight = $('.brand-slider__wrapper-brands').height();


// if (windowWidth > 991) {
//     brands.each(function() {
//         let top = Math.floor(Math.random() * (brandsWrapperHeight - $(this).prev().height()));
//         let left = Math.floor(Math.random() * (brandsWrapperWidth - $(this).prev().width()));

//         $(this).css({
//             'top' :  top,
//             'left' : left
//         })
//     });
// }

// $(window).on('resize', function() {
//     windowWidth = $(window).width();

//     if (windowWidth > 991) {
//         brands.each(function() {
//             let top = Math.floor(Math.random() * (brandsWrapperHeight - $(this).prev().height()));
//             let left = Math.floor(Math.random() * (brandsWrapperWidth - $(this).prev().width()));
        
//             $(this).css({
//                 'top' :  top,
//                 'left' : left
//             })
//         });
//     }
// });

getProduct(brandSlider);

function getProduct(slider) {
    let dataId;

    $(slider.slides).each(function() {
        if ($(this).hasClass('swiper-slide-active')) {
            dataId = $(this).attr('data-id');
        }
    });

    brands.each(function() {
        if ($(this).attr('data-id') == dataId) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    });
}

$('.brand-slider__img').on('mouseover', function(e) {
    if (e.currentTarget.dataset.id) {
        let id = e.currentTarget.dataset.id;

        $('.swiper-slide', $('.brand-slider__logos')).each(function() {
            if ($(this).attr('data-id') == id) {
                
                $(this).css({
                    'transform' : 'scale(1)',
                })
            }
        });
    } 
});

$('.brand-slider__img').on('mouseout', function(e) {
    $('.swiper-slide', $('.brand-slider__logos')).each(function() {
        $(this).css({
            'transform' : 'scale(.8)',
        })
    });
});

