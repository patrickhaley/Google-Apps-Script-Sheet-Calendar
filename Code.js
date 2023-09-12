/** https://github.com/patrickhaley/Google-Apps-Script-Sheet-Calendar */

function scheduleTasks() {
  /** Task 1: Open the event calendar to be used */
  var spreadsheet = SpreadsheetApp.getActiveSheet();
  var calendarId = spreadsheet.getRange("C4").getValue();
  var eventCal = CalendarApp.getCalendarById(calendarId);

  /** Step 2: Select data from the Google Sheet */
  var tasks = spreadsheet.getRange("A8:C12").getValues();

  /**
    [08AM, 12PM, Joanna]
    [10AM, 02PM, Kelsey]
    [12PM, 03PM, Jaimie]
    [04PM, 06PM, Danielle]
   */

  /** Step 3: Create events */
  for (x = 0; x < tasks.length; x++) {
    var task = tasks[x];

    var startTime = task[0];
    var endTime = task[1];
    var summary = task[2];
    // var description = "https://docs.google.com/spreadsheets/d/1ZqrmKHeVPRFgEkxSWhnL6920dytco1BBswasgp85CPk/"
    eventCal.createEvent(summary, startTime, endTime);
  }
}

/** Step 4: Create a menu button to sync the calendar */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Sync to Calendar")
    .addItem("Add tasks now", scheduleTasks)
    .addToUi();
}