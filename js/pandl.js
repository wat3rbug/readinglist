$(document).ready(function() {

    buildTable();
    buildYearDropDown();
    
    $('.qtrBtn').on('click', function() {
        var thisBtn = $(this);
	thisBtn.addClass('active').siblings().removeClass('active');
	var year = $('currentYear').val();
	var qtr = thisBtn.val();
	$.ajax({
	    url: "repos/getPandLByQtr.php",
	    type: "post",
	    contentType: "json",
	    data: {
	        "year": year,
	        "qtr": qtr
	    },
	    success: function(results) {
  	        if (results != null && results.length > 0) {
	            $('.pandl').find('tbody tr').remove();
		    var credits = 0;
		    var debits = 0;
		    for (i = 0; i < results.length; i++) {
		        var row = results[i];
			$('.pandl').append(buildRow(row));
			if (row.entry_type == 1) credits += parseFloat(row.amount);
			else debits += parseFloat(row.amount);
		    } 
		    $('.credit').empty();
		     $('.debit').empty();
		      $('.balance').empty();
		      $('.marginSpot').empty();
		    $('.credit').append("<label>$" + parseFloat(credits).toFixed(2)  + "</label>");
		    $('.debit').append("<label>$" + parseFloat(debits).toFixed(2)  + "</label>");
		    $('.balance').append("<label>$" + parseFloat((credits - debits)).toFixed(2)  + "</label>"); 
		    var margin = (debits / credits) * 100;
		    $('.marginSpot').text(Math.trunc(margin) + "%");  
		}else {
		    $('.pandl').find('tbody tr').remove();
		    $('.pandl').append("<tr><td colspan='5' class='text-center'>No Data</td></tr>");
	    }
	    }
        });
    });
    var year = new Date().getFullYear();
    var qtr = (new Date().getMonth() + 1) / 4;
    //$('.qtrBtn button["value=" "]').click();
});

// page builder


function buildTable() {
    var qtr = $('.currentQtr').val();
    var year = $('.currentYear').val();
    $.ajax({
        url: "repos/getPandLByQtr.php",
        type: "post",
        contentType: "json",
        data: {
            "year": year,
		"qtr": qtr
        },
        success: function(results) {
	    if (results != null) {
                $('.pandl').find('tbody tr').remove();
		var credits = 0;
		var debits = 0;
	        for (i = 0; i < results.length; i++) {
	            var row = results[i];
		    $('.pandl').append(buildRow(row));
		    if (row.entry_type == 1) credits += parseFloat(row.amount);
		    else debits += parseFloat(row.amount);
		} 
		$('.credit').empty();
		$('.debit').empty();
		$('.balance').empty();
		$('.credit').append("<label>$" + parseFloat(credits).toFixed(2)  + "</label>");
		$('.debit').append("<label>$" + parseFloat(debits).toFixed(2)  + "</label>");
		$('.balance').append("<label>$" + parseFloat((credits - debits)).toFixed(2)  + "</label>"); 
		var margin = (debits / credits) * 100;
		$('.marginSpot').text(Math.trunc(margin) + "%");  
	    }
        }
    });
}

function buildRow(row) {
    var result = "<tr><td class='text-left'>" + new Date(row.transaction_date).toLocaleDateString();
    result += "</td><td class='text-left'>" + row.description + "</td>";
    result += buildAmount(row) + "<td>" + row.category + "</td></tr>";
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

function buildYearDropDown() {
    $.ajax({
        url: "repos/getAllYears.php",
        type: "post",
        contentType: "json",
        success: function(results) {
		if (results != null) {
			$('.currentYear').empty();
			for (i = 0; i < results.length; i++) {
				var row = results[i];
				$('.currentYear').append('<option value=' + row.year + "'>" + row.year + "</option>");
			}
		}
        }
    });
}