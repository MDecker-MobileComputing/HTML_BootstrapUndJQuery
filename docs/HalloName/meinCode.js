/* This file is licensed under the terms of the BSD 3-Clause License. */

/*
 * Event-Handler für Button "Tu es!"
 *
 * JavaScript-Methoden von Bootstrap-Toast: https://getbootstrap.com/docs/4.4/components/toasts/#methods
 */
function buttonEventHandler() { "use strict";

    // Sicherstellen, dass Toast-Objekt nicht angezeigt wird.
    $(".toast").toast("dispose");


    // Aktuellen Inhalt von <input> auslesen und ggf. Leerzeichen am Anfang/Ende entfernen
    var name = $("#eingabeName").val().trim();

    if (name.length === 0) {

        $(".toast-body").text("Bitte Name eingeben!");

    } else {

        $(".toast-body").text("Hallo " + name + "!");
    }

    $(".toast").toast("show");
}


/**
 * Diese Funktion darf erst dann aufgerufen werden, wenn die HTML-Seite geladen wurde.
 */
function onSeiteGeladen() { "use strict";

    $("#derButton").click( buttonEventHandler );
    console.log("Button-Event-Handler registriert.");
}


$(document).ready( onSeiteGeladen ); 
