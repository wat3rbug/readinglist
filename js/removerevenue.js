$(document).ready(function() {


})

function removeEntry(id) {
	$.ajax({
		url: "repos/removeEntryById.php",
		type: "post",
		data: {
			"id": id
		},
		complete: function(results) {
			buildTable();
		}
	})
}