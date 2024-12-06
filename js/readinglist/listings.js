$(document).ready(function() {

    $('#addListingBtn').on('click', function() {
        $('#addListing').modal('show');
    });

    $('#closeAddListing').on('click',function() {
        $('#addListing').modal('hide');
    });

    buildCategoryCards();
});

function buildCategoryCards() {
    $.ajax({
        url: "repos/getCategories.php",
        dataType: "json",
        success: function(categories) {
            $('.listingdiv').empty();
            $.ajax({
                url: "repos/getListings.php",
                dataType: "json",
                success: function(listings) {
                    for( i = 0; i < categories.length; i++) {
                        var cat = categories[i].category;
                        var no_space = cat.replace(/ /g, "_");
                        var listByCat = listings.filter((listing) => listing.category == cat);
                        if (listByCat.length > 0) {
                            var card = '<div class="card"><div class="card-header"><a name="' + no_space + '">';
                            card += cat + '</a></div><div class="card-body">';                    
                            var line = '<ul class="list-group list-group-flush">';
                            for( j = 0; j < listByCat.length; j++) {
                                var listing = listByCat[j];
                                line += '<li class="list-group-item"><button type="button" class="btn btn-link" onclick="removeList(';
                                line += listing['id'] + ')"><span class="glyphicon glyphicon-remove"></span></button>&nbsp;';
                                line += '<a href="' + listing['link'] + '" target="_blank">' + listing['title'] + '</a></li>';
                            }
                            line += '</ul>';
                            card += line + '</div></div><div class="row">&nbsp;</div>';
                            $('.listingdiv').append(card);
                        }
                    }
                }
            });
            
        }
    });
}