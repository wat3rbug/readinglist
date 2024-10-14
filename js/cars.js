$(document).ready(function() {
	buildTable();
	
        $('.carBtn').on('click', function() {
	    clearModals();
    	    $('.addCar').modal('show');	
        });
	
	$('.addCarBtn').on('click', function() {
	    $('.addCar').modal('hide');
	    saveCar();
	});
	
	$('.editCarBtn').on('click', function() {
		$('.editCar').modal('hide');
		updateCar();
	});
});

function updateCar() {
	var id = $('.editId').val();
	var make = $('.editMake').val();
	var model = $('.editModel').val();
	var year = $('.editYear').val();
	var color = $('.editColor').val();
	$.ajax({
		url: "repos/updateCarById.php",
		type: "post",
		data: {
			"id": id,
			"make": make,
			"model": model,
			"year": year,
			"color": color
		},
		complete: function(result) {
			buildTable();
		}
	});
}

function buildTable() {
    $.ajax({
        url: "repos/getAllCars.php",
        type: "post",
        contentType: "json",
        success: function(results) {
	    if (results != null && results.length > 0) {
                $('.cars').find('tbody tr').remove();
	        for (i = 0; i < results.length; i++) {
	            var row = results[i];
		    $('.cars').append(buildRow(row));
		}  
	    }else {
		    $('.cars').find('tbody tr').remove();
		    $('.cars').append("<tr><td colspan='4' class='text-center'>No Data</td></tr>");
	    }
        }
    });
}

function clearModals() {
	$('.editMake').val('');
	$('.editModel').val('');
	$('.editYear').val('');
	$('.editColor').val('');
	$('.editId').val('');
	
	$('.addMake').val('');
	$('.addModel').val('');
	$('.addYear').val('');
	$('.addColor').val('');
}

function saveCar() {
	make = $('.addMake').val();
	model = $('.addModel').val();
	year = $('.addYear').val();
	color = $('.addColor').val();
    $.ajax({
	    url: "repos/addCar.php",
	    dataType: "json",
	    type: "post",
	    data: {
		    "make": make,
		    "model": model,
		    "year": year,
		    "color": color 
	    }, complete: function(results) {
		    buildTable();
	    }
    });
}

function editCar(id) {
	clearModals();
	$.ajax({
		url: "repos/getCarById.php",
		type: "post",
		data: {
			"id": id
		},
		success: function(results) {
			if (results != null) {
				var row = results[0];
				$('.editId').val(row.id);
				$('.editMake').val(row.make);
				$('.editModel').val(row.model);
				$('.editColor').val(row.color);
				$('.editYear').val(row.year);
				$('.editCar').modal('show');	
			}
		}
	});
}

function buildEdit(id) {
	var result = "<button type='button' class='btn btn-link edit'";
	result += " onclick='editCar(" + id + ");'>";
	result += "<span class='glyphicon glyphicon-pencil'></span></button>";
	return result;
}

function removeCar(id) {
	$.ajax({
		url: "repos/removeCarById.php",
		type: "post",
		data: {
			"id": id
		},
		complete: function(results) {
			buildTable();
		}
	})
}
function buildRemove(id) {
	var result = "<button type='button' class='btn btn-link remove'";
	result += " onclick='removeCar(" +id + ");'>";
	result += "<span class='glyphicon glyphicon-trash'></span></button>";
	return result;
}

function buildRow(row) {
    var result = "<tr><td class='text-left'>" + buildEdit(row.id) + " " + buildRemove(row.id); 
    result += "</td><td class='text-left'>" + row.make;
    result += "</td><td class='text-left'>" + row.model + "</td><td>";
    result += row.year.toString() + "</td><td>" + row.color +"</td></tr>";
    return result;
}