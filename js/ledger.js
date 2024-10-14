$(document).ready(function() {

    buildYearDropDown();
    buildTable();
    
    $('.currentYear').change(function() {
    	    buildTable();
    }); 
    
    $('.entryBtn').on('click', function() {
	    buildTypeDropDown();
	    $('.addEntry').modal('show');
    });
    
    $('.addEntryBtn').on('click', function() {
            $('.addEntry').modal('hide');
            saveEntry();
    });
    
    $('.editEntryBtn').on('click', function() {
	    updateEntry();
	    $('editEntry').modal('hide');
	    buildTables();
    });
});

// page builder


function buildTypeDropDown() {
	$.ajax({
		url: "repos/getAllAccountTypes.php",
		type: "post",
		contentType: "json",
		success: function(results) {
			if (results != null) {
				$('.addCategory').empty();
				$('.editCategory').empty();
				for (i =0 ; i < results.length; i++) {
					var row = results[i];
					var line = "<option value='" + row.id + "'>" + row.name + "</option>";
					$('.addCategory').append(line);
					$('.editCategory').append(line);
				}
			}
		}
	});
}

function updateEntry() {
	var id = $('.editId').val();
	var editDate = $('.editDate').val();
	var description = $('.editDescription').val();
	var type = $('.editType').val();
	var amount = $('.editAmount').val();
	var cat = $('.editCategory').val();
	$.ajax({
		url: "repos/updateEntryById.php",
		type: "post",
		data: {
			"id": id,
			"date": editDate,
			"description": description,
			"type": type,
			"amount": amount,
			"cat": cat	
		},
		complete: function(results) {
			$('.editEntry').modal('hide');
			buildTable();
		}
	});
}

function saveEntry() {
	var addDate = $('.addDate').val();
	var description = $('.addDescription').val();
	var type = $('.addType').val();
	var amount = $('.addAmount').val();
	var cat = $('.addCategory').val();
	$.ajax({
		url: "repos/saveEntry.php",
		type: "post",
		data: {
			"id": id,
			"date": addDate,
			"description": description,
			"type": type,
			"amount": amount,
			"cat": cat	
		},
		complete: function(results) {
			$('.addEntry').modal('hide');
			buildTable();
		}
	});
}

function buildYearDropDown() {
    $.ajax({
        url: "repos/getAllYears.php",
        type: "post",
        contentType: "json",
        success: function(results) {
		if (results != null) {
			for (i = 0; i < results.length; i++) {
				var row = results[i];
				$('.currentYear').append('<option value=' + row.year + "'>" + row.year + "</option>");
			}
		}
        }
    });
    buildTable();
}

function buildTable() {
    var year = $('.currentYear option:selected').val();
    if (year == null) year = "2024";
    $.ajax({
        url: "repos/getLedgerByYear.php",
        type: "post",
        contentType: "json",
        data: {
            "year": year
        },
        success: function(results) {
	    if (results != null && results.length > 0) {
                $('.ledger').find('tbody tr').remove();
		var credits = 0;
		var debits = 0;
	        for (i = 0; i < results.length; i++) {
	            var row = results[i];
		    $('.ledger').append(buildRow(row));
		    if (row.entry_type == 1) credits += parseFloat(row.amount);
		    else debits += parseFloat(row.amount);
		} 
		$('.credit').empty();
		$('.debit').empty();
		$('.balance').empty();
		$('.credit').append("<label>$" + parseFloat(credits).toFixed(2)  + "</label>");
		$('.debit').append("<label>$" + parseFloat(debits).toFixed(2) + "</label>");
		$('.balance').append("<label>$" + parseFloat((credits - debits)).toFixed(2) + "</label>");   
	    }else {
		    $('.ledger').find('tbody tr').remove();
		    $('.ledger').append("<tr><td colspan='6' class='text-center'>No Data</td></tr>");
	    }
        }
    });
}

function clearModals() {
	$('.editDate').val('');
	$('.editDescription').val('');
	$('.editType').val('');
	$('.editAmount').val('');
	$('.editId').val('');
	$('.editCategory').val('');
	
	$('.addDate').val('');
	$('.addDescription').val('');
	$('.addAmount').val('');
	$('.addCategory').val('');
}

function editEntry(id) {
	clearModals();
	buildTypeDropDown();
	$.ajax({
		url: "repos/getEntryById.php",
		type: "post",
		data: {
			"entry": id
		},
		success: function(results) {
			if (results != null && results.length > 0) {
				var row = results[0];
				$('.editDate').val(row.transaction_date);
				$('.editDescription').val(row.description);
				$('.editType').val(row.entry_type);
				$('.editAmount').val(row.amount);
				$('.editCategory').val(row.cat_id);
				$('.editId').val(row.id);
				$('.editEntry').modal('show');	
			}
		}
	});
}

function removeEntry(id) {
	$.ajax({
		url: "repos/removeEntryById.php",
		type: "post",
		contentType: "json",
		data: {
			"id":id
		},
		complete: function(results){
			buildTable();
		}
	});
}

function buildRow(row) {
    var result = "<tr><td class='text-left' style='max-width: 65px'>";
    result += new Date(row.transaction_date).toLocaleDateString();
    result += "</td><td class='text-left'>" + row.description + "</td>";
    result += buildAmount(row) + "</td><td>" + row.category +"</td></tr>";
    return result;
}


function buildAmount(row) {
    var result;
    if (row.entry_type == 1) {
        result += "<td class='text-right'>$" + parseFloat(row.amount).toFixed(2)  + "</td><td>&nbsp;</td>";
    } else {
        result += "<td>&nbsp;</td><td class='text-right'>$" + parseFloat(row.amount).toFixed(2)  + "</td>";
    }
    return result;
}