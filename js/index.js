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
        var barWidth = 0; // always start at 0
        barInterval = setInterval(barUpdate, data[level].time * 10);
        function barUpdate() {
            // if it reaches 100 set back to zero and clear
            if (barWidth > 99) {
                $('#bar').width('0%');
                return clearInterval(barInterval);
            }
            // add one to the percentage
            var newWidth = barWidth++; 
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