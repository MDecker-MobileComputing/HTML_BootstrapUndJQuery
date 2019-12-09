/* This file is licensed under the terms of the BSD 3-Clause License. */

/*
 * Funktion zum eigentlichen Erzeugen des zufälligen Passworts.
 * Das erzeugte Passwort wird als String zurückgegeben.
 * Diese Funktion enthält keinen jQuery-spezifischen Code.
 *
 * @param zeichenVorrat  String mit den Zeichen, die für das Passwort zur Verfügung stehen,
 *                       z.B. "abcde...0123456789" -- jedes Zeichen darf nur einmal auftauchen!
 *
 * @param laenge  Anzahl Zeichen, die das erzeugte Passwort haben soll.
 */
function passwortErzeugen(zeichenVorrat, laenge) { "use strict";

    const anzZeichen = zeichenVorrat.length;

    let passwortString = "";
    for (let i = 1; i <= laenge; i++) {

        // Zufälliges Zeichen aus dem String "zeichenVorrat" auswählen
        let zufallsIndex   = Math.floor(Math.random() * anzZeichen);
        let zufallsZeichen = zeichenVorrat.charAt(zufallsIndex);

        passwortString += zufallsZeichen;
    }

    return passwortString;
}


/**
 * Event-Handler-Funktion für den Button "Erzeuge Passwort".
 */
function passwortErzeugenEventHandler() { "use strict";

    var zeichenVorrat = "";
    if ( $("#buchstaben").prop("checked") === true ) {

        zeichenVorrat = "ABCDEFGHJKLMNPQRSTVXYZ";

    } else if ( $("#buchstabenZiffern").prop("checked") === true ) {

        zeichenVorrat = "ABCDEFGHJKLMNPQRSTVXYZ123456789"; // Keine "0" (Null) wegen Verwechselungsgefahr mit Buchstabe "O"

    } else {

        zeichenVorrat = "ABCDEFGHJKLMNPQRSTVXYZ123456789+-*/=?!.,=:§$%&()[]";
    }

    var laenge = $( "#selectPasswortLaenge" ).val();

    var passwort = passwortErzeugen(zeichenVorrat, laenge);
    $("#passwortAusgabe").val(passwort);
}


/**
 * Diese Funktion darf erst dann aufgerufen werden, wenn die HTML-Seite geladen wurde.
 */
function onSeiteGeladen() { "use strict";

    $("#erzeugenButton").click( passwortErzeugenEventHandler );

    console.log("Button-Event-Handler registriert.");
}


$(document).ready( onSeiteGeladen );
