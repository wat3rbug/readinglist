$(document).ready(function() {
	
	$("#addRecordBtn").on("click", function() {
		$('#addListing').modal('show');
		$('#title').val();
		$('#link').val();
		$.ajax({
			url: "repos/getCatForDropDown.php",
			type: "post",
			success: function(result)	{
				if (result != null && result.length > 0) {
					$('#catSelector').empty();
					for (i = 0; i < result.length; i++) {
						var selection = "<option value='" + result[i]['id'] +
						"'>" + results[i]['category'] + "</option>";
					}
					$('#catSelector').append(result);
				}
				
			}
		});
	});

	 buildCategories();
});

function buildCategoryLinkBtn(category) {
	var no_space = category.category.replace(/ /g, "_");
	var cat = '<button type="button" class="btn btn-outline-info" onclick="move(' + no_space;
	cat += ');">' + category.category + '</button>';
	return cat;
}

function buildCategoryDropDown(category) {
	var cat = "<option value='" + category['id'] + "'>" + category['category'] + "</option>";
	return cat;
}

function move(cat) {
	window.location.href="#" + cat;
}

function buildCategories() {
	$.ajax({
		url: "repos/getCategories.php",
		contentType: "json",
		success: function(results) {
			if (results != null && results.length > 0) {
				$('#listingdiv').empty();
				$('#catSelector').empty();
				$('#catEditSelector').empty();
				$('#quicklinks').empty();
				for (i = 0; i < results.length; i++) {
					$('#quicklinks').append(" " + buildCategoryLinkBtn(results[i]));
					$('#catSelector').append(buildCategoryDropDown(results[i]));
					$('#catEditSelector').append(buildCategoryDropDown(results[i]));
				}
			}
		}
	})
}