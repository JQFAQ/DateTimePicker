DateTimePicker
==============
As the name implies, the DateTimePicker provides an easy way to edit the date and the time portion of a “Date” instance.

The DateTimePicker is built by putting together the jQuery UI datetimepicker plugin and a custom TimeSpinner plugin that we built to edit the time portion.

This resultant widget has a very professional look with support for themes and everything else you would expect from a jQuery UI widget.

Please check the Example of <a href="http://jqfaq.com/how-to-use-datetimepicker-widget/" >how to use the DateTimePicker widget with a live demo.</a>

<strong>Getting Started</strong>


Add an input element to your html which is what will be extended as a date time picker.

<input type="text" id="DateTimePicker" />

Extend the above input to behave as a date time picker, as follows:

$(document).ready(function() { $('# DateTimePicker’).DateTimePicker(); });

<strong>Format Option</strong>

The dateformat option allows you to change the format in which the date should be displayed.

$('# DateTimePicker’).datetimepicker({ dateformat: 'dd-mm-yy' });

<strong>Getting and setting Date</strong>

This is how you would get and set Date values to the widget.

<strong>	To getDate:</strong>

   This returns the currently selected Date value from the widget.             
     $('# DateTimePicker’)..DateTimePicker("GetDate");             

<strong>	To setDate:</strong>

The setDate allows you to set a date on the widget.            
    $("# DateTimePicker").DateTimePicker("setDate", new Date(date));
    

<strong>Sponsored By</strong> <a href="http://jqfaq.com/"><b>JQFAQ.com</b></a> 
