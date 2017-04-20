'use strict';

/* global $ */

// DATA

// Run Data
var data20 = {
    info: { distance: 20, description: "Bleep Test timings based on the British National Coaching 20m Bleep Test." },
    1: { runs: 7, time: 9.00, speed: 8.0, total_distance: 140 },
    2: { runs: 8, time: 8.00, speed: 9.0, total_distance: 300 },
    3: { runs: 8, time: 7.58, speed: 9.5, total_distance: 460 },
    4: { runs: 9, time: 7.20, speed: 10.0, total_distance: 640 },
    5: { runs: 9, time: 6.86, speed: 10.5, total_distance: 820 },
    6: { runs: 10, time: 6.55, speed: 11.0, total_distance: 1020 },
    7: { runs: 10, time: 6.26, speed: 11.5, total_distance: 1220 },
    8: { runs: 11, time: 6.00, speed: 12, total_distance: 1440 },
    9: { runs: 11, time: 5.76, speed: 12.5, total_distance: 1660 },
    10: { runs: 11, time: 5.54, speed: 13, total_distance: 1880 },
    11: { runs: 12, time: 5.33, speed: 13.5, total_distance: 2120 },
    12: { runs: 12, time: 5.14, speed: 14, total_distance: 2360 },
    13: { runs: 13, time: 4.97, speed: 14.5, total_distance: 2620 },
    14: { runs: 13, time: 4.80, speed: 15, total_distance: 2880 },
    15: { runs: 13, time: 4.65, speed: 15.5, total_distance: 3140 },
    16: { runs: 14, time: 4.50, speed: 16, total_distance: 3420 },
    17: { runs: 14, time: 4.36, speed: 16.5, total_distance: 3700 },
    18: { runs: 15, time: 4.24, speed: 17, total_distance: 4000 },
    19: { runs: 15, time: 4.11, speed: 17.5, total_distance: 4300 },
    20: { runs: 16, time: 4.00, speed: 18, total_distance: 4620 },
    21: { runs: 16, time: 3.89, speed: 18.5, total_distance: 4940 }
};

// Results Quotes
var quotes = {
    1: "Better luck next time!" ,
    2: "You're just warming up!",
    3: "Now you're hitting your stride!",
    4: "Keep practicing!",
    5: "Working up a sweat!",
    6: "You got this!",
    7: "No pain, no gain!",
    8: "You were born to do this!",
    9: "Run forest, run!",
    10: "It's fun to run!",
    11: "There is no finish line!",
    12: "Running is the answer!",
    13: "Witness the fitness!",
    14: "Run like zombies are chasing you!",
    15: "Damn, you fast!",
    16: "You are an athlete!",
    17: "You are a machine!",
    18: "You're flying now!",
    19: "You're filled with rocket fuel!",
    20: "No one can catch you!",
    21: "Good luck at the olympics!"  
};



$(document).ready(function() {
    
    // show the side menu
    $(".menu-collapse").sideNav();
    
    // BLEEP TEST
    
    // the bleep test data we are using
    var data = data20;
    
    var level = 1; // the current level
    var run = 0; // the current run number
    // the timer
    var timer = { minutes: 0, seconds: 0 };
    
    // intervals
    var barInterval, runInterval, timerInterval;
   
    $('#start').on('click', function() {
        level = 1;
        run = 0;
        $('h1').text('Level ' + level);
        $('#result-quote').remove(); // remove result quote if present
        $('#start').addClass('disabled');
        $('#stop').removeClass('disabled');
        $('#bar').removeClass('indeterminate');
        $('#bar').width('0%').addClass('determinate forward');
        doLevel();
        runTimer();
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
            doLevel();
        }
    }
    
    let runTimer = function() {
        // start with zero
        timer.minutes = 0;
        timer.seconds = 0;
        // start the timer
        timerInterval = setInterval(addSecond, 1000);   
        function addSecond() {
            if (timer.seconds < 59) {
                timer.seconds++;
            } else if (timer.seconds === 59) {
                timer.seconds = 0;
                timer.minutes++;
            }
            // add zero if below 10
            let displaySeconds = timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
            let displayMinutes = timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
            // display the time
            $('#minutes').text(displayMinutes);
            $('#seconds').text(displaySeconds);
        }
    };
   
    $('#stop').on('click', function() {
       $('#start').removeClass('disabled');
       $('#stop').addClass('disabled');
       $('#bar').width('0%').addClass('indeterminate');
       $('#bar').removeClass('determinate');
       clearInterval(barInterval); // clear progress bar interval
       clearInterval(runInterval); // clear run interval
       clearInterval(timerInterval); // clear timer interval
       // show result info
       $('h1').text('Result: ' + level + "." + run);
       $('h1').after('<p id="result-quote" class="flow-text">' + quotes[level] + '</p>');
    });
   
});