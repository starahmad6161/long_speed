let scriptState = false;
function lazyLoadImgs(param) {  
    
    let ioWrapper;
    if (!window.IntersectionObserver) { //Is the browser didn't support 
        
        if (scriptState === false) {
                let lazyScriptTag = document.createElement("script");
                lazyScriptTag.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js');
                lazyScriptTag.setAttribute('async', '');
                scriptState = true;
                document.querySelector('body').appendChild(lazyScriptTag);
        }

        /*
        let images = [].slice.call(document.querySelectorAll('img'));
        let sources = [].slice.call(document.querySelectorAll('source'));
        images.forEach(function (img) {  
            let {src} = img.dataset;
            img.src = src;
        });
        sources.forEach(function (source) {  
            let {srcset} = source.dataset;
            source.srcset = srcset;
        });
        */
       let lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));
        lazyBackgrounds.forEach(function (back) {  
            back.classList.add("visible");
        });
        return;
    } else {
        ioWrapper = new IntersectionObserver((entries, imgObserver)=> {
            // entries => All Images
            entries.forEach((entry)=> {
                //entry.target => image
                if (entry.isIntersecting) {
                    //console.log(img.tagName);
                    const img = entry.target;
                    
                    //For Image Tag
                    if (img.tagName === "IMG") {
                        const src = img.getAttribute('data-src');
                        img.src = src;
                        imgObserver.unobserve(img);
                        img.removeAttribute('data-src');

                        //srcset for img
                        const srcset = img.getAttribute('data-srcset');
                        if (srcset !== null) {
                            img.srcset = srcset;
                            imgObserver.unobserve(img);
                            img.removeAttribute('data-srcset');
                        }
                        
                    }
                    //For Picture Tags
                    if (img.tagName === "SOURCE") {
                        const srcset = img.getAttribute('data-srcset');
                        img.srcset = srcset;
                        imgObserver.unobserve(img);
                        img.removeAttribute('data-srcset');
                        
                    } 
                    //For Background
                    if (img.classList.contains('lazy-background')) { //css background
                        img.classList.add('visible');
                    }
                }
                
            }, {
                /*
                threshold: 1,
                rootMargin: '0px 0px -500px 0px'
                */
               threshold: 0,
               rootMargin: '0px 0px 500px 0px'
            });
        });
    }


    const imgs = document.querySelectorAll(param);
    imgs.forEach(img => {
        ioWrapper.observe(img);
    });
}

