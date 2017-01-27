/**
 * Julia set images rendering web app interface.
 *
 * created by RinSer
 * @ 2017
 */


function makeString(array, separator) {
    var new_str = "";
    for (var i = 0; i < array.length; i++) {
        if (i > 0) new_str += separator;
            new_str += array[i];
    }

    return new_str;
}


function jqHover(selector, property, value) {
    var current_value;
    $(selector).mouseenter(function() {
        current_value = $(this).css(property);
        $(this).css(property, value);
    }).mouseleave(function() {
        $(this).css(property, current_value);
    });
}


$(document).ready(function() {

        // Get the screen resolution
        var width = $(window).width();
        var height = $(window).height();
        var current_url = window.location.href;
        current_url = current_url.split('_');
        if (current_url.length < 2) {
            var language = window.navigator.language || window.navigator.userLanguage;
            language = language.split('-')[0];
            var span = '1.9991229'
            var wh = '?_'+language+'_'+width+'_x_'+height+'_ReC_-1_ImC_0.6666666_Xmin_-'+span+'_Xmax_'+span+'_Ymin_-'+span+'_Ymax_'+span+'_b_r';
            window.location.href = window.location.href+wh;
        }
});
