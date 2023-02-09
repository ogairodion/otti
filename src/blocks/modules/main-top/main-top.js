import $ from "jquery";

let img = $('.main-top__img');
let bread = $('.main-top__img-bread');
let shadow = $('.main-top__img-shadow');
// let qualities = $('.qualities').offset().top;
let qualitiesEnd = $('.qualities').offset().top + $('.qualities').height();
let headerHeight = $('.header').height();
let mainTopScrollTop = $('.main-top').offset().top + $('.main-top').innerHeight() - headerHeight;
let mainTopHeiht = $('.main-top').height();
let qualitiesList = $('.qualities__list-item');
let icons = $('.main-top__icon');
let windowWidth = $(window).width();
let scrollOld = 0;
let isScrolled = false;
let scrollPoint;
let isShow = false;
let time;
let clientHeight = $(window).innerHeight();

console.log($('.qualities').offset().top)

getScrolled();

if (windowWidth > 600) {
    time = 1500;
    scrollPoint = $('.qualities').offset().top - headerHeight;
} else {
    time = 500;
    scrollPoint = $('.qualities__list').offset().top - headerHeight - 80 - 79 - 124;
}

$(window).on('resize', function() {
    let widthWindow = $(window).width();

    switch(true) {
        case widthWindow > 600:
            time = 1500;
        break;
        case widthWindow < 600:
            time = 500;
        break;
    }
});

$(window).on('scroll', function() {
    headerHeight = $('.header').height();
    windowWidth = $(window).width();
    mainTopScrollTop = $('.main-top').offset().top + $('.main-top').innerHeight() - headerHeight;

    switch(true) {
        case windowWidth > 800 && clientHeight > 900:
            scrollPoint = $('.qualities').offset().top - headerHeight;
        break;
        case windowWidth < 800:
            scrollPoint = $('.qualities__list').offset().top - headerHeight - 80 - 79 - 124;
        break;
        case windowWidth > 800 && windowWidth > 1199 && clientHeight < 900 && clientHeight > 700: 
            scrollPoint = $('.qualities').offset().top - headerHeight - 150;
        break;
        case windowWidth > 800 && windowWidth > 1199 && clientHeight < 700: 
            scrollPoint = $('.qualities').offset().top - headerHeight - 100;
        break;
    }

    getScrolled();
});

function getScrolled() {
    let scrollTop = $(window).scrollTop();

    switch(true) {
        case scrollTop > mainTopScrollTop - 100 && scrollTop > scrollOld && scrollTop < qualitiesEnd && !isScrolled:
            $('.main-top__icon').addClass('scrolled');

            if (windowWidth > 600) {
                scrollTo(); 
            } else {
                hideImg();
            }
        break;
        case scrollTop < mainTopScrollTop - 100 && scrollTop < scrollOld && scrollTop < qualitiesEnd && isScrolled: 
            $('.main-top__icon').removeClass('scrolled');
            $('.qualities__list-item').removeClass('unlock');

            scrollToTop(); 
        break;
    }

    scrollOld = scrollTop;
}

function scrollToTop() {
    isScrolled = !isScrolled;

    img.css({
        'transform' : 'translateY(0) scale(1)'
    })

    bread.css({
        'transform' : 'rotate(17deg)'
    });

    shadow.css({
        'transform' : 'translateX(-25%)'
    });


    if (isShow) {
        getActive(false);
    }

    isShow = !isShow;
}

function scrollTo() {
    isScrolled = !isScrolled;
    
    img.removeClass('hide');

    let scale = 1,
        translateX = 0,
        translateXShadow = 0;

    switch(true) {
        case windowWidth > 600 && windowWidth > 1199 && clientHeight > 900:
            scale  = 1.05;
            translateX = 0;
            translateXShadow = -15;
        break;
        case windowWidth > 600 && windowWidth > 1199 && clientHeight < 900 && clientHeight > 700: 
            scale  = 0.9;
            translateX = 0;
            translateXShadow = -15;
        break;
        case windowWidth > 600 && windowWidth > 1199 && clientHeight < 700: 
            scale  = 0.7;
            translateX = 0;
            translateXShadow = -15;
        break;
        case windowWidth > 600 && windowWidth < 1199:
            scale  = 1.1;
            translateX = 0;
            translateXShadow = 0;
        break;
        case windowWidth < 600:
            scale  = 1.5;
            translateX = 50;
            translateXShadow = 0;
        break;
    }

    
    img.css({
        'transform' : 'translateY(' + scrollPoint + 'px) translateX(' + translateX + '%) scale(' + scale + ')',
    })

    bread.css({
        'transform' : 'rotate(0)'
    });

    shadow.css({
        'transform' : 'translateX(' + translateXShadow + '%)'
    });

    if (!isShow) {
        getActive(true);
    }

    isShow = !isShow;
}

function hideImg() {
    img.addClass('hide');

    setTimeout(() => {
        scrollTo();
    }, time);
}

$('.qualities__list-item').on('mouseover', function() {
    let id = $(this).data('id');

    $('.qualities__list-item').removeClass('active');
    $('.main-top__icon').removeClass('active');

    $(this).addClass('active');

    icons.each(function() {
        let iconID = $(this).data('id');

        if (iconID == id) {
            $(this).addClass('active');
        }
    })
});


$('.main-top__icon').on('mouseover', function() {
    
    let id = $(this).data('id');

    $('.qualities__list-item').removeClass('active');
    $('.main-top__icon').removeClass('active');

    $(this).addClass('active');

    qualitiesList.each(function() {
        let qualitiesItemID = $(this).data('id');

        if (qualitiesItemID == id) {
            $(this).addClass('active');
        }
    })
});

function getActive(value) {
    $('.qualities__list-item').removeClass('active');
    $('.main-top__icon').removeClass('active');
    
    if (value) {
        setTimeout(() => {
            $('.qualities__list-item').addClass('unlock');
            qualitiesList.each(function(i) {
                if (i == 0) {
                    $(this).addClass('active');
                }
            });

            icons.each(function(i) {
                if (i == 0) {
                    $(this).addClass('active');
                }
            });
        }, time);
    } else {
        setTimeout(() => {
            $('.qualities__list-item').removeClass('active');
            $('.main-top__icon').removeClass('active');
        }, time)
    }
}
