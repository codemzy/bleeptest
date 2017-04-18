'use strict';

/* global $ */

var data20 = {
    1: { runs: 7, time: 9.00, speed: 8 },
    2: { runs: 8, time: 8.00, speed: 9 }
};

$(document).ready(function() {
    
    var level = 1; // the current level
    var run = 1; // the current run number
    var ran = 0; // the distance ran
    var speed = 0; // the current speed
   
   $('#start').on('click', function() {
       $('h1').text('Level ' + level);
       $('#start').addClass('disabled');
       $('#stop').removeClass('disabled');
       $('#bar').removeClass('indeterminate');
       $('#bar').width('50%').addClass('determinate');
   });
   
   $('#stop').on('click', function() {
       $('#start').removeClass('disabled');
       $('#stop').addClass('disabled');
       $('#bar').width('0%').addClass('indeterminate');
       $('#bar').removeClass('determinate');
   });
   
});