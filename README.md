# PRIMA

## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | [Quest of the GirlHero]
|    | Name                  | Sarah Lönnqvist
|    | Matrikelnummer        | 259116
|  1 | Nutzerinteraktion     | Der Nutzer kann mit der Applikation interagieren. Mit welchen Mitteln und welchen Aktionen werden welche Reaktionen ausgelöst?                                                                                                                                                 |
|  2 | Objektinteraktion     | Mit Hilfe von Kollisionsprüfung interagieren Objekte miteinander. Wann passiert dabei wie was?                                                                                                                                                                                 |
|  3 | Objektanzahl variabel | Eine variable Anzahl von Objekten wird zur Laufzeit generiert. Welche sind dies und wann und wie geschieht die Erzeugung?                                                                                                                                                      |
|  4 | Szenenhierarchie      | Die Szenenhierarchie ist sinnvoll aufgebaut. Wer ist wessen Parent, wie sind Elemente in anderen gruppiert und warum? 
Der Oberst Knoten, ist das game, dann folgt das Level. In dem Level befinden sich girl:Girl(der Spieler Charakter), backgrounds, natures, enemies, tiles und die Attacken (energyBall:Attack, waterArrow:Attack). Backgrounds beinhaltet alle erstellten background:Object Knoten, natures beinhaltet alle erstellten nature:Object Knoten, enemies beinhaltet alle erstellten enemy:Enemy Knoten und tiles beinhaltet alle erstellten floor:Floor Knoten                                                                                                            |
|  5 | Sound                 | Sounds sind eingebunden und unterstützen oder ermöglichen die Wahrnehmung der Aktionen. Welche Ereignisse werden durch Geräusche akustisch unterstützt, und durch welche Geräuschkulisse oder Musik die Atmosphäre?                                                            |
|  6 | GUI                   | Ein grafisches Interface gibt dem Nutzer die Möglichkeit, Einstellungen beim Programmstart oder während des Programmlaufs vorzunehmen. Was kann er dort tun?  
Der Nutzer kann vor dem Start des Spiels auswählen, ob er neu beginnen, ein Level oder einen Spielstand laden will. Zusätzlich besteht die Möglichkeit sich die Steuerung anzuschauen. Wird ein neues Spiel gestartet, kann der Nutzer seine gewünschten Namen eingeben. Während des Spiels kann man jederzeit speichern. Auch kann der Spieler über das interface immer sehen, welche Attacke er ausgewählt hat und wie viele HP er noch hat. |
|  7 | Externe Daten         | Spielparameter sind extern in einer Datei veränderbar, so dass das Spiel nur neu gestartet, aber nicht neu kompiliert werden muss. Welche Parameter sind dies und was sind die Auswirkungen?                                                                                   |
|  8 | Verhaltensklassen     | Das Verhalten von Objekten ist in den Methoden von Klassen definiert, die in externen Dateien abgelegt sind. Welche Klassen sind dies und welches Verhalten wird dort beschrieben?                                                                                             |
|  9 | Subklassen            | Es existiert eine Klassenhierarchie, einige Objekte sind Instanzen von einer oder mehreren abgeleiteten Subklassen mit gegenüber den anderen Objekten speziellem Verhalten und besonderen Eigenschaften. Welche Klassen sind dies und welches Verhalten wird dort beschrieben? |
| 10 | Maße & Positionen     | Maße, Skala und Positionen sind gut durchdacht. Wie groß sind Spielfiguren, wie ist die Welt angeordnet bezogen auf den Ursprung, wie sind Spielelemente bezogen auf ihre lokalen Koordinatensysteme definiert?                                                                |
| 11 | Event-System          | Das Event-System wird verwendet. Wer sendet wem Informationen oder Methodenaufrufe und wofür?                                                                                                                                                                                  |

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung
