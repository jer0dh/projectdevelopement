(function ($) {

    /* javascript code goes here.  Will run after page is loaded in the DOM */


    $('document').ready(function () {




        /* START - Swiper - post carousel
  -------------------------------------------------------------------------*/

        const config = {
            slidesPerView: 3,
            // spaceBetween: 20,
            //slideClass: 'entry',
            slidesPerGroup: 3,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {

                // when window width is <= 480px
                480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    slidesPerGroup: 1
                },
                // when window width is <= 640px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                    slidesPerGroup: 2
                }
            }

            // Responsive breakpoints
        }

        let swiper = new Swiper('.swiper-container', config);



        if(typeof(wp_local_carousel) !== 'undefined')  {

            let maxPages = wp_local_carousel.maxPages;
            //  console.log(wp_local_carousel);
            let loading = false;
            //  console.log('start.. maxPages = ' + maxPages + ' paged = ' + wp_local_carousel.paged + ' total posts: ' + wp_local_carousel.postCount);
            swiper.on('slideChange', function() {

                if(!(maxPages <= wp_local_carousel.paged) && ! loading ) {   //more pages to load
                    loading = true;
                    wp_local_carousel.paged = parseInt(wp_local_carousel.paged) + 1;
                    $.post(wp_local_carousel.ajaxUrl, wp_local_carousel)
                        .done( function (data) {
                                if(data.success) {
                                    swiper.appendSlide(data.data.result);
                                    swiper.update();
                                } else {  // WP did not send success
                                    console.log('Server error');
                                }
                            }

                        )
                        .fail(function() {
                            console.log('unable to contact server');
                            wp_local_carousel.paged = parseInt(wp_local_carousel.paged) - 1;
                        })
                        .always( function() {
                            loading = false;
                        })



                }


            });


        }

        /* END - Swiper - post carousel
        -------------------------------------------------------------------------*/


    })

})(jQuery);
