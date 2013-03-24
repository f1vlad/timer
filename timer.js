(function() {
    var lib = {
        testAuto: false, // auto test will start automatically based on start|step html selector trigger
        testInProgress: false,
        testSubject: '',
        finalReport: '',
        beginTime: 0,
        endTime: 0,
        clicks: 0,
        beginTriger: 'convert_lead', // required for auto-start test
        endTrigger: '#lead-convert-success',  // required for auto-start test
        trace: [],
        remoteControll: '<div class="uitest-remote-control" style="width:400px;position:fixed;bottom:-190px;left:30%;background:white;border-radius:6px; border:2px solid blue; box-shadow: 0px 0px 14px #aaa;padding:1em"><div class="row-fluid"><div class="span3"><h1><a href="#"><span>&uarr;</span><span style="display:none">&darr;</span></a>UIsprint</h1></div><div class="span6"><input class="inherit-width " type="text" name="test-subject" value="" placeholder="Please enter your name and email"></div><div class="span3"></div></div><div class="row-fluid"><div class="span12"><em>TEST | TOUR TABS PLACEHOLDER</em></div></div><div class="row-fluid"><div class="span12"><ol><li>Test name 1 <input type="button" class="btn start" value="start"><input type="button" disabled="disabled" class="btn stop" value="stop"></li><li>Test name 2 <input type="button" class="btn start" value="start"><input type="button" disabled="disabled" class="btn stop" value="stop"></li></ol><hr>Total time: ______<br><a href="#">Take survey</a><input type="button" class="btn auto-manual-toggle manual pull-right" value="auto off"></div></div></div>',
        start: function() {
            this.clicks = 0;
            this.beginTime = new Date().getTime();
            this.beginTestAlert();
            this.testSubject = $('.uitest-remote-control input[type=text]').val();
            this.testSubjectMachine = screen.width + 'x' + screen.height + ', ' + navigator.userAgent.toLowerCase(); // TODO: detect if user changed browser resolution
            this.testInProgress = true;
        },
        end: function() {
            this.endTime = new Date().getTime();
            $('#lead-convert-success').attr('id', '');
            $('.uitest-remote-control input[type=text]').attr('value', '');
            this.showResults();
            this.trace.push({result:this.testSubject + ' — ' + this.testSubjectMachine + ', ' + this.lapTime() + ' seconds, ' + this.clicks + ' clicks'})
            this.finalReport = this.trace;
        },
        lapTime: function() {
            return Math.round( ((this.trace[this.trace.length - 2].timestamp - this.trace[0].timestamp  ) / 1000)*100 )/100;
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
                ui.trace.push({timestamp: new Date().getTime(), coordinates: e.pageX + ',' + e.pageY});
            }
        });
    } else {
        $('#sidecar').bind('click', '*', function(e){
            ui.clicks += 1;
            ui.trace.push({timestamp: new Date().getTime(), coordinates: e.pageX + ',' + e.pageY});
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

    $('.uitest-remote-control h1 > a').live('click', function(e){
        $(this).find('span').toggle();
        ($(this).closest('.uitest-remote-control').hasClass('visible')===true) ? $(this).closest('.uitest-remote-control').removeClass('visible').animate({'bottom':'-190px', 'opacity':'.75'},200) : $(this).closest('.uitest-remote-control').addClass('visible').animate({'bottom': '20px', 'opacity':'1'},200);
        e.preventDefault();
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