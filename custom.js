$(function() {
  var range = {
    start: moment(new Date().setDate(new Date().getDate() - beforeDay)).format('YYYY-MM-DD'),
    end: moment(new Date().setDate(new Date().getDate() + afterDay + 1)).format('YYYY-MM-DD')
  };
  var lastUpdate;

  setInterval(function() {
    // Check connectivity to Google calendars APIs
    var key = googleApiKey;
    var account = events[0]['googleCalendarId'];
    $.ajax({
      url : 'https://www.googleapis.com/calendar/v3/calendars/' + account + '/events',
      type : 'GET',
      data : 'key=' + key,
      timeout: 3000,
      success : function(result) {
        lastUpdate = new Date();
        $('#info').hide();
        $('#info').html('');
        //Update events on calendars
        $('#calendar').fullCalendar('refetchEvents');
      },
      error : function(error) {
        var date = lastUpdate.getDate() + "." + (lastUpdate.getMonth() + 1) + "." + lastUpdate.getFullYear();
        var time = lastUpdate.getHours() + ":" + lastUpdate.getMinutes();
        $('#info').show();
        $('#info').html('Dernière actualisation ' + date + ' ' + time);
      }
    });

    // Update range of visibility
    var newRange = {
      start: moment(new Date().setDate(new Date().getDate() - beforeDay)).format('YYYY-MM-DD'),
      end: moment(new Date().setDate(new Date().getDate() + afterDay + 1)).format('YYYY-MM-DD')
    };

    if(!(JSON.stringify(range) === JSON.stringify(newRange))) {
      range = newRange;
      $('#calendar').fullCalendar('option', 'visibleRange', range);
    }
  }, 5 * 1000);

  $('#calendar').fullCalendar({
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',

    height: 'auto',
    themeSystem: 'bootstrap4',
    header: false,
    weekNumbers: false,

    defaultView: 'agenda',
    visibleRange: range,
    allDaySlot: false,
    minTime: "08:00:00",
    maxTime: "23:00:00",
    nowIndicator: true,
    displayEventTime: false,
    slotLabelFormat: 'H:mm',

    selectable: true,
    selectHelper: true,
    editable: false,

    googleCalendarApiKey: googleApiKey,
    eventSources: events
  });

  lastUpdate = new Date();
});
