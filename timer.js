(function() {
    var lib = {
        beginTriger: 'convert_lead',
        beginTime: 0,
        endTrigger: '#lead-convert-success',
        endTime: 0,
        clicks: -2,
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

    var ui = window.UITEST;

    $('#sidecar').bind('click', '*', function(e){
        ($(e)[0]['target']['className'] === ui.beginTriger) ? ui.start() : false;
        ($(ui.endTrigger).length === 1) ? ui.end() : false;
        ui.clicks += 1;
    });
})();