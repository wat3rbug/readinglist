$(document).ready(function() {

    $('.addEntryBtn').on('click', function() {
        addLiability();
    });

	$('.entryBtn').on('click', function() {
	    clearModals();
    	    buildLiabilityDropDown();
	    $('.addLiability').modal('show');
    });
});

function addLiability() {
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
			$('.addLiability').modal('hide');
			buildTable();
		}
	});
}

function buildLiabilityDropDown() {
	$.ajax({
		url: "repos/getAllLiabilityAccounts.php",
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