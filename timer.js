(function() {
    var lib = {
        testAuto: false, // auto test will start automatically based on start|step html selector trigger
        testInProgress: false,
        beginTriger: 'convert_lead', // make optional
        beginTime: 0,
        endTrigger: '#lead-convert-success',  // make optional
        endTime: 0,
        clicks: 0,
        trace: {},
        remoteControll: '<div class="uitest-remote-control" style="position: absolute; width:auto; height:28px; background: #ccc; border:1px solid #bbb; border-radius: 3px; padding: 6px 10px; right: 0; top:50%; box-shadow:inset 0px -19px 7px #aaa"><a href="#" style="line-height:27px; cursor:ew-resize">UI<strong class="toggle hide">TEST</strong></a> <span class="toggle hide">Contact info: <input type="text" name="contact" placeholder="Name, email"><input type="button" class="btn start" value="start"><input type="button" disabled="disabled" class="btn stop" value="stop"></span></div>',
        start: function() {
            this.beginTime = new Date().getTime();
            this.beginTestAlert();
            this.testInProgress = true;
        },
        end: function() {
            this.endTime = new Date().getTime();
            $('#lead-convert-success').attr('id', '');
            this.showResults();
        },
        lapTime: function() {
            return  Math.round( ((this.trace[this.clicks].timestamp - this.trace[1].timestamp ) / 1000)*100 )/100;
        },
        beginTestAlert: function() {throwMessage('<strong>Note!</strong> You entered a test zone', 'success', true);},
        showResults: function() {throwMessage('<strong>Test completed!</strong> It took you ' + this.lapTime() + ' seconds and ' + this.clicks + ' clicks to complete this task', 'success', false);}
    };
    window.UITEST = lib;
    $('body').append(window.UITEST.remoteControll);



    var ui = window.UITEST;

    if(ui.testAuto === true) {
        $('#sidecar').bind('click', '*', function(e){
            ($(e)[0]['target']['className'] === ui.beginTriger) ? ui.start() : false;
            ($(ui.endTrigger).length === 1) ? ui.end() : false;
            if(ui.testInProgress === true) {
                ui.clicks += 1;
                ui.trace[ui.clicks] = {
                    'timestamp': new Date().getTime(),
                    'coordinates': 'false'
                };                
            }
        });
    } else {
        $('#sidecar').bind('click', '*', function(e){
            ui.clicks += 1;
            ui.trace[ui.clicks] = {
                'timestamp': new Date().getTime(),
                'coordinates': 'false'
            };
        });
        $('.uitest-remote-control .btn:not(.disabled)').live('click', function(e){
            if($(this).hasClass('start') === true) {
                ui.start();
                $(this).attr('disabled','disabled').next().removeAttr('disabled');
            } else if ($(this).hasClass('stop') === true) {
                ui.end();
                $(this).attr('disabled','disabled').prev().removeAttr('disabled');
            }
        });
    }

    $('.uitest-remote-control > a').live('click', function(e){
        $('.uitest-remote-control .toggle').toggleClass('hide');
        return false;
    });














})();