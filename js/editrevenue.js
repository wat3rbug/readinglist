$(document).ready(function() {

    $('.editEntryBtn').on('click', function() {
        updateRevenue();
    });
    $('.editDate').datepicker({
        format: "mm/dd/yyyy",
        startDate: new Date()
    });
});

function editEntry(id) {
	clearModals();
	buildRevenueDropDown();
	buildEditModal(id);
	$('.editRevenue').modal('show');
}

function buildEditModal(id) {
	$.ajax({
		url: "repos/getRevenueById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function(results) {
			if (results != null && results.length > 0) {
				var row = results[0];
                $('.editDate').val(row.transaction_date);
				$('.editDescription').val(row.description);
				$('.editType').val(row.entry_type);
				$('.editAmount').val(row.amount);
				$('.editId').val(row.ledger);
				$('.editAccount select').val(row.account_name);
			}
		}
	});
}

function updateRevenue() {
	var id = $('.editId').val();
	var editDate = $('.editDate').val();
	var description = $('.editDescription').val();
	var type = $('.editType').val();
	var amount = $('.editAmount').val();
	var cat = $('.editAccount').val();
	$.ajax({
		url: "repos/updateEntryById.php",
		type: "post",
		data: {
			"date": editDate,
			"description" : description,
			"type": type,
			"amount": amount,
			"cat": cat,
			"id": id
		},
		complete: function(results) {
			$('.editRevenue').modal('hide');
			buildTable();
		}
	});
}