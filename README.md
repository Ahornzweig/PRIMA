# PRIMA

## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | [Quest of the GirlHero]
|    | Name                  | Sarah Lönnqvist
|    | Matrikelnummer        | 259116
|  1 | Nutzerinteraktion     | Der Nutzer kann mit der Applikation interagieren. Mit welchen Mitteln und welchen Aktionen werden welche Reaktionen ausgelöst? Der Nutzer kann auf der Startseite auf New Game, Load Game und How to play klicken. New game führt ihn auf eine Seite, in der er seinen Namen eingeben und dann auf start klicken kann. Load Game gibt einem die auswahl, eines der level oder einen gespeicherten spielstand zu laden. auf der How to Play seite werden einem die steuerung und die regeln des spiels erklärt. Wärend des spiels kann man auf pause und speichern klicken um das spiel zu pausieren und falls man will zu speichern. man kann dann entweder weiter spielen oder aufhören. Im Spiel bewegt der Nutzer die figur über die  A und D Tasten. durch die bewegung der maus wird die richtung, in die der Stab zeigt geändert. mit einem Mausklick kann man dann einen angrif abfeuern. mit der 1 oder 2 taste kann man zuwischen zwei verschidenen Angriffen wechsel. Nach dem erfolgreichen beenden des letzten levels, kann der spieler das spiel durch den endscreen schließen. Stirbt der spieler, musser das spiel neu starten.                                                                                                                                         |
|  2 | Objektinteraktion     | Mit Hilfe von Kollisionsprüfung interagieren Objekte miteinander. Wann passiert dabei wie was? Der Hauptbestandtheil der Kollisionsüberprüfung ist die getRectWorld-Methode. Sie liefert ein Rechteck mit der Position und Größe eines Objektes. Über die Methode checkCollision kann überprüft werden, ob sich die Vektor2-Translation der Instanz in dem gelieferten Rechteck einer anderen Instanz befinden. checkCollison wird über die Update-Methode mancher Klassen aufgerufen. In checkCollision wird dann die getRectWorld-Mmethode einer bestimten Instanz, welche die Methode besitzt, aufgerufen. Update ist an den game Loop gebunden, der in main gesetzt wurde. jede Instanz von Girl überprüft die Floor instanzen.EnemyAttack instanzen überprüfen die Girl instanz und Attack die Enemy Instanzen                                                                                                                                                                              |
|  3 | Objektanzahl variabel | Eine variable Anzahl von Objekten wird zur Laufzeit generiert. Welche sind dies und wann und wie geschieht die Erzeugung? In der main funktion werden eine Kammera, der game-Node, der level-Node, der girl-Node und der viewport erstellt. Main wird aufgerufen, sobald das Laden der Leveldaten beendet wurde. Die Leveldaten werden geladen, sobald der Spieler auf Start oder eine Ladeoption im Startmenü klickt. Bei der Erstellung des Levelknotens wird eine weitere Funktion aufgerufen, die das level baut(buildLevel). In der Funktion werden der backgrounds-, natures-, enemies- und tiles-Knoten erstellt. In backgrounds sind alle background:Object Knoten, in natures alle nature:Object Knoten, in enemies alle enemy:Enemy Knoten und in tiles alle floor:Floor Knoten. Die Anzahle dieser Objekte ist von der levelData-Datei abhängig. Diese Objekte werden auch in der buildLevel-Funktion erstellt, sowie energyBall:Attack und waterArrow:Attack. Die Enemy Instanzen generieren jewils eine EnemyAttack Instanz welche eine verbindung zu dem jeweiligen enemy hat. Zur Laufzeit werdird nur die translation der einzelnen Instanzen (von Object, Floor, Enemy, Attack, EnemyAttack) verändert, um nicht dauernd neue erstellen zu müssen und so performance probleme zu minimieren.                                                                                                                                                       |
|  4 | Szenenhierarchie      | Die Szenenhierarchie ist sinnvoll aufgebaut. Wer ist wessen Parent, wie sind Elemente in anderen gruppiert und warum? Der oberste Knoten ist das game, dann folgt das Level. In dem Level befinden sich girl:Girl(der Spieler Charakter), backgrounds, natures, enemies, tiles und die Attacken (energyBall:Attack, waterArrow:Attack). Backgrounds beinhaltet alle erstellten background:Object Knoten, natures beinhaltet alle erstellten nature:Object Knoten, enemies beinhaltet alle erstellten enemy:Enemy Knoten und tiles beinhaltet alle erstellten floor:Floor Knoten. Jede Enemy Instanz generiert dann noch eine instanz von EnemyAttack die dem level angehangen wird.                                                                                                            |
|  5 | Sound                 | Während des gesamten Spiels läuft eine Hintergrundmusik, die die Atmosphäre unterstützen soll. Ein Explosions- und ein Splash-Sound sollen des Treffen einer Attacke verdeutlichen. Das Springen wird durch ein Jump-Geräusch verdeutlicht.   
|  6 | GUI                   | Ein grafisches Interface gibt dem Nutzer die Möglichkeit, Einstellungen beim Programmstart oder während des Programmlaufs vorzunehmen. Was kann er dort tun? Der Nutzer kann vor dem Start des Spiels auswählen, ob er neu beginnen, ein Level oder einen Spielstand laden will. Zusätzlich besteht die Möglichkeit sich die Steuerung anzuschauen. Wird ein neues Spiel gestartet, kann der Nutzer seine gewünschten Namen eingeben. Während des Spiels kann man jederzeit speichern. Auch kann der Spieler über das Interface immer sehen, welche Attacke er ausgewählt hat und wie viele Lebenspunkte er noch hat. |
|  7 | Externe Daten         | Spielparameter sind extern in einer Datei veränderbar, so dass das Spiel nur neu gestartet, aber nicht neu kompiliert werden muss. Welche Parameter sind dies und was sind die Auswirkungen? In gameData.json sind die Anzahl der Level, sowie ihr Aufbau beschrieben. Dazu gehören der Name des Levels, welcher beim ersten Laden des Spiels für den Levelknoten festgelegt wird, der Index des nächsten Levels, er ermöglicht den Übergang zum nächsten Level (und kann somit auch die Reihenfolge ändern). Die Anfangsposition der Kamera und des Spielecharakters sind auch im jeweiligen level gespeichert. Die Parameter für den Aufbau des Levels sind ground,enemys(falsch geschrieben), nature und background. Ground beinhaltet die Parameter Transform, mit der Skallierung und Position aller Boden(floor)-Knoten, sowie einen Index für die Transformwerte der zu Beginn zu plazierenden Bodenknoten. Enemys enthält ein Array mit allen Gegnern. Jeder Gegner hat einen Namen, der bei der Erstellung des Knotens gesetzt wird. spritsheetData enthält die Informationen die zum Erstellen der Sprites nötige sind. positions enthält alle Gegnerpositionen, scale die Skallierung und speed die Geschwindigkeit des Gegners. Alle werden bei der Erstellung des jeweiligen Levels verwendet. Nature ist genau wie enemys aufgebaut nur dass es keine Geschwindigkeit gibt. Background ist auch so aufgebaut, hier kommen jedoch noch Z für die Positionierung auf der z-Achse und eine id für das Hintergrundbild hinzu.   
|  8 | Verhaltensklassen     | Das Verhalten von Objekten ist in den Methoden von Klassen definiert, die in externen Dateien abgelegt sind. Welche Klassen sind dies und welches Verhalten wird dort beschrieben? Es gibt die Klassen Objects, MovingObject und Floor. Objects wird für Objekte genutzt, die sich nicht selbst bewegen und nur einen (Starren) Sprite Nutzen. Sie haben eine Update-Methode, die an den game loop gebunden ist. Darin wird überprüft, ob die Instanz verschoben werden muss(da sie außer sichtweite ist). Stimmt das zu, wird sie über moveObject verschoben. Über die Methode generateSprites kann man einer Instanz einen Sprite zuweisen. MovingObject besitzt die Methoden show und act. Über show kann man einen bestimmten sprite aktivieren. Mit act wird überprüft, welche Aktion gerade verwendet wird und daraufhin das Verhalten der Instanz angepasst(z.B. beim springen die y geschwindigkeit hochsetzen).  Floor ist die aus dem Kurs bekannte Klasse, die etwas erweitert wurde. Sie besitzt die Methoden getRectWorld moveFloor und update. update und moveFloor funktionieren wie in Object. getRectWorld gibt ein Rechteck mit der Position und Größe der Instanz zurück.                                                                                    |
|  9 | Subklassen            | Es existiert eine Klassenhierarchie, einige Objekte sind Instanzen von einer oder mehreren abgeleiteten Subklassen mit gegenüber den anderen Objekten speziellem Verhalten und besonderen Eigenschaften. Welche Klassen sind dies und welches Verhalten wird dort beschrieben? MovingObject hat vier Subklassen: Girl, Enemy, Attack und EnemyAttack. |
| 10 | Maße & Positionen     | Maße, Skala und Positionen sind gut durchdacht. Wie groß sind Spielfiguren, wie ist die Welt angeordnet bezogen auf den Ursprung, wie sind Spielelemente bezogen auf ihre lokalen Koordinatensysteme definiert? Die Spielfigur ist 1 groß und die Gegner auf 0.5 skalliert. Die Welt wird vom Ursprung aus aufgebaut. Die positive x-Richtung ist rechts und die Negative linke. Die Positive y richtung ist oben. Der Boden wird über die Oberkannte plaziert und alle anderen Objekte über die Unterkannte, sodass wenn die Spielerfigur und der Boden beide auf y = 0 gesetzt sind, die Figur auf dem Noden steht.                                                              |
| 11 | Event-System          | Das Event-System wird verwendet. Wer sendet wem Informationen oder Methodenaufrufe und wofür? Das Evemt-Systhem wird verwendet um das Drücken von Buttons oder den Klick der Maus abzugreifen. Durch das keydown-event wird handleKeyboard und handleAttack aufgerufen. keyup ruft handleKeyboard auf. Mousemove ruft armMovement und click ruft attack auf. zusätzlich wird auf den Loop noch ein eventlistener gesetzt, der pro Frame update aufruft. Weitere cklick events sind auf den Buttons des User-Interfaces, welche Elemente ein- und ausblenden.                                                                                                                                                                                |

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung
