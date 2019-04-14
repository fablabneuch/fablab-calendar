$(function() {
  var range = {
    start: moment(new Date().setDate(new Date().getDate() - beforeDay)).format('YYYY-MM-DD'),
    end: moment(new Date().setDate(new Date().getDate() + afterDay + 1)).format('YYYY-MM-DD')
  };

  function update() {
    $('#calendar').fullCalendar('refetchEvents');

    var newRange = {
      start: moment(new Date().setDate(new Date().getDate() - beforeDay)).format('YYYY-MM-DD'),
      end: moment(new Date().setDate(new Date().getDate() + afterDay + 1)).format('YYYY-MM-DD')
    };

    if(!(JSON.stringify(range) === JSON.stringify(newRange))) {
      range = newRange;
      $('#calendar').fullCalendar('option', 'visible', range);
    }
  }

  setInterval(function() {
    update();
  }, 5 * 60 * 1000);

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
  })
});
