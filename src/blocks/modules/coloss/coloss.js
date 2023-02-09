import $ from 'jquery';

let coloss = $('.coloss__back');

$(window).on('scroll', function(e) {
    let top = this.pageYOffset;

    let y = -(top * 6 / 100);

    coloss.css({
        'transform' : 'translateY(' + y + 'px)'        
    })
});