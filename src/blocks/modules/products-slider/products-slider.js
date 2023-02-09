import {Swiper, Navigation, EffectCoverflow, Thumbs, EffectFade} from "swiper";

Swiper.use([Navigation, EffectCoverflow, Thumbs, EffectFade]);

let productsThumbs = new Swiper(".products-slider__texts", {
    slidesPerView: 1,
    loop: true,
    observer: true,
    observeParents: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    grabCursor: true,
});

let productsSlider = new Swiper(".products-slider__slider", {
    slidesPerView: 2,
    centeredSlides: true,
    loop: true,
    observer: true,
    observeParents: true,
    grabCursor: true,
    autoHeight: true,

    navigation: {
        nextEl: ".slider-arrow-next",
        prevEl: ".slider-arrow-prev",
    },

    thumbs: {
        swiper: productsThumbs,
    },

    breakpoints: {
        600: {
            slidesPerView: 3,
        },
        767: {
            slidesPerView: 5,
        }
    }
});

