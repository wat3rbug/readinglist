// remove reading list item

function removeReadingItem(id) {
	$.ajax({ 
		url: "removeListing.php", 
		type: "post",
		data: {"id": id },
		success: function() {
			$('#listingdiv ul').empty();
			$.ajax({
				url: "getListings.php", 
				success: function(result) {
					$('#listingdiv ul').append(result);
			}});
		}
	});
}

function removeCategory(id) {
	$.ajax({
		url: "removeCatById.php",
		type: "post",
		data: {"id": id},
		success: function() {
			$('#addCategory').modal('hide');
			showAddCategoryPopup();
		}
	});
}

function showAddCategoryPopup() {
	$('#addCategory').modal('show');
	$.ajax({
		url: "getCategories.php",
		type: "get",
		success: function(result) {
			$('#catListingdiv').empty();
			$('#catListingdiv').append(result);
		}
	});
}
function clearInputs() {
	$('#editCategoryInput').val('');
	$('#category').empty();
	$('#catListingdiv').empty();
}

$(document).ready(function(){


	
	$('#closeEditCat').on("click", function() {
		$('#editCategory').modal('hide');
		clearInputs();
	})
	
	$('#closeAddCat').on("click", function(){
		$('#addCategory').modal('hide');
		clearInputs();
	})
	

	// edit category section
	
	$('#editCategoryBtn').on("click", function() {
		clearInputs();
		$('#editCategory').modal('show');
		
	});
	
	$('#pushAlteredCategory').on("click", function () {
		var category = $('#editCategoryInput').val();
		var catId = $('#catEditSelector').val();
		$('#editCategory').modal('hide');
		clearInputs();
		$.ajax({
			url: "repos/updateCategory.php",
			type: "post",
			data: {
				"category": category,
				"catId": catId
			},
		});
		buildCategories();
	});
	
	// add category section
	
	$('#addCategoryBtn').on("click", function() {
		showAddCategoryPopup();
	});
	
	$('#pushCategory').on("click", function() {
		var category = $('#category').val();
		$.ajax({
			url: "addCategory.php",
			type: "post",
			data: {
				"category": category
			}, 
			success: function() {
				$('#addCategory').modal('hide');
			}
		});
	});
	
	// display the modal to add a link to the reading list
	
	
	
	// add new link to reading list

	$('#pushToDb').on("click", function() {
		var title = $('#title').val();
		var link = $('#link').val();
		var category = $("#catSelector").val();
		var id = 0;
		$.ajax({
			url: "addLink.php",
			type: "post",
			data: {
				"title" : title,
				"link": link,
				"category": category
			},
			success: function(id) {
				$('#addListing').modal('hide');
				$("#listingdiv ul").empty();
				$.ajax({url: "getListings.php", success: function(result) {
					$('#listingdiv ul').append(result);
				}});
			}
		});
	});
});