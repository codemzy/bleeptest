'use strict';

/* global $ */

$(document).ready(function() {
   
   $('#start').on('click', function() {
       $('h1').text('Level 1');
       $('#bar').removeClass('indeterminate');
       $('#bar').width('50%').addClass('determinate');
   });
});