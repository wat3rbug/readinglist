$(document).ready(function() {

    $('.addEntryBtn').on('click', function() {
        addExpense();
    });

	$('.entryBtn').on('click', function() {
	    clearModals();
    	    buildExpenseDropDown();
	    $('.addExpense').modal('show');
    });
});

function addExpense() {
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
			$('.addExpense').modal('hide');
			buildTable();
		}
	});
}

function buildExpenseDropDown() {
	$.ajax({
		url: "repos/getAllExpenseAccounts.php",
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