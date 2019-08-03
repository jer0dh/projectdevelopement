<?php

define('CHILD_THEME_VERSION', '<%= pkg.version %>' );
$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '<% if(production){%>.min<% } %>';  //Gulptask in dev environment will put in '.min' if dev is set for production
