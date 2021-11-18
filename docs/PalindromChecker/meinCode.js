/*jshint esversion: 6 */

/* This file is licensed under the terms of the BSD 3-Clause License. */


/**
 * Funktion liefert genau dann true zurück, wenn zeichenkette ein Palindrom ist.
 *
 * @param zeichenkette  Zeichenketten, die auf Palindom-Eigenschaft zu überprüfen ist.
 *                      Vor der Überprüfung werden ggf. vorhandene Leerzeichen am Anfang und
 *                      Ende entfernt und alle Buchstaben in Kleinbuchstaben umgewandelt.
 *
 * @return true gdw. zeichenkette ein Palindrom ist
 */
function checkPalindrom(zeichenkette) { "use strict";

    let zeichenketteNormalisiert = zeichenkette.trim().toLowerCase();

    let laenge = zeichenketteNormalisiert.length;

    // Bei ungerader Länge der Zeichenkette (z.B. "Regal") muss der Buchstabe in der Mitte
    // ("g" für "Regal") nicht überprüft werden, deshalb Nachkommastellen abschneiden.
    let anzahlChecks = Math.floor( laenge/2 );

    for (let i = 0; i < anzahlChecks; i++) {

        let index1 = i;
        let index2 = laenge - i - 1;

        let a = zeichenketteNormalisiert.charAt( index1 );
        let b = zeichenketteNormalisiert.charAt( index2 );

        if (a !== b) { return false; }
    }

    return true;
}



/**
 * Event-Handler-Funktion für den Button "Überprüfen".
 */
function buttonEventHandler() { "use strict";

    let kandidatString = $("#kandidatString").val().trim();

    if (kandidatString.length < 2) {

        alert("Bitte mindestens zwei Buchstaben eingeben.");
        return;
    }

    let istPalindrom = checkPalindrom(kandidatString);

    if (istPalindrom) {

        alert(`Das Wort "${kandidatString}" ist ein Palindrom.`);

    } else {

        alert(`Das Wort "${kandidatString}" ist KEIN Palindrom.`);
    }
}


/**
 * Diese Funktion darf erst dann aufgerufen werden, wenn die HTML-Seite geladen wurde.
 */
function onSeiteGeladen() { "use strict";

    $("#button-ueberpruefen").click( buttonEventHandler );

    console.log("Button-Event-Handler wurde registriert.");
}


$(document).ready( onSeiteGeladen );
