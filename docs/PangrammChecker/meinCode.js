/*jshint esversion: 6 */

/* This file is licensed under the terms of the BSD 3-Clause License. */


/**
 * Funktion liefert genau dann true zurück, wenn zeichenCode ein engl. Kleinbuchstabe ist.
 *
 * @param zeichenCode  UTF-16-Code für Zeichen
 *
 * @return true gdw. zeichenCode für Buchstabe a-z
 */
function istEnglBuchstaben(zeichenCode) {

    if (zeichenCode >= 97 && zeichenCode <= 122) {

        return true;

    } else {

        return false;
    }
}


/**
 * Funktion liefert genau dann true zurück, wenn zeichenCode ein Umlaut (Kleinbuchtsabe) ist.
 *  ä=228, ö=246, ü=252
 *
 * @param zeichenCode  UTF-16-Code für Zeichen
 *
 * @return true gdw. zeichenCode für Umlaut (ä,ö,ü)
 */
function istUmlaut(zeichenCode) {

    if (zeichenCode === 228 || zeichenCode === 246 || zeichenCode === 252) {

        return true;

    } else {

        return false;
    }
}


/**
 * Funktion liefert genau dann true zurück, wenn zeichenCode ein Eszett (ß)
 * enthält, nämlich den UTF-16-Code 223.
 *
 * @param zeichenCode  UTF-16-Code für Zeichen
 *
 * @return true gdw. zeichenCode für Eszett (ß)
 */
function istEszett(zeichenCode) {

    return zeichenCode === 223;
}


/**
 * Funktion mit eigentlichem Pangramm-Checker. Diese Funktion enthält keinen
 * jQuery- oder Bootstrap-spezifischen Code.
 *
 * @param satz  Auf Pangramm-Eigenschaft zu überprüfender Satz.
 *
 * @param alphabet  "en" (Englisch, a-z), "de_1" (Englisch+Umlaute), "de_2" (Englisch+Umlaute+Eszett)
 *
 * @return Objekt mit folgenden Attributen:
 *                zeichenAusserhalbAlphabet (String ohne Duplikate, nicht sortiert),
 *                fehlendeBuchstaben (String ohne Duplikate, sortiert),
 *                istPangramm=true|false (true gdw. fehlenderBuchstabe.length===0)
 */
