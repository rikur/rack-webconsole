jQuery('#rack-webconsole form').submit(function(e){
  e.preventDefault();
});

jQuery("#rack-webconsole form input").keyup(function(event) {
  function escapeHTML(string) {
    return(string.replace(/&/g,'&amp;').
      replace(/>/g,'&gt;').
      replace(/</g,'&lt;').
      replace(/"/g,'&quot;')
    );
  };

  if (event.which == 13) {
    /*jQuery.post('/webconsole', jQuery("#rack-webconsole form").serialize());*/
    var query = jQuery("#query").val();
    jQuery.ajax({
      url: '/webconsole',
      type: 'POST',
      dataType: 'json',
      data: ({query: query, token: "TOKEN"}),
      success: function (data) {
        var q = "<div class='query'>" + escapeHTML(">> " + query) + "</div>";
        var r = "<div class='result'>" + escapeHTML("=> " + data.result) + "</div>";
        jQuery("#rack-webconsole .results").append(q + r);
        jQuery("#rack-webconsole .results_wrapper").scrollTop(
          jQuery("#rack-webconsole .results").height()
        );
        jQuery("#query").val('');
      }
    });
  }
});

jQuery(document).ready(function() {
  jQuery("#rack-webconsole").hide();
  jQuery(this).keypress(function(event) {
    if (event.which == 96) {
      jQuery("#rack-webconsole").slideToggle('fast', function() {
        if (jQuery(this).is(':visible')) {
          jQuery("#rack-webconsole form input").focus();
          jQuery("#rack-webconsole .results_wrapper").scrollTop(
            jQuery("#rack-webconsole .results").height()
          );
        } else {
          jQuery("#rack-webconsole form input").blur();
        }
      });
      event.preventDefault();
    }
  });
});

