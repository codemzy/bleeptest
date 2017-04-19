'use strict';

/* global $ */

var data20 = {
    1: { runs: 7, time: 9.00, speed: 8 },
    2: { runs: 8, time: 8.00, speed: 9 }
};

$(document).ready(function() {
    
    // the bleep test data we are using
    var data = data20;
    
    var level = 1; // the current level
    var run = 1; // the current run number
    var ran = 0; // the distance ran
    var speed = 0; // the current speed
    
    //
    
    // intervals
    var barInterval;
   
    $('#start').on('click', function() {
       $('h1').text('Level ' + level);
       $('#start').addClass('disabled');
       $('#stop').removeClass('disabled');
       $('#bar').removeClass('indeterminate');
       $('#bar').width('50%').addClass('determinate');
       progressBar();
    });
    
    // function to run interval for progress bar
    let progressBar = function() {
        var forward = $("#bar").hasClass("lighten-1") ? true : false; // should bar move forward or backward
        var barWidth = forward ? 0 : 100; // start at 0 or 100
        barInterval = setInterval(barUpdate, data[level].time * 10);
        function barUpdate() {
            // if it reaches 100 or 0 swap classes and clear
            if (forward && barWidth > 99) {
                $('#bar').width('100%');
                $('#bar').removeClass('lighten-1').addClass('lighten-4');
                $('#prog-bar').removeClass('lighten-4').addClass('lighten-1');
                return clearInterval(barInterval);
            } else if (!forward && barWidth < 1) {
                $('#bar').width('0%');
                $('#bar').removeClass('lighten-4').addClass('lighten-1');
                $('#prog-bar').removeClass('lighten-1').addClass('lighten-4');
                return clearInterval(barInterval);
            }
            // add one or remove one to the percentage
            var newWidth = forward ? barWidth++ : barWidth-- ; 
            $('#bar').width(newWidth + '%');
        }
    };
   
    $('#stop').on('click', function() {
       $('#start').removeClass('disabled');
       $('#stop').addClass('disabled');
       $('#bar').width('0%').addClass('indeterminate');
       $('#bar').removeClass('determinate');
       clearInterval(barInterval); // clear progress bar interval
    });
   
});