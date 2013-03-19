(function() {
    var lib = {
        testAuto: false, // auto test will start automatically based on start|step html selector trigger
        testInProgress: false,
        testSubject: '',
        beginTime: 0,
        endTime: 0,
        clicks: 0,
        beginTriger: 'convert_lead', // required for auto-start test
        endTrigger: '#lead-convert-success',  // required for auto-start test
        trace: {},
        remoteControll: '<div class="uitest-remote-control" style="position: absolute; width:auto; height:28px; background: #ccc; border:1px solid #bbb; border-radius: 3px; padding: 6px 10px; right: 0; top:50%; box-shadow:inset 0px -19px 7px #aaa"><a href="#" style="line-height:27px; cursor:ew-resize">UI<strong class="toggle hide">TEST</strong></a> <span class="toggle hide">Contact info: <input type="text" name="test-subject" placeholder="Name, email"><input type="button" class="btn start" value="start"><input type="button" disabled="disabled" class="btn stop" value="stop"><input type="button" class="btn auto-manual-toggle manual" value="auto off"></span></div>',
        start: function() {
            this.clicks = 0;
            this.trace = {};
            this.beginTime = new Date().getTime();
            this.beginTestAlert();
            this.testSubject = $('.uitest-remote-control input[type=text]').val();
            this.testSubjectMachine = screen.width + 'x' + screen.height + ', ' + navigator.userAgent.toLowerCase(); // TODO: detect if user changed browser resolution
            this.testInProgress = true;
        },
        end: function() {
            this.endTime = new Date().getTime();
            $('#lead-convert-success').attr('id', '');
            this.showResults();
            $('.uitest-remote-control input[type=text]').attr('value', '');
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
                'coordinates': e.pageX + ',' + e.pageY
            };
        });
        $('.uitest-remote-control .btn:not(.disabled)').live('click', function(e){
            if($(this).hasClass('start') === true) {
                ui.start();
                $(this).attr('disabled','disabled').next().removeAttr('disabled').parent().find('.auto-manual-toggle').attr('disabled','disabled');
            } else if ($(this).hasClass('stop') === true) {
                ui.end();
                $(this).attr('disabled','disabled').prev().removeAttr('disabled').parent().find('.auto-manual-toggle').removeAttr('disabled');
            }
        });
    }

    $('.uitest-remote-control > a').live('click', function(e){
        $('.uitest-remote-control .toggle').toggleClass('hide');
        return false;
    });

    $('.auto-manual-toggle').live('click', function(){
        if($(this).hasClass('manual') === true) {
            $(this).removeClass('manual').addClass('auto btn-primary').attr('value', 'auto on');
            $(this).parent().find('.start').attr('disabled','disabled');
            ui.testAuto = true;
        } else if($(this).hasClass('auto') === true) {
            $(this).removeClass('auto btn-primary').addClass('manual').attr('value', 'auto off');
            $(this).parent().find('.start').removeAttr('disabled');
            ui.testAuto = false;
        }
    });

})();