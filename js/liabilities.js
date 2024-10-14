$(document).ready(function() {

    buildTable();
    buildYearDropDown();
    buildAccountDropDown();

    $('.dateChange').on('click', function() {
        buildTable();
    });
});

// page builder

function buildAccountDropDown() {
    $.ajax({
        url: "repos/getAllLiabilityAccounts.php",
        type: "post",
        error: function(results) {
            alert('oops');
        },
        success: function(results) {
            if (results != null && results.length > 0) {
                $('.addAccount').empty();
                $('.editAccount').empty();
                for(i = 0; i < results.length; i++) {
                    row = results[i];
                    line = "<select value='" + row.id + "'>" + row.account_name + "</select>";
                    $('.addAccount').append(line);
                    $('.editAccount').append(line);
                }
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
	$('.editAccount').val('');
	
	$('.addDate').val('');
	$('.addDescription').val('');
	$('.addAmount').val('');
	$('.addAccount').val('');
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
}

function buildTable() {
    var year = $('currentMonth').val();
    $.ajax({
        url: "repos/getLiabilitiesByYear.php",
        type: "post",
        contentType: "json",
        data: {
            "year": year
        },
        success: function(results) {
	    if (results != null && results.length > 0) {
                $('.liabilities').find('tbody tr').remove();
		var credits = 0;
		var debits = 0;
	        for (i = 0; i < results.length; i++) {
	            var row = results[i];
		    $('.liabilities').append(buildRow(row));
		    if (row.entry_type == 2) credits += parseFloat(row.amount);
		    else debits += parseFloat(row.amount);
		} 
        $('.credit').empty();
        $('.debit').empty();
        $('.balance').empty();
		$('.credit').append("<label>$" + parseFloat(credits).toFixed(2)  + "</label>");
		$('.debit').append("<label>$" + parseFloat(debits).toFixed(2) + "</label>");
		$('.balance').append("<label>$" + parseFloat((credits - debits)).toFixed(2) + "</label>");   
	    } else {
		    $('.liabilities').find('tbody tr').remove();
		    $('.liabilities').append("<tr><td colspan='4' class='text-center'>No Data</td></tr>");
	    }
        }
    });
}

function editRow(row) {
	var result = "<button class='btn btn-link' onclick='editEntry(" + row.ledger;
	result += ")'><span class='glyphicon glyphicon-pencil'></span></button>";
	return result;
}

function removeRow(row) {
	var result = "<button class='btn btn-link' onclick='removeEntry(" + row.ledger;
	result += ")'><span class='glyphicon glyphicon-trash'></span></button>";
	return result;
}

function buildRow(row) {
    var result = "<tr><td class='text-left'>" + editRow(row) + removeRow(row) + "</td>";
    result += "<td class='text-left'>" + row.transaction_date + "</td>";
    result += "<td class='text-left'>" + row.description + "</td>";
    result += buildAmount(row) + "</tr>";
    return result;
}


function buildAmount(row) {
    var result;
    if (row.entry_type == 2) {
        result += "<td class='text-right'>$" + parseFloat(row.amount).toFixed(2)  + "</td><td>&nbsp;</td>";
    } else {
        result += "<td>&nbsp;</td><td class='text-right'>$" + parseFloat(row.amount).toFixed(2)  + "</td>";
    }
    return result;
}