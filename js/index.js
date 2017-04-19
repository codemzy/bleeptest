'use strict';

/* global $ */

var data20 = {
    info: { distance: 20 },
    1: { runs: 7, time: 9.00, speed: 8.0, total_distance: 140 },
    2: { runs: 8, time: 8.00, speed: 9.0, total_distance: 300 },
    3: { runs: 8, time: 7.58, speed: 9.5, total_distance: 460 },
    4: { runs: 9, time: 7.20, speed: 10.0, total_distance: 640 }
};

$(document).ready(function() {
    
    // the bleep test data we are using
    var data = data20;
    
    var level = 1; // the current level
    var run = 0; // the current run number
    
    // intervals
    var barInterval, runInterval;
   
    $('#start').on('click', function() {
       $('h1').text('Level ' + level);
       $('#start').addClass('disabled');
       $('#stop').removeClass('disabled');
       $('#bar').removeClass('indeterminate');
       $('#bar').width('0%').addClass('determinate');
       doLevel();
    });
    
    // function to run interval for progress bar
    let progressBar = function() {
        var forward = $("#bar").hasClass("forward") ? true : false; // should bar move forward or backward
        var barWidth = forward ? 0 : 100; // start at 0 or 100
        // set the classes
        $('#bar, #prog-bar').removeClass('lighten-1 lighten-4'); // remove classes from both bars
        if (forward) {
            $('#bar').addClass('lighten-1');
            $('#prog-bar').addClass('lighten-4');
        } else {
            $('#bar').addClass('lighten-4');
            $('#prog-bar').addClass('lighten-1');
        }
        // run the progress bar interval
        barInterval = setInterval(barUpdate, data[level].time * 18);
        function barUpdate() {
            // if it reaches 100 or 0 swap classes and clear
            if (forward && barWidth > 99) {
                $('#bar').width('100%').removeClass('forward');
                return clearInterval(barInterval);
            } else if (!forward && barWidth < 1) {
                $('#bar').width('0%').addClass('forward');
                return clearInterval(barInterval);
            }
            // add one or remove one to the percentage
            var newWidth = forward ? barWidth+=2 : barWidth-=2 ; 
            $('#bar').width(newWidth + '%');
        }
    };
    
    function doLevel() {
        $('h1').text('Level ' + level); // update the level text
        $('#info-speed').text(data[level].speed + ' km/hr'); // update the speed text
        doRun();
        runInterval = setInterval(doRun, data[level].time * 1000);
        function doRun() {
            clearInterval(barInterval); // clear progress bar interval
            if (run === data[level].runs) {
                clearInterval(runInterval);
                return changeLevel(); // move up level if done all runs
            }
            // set the distance run so far
            var distanceRan = run * data.info.distance;
            if (data[level-1]) {
                distanceRan += data[level-1].total_distance;
            }
            $('#info-ran').text(distanceRan + "m");
            // add one to the run
            run++;
            // set the run text
            $('#info-run').text(run);
            // beep at start of run
            $('#buzzer').trigger('play');
            // show progress
            progressBar();
        }
    }
    
    function changeLevel() {
        clearInterval(barInterval); // clear progress bar interval
        clearInterval(runInterval); // clear run interval
        if (data[level+1]) {
            level++;
            run = 0;
        }
        doLevel();
    }
   
    $('#stop').on('click', function() {
       $('#start').removeClass('disabled');
       $('#stop').addClass('disabled');
       $('#bar').width('0%').addClass('indeterminate');
       $('#bar').removeClass('determinate');
       clearInterval(barInterval); // clear progress bar interval
       clearInterval(runInterval); // clear progress bar interval
    });
   
});