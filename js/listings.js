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
                        var listByCat = listings.filter((listing) => listing.category == cat);
                        if (listByCat.length > 0) {
                            var card = '<div class="card"><div class="card-header">';
                            card += cat + '</div><div class="card-body"></div></div><p></p>';
                            
                            var line = '<ul class="list-group list-group-flush">';
                            for( j = 0; j < listByCat.length; j++) {
                                line += '<li class="list-groupitem"><button type="button" class="btn btn-link" onclick="removeList(';
                                line += listByCat[j]['id'] + ')"><span class="glyphicon glyphicon-remove"></span></button>&nbsp;';
                                line += '<a href="' + listByCat[j]['link'] + '" target="_blank">' + listByCat[j]['title'] + '</a></li>';
                            }
                            line += '</ul></div></div>';
                            card += line;
                            $('.listingdiv').append(card);
                        }
                    }
                }
            });
            
        }
    });
}