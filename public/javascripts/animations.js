$(document).ready(function() {
// relative link animations
///////////////////////////

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

///scroll jump

  $(function() {
    $('textarea').each(function() {
        $(this).height($(this).prop('scrollHeight'));
    });
});

var internalPosterMessage;

  $("#make-my-poster").click(function()
     {
        internalPosterMessage = $('#poster-text')[0].value;// get value
        internalPosterLocation = $('#Location')[0].value;// get value

        var $textresults = $('#poster-text')[0].value;
        var $posterDivText = $('#poster-generated-phrase');
        var $posterDivTextHidden = $('#poster-text-hidden');

        var $locationresults = $('#Location')[0].value;
        var $posterDivLocation = $('#poster-generated-location');
        var $posterDivLocationHidden = $('#location-hidden');

        var messagetransfer = $textresults;
        var locationtransfer = $locationresults;


        $posterDivText.empty().append("I stand with Grenfell because ",$textresults);
        $posterDivTextHidden.empty().append("I stand with Grenfell because ",$textresults);
        $posterDivLocation.empty().append("From ",$locationresults);
        $posterDivLocationHidden.empty().append($locationresults);

     });


$('#submit-button').click(function() {
    e.preventDefault();
    $.ajax({
        global: false,
        type: 'POST',
        url: '/#section-gallery',
        dataType: 'html',
        data: {
            Message: $("#poster-text-hidden").val(),
            Location: $("#location-hidden").val(),
        },
        success: function (result) {
            console.log('ajax running',result);
        },
        error: function (request, status, error) {
            serviceError();
        }
    });
});

function CancelEvent() {
    var e = window.event;
    //e.cancelBubble is supported by IE
    e.cancelBubble = true;
    e.returnValue = false;
    //e.stopPropagation works only in Firefox.
    if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
    }
}

//Disable the click event of form
$(document).keypress(function (e) {
    //Check which key is pressed on the document or window
    if (e.which == 13) {
        // if it is 13 that means enter key pressed, then call the function to cancel the event
        CancelEvent();
    }
});



$('#button-fb').click( function()
{
    var shareurl = $(this).data('shareurl');
    window.open("https://www.facebook.com/sharer/sharer.php?u=http%3A//www.istandwithgrenfell.co.uk", '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
    return false;
});


$('#poster_list_item:nth-child(even) h1').replaceWith(function() {
  return '<h3>' + $(this).text() + '</h3>';
});

$('#poster_list_item:nth-child(even) h2').replaceWith(function() {
  return '<h4>' + $(this).text() + '</h4>';
});

});