function pangrammCheck(satz, alphabetCode) { "use strict";

    // Zwischen Groß- und Kleinbuchstaben soll nicht unterschieden werden.
    satz = satz.toLowerCase();

    let ergebnisObjekt = {};
    let zeichenAusserhalbAlphabet = "";

    let zaehlerVektor = new Array(253); // 252 ist höchste Code eines Zeichen in einem unterstützten Alphabet
    for (let i = 0; i < zaehlerVektor.length; i++) {

        zaehlerVektor[i] = 0;
    }

    const zeichenZumIgnorieren = " .,?!\"'";


    // Zeichen in Satz zählen

    for (let i = 0; i < satz.length; i++) {

        // "The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index."
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
        // Beispiele: a=97, z=122, ä=228, ö=246, ü=252, ß=223
        let zeichen     = satz.charAt(i);
        let zeichenCode = satz.charCodeAt(i);

		let zeichenIgnorieren = false;
        if (zeichenZumIgnorieren.indexOf(zeichen) > -1) { zeichenIgnorieren = true; }

		//console.log(`Zeichen "${satz.charAt(i)}" hat UTF16-Code ${zeichenCode} (ignorieren=${zeichenIgnorieren})`);
		console.log(`Zeichen "${satz.charAt(i)}" hat UTF16-Code ${zeichenCode} ${zeichenIgnorieren ? "(ignorieren)" : ""}`);

		if (zeichenIgnorieren) { continue; }


        switch (alphabetCode) {

            case "en":
                    if ( istEnglBuchstaben(zeichenCode) ) {
                        zaehlerVektor[zeichenCode]++;
                    } else {
                        if (zeichenAusserhalbAlphabet.indexOf(zeichen) === -1) {
                            zeichenAusserhalbAlphabet += zeichen;
                        }
                    }
                break;

            case "de_1":
                if ( istEnglBuchstaben(zeichenCode) || istUmlaut(zeichenCode) ) {
                    zaehlerVektor[zeichenCode]++;
                } else {
                    if (zeichenAusserhalbAlphabet.indexOf(zeichen) === -1) {
                        zeichenAusserhalbAlphabet += zeichen;
                    }
                }
                break;

            case "de_2":
                if ( istEnglBuchstaben(zeichenCode) || istUmlaut(zeichenCode) || istEszett(zeichenCode) ) {
                    zaehlerVektor[zeichenCode]++;
                } else {
                    if (zeichenAusserhalbAlphabet.indexOf(zeichen) === -1) {
                        zeichenAusserhalbAlphabet += zeichen;
                    }
                }
                break;

            default:
                alert(`Interner Fehler: Unerwarteter Alphabet-Code ${alphabetCode}.`);
                return;
        }
    } // for


    let fehlendeBuchstaben = "";


    // *** Prüfung auf Pangramm-Eigenschaft ***

    // Prüfung auf Buchstaben aus engl. Alphabet
    for (let zeichenCode = 97; zeichenCode <= 122; zeichenCode++ ) { // 97=a, 122=z
        if (zaehlerVektor[zeichenCode] === 0) {
            fehlendeBuchstaben += String.fromCharCode(zeichenCode);
        }
    }

    // Prüfung auf Umlaute (ä=228, ö=246, ü=252)
    if (alphabetCode === "de_1" || alphabetCode === "de_2") {

        if (zaehlerVektor[228] === 0) { fehlendeBuchstaben += "ä"; }
        if (zaehlerVektor[246] === 0) { fehlendeBuchstaben += "ö"; }
        if (zaehlerVektor[252] === 0) { fehlendeBuchstaben += "ü"; }
    }

    // Prüfung auf Eszett (ß=223)
    if (alphabetCode === "de_2") {

        if (zaehlerVektor[223] === 0) { fehlendeBuchstaben += "ß"; }
    }


    // *** Ergebnis-Attribute kopieren ***

    ergebnisObjekt.zeichenAusserhalbAlphabet = zeichenAusserhalbAlphabet;
    ergebnisObjekt.fehlendeBuchstaben        = fehlendeBuchstaben;

    if (fehlendeBuchstaben.length === 0) {
        ergebnisObjekt.istPangramm = true;
    } else {
        ergebnisObjekt.istPangramm = false;
    }

    return ergebnisObjekt;
}


/**
 * Event-Handler-Funktion für den Button "Satz überprüfen".
 */
function buttonEventHandler() { "use strict";

    let satz = $("#eingabeSatz").val().trim();

	if (satz.length === 0) {

        $("#dialogTitel"  ).text("Ungültige Eingabe");
        $("#dialogAbsatz1").text("Keinen Satz zum Überprüfen eingegeben.");

        $("#modalerDialog").modal("show");

		return; // Abbruch der Funktion
	}


    let alphabetCode = $("#alphabetAuswahl").val();


    // *** Eigentliche Überprüfung ***
    let ergebnisObjekt = pangrammCheck(satz, alphabetCode);


    // Ergebnis-Text für Dialog erstellen

    if (ergebnisObjekt.istPangramm) {
        $("#dialogAbsatz1").text("Der Satz ist ein Pangramm!");
        $("#dialogAbsatz2").text(`Anzahl Zeichen: ${satz.length}`);
    } else {
        $("#dialogAbsatz1").text("Der Satz ist leider KEIN Pangramm!");
        $("#dialogAbsatz2").text(`Es fehlen die folgenden Buchstaben: ${ergebnisObjekt.fehlendeBuchstaben}`);
    }

    if (ergebnisObjekt.zeichenAusserhalbAlphabet.length > 0) {
        $("#dialogAbsatz3").text(`Zeichen außerhalb des Alphabets: ${ergebnisObjekt.zeichenAusserhalbAlphabet}`);
    } else {
        $("#dialogAbsatz3").text("");
    }

    $("#dialogTitel").text("Ergebnis");

    $("#modalerDialog").modal("show");
}


/**
 * Diese Funktion darf erst dann aufgerufen werden, wenn die HTML-Seite geladen wurde.
 */
function onSeiteGeladen() { "use strict";

    $("#startButton").click( buttonEventHandler );

    console.log("Button-Event-Handler registriert.");
}


$(document).ready( onSeiteGeladen );
