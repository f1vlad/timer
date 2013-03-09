(function() {
    var lib = {
        beginTriger: 'convert_lead',
        beginTime: 0,
        endTrigger: '#lead-convert-success',
        endTime: 0,
        clicks: -2,
        controller: '<div class="uitest-controller" style="position: absolute; width:auto; height:28px; background: #ccc; border:1px solid #bbb; border-radius: 3px; padding: 6px 10px; right: 0; top:50%; box-shadow:inset 0px -19px 7px #aaa"><a href="#" style="line-height:27px; cursor:ew-resize">UI<strong class="toggle hide">TEST</strong></a> <span class="toggle hide">Contact info: <input type="text" name="contact" placeholder="Name, email"><input type="button" class="btn start" value="start"><input type="button" disabled="disabled" class="btn stop" value="stop"></span></div>',
        start: function() {
            this.beginTime = new Date().getTime();
            this.beginTestAlert();
        },
        end: function() {
            this.endTime = new Date().getTime();
            $('#lead-convert-success').attr('id', '');
            this.showResults();
        },
        lapTime: function() {
            return Math.round( ((this.endTime - this.beginTime ) / 1000)*100 )/100;
        },
        beginTestAlert: function() {throwMessage('<strong>Note!</strong> You entered a test zone', 'success', true);},
        showResults: function() {throwMessage('<strong>Test completed!</strong> It took you ' + this.lapTime() + ' seconds and ' + this.clicks + ' clicks to complete this task', 'success', false);}
    };
    window.UITEST = lib;
    $('body').append(window.UITEST.controller);

    var ui = window.UITEST;

    $('#sidecar').bind('click', '*', function(e){
        ($(e)[0]['target']['className'] === ui.beginTriger) ? ui.start() : false;
        ($(ui.endTrigger).length === 1) ? ui.end() : false;
        ui.clicks += 1;
    });

    $('.uitest-controller > a').live('click', function(e){
        $('.uitest-controller .toggle').toggleClass('hide');
        return false;
    });
})();