$(document).ready(function() {
	
	makeListings();
	
	// $.ajax({
	// 	url: "repos/getListings.php",
		// success: function(results) {
// 			if (results != null && results.length > 0) {
// 				$('#listingdiv').empty();
// 				var old_cat = null;
// 				var buffer = null;
// 				for (i = 0; i < results.length; i++) {
// 					if (old_cat != results[i].category) {
// 						old_cat = results[i].category;
// 						$('#listingdiv').append(getPanelTop(results[i].category));
// 					}
// 					$('#listingdiv ul').append(displayListingCard(results[i]));
// 					if (i < (results.length - 1) && results[i + 1].category != old_cat) {
// 						$('#lisitingdiv').append(getPanelBottom());
// 					}
// 					buffer = null;
// 				}
// 			}
// 		}
	// });
});

function getPanelBottom() {
	var result = '</ul></div></div><div class="row">&nbsp;</div>';
	return result;
}

function displayListingCard(listing) {
	var result = '<li class="list-group-item"><div class="form-check"><button type="button"';
	result += ' class="btn btn-outline-danger" id="item' + listing['id'] + '"';
	result += ' onclick="removeReadingItem(' + listing['id'] + ');">' ; 
	result += '<span class="glyphicon glyphicon-remove"></span></button>&nbsp;';
	result += '<a target="_blank" href="' + listing['link'] + '">' + listing['title'];
	result += '</a></div></li>';
	return result;
}

function getPanelTop(category) {
	row_cat = category.replace(/ /g, "_");
	var panel = '<div class="card"><div class="card-header">' + category + '&nbsp;<a data-toggle="collapse"';
	panel += '  href="#' + row_cat + '" aria-expanded="true" name="' + row_cat + '" aria-controls="';
	panel += row_cat + '" ' + 'id="' + row_cat + '_col">Click to toggle expansion';
	panel += '&nbsp;<span class="glyphicon glyphicon-chevron-down"></span></a></div>';
	panel += '<div class="card-body collapse show"' + ' id="' + row_cat + '">';
	panel += '<ul class="list-group list-group-flush">';
	return panel;
}

function makeListings() {
	$.ajax({
		url: "repos/getCategories.php",
		success: function(results) {
			$.ajax({
				if (results != null results.length > 0) {
					results.forEach(getListingByCategory(), i) {
						var buffer = getPanelTop();
						$.ajax({
							url: "repo/getListingsByCategory.php",
							type: "post",
							data: {
								"category": results[i].category
							}
							success: function(listings) {
								for (i = 0; i < listings.length; i++) {
									buffer += displayListingCard();
								}
							}
						});
						buffer += getPanelBottom();
						$('#listingdiv').append(buffer);
					}

				}
			});
		}
	});
}