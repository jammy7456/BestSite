$(document).ready(function () {
    initMenu();
    initAccordionButton();
});

function initMenu() {
    $(".menu").removeClass("ui-helper-hidden");
    $("div.menu ul li a").addClass("ui-corner-all").addClass("ui-state-focus").hover(function () {
        $(this).addClass("ui-state-active");
    }, function () {
        $(this).removeClass("ui-state-active");
    });
    $("div.menu>ul>li>a").addClass("box-shadow-lite");
    $("div.menu ul ul li a").addClass("box-shadow");
    $('a:not([href])', '.menu').css({ cursor: 'default' });
}

function initAccordionButton() {
    $("#accordion-btn").button({
        icons: {
            primary: "ui-icon-triangle-2-n-s"
        }
    }).toggle(function () {
        $(".content-main-detail").slideUp()
    }, function () {
        $(".content-main-detail").slideDown(function () {
            $(this).css("zoom", "1");
        });
    });
}