(function ($) {

    /* javascript code goes here.  Will run after page is loaded in the DOM */


    $('document').ready(function () {


        //removeIf(production)
        console.log('starting scripts.js');
        //endRemoveIf(production)

        // Lazy load video
        //new LazyVideoLoader();


        /* Menu
        ------------------------------------------------------------------ */
        $('.not-loaded-height').removeClass('not-loaded-height');


        /**
         * This section looks for img tags in elements not loaded with the class responsive-background-image
         * It will change the data-src and data-srcset to src and src-set so the browser can choose which image to load
         * Once loaded the script will copy the src to the background of the slide and then remove the img tag
         * Class not-loaded is used to keep the slide's opacity at 0 until it is removed after image is loaded.
         *
         */

        /**
         * Function to call to load a responsive background image to parent element
         * @param el
         */
        const loadBgImg = function (el) {
            let $this = $(el);

            //Read in the data-srcset attributes of this img tag

            let dataSrcSet = $this.data('srcset');

            if (dataSrcSet) {
                $this.attr('srcset', dataSrcSet);
                let $parent = $this.parent();
                $this.css('opacity',0).removeClass('responsive-background-image');
                // imagesLoaded will run the function once the image is fully loaded to the browser
                $parent.imagesLoaded(function () {
                    //once image is loaded, see which image size the browser chose based on the srcset
                    let backgroundSrc = (typeof $this[0].currentSrc !== 'undefined' && $this[0].currentSrc !== '') ? $this[0].currentSrc : $this.data('fallback');
                    //console.log( 'currentSrc: ' + $this[0].currentSrc );
                    let orig = $parent.css('background-image'); //get any existing image (linear gradient)
                    $parent.css('background-image', orig + ',url("' + backgroundSrc + '")');
                    $this.remove(); //remove img tag from markup
                    $parent.addClass('responsive-background-image-loaded');
                });

            }
        };

        /*

                // Load Hero background images
                let $heroImages = $('.site-hero').find('.responsive-background-image');
                //console.log($heroImages);
                if ($heroImages.length > 0) {
                    $heroImages.each(function () {
                        // console.log(this);
                        loadBgImg(this);
                        $parent = $(this).closest('.hero-image');  // find the container we are in and remove not-loaded once image is fully loaded.
                        $parent.imagesLoaded({background: true}, function () {
                            $parent.removeClass('not-loaded');
                        })
                    })
                }
        */


        /**BEGIN: Section lazy loading
         *
         * Check if sections are in view.  If so, load images, and remove .not-loaded
         */

        let $sectionsToLoad = $('section.lazy, .site-hero, article.lazy');

        /**
         * loadInView goes through each section.not-loaded and determines of it is in view.  If so, loads any responsive-background-images
         */
        const loadInView = function () {
            $sectionsToLoad.filter('.not-loaded').each(function (i, section) {
                let $section = $(section);
                if (themeJs.Utils.isElementInView(section)) {
                    let $bgImgs = $section.find('.responsive-background-image');
                    if ($bgImgs.length > 0) {
                        $bgImgs.each(function () {
                            loadBgImg(this);
                        })
                    }
                    $section.imagesLoaded({background: true})  //once image is loaded into DOM, remove class .not-loaded.  Even if error.
                        .always(function () {

                            $section.removeClass('not-loaded');
                        });

                }
            });

        };

        //run Load in view on page load for all sections already in viewport
        loadInView();
        setTimeout( loadInView , 1000);
        themeJs.loadInView = loadInView;

        const onScrollLoadInView = new Debouncer(function () {
            loadInView();
        });
        $(window).on('scroll', onScrollLoadInView.handleEvent.bind(onScrollLoadInView));  //check if new section.not-loaded has come into view on scroll event.

        /**END: Section lazy loading
         *
         * Check if sections are in view.  If so, load images, and remove .not-loaded
         */




        /* Modal
        ------------------------------------------------------------------------------------         */

        $('.modal').on('shown.bs.modal', function () {
            $(this).trigger('focus')
        });

        // load any images
        $('.modal').on('show.bs.modal', function () {
            let $bgImgs = $(this).find('.responsive-background-image');
            if ($bgImgs.length > 0) {
                $bgImgs.each(function () {
                    loadBgImg(this);
                });

            }


        });


        /* START - READ MORE Button on blog pages
        ---------------------------------------------------------------------------- */

        $('.blog-page .read-more a').on('click', function(e) {
            const $excerpt = $(this).parents('.post-excerpt');

            const $content = $excerpt.siblings('.entry-content');
            const $footer = $excerpt.siblings('.entry-footer');
            const $comments = $excerpt.siblings('.entry-comments');
            const $commentsRespond = $excerpt.siblings('.comment-respond');
            e.preventDefault();
            $excerpt.css({'height': '0', 'overflow' : 'hidden'});
            $content.css({'height':'auto', 'overflow':'visible', 'fontSize':'inherit'});
            $footer.css({'height':'auto', 'overflow':'visible', 'fontSize':'inherit'});
            $comments.css({'height':'auto', 'overflow':'visible', 'fontSize':'inherit'});
            $commentsRespond.css({'height':'auto', 'overflow':'visible', 'fontSize':'inherit'});
            $content.css('opacity', '1');
            $footer.css('opacity', '1');
            $comments.css('opacity', '1');
            $commentsRespond.css('opacity', '1');


        })

        /* END - READ MORE Button on blog pages
        ---------------------------------------------------------------------------- */


    })

})(jQuery);
