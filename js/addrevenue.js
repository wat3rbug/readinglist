$(document).ready(function() {

    $('.addEntryBtn').on('click', function() {
        addRevenue();
    });

	$('.entryBtn').on('click', function() {
	    clearModals();
    	    buildRevenueDropDown();
	    $('.addRevenue').modal('show');
    });
});

function addRevenue() {
	var addDate = $('.addDate').val();
	var description = $('.addDescription').val();
	var type = $('.addType').val();
	var amount = $('.addAmount').val();
	var account = $('.addAccount').val();
	$.ajax({
		url: "repos/addEntry.php",
		type: "post",
		data: {
			"date": addDate,
			"description": description,
			"type": type,
			"amount": amount,
			"account": account	
		},
		complete: function(results) {
			$('.addRevenue').modal('hide');
			buildTable();
		}
	});
}

function buildRevenueDropDown() {
	$.ajax({
		url: "repos/getAllRevenueAccounts.php",
		type: "post",
		contentType: "json",
		success: function(results) {
			if (results != null && results.length > 0) {
				$('.addAccount').empty();
				$('.editAccount').empty();
				for (i = 0; i < results.length; i++) {
					var row = results[i];
					line = "<option value='" + row.id + "'>" + row.name + "</option>";
					$('.addAccount').append(line);
					$('.editAccount').append(line);
				}
			}
		}
	});
}