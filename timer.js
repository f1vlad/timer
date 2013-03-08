var test_begin_trigger = 'convert_lead',
    test_begin_time,
    test_end_trigger = '#lead-convert-success',
    test_end_time,
    clicks = 0;

	$('#sidecar').bind('click', '*', function(e){
		($(e)[0]['target']['className'] === test_begin_trigger) ? test_start() : false;
		($(test_end_trigger).length === 1) ? test_end() : false;
		var status = ($('#sugarcrm').find('#lead-convert-success').length===1) ? true : false;
		clicks += 1;
	});


    var test_start = function () {
        test_begin_time = new Date().getTime();
        begin_test_alert();
    };

    var test_end = function () {
        test_end_time = new Date().getTime();
        show_results();
    };

    var lap_time = function () {
    	return (test_end_time - test_begin_time) / 1000;
    	
    };

    var begin_test_alert = function () {
		throwMessage('<strong>Note!</strong> You entered a test zone', 'success', true);
    };

    var show_results = function () {
        throwMessage('<strong id="lead-convert-success">Test completed!</strong> It took you ' + lap_time() + ' seconds and ' + clicks + ' clicks to complete this task', 'success', false);
    };
