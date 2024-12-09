/*
 * This file contains all of the category stuff, with the exception of
 * the one function that has category stuff integrated.
 **/

// schedule stuff here

$(document).ready(function() {
	
	$('#editCategoryBtn').on('click', function() {
		$('#editCategory').modal('show');
	});

	$('#addCategoryBtn').on('click', function() {
		$('#addCategoryBtn').modal('show');
	});

	$('#closeAddCat').on('click', function() {
		buildCategories();
		$('#addCategory').modal('hide');
	});

	$('#closeEditCat').on('click', function() {
		buildCategories();
		$('#editCategory').modal('hide');
	});

	 buildCategories();
});

// support functions

/** 
 * This function makes the list of buttons at the top which will direct you down to the section
 * of the page where the links for that particular category are displayed.
 * @param category is the json object which represents the categiry table record.
 */

function buildCategoryLinkBtn(category) {
	var no_space = category.category.replace(/ /g, "_");
	var cat = '<button type="button" class="btn btn-outline-primary" onclick="move(' + no_space;
	cat += ');">' + category.category + '</button>';
	return cat;
}

/** 
 * This function takes the category and builds the section menu.  It used in 2 places, and hence
 * the reason for the function even though, at 1 line, it is debatable.
 * @param category is the json object which represents the category table record.
 */

function buildCategoryDropDown(category) {
	var cat = "<option value='" + category['id'] + "'>" + category['category'] + "</option>";
	return cat;
}

/**
 * This is dumb.  Since I'm using a button I made a method to redirect to the location, which is
 * EXACTLY what an anchor tag does.
 * @param cat is the text which represents the location.
 */

function move(cat) {
	window.location.href="#" + cat;
}

/**
 * This function is the do-all.  It updates the modals so the selectors have all the categories,
 * as well as updating the buttons at the top for the categories.  It is meant to be called
 * each time a record in the category table is updated through CRUD operations.
 */

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
	});
}