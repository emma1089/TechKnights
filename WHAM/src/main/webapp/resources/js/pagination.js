/**
 * 
 */
function show_page(start, page, max_pages) {

    if (page == 1) {
        var pages = '<li class="disabled"><a href=' + '"#"' + '>Prev</a></li>';
    }
    else {
        var pages = '<li><a href=' + '"#"' + '>Prev</a></li>';
    }
    if (max_pages < 5) {
        for (var i = 0; i < max_pages ; i++) {
            if (page == start) {
                pages += '<li class="active"><a href=' + '"#" >' + start + '</a></li>';
                start++;
            }
            else {
                pages += '<li><a href="#">' + start + '</a></li>'
                start++;
            }
        }
    }
    else {
        for (var i = 0; i < 5 ; i++) {
            if (page == start) {
                pages += '<li class="active"><a href=' + '"#" >' + start + '</a></li>';
                start++;
            }
            else {
                pages += '<li><a href="#">' + start + '</a></li>'
                start++;
            }
        }
    }
    if ((page) == max_pages) {
        pages = pages + '<li class="disabled"><a href=' + '"#"' + '>Next</a></li>';
    }
    else {
        pages = pages + '<li><a href=' + '"#"' + '>Next</a></li>';
    }


    $('ul.pagination').html(pages);
};

function show(page, max_pages) {
    if (page < 4) {
        show_page(1, page, max_pages);
    }
    else if (page > (max_pages - 3)) {
        show_page((max_pages - 4), page, max_pages);
    }
    else {
        show_page((page - 2), page, max_pages);
    }
};

