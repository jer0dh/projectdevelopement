jQuery(function ($) {
    'use strict';
    $('.js-superfish').superfish({
        delay: 2000,
                                        // 0.1 second delay on mouseout
        animation:   {'opacity': 'show', 'height': 'show'}, // fade-in and slide-down animation
        dropShadows: false                                  // disable drop shadows
    });
});

