$(document).ready(function() {

    buildTable();
    buildYearDropDown();

    $('.dateChange').on('click', function() {
        buildTable();
    });

});

// page builder

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
        url: "repos/getRevenueByYear.php",
        type: "post",
        contentType: "json",
        data: {
            "year": year
        },
        success: function(results) {
	    if (results != null && results.length > 0) {
                $('.revenue').find('tbody tr').remove();
		var credits = 0;
		var debits = 0;
	        for (i = 0; i < results.length; i++) {
	            var row = results[i];
		    $('.revenue').append(buildRow(row));
		    if (row.entry_type == 1) credits += parseFloat(row.amount);
		    else debits += parseFloat(row.amount);
		} 
        $('.credit').empty();
        $('.debit').empty();
        $('.balance').empty();
		$('.credit').append("<label>$" + parseFloat(credits).toFixed(2)  + "</label>");
		$('.debit').append("<label>$" + parseFloat(debits).toFixed(2)  + "</label>");
		$('.balance').append("<label>$" + parseFloat((credits - debits)).toFixed(2)  + "</label>");   
	    }else {
		    $('.revenue').find('tbody tr').remove();
		    $('.revenue').append("<tr><td colspan='5' class='text-center'>No Data</td></tr>");
	    }
        }
    });
}

function buildRow(row) {
    var result = "<tr><td class='text-left' style='max-width:65px'>" + editRow(row) + deleteRow(row) + "</td>";
    result += "<td class='text-left'>" + new Date(row.transaction_date).toLocaleDateString();
    result += "</td><td class='text-left'>" + row.description + "</td>";
    result += buildAmount(row) + "</tr>";
    return result;
}

function editRow(row) {
	var result = "<button class='btn btn-link' onclick='editEntry(" + row.id;
	result += ")'><span class='glyphicon glyphicon-pencil'></span></button>";
	return result;
}

function deleteRow(row) {
	var result = "<button class='btn btn-link' onclick='removeEntry(" + row.id;
	result += ")'><span class='glyphicon glyphicon-trash'></span></button>";
	return result;
}

function buildAmount(row) {
    var result;
    if (row.entry_type == 1) {
        result += "<td>$" + parseFloat(row.amount).toFixed(2)  + "</td><td>&nbsp;</td>";
    } else {
        result += "<td>&nbsp;</td><td>$" + parseFloat(row.amount).toFixed(2)  + "</td>";
    }
    return result;
}