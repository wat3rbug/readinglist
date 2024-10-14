$(document).ready(function() {
	
	buildTable();
	buildAccountDropDowns();
	
	$('.accountBtn').on('click', function() {
		$('.addAccountModal').modal('show');
	});
	
	$('.addBtn').on('click', function() {
		$('.addAccountModal').modal('hide');
		addAccount();
	});
	
	$('.editAccountBtn').on('click', function() {
		$('.editAccountModal').modal('hide');
		updateAccount();
	})
});

function buildAccountDropDowns() {
	$.ajax({
		url: "repos/getAllAccountTypes.php",
		contentType: "json",
		success: function(results) {
			if (results != null && results.length > 0) {
				$('.addType').empty();
				$('.editType').empty();
				for (i = 0; i < results.length; i++) {
					var row = results[i];
					var line = "<option value='" + row.id + "'>";
					line += row.name + "</option>";
					$('.addType').append(line);
					$('.editType').append(line);
				}
			}
		}
	})
}

function clearModals() {
	$('.editName').val('');
	$('.editId').val('');
	$('.addName').val('');
}

function editAccount(id) {
	clearModals();
	$.ajax({
		url: "repos/getAccountById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function(results) {
			if (results != null && results.length > 0) {
				var row = results[0];
				$('.editId').val(row.id);
				$('.editName').val(row.account_name);
				$('.editType').val(row.type_id);
				$('.editAccountModal').modal('show');	
			}
		}
	});
}

function buildTable() {
	$.ajax({
		url: "repos/getAllAccounts.php",
		contentType: "json",
		success: function(results) {
    	           if (results != null && results.length > 0) {
                        $('.accounts').find('tbody tr').remove();
    			var credits = 0;
    			var debits = 0;
    	        	for (i = 0; i < results.length; i++) {
    	            	    var row = results[i];
    		    	    $('.accounts').append(buildRow(row));
    			}   
	           } else {
		    $('.accounts').find('tbody tr').remove();
		    $('.accounts').append("<tr><td colspan='7' class='text-center'>No Data</td></tr>");
	    }
	        }
	});
}

function buildEdit(id) {
	var result = "<button type='button' class='btn btn-link edit'";
	result += " onclick='editAccount(" + id + ");'>";
	result += "<span class='glyphicon glyphicon-pencil'></span></button>";
	return result;
}

function buildRow(row) {
    var result = "<tr><td>" + buildEdit(row.id) + buildRemove(row.id) +"</td>";
    result += "<td class='text-left'>" + row.account_name +"</td>";
    result += "<td class='text-left'>" + row.account_type + "</td><td>" + nullable(row.inserted_at) + "</td>";
    result += "<td>" + row.inserted_by + "</td><td>" + nullable(row.updated_at) + "</td>";
    result += "<td>" + nullable(row.updated_by) + "</td></tr>";
    return result;
}

function buildRemove(id) {
	var result = "<button type='button' class='btn btn-link remove'";
	result += " onclick='removeAccount(" +id + ");'>";
	result += "<span class='glyphicon glyphicon-trash'></span></button>";
	return result;
}

function removeAccount(id) {
	$.ajax({
		url: "repos/removeAccountById.php",
		type: "post",
		data: {
			"id": id
		},
		complete: function(results) {
			buildTable();
		}	
	});
}

function nullable(variable) {
	if (variable == null || variable.length == 0) return "N/A";
	else return variable;
}

function updateAccount() {
	var id = $('.editId').val();
	var name = $('.editName').val();
	var account_type = $('.editType').val();
	$.ajax({
		url: "repos/updateAccountById.php",
		type: "post",
		data: {
			"id": id,
			"name": name,
			"account_type": account_type
		},
		complete: function(results) {
			buildTable();
		}
	})
}

function addAccount() {
	var name = $('.addName').val();
	var account_type = $('.addType').val();
	$.ajax({
		url: "repos/addAccount.php",
		type: "post",
		data: {
			"name": name,
			"account_type": account_type
		},
		complete: function(results) {
			buildTable();
		}
	});
	
}

