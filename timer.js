var beginTriger = 'convert_lead',
    beginTime,
    endTrigger = '#lead-convert-success',
    endTime,
    clicks = 0;

	$('#sidecar').bind('click', '*', function(e){
		($(e)[0]['target']['className'] === beginTriger) ? start() : false;
		($(endTrigger).length === 1) ? end() : false;
		var status = ($('#sugarcrm').find('#lead-convert-success').length===1) ? true : false;
		clicks += 1;
	});

    var start = function () {
        beginTime = new Date().getTime();
        beginTestAlert();
    };

    var end = function () {
        endTime = new Date().getTime();
        showResults();
    };

    var lapTime = function () {
    	return (endTime - beginTime ) / 1000;
    	
    };

    var beginTestAlert = function () {
		throwMessage('<strong>Note!</strong> You entered a test zone', 'success', true);
    };

    var showResults = function () {
        throwMessage('<strong id="lead-convert-success">Test completed!</strong> It took you ' + lapTime() + ' seconds and ' + clicks + ' clicks to complete this task', 'success', false);
    };
