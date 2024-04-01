jQuery(document).ready(function ($) {
    "use strict";

    function ColorFeq(hex, flx) {
        flx = flx || 0;
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * flx)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    }

    function isValidColor(str) {
        return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.exec(str)) !== null;
    }

    function loadImage(src, f) {
        var img = new Image();
        $(img).load(function () {
            $(this).hide();
            if (f) f(img);
        }).error(function () {
            return false;
        }).attr('src', src);
    }

    if ((typeof bookSettings.color !== 'undefined') && (isValidColor(bookSettings.color))) {
        var mainColor = bookSettings.color;
        var darkColor = ColorFeq(bookSettings.color, -0.25);
        var div = $("<div />", {
            id: 'bookColorCSS',
            html: '<style> .navbar-default .navbar-nav>.active>a, .navbar-default .navbar-nav>.active>a:hover, .navbar-default .navbar-nav>.active>a:focus,.navbar-default .navbar-nav>li>a:hover, .navbar-default .navbar-nav>li>a:focus,.mc-form i[class*=fa-user],.mc-form i[class*=fa-envelope],.fw-iconbox i,.fw-title,.features-icon .fa,.navbar-default .navbar-nav>li>a.button:focus,.navbar-default .navbar-nav>li>a.button:hover,.site-footer .social li a,.slick-dots li button:before,.twitter-icon .fa-twitter,a,button.close,.btn-default,input.btn-default,button.btn-default,.default-color,.fw-tabs-minimal .nav-tabs > li.active > a, .fw-tabs-minimal .nav-tabs > li.active > a:hover, .fw-tabs-minimal .nav-tabs > li.active > a:focus,.pagination>li>a:hover, .pagination>li>span:hover, .pagination>li>a:focus, .pagination>li>span:focus,.pagination>li>a, .pagination>li>span,.page-header .meta-featured-post.default-bg,.fw-tabs-minimal .nav-tabs > li > a:hover, .testimonials-author-rating, .widget_calendar td#today{color:' + mainColor + ';}.features hr,.modal-header,.container1>div,.default-bg,.page-header,.container2>div,.container3>div,.plan .header,.btn-primary,.btn,.scroll-top a:hover,a.inline-icon,.widget-title:after,.panel-default>.panel-heading,button, html input[type="button"], input[type="reset"], input[type="submit"]{background-color:' + mainColor + ';}.btn-primary,.btn,.fw-call-to-action,.site-footer .social li a,.panel-default>.panel-heading,.panel-default,.fw-tabs-left.fw-tabs-minimal .nav-tabs > li.active > a, .fw-tabs-left.fw-tabs-minimal .nav-tabs > li.active > a:hover, .fw-tabs-left.fw-tabs-minimal .nav-tabs > li.active > a:focus,.fw-tabs-minimal .nav-tabs > li.active > a, .fw-tabs-minimal .nav-tabs > li.active > a:hover, .fw-tabs-minimal .nav-tabs > li.active > a:focus,input, button, select, textarea,.page-links a{border-color:' + mainColor + ';}.close:focus,.close:hover,a:focus,a:hover{color:' + darkColor + ';}.btn:hover,.btn:focus,.btn:active,.site-footer .social li a:hover{border-color:' + darkColor + ';}.highlight-col .plan .header,.site-footer .social li a:hover,.btn:hover,.btn:focus,.btn:active,a.inline-icon:hover{background-color:' + darkColor + ';} .hollow:hover{color:' + darkColor + '!important;}</style>'
        }).appendTo("body");
    }
    if ((typeof bookSettings.onScroll !== 'undefined') && (bookSettings.nav == 'no')) {
        $('.home').find('#topNav').remove();
    }
    var menu = $('#topNav');
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            menu.addClass('stick');
        } else {
            menu.removeClass('stick');
        }
    });
    $('#bs-navbar-collapse-1').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({scrollTop: (target.offset().top - 40)}, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });
    $('.funfacts-counter').waypoint(function () {
        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(','), count = 0;
        var funfact = $('.funfacts-counter');
        if (funfact.length > 0) {
            $(".funfacts-counter").find('.total-number').each(function (index) {
                count = parseInt($(this).attr('data-total-count'));
                $(this).animateNumber({number: count, numberStep: comma_separator_number_step}, 2000);
            });
        }
    }, {offset: '80%'});
    $(window).load(function () {
        $("#status").fadeOut();
        $("#preloader").delay(1000).fadeOut("slow");
    });
    if (typeof bookSettings.onScroll !== 'undefined') {
        if ((bookSettings.onScroll == 'yes') && ($(window).width() > 992)) {
            new WOW({mobile: false}).init();
        }
    }
    $('#menu-header').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({scrollTop: (target.offset().top - 40)}, 1000);
                return false;
            }
        }
    });
    $('.review-slider').slick({dots: true, arrows: false, infinite: false, autoplay: true, autoplaySpeed: 10000, pauseOnHover: false});
    $('.subscribe-form').submit(function () {
        var resultDiv = $(this).find('.result');
        var action = $(this).attr('action');
        var data = {email: $(this).find('#mailchimp-email').val(), fname: $(this).find('#mailchimp-fname').val(), lname: $(this).find('#mailchimp-lname').val()};
        resultDiv.show().html('Sending...');
        $.ajax({
            url: action, type: 'POST', data: data, success: function (data) {
                resultDiv.html(data);
            }, error: function (data) {
                resultDiv.html(data);
            }
        });
        return false;
    });
    fwForm.initAjaxSubmit({selector: 'form[data-fw-form-id="fw_form"]', ajaxUrl: adminAjax});
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top a').fadeIn(200);
        } else {
            $('.scroll-top a').fadeOut(200);
        }
    });
    $('.scroll-top a').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1000);
    });
    $('.funfacts-counter').parents('.section-warper').addClass('default-bg counter');
    $('.fw-call-to-action').parents('.section-warper').addClass('default-bg');
    $('.fw-map').parents('.fw-container-fluid').parents('.min-spacing').addClass('no-padding');
    loadImage($('.nav-logo img').attr('src'), function (image) {
        if (image.naturalHeight < 50) {
            var paddingTop = (50 - image.naturalHeight) / 2;
            $('.nav-logo').css({'padding-top': paddingTop});
        }
    });
    if ($('#is-intro').length > 0) {
        $('#topNav').addClass('none');
    }
});