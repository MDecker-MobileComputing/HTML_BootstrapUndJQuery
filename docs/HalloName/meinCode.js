/* This file is licensed under the terms of the BSD 3-Clause License. */

/*
 * Event-Handler für Button "Begrüße mich!"
 */
function begruessenButtonEventHandler() { "use strict";
        
    // Aktuellen Inhalt von <input> auslesen und ggf. Leerzeichen am Anfang/Ende entfernen
    var name = $("#eingabeName").val().trim();

    if (name.length === 0) {

        $("#begruessungsAlert").hide();

        $("#fehlertext" ).text("Bitte Name eingeben!");
        $("#fehlerToast").toast("show");
        
    } else {

        $("#fehlerToast"      ).toast("hide");

        $("#begruessungstext" ).text("Hallo " + name + "!");
        $("#begruessungsAlert").show();
    }
}


/*
 * Event-Handler für Button "Zurücksetzen".
 */
function zuruecksetzenButtonEventHandler() {  "use strict";

    $("#eingabeName").val(""); // <input>-Element leeren
    
    $("#begruessungsAlert").hide();
    $("#fehlerToast"      ).toast("hide");
}


/**
 * Diese Funktion darf erst dann aufgerufen werden, wenn die HTML-Seite geladen wurde.
 */
function onSeiteGeladen() { "use strict";

    $("#begruessenButton"   ).click( begruessenButtonEventHandler    );
    $("#zuruecksetzenButton").click( zuruecksetzenButtonEventHandler );

    console.log("Button-Event-Handler registriert.");
}


$(document).ready( onSeiteGeladen ); 
