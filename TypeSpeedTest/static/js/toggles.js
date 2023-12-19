
$(function() {
    $("#friend_form").submit(function(event) {
        event.preventDefault();
        var friendForm = $(this);
        var posting = $.post( friendForm.attr('action'), friendForm.serialize() );
        posting.done(function(data) {
        });
        posting.fail(function(data) {
        });
    });
});

$(document).ready(function () {
    time_setting = 30;
    random_setting = 100;
    target_setting = $("#output");

    function type(input, target, current, time, random){
        if(current > input.length){
            console.log("Complete.");
        }
        else{
            current += 1;
            target.text(input.substring(0,current));
            setTimeout(function(){
                type(input, target, current, time, random);
            },time + Math.random()*random);
        }
    }

    $("#start_test_tg").click(function () {
        document.getElementById("reset").click();
        $("#start_page").toggle("slow");
        $("#start_speedtest").toggle("slow");
        setTimeout(function(){
            nameUser = jQuery('input[name="name"]').val();
            input_text = "Hey, " + nameUser + "! How fast can you type?";
            type(input_text, target_setting, 0, time_setting, random_setting);
        }, 500);
    });
});

$(window).keypress(function(e) {
    if (e.which == 32)
        return false;
});

$(output).keypress(function(e) {
    if (e.which == 32)
        return true;
});
