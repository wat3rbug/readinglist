$(document).ready(function() {

    $('.editEntryBtn').on('click', function() {
        updateExpense();
    });
    $('.editDate').datepicker({
        format: "mm/dd/yyyy",
        startDate: new Date()
    });
});

function editEntry(id) {
	clearModals();
	buildExpenseDropDown();
	buildEditModal(id);
	$('.editExpense').modal('show');
}

function buildEditModal(id) {
	$.ajax({
		url: "repos/getExpenseById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function(results) {
			if (results != null && results.length > 0) {
				var row = results[0];
                $('.editDate').datepicker({format: "YYYY-MM-DD"});
				$('.editDate').datepicker("setDate", new Date(row.transaction_date));
                $('.editDate').datepicker('update');
				$('.editDescription').val(row.description);
				$('.editType').val(row.entry_type);
				$('.editAmount').val(row.amount);
				$('.editId').val(row.ledger);
				$('.editAccount select').val(row.account_name);
			}
		}
	});
}

function updateExpense() {
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
			$('.editExpense').modal('hide');
			buildTable();
		}
	});
}