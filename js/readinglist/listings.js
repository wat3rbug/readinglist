/* This file handles all of the major components of the readinglist table or as noted here, the listing table.
 * All of the Ajax calls for that table, are in this file.  The categories section stuff, unless integrated,
 * are located in the categories.js file.  I tried to separate as much as I could for ease of reading and 
 * understanding.
 * 
 * Lessons learned: JQuery has some calls that work with classes but not ids.  I know, it's a gotcha and it got
 * me, which is why Ive written it down.  I shoudl learn more about the diffferent calls so that I don't do
 * as much text manipulation directly.
 **/  

//Overall scheduler stuff is here.

$(document).ready(function() {

    $('#addListingBtn').on('click', function() {
        $('#addListing').modal('show');
    });

    $('#closeAddListing').on('click',function() {
        $('#addListing').modal('hide');
    });

    buildCategoryCards();
});

// support functions

/*
 * This function retrieves the categories and the listings together in order
 * to build the 'cards' used on the page.  The categories are used in the headers
 * and then for filtration of the listings for each card.  Its a fairly simple
 * function, but it very 'texty' for my tastes.  I was working to get it done 
 * quickly, not beautifully.
 **/

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

function removeList(id) {
    $.ajax({
        url: "repos/removeListing.php",
        type: "post",
        data: {
            "id": id
        },
        success: function(results) {
            buildCategoryCards();
        }
    });
}