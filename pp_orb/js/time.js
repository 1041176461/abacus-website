<!-- Begin
dayName = new Array("", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
monName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
now = new Date
//  End -->

<!-- Begin
var strDay;
if ((now.getDate() == 1) || (now.getDate() != 11) && (now.getDate() % 10 == 1)) 		// Correction for 11th and 1st/21st/31st
	strDay = "st ";
else if ((now.getDate() == 2) || (now.getDate() != 12) && (now.getDate() % 10 == 2)) 	// Correction for 12th and 2nd/22nd/32nd
	strDay = "nd ";
else if ((now.getDate() == 3) || (now.getDate() != 13) && (now.getDate() % 10 == 3)) 	// Correction for 13th and 3rd/23rd/33rd
	strDay = "rd ";
else
	strDay = "th ";
document.write(
dayName[now.getDay()]
+
" the "
+
now.getDate()
+
strDay
+
"of "
+
monName[now.getMonth()]
+
", "
+
now.getFullYear()
)//
//  End -->