//Trigger Lazy Load Function
lazyLoadImgs('.lazyload');
lazyLoadImgs('source');
lazyLoadImgs('.lazy-background');
$(function() {
    'use strict';
    $(".team-section .tab-content>.tab-pane").addClass("Display_block");
    //Show/hide navbar
    /*
    $(".header .header-navbar .menu-btn-container .menu-btn").on("click", function () {  
        var menu_btn_container = $(this).parents(".menu-btn-container");
        menu_btn_container.find(".navbar-list-items").fadeToggle(200);
    });

    */
    $(".header .banner").css({
        height: "calc( 100vh - " + $(".header .header-navbar").innerHeight() + "px)"
    });


    /**************************************************/
    /** responsive-tabs [Cruise details => (Deck)]*****/
    /**************************************************/
    
    var windowWidth = window.innerWidth;
    if (windowWidth < 992) {
        $(".responsive-tabs .responsive-tabs-items .res-tab-item").each(function () {  
            var $this = this,
                dataClass = $(this).data("class"),
                responsive_tabs = $(this).parents(".responsive-tabs");
                responsive_tabs.find(dataClass).prepend($this);
        });
    }

    $(".responsive-tabs .res_tab_content.active .tab-content").fadeIn();
    $(".responsive-tabs .res-tab-item").on("click", function () {  
        var $this = this;
        var dataClass = $(this).data("class"),
            responsive_tabs = $(this).parents(".responsive-tabs");
            
        $(responsive_tabs).find(dataClass).siblings().find(".tab-content").fadeOut(0, function () {  
            $(responsive_tabs).find(dataClass).find(".tab-content").fadeIn(300);
        });
        //Scroll to Top
        responsive_tabs.find(".res-tab-item").removeClass("selected");
        $(this).addClass("selected");
            /*
            if (window.innerWidth < 992) {
               $("html, body").animate({
                    scrollTop : $($this).offset().top 
                });
            }
            */
    });


    
    /**********************************************/
    /*******************Team section *************/
    /**********************************************/
    function checkTeamWidth() {  
        var windowWid = window.innerWidth,
        num = 0;
        //console.log(windowWid);
        if ( windowWid < 768 ){
            num = 1;
        } else if ( windowWid < 992 ) {
            num = 2;
        } else if ( windowWid < 1350 ) {
            num = 3;
        } else {
            num = 4;
        }
        var swiper = new Swiper('.team-section #pills-manager .swiper-container', {
            slidesPerView: num,
            spaceBetween: 30,
            slidesPerGroup: num,
            loop: false,
            loopFillGroupWithBlank: false,
            navigation: {
              nextEl: '.team-section #pills-manager .swiper-button-next',
              prevEl: '.team-section #pills-manager .swiper-button-prev',
            },
        });
        var swiper_2 = new Swiper('.team-section #pills-reservations .swiper-container', {
            slidesPerView: num,
            spaceBetween: 30,
            slidesPerGroup: num,
            loop: false,
            loopFillGroupWithBlank: false,
            navigation: {
              nextEl: '.team-section #pills-reservations .swiper-button-next',
              prevEl: '.team-section #pills-reservations .swiper-button-prev',
            },
        });
        var swiper_3 = new Swiper('.team-section #pills-product .swiper-container', {
            slidesPerView: num,
            spaceBetween: 30,
            slidesPerGroup: num,
            loop: false,
            loopFillGroupWithBlank: false,
            navigation: {
              nextEl: '.team-section #pills-product .swiper-button-next',
              prevEl: '.team-section #pills-product .swiper-button-prev',
            },
        });
        var swiper_4 = new Swiper('.team-section #pills-helpdesk .swiper-container', {
            slidesPerView: num,
            spaceBetween: 30,
            slidesPerGroup: num,
            loop: false,
            loopFillGroupWithBlank: false,
            navigation: {
              nextEl: '.team-section #pills-helpdesk .swiper-button-next',
              prevEl: '.team-section #pills-helpdesk .swiper-button-prev',
            },
        });
    }
    checkTeamWidth();
    $(window).on("resize", function () {
        checkTeamWidth();
    });
        /**************************************************/
        /*****************My Gallery***********************/
        /**************************************************/
        function checkGallerywidth() {  
            var windowWid = window.innerWidth,
                num = 0;
            //console.log(windowWid);
            if (windowWid >= 992) {
                num = 4;
            } else if ( windowWid < 768 ){
                num = 2;
            } else if ( windowWid < 992 ) {
                num = 3;
            }
            var swiper = new Swiper('.specialist-areas .my-gallery .swiper-container', {
                slidesPerView: num,
                spaceBetween: 30,
                slidesPerGroup: num,
                loop: false,
                loopFillGroupWithBlank: false,
                pagination: {
                  el: '.specialist-areas .my-gallery .swiper-pagination',
                  clickable: true,
                },
                navigation: {
                  nextEl: '.specialist-areas .my-gallery .swiper-button-next',
                  prevEl: '.specialist-areas .my-gallery .swiper-button-prev',
                },
            });
        }
        checkGallerywidth();
        $(window).on("resize", function () {  
            checkGallerywidth();
        });



   function check() {
       $(".mySlider .myCard.active").nextAll().addClass("nextmyCards").removeClass("prevmyCards");
       $(".mySlider .myCard.active").prevAll().addClass("prevmyCards").removeClass("nextmyCards");
    }
    check();

    $(".team-section .back-face .card-details .more-btn").on("click", function () {  
        var data_specialist_areas = $(this).data("specialist-areas");
        $(data_specialist_areas).siblings().fadeOut(200, function () {  
            $(data_specialist_areas).fadeIn(200);
        });
        //console.log(data_specialist_areas);
    });
    /* End Team section*/

   
   $(".reviews-section .mySlider .myCard").each(function () {  
        var card_id = $(this).attr("id"),
            activeCl = '';
        //console.log(card_id);
        if ($(this).hasClass("active")) {
            activeCl = 'selected '
        }
        $(".reviews-section .pagination").append(`
            <span class="${activeCl}mr-2" data-card-id="#${card_id}"></span>
        `);
   });

   $(".reviews-section .pagination span").on("click", function () {  
       var data_card_id = $(this).data("card-id");
       $(this).addClass("selected").siblings().removeClass("selected");
       $(data_card_id).addClass("active").siblings().removeClass("active");
       check();
   });

   var touchPress = 0;
   $(".mySlider").on("touchstart", function (event) {  
       var x = event.touches[0].clientX;
       //console.log( x);
       touchPress = x;
   });
   var stat = 0;
   $(".mySlider").on("touchmove", function (event) {  
       
       var x = event.touches[0].clientX;
       var activeCard =  $(".reviews-section .mySlider .myCard.active");
       //console.log(activeCard);
       if (x < touchPress) {
           //console.log("less than");
           stat = 1;
           // $(".reviews-section .mySlider .myCard.active").next().addClass("active").siblings().removeClass("active");
           // check();
        } else if ( x > touchPress ) {
            stat = 2;
            //$(".reviews-section .mySlider .myCard.active").prev().addClass("active").siblings().removeClass("active");
            //check();
            //console.log("more than");
        }
    });
    $(".mySlider").on("touchend", function (event) {  
        if (stat === 1 ) {
             $(".reviews-section .mySlider .myCard.active").next().addClass("active").siblings().removeClass("active");
             $(".reviews-section .pagination span.selected").next().addClass("selected").siblings().removeClass("selected");
             check();    
        } else if (stat === 2) {
            $(".reviews-section .mySlider .myCard.active").prev().addClass("active").siblings().removeClass("active");
            $(".reviews-section .pagination span.selected").prev().addClass("selected").siblings().removeClass("selected");
            check();
       }
   });
   
   $(window).on("load", function () {  
       $(".team-section .tab-content>.tab-pane").removeClass("Display_block");
       
       $(".specialist-areas").hide();
   });


   /*******************************************/
   /**************Resorts *********************/
   /*******************************************/
   function checkResortsWidth() {  
    var windowWid = window.innerWidth,
        num = 0;
    //console.log(windowWid);
    if ( windowWid < 567 ){
        num = 3;
    } else {
        num = 5;
    }
    var ResortsSwiper = new Swiper('.picked-resorts .swiper-container', {
         slidesPerView: num,
         spaceBetween: 30,
         slidesPerGroup: num,
         loop: true,
         loopFillGroupWithBlank: false,
         pagination: {
         el: '.picked-resorts .swiper-pagination',
         clickable: true,
         },
         navigation: {
         nextEl: '.picked-resorts .swiper-button-next',
         prevEl: '.picked-resorts .swiper-button-prev',
         },
     });
   }
   checkResortsWidth();
   $(window).on("resize", function () {  
        checkResortsWidth();
   });
   

});