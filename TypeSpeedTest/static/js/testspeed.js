$(document).ready(function () {
  time_setting = 30;
  random_setting = 100;
  input_text = "How fast can you type?";
  target_setting = $("#output");

  function type(input, target, current, time, random) {
    if (current > input.length) {
      console.log("Complete.");
    } else {
      current += 1;
      target.text(input.substring(0, current));
      setTimeout(function () {
        type(input, target, current, time, random);
      }, time + Math.random() * random);
    }
  }

  $(function () {
    $("#sub_form").submit(function (event) {
      event.preventDefault();
      var friForm = $(this);
      var posting = $.post(friForm.attr('action'), friForm.serialize());
      posting.done(function (data) {
      });
      posting.fail(function (data) {
      });
    });
  });

  function post(path, params, method = 'POST') {
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    form.setAttribute("id", "sub_form");

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];

        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    document.getElementById("sub_form").submit();
  }

  var character_length = 31;
  var index = 0;
  var letters = $("#input_text").val();
  var started = false;
  var current_string = letters.substring(index, index + character_length);

  var wordcount = 0;

  var timer = 0;
  var wpm = 0;
  var errors = 0;
  var interval_timer;

  $("html, body").click(function () {
    $("#textarea").focus();
  });

  $("#target").text(current_string);
  $(window).keypress(function (evt) {
    if (!started) {
      start();
      started = true;
    }
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charTyped = String.fromCharCode(charCode);
    if (charTyped == letters.charAt(index)) {
      if (charTyped == " ") {
        wordcount++;
        $("#wordcount").text(wordcount);
      }
      index++;
      current_string = letters.substring(index, index + character_length);
      $("#target").text(current_string);
      $("#your-attempt").append(charTyped);
      if (index == letters.length) {
        wordcount++;
        $("#wordcount").text(wordcount);
        $("#timer").text(timer);
        if (timer == 0) {
          timer = 1;
        }
        wpm = Math.round(wordcount / (timer / 60));
        $("#wpm").text(wpm);
        stop();
        finished();
      }
    } else {
      $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>");
      errors++;
      $("#errors").text(errors);
    }
  });

  $("#reset").click(function () {
    reset();
  });

  $("#change").click(function () {
    $("#input_text").show().focus();
  });

  $("#pause").click(function () {
    stop();
  });

  $("#input_text").change(function () {
    reset();
  });

  function start() {
    interval_timer = setInterval(function () {
      timer++;
      $("#timer").text(timer);
      wpm = Math.round(wordcount / (timer / 60));
      $("#wpm").text(wpm);
    }, 1000)
  }

  function stop() {
    clearInterval(interval_timer);
    started = false;
  }

  function reset() {
    $("#input_text").blur().hide();;
    $("#your-attempt").text("");
    index = 0;
    errors = 0;
    wpm = 0;
    wordcount = 0;
    clearInterval(interval_timer);
    started = false;
    letters = $("#input_text").val();
    $("#wpm").text("0");
    $("#timer").text("0");
    $("#wordcount").text("0");
    $("#errors").text("0");
    timer = 0;
    current_string = letters.substring(index, index + character_length);
    $("#target").text(current_string);
  }

  function finished() {
    $("#idwpm").text(wpm);
    $("#idwc").text(wordcount);
    $("#iderr").text(errors);
    var el = document.getElementsByName("csrfmiddlewaretoken");
    csrf_value = el[0].getAttribute("value");
    nameUser = jQuery('input[name="name"]').val();

    $.ajax({
      type: "POST",
      url: ".",
      data: {
        name: nameUser,
        type_speed: wpm,
        csrfmiddlewaretoken: csrf_value,
        dataType: "json",
      },

      success: function (data) {
        $('#output').html(data.msg) /* response message */
      },

      failure: function () {
      }
    });

    document.getElementById("reset").click();
    $("#start_speedtest").toggle("slow");
    $("#result_page").toggle("slow");

  }

  var window_focus;

  $(window).focus(function () {
    window_focus = true;
  }).blur(function () {
    window_focus = false;
  });

  $(document).ready(function () {
    if (window_focus) {
      $("#focus").hide();
    }
    $(window).focus(function () {
      $("#focus").hide();
    });
  });
});