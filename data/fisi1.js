// Teil 1: Konzeption und Administration von IT-Systemen
// Karten in eigenen Worten, Themen aus den AP2-Prüfungen (PO 2020) + aktuelle Themen W25/26 & S26
(window.CARDS = window.CARDS || []).push(...[

// ---------- Virtualisierung & Container ----------
["fisi1","Virtualisierung","S25,S22","Unterschied Hypervisor Typ 1 und Typ 2 – mit Einsatz und Produktbeispiel.",
`<table><tr><th></th><th>Typ 1 (bare metal / nativ)</th><th>Typ 2 (gehostet)</th></tr>
<tr><td>Prinzip</td><td>läuft direkt auf der Hardware, direkter Zugriff auf Ressourcen</td><td>läuft als Anwendung auf einem installierten Host-OS</td></tr>
<tr><td>Einsatz</td><td>Server/Rechenzentrum</td><td>Arbeitsplatz, Test & Entwicklung</td></tr>
<tr><td>Produkte</td><td>VMware ESXi/vSphere, Hyper-V, KVM, Xen, Proxmox</td><td>VirtualBox, VMware Workstation, Parallels</td></tr></table>`],
["fisi1","Virtualisierung","S25","Nenne je zwei Vor- und Nachteile von Servervirtualisierung.",
`<b>Vorteile:</b> bessere Ressourcenauslastung, weniger Energie/Platz, schnelle Bereitstellung neuer Server, Snapshots/schnelles Backup & Restore, Isolation von Anwendungen, Altsysteme weiter betreibbar, Live-Migration.<br><b>Nachteile:</b> leistungsstarke (zertifizierte) Hardware nötig, Host = Single Point of Failure, Leistungseinbußen durch geteilte Ressourcen, höhere Komplexität, Lizenzkosten, Side-Channel-Angriffe zwischen VMs.`],
["fisi1","Virtualisierung","W23","Was ist ein Hypervisor?",
`Softwareschicht zwischen Hardware (bzw. Host-OS) und den virtuellen Maschinen. Er <b>abstrahiert die Hardware</b>, teilt CPU, RAM, Storage und Netzwerk zu und gaukelt jeder VM eine eigene physische Maschine vor.`],
["fisi1","Virtualisierung","W23","Containerisierung vs. Virtualisierung – was ist der Unterschied?",
`<b>VM:</b> virtualisiert eine komplette Maschine inkl. eigenem Gast-Betriebssystem.<br><b>Container</b> (z. B. Docker): virtualisiert nur die <b>Anwendung</b>; alle Container teilen sich den Kernel des Host-OS und bringen nur ihre Bibliotheken/Abhängigkeiten mit.<br>→ Container sind schlanker, starten in Sekunden, sind portabel; aber schwächere Isolation, gleiches Kernel-OS nötig.`],
["fisi1","Virtualisierung","W23","Welche Voraussetzungen müssen Hosts für einen Virtualisierungs-Cluster (z. B. für Live-Migration/HA) erfüllen?",
`<ul><li>identische bzw. zertifizierte, kompatible Hardware (v. a. gleiche CPU-Familie)</li><li>gleicher Firmware-/BIOS-Stand</li><li>gleiche Hypervisor-Version & Konfiguration</li><li><b>gemeinsamer Speicher</b> (SAN/NAS)</li><li>gemeinsame Netzwerke/VLANs, eigenes Netz für Migration/Heartbeat</li></ul>`],
["fisi1","Virtualisierung","Basis","Ist ein VM-Snapshot ein Backup?",
`<b>Nein.</b> Ein Snapshot speichert nur den Zustand/die Änderungen seit dem Zeitpunkt und liegt auf demselben Storage wie die VM. Fällt der Storage aus, ist auch der Snapshot weg. Snapshots sind gut für kurzfristiges Zurückrollen (z. B. vor Updates), ersetzen aber keine Datensicherung auf separatem Medium.`],
["fisi1","Virtualisierung","W25","Ein Server soll als Datenbankserver, ein anderer als Virtualisierungshost eingesetzt werden. Worauf achtest du bei der Auswahl?",
`<b>Virtualisierungshost:</b> viele CPU-Kerne, sehr viel RAM (größter Engpass), Virtualisierungsunterstützung (VT-x/AMD-V), schnelle/redundante Netzwerkanbindung (10 GbE+), Zugriff auf Shared Storage.<br><b>Datenbankserver:</b> hohe Single-Thread-Leistung, viel RAM für Caching, <b>schneller Storage mit hohen IOPS/geringer Latenz</b> (SSD/NVMe, RAID 10), ECC-RAM.<br>Immer begründen: Anforderung → passendes Merkmal.`],

// ---------- Cloud ----------
["fisi1","Cloud","W21,W24,S24","Erkläre IaaS, PaaS und SaaS mit Beispiel.",
`<ul><li><b>IaaS</b> – Infrastruktur (VMs, Speicher, Netz) wird gemietet; Kunde verwaltet OS & Anwendungen. Bsp.: AWS EC2, Azure VMs.</li><li><b>PaaS</b> – Plattform/Laufzeitumgebung zum Entwickeln & Betreiben eigener Anwendungen; Anbieter verwaltet OS. Bsp.: Azure App Service, Google App Engine.</li><li><b>SaaS</b> – fertige Software über das Internet (Abo); Anbieter kümmert sich um alles. Bsp.: Microsoft 365, Salesforce.</li></ul>`],
["fisi1","Cloud","W21","Public, Private, Hybrid und Community Cloud – kurz erklärt.",
`<b>Public:</b> Ressourcen eines Anbieters werden von vielen Kunden über das Internet geteilt.<br><b>Private:</b> exklusiv für ein Unternehmen (on-prem oder gehostet) – mehr Kontrolle/Datenschutz.<br><b>Hybrid:</b> Kombination aus Private und Public (z. B. sensible Daten intern, Lastspitzen in der Public Cloud).<br><b>Community:</b> von mehreren Organisationen mit gleichen Anforderungen gemeinsam genutzt.`],
["fisi1","Cloud","W24,S24,W21","Vorteile einer Cloud-Lösung gegenüber eigenem Rechenzentrum?",
`Schnelle & flexible <b>Skalierbarkeit</b>, geringe Investitionskosten (OPEX statt CAPEX), <b>nutzungsabhängige Abrechnung</b> (pay per use), Zugriff von überall, keine eigene Hardware-/Update-Verantwortung, Backup/Georedundanz als Service, schnelle Bereitstellung.`],
["fisi1","Cloud","W24,S24,W22","Nachteile/Risiken der Cloud – was muss man bei der Entscheidung beachten?",
`Abhängigkeit vom Anbieter (<b>Vendor-Lock-in</b>), Internetanbindung als Engpass/SPOF, Latenz, Datenschutz (DSGVO, Serverstandort EU, AV-Vertrag), Sicherheitsrisiken, laufende Kosten können steigen, Abrechnungsmodell, SLA (Verfügbarkeit, Reaktionszeiten), vertragliche Einschränkungen, Datenhoheit.`],
["fisi1","Cloud","S24","Nach welchen Kriterien wählst du einen Cloud-Provider aus?",
`Skalierbarkeit/Flexibilität, Abrechnungsmodelle, Sicherheit & Compliance (z. B. ISO 27001, BSI C5), Serverstandort/DSGVO, SLA (Verfügbarkeit, Support 24/7, Reaktionszeit), Performance/Anbindung, Exit-Strategie/Datenportabilität, Preis.`],
["fisi1","Cloud","W22","Vorteile On-Premises gegenüber Public Cloud?",
`Volle Kontrolle über Systeme, <b>garantierte Datenhoheit</b>, freie Hardwarewahl, geringe Latenz zu anderen lokalen Systemen, keine Abhängigkeit von Internetanbindung/Provider, ggf. günstiger bei konstant hoher Last.`],
["fisi1","Cloud","S23","Horizontale vs. vertikale Skalierung.",
`<b>Horizontal (scale out):</b> weitere gleichartige Systeme hinzufügen und Last verteilen (Load Balancer) – meist ohne Ausfallzeit.<br><b>Vertikal (scale up):</b> ein System aufrüsten (mehr CPU, RAM) – oft mit Ausfallzeit und durch die Hardware begrenzt.`],
["fisi1","Cloud","W22","Was ist Latenz und wodurch erhöht sie sich?",
`Latenz = <b>Verzögerung</b> zwischen Senden und Empfangen eines Signals (Laufzeit).<br>Erhöht durch: lange Leitungswege, viele aktive Netzkomponenten (Hops), überlastete Komponenten, Warteschlangen.<br>Besonders spürbar bei vielen kleinen Anfragen (z. B. viele SQL-Abfragen, kleine Dateien).`],
["fisi1","Cloud","S23","Erkläre Blue-Green-Deployment.",
`Es gibt zwei identische Umgebungen: eine ist live (z. B. Grün), auf der anderen (Blau) wird die neue Version installiert und getestet. Dann wird der Traffic <b>unterbrechungsfrei umgeschaltet</b>. Die alte Umgebung bleibt als schneller <b>Fallback</b> und dient beim nächsten Release als Staging.`],
["fisi1","Cloud","S26","Was macht ein Load Balancer und welche Verteilverfahren gibt es?",
`Verteilt Anfragen auf mehrere Server (Lastverteilung + Ausfallsicherheit). Über <b>Health Checks</b> werden ausgefallene Server automatisch aus dem Pool genommen.<br>Verfahren: <b>Round Robin</b> (reihum), Weighted Round Robin (nach Leistung gewichtet), Least Connections (wenigste aktive Verbindungen), IP-Hash/Source (Client bleibt beim selben Server – Session-Persistenz).<br>Layer 4 (IP/Port) oder Layer 7 (HTTP-Inhalt, URL).`],
["fisi1","Cloud","S26,S22","Was ist ein Reverse Proxy und welche Aufgaben übernimmt er?",
`Steht <b>vor</b> den Webservern und nimmt Anfragen aus dem Internet stellvertretend entgegen (Gegenstück: Forward-Proxy steht vor den Clients).<br>Aufgaben: interne Server verbergen (Sicherheit), <b>TLS-Terminierung</b>, Caching, Load Balancing, Kompression, WAF/Filterung. Beispiele: nginx, HAProxy, Traefik.`],

// ---------- Storage & RAID ----------
["fisi1","Storage & RAID","S22,S24,W24","RAID-Level 0, 1, 5, 6, 10 – Mindestanzahl Platten, Nettokapazität, Ausfallsicherheit.",
`<table><tr><th>RAID</th><th>min.</th><th>netto</th><th>verträgt Ausfall</th></tr>
<tr><td>0 Striping</td><td>2</td><td>n</td><td>keinen</td></tr>
<tr><td>1 Spiegelung</td><td>2</td><td>n/2</td><td>1 (je Spiegel)</td></tr>
<tr><td>5 Parität verteilt</td><td>3</td><td>n−1</td><td>1</td></tr>
<tr><td>6 doppelte Parität</td><td>4</td><td>n−2</td><td>2 beliebige</td></tr>
<tr><td>10 Stripe über Spiegel</td><td>4</td><td>n/2</td><td>1 sicher, mehr wenn verschiedene Spiegel</td></tr></table>`],
["fisi1","Storage & RAID","S25","Warum ist RAID 6 sicherer als RAID 10?",
`RAID 6 übersteht den Ausfall von <b>zwei beliebigen</b> Platten. RAID 10 übersteht garantiert nur <b>eine</b>; fallen zufällig beide Platten desselben Spiegelpaars aus, sind die Daten verloren (mehr Ausfälle nur mit Glück auf verschiedenen Paaren).`],
["fisi1","Storage & RAID","S24,S25","Rechnung: 24 TiB Nutzdaten, Platten à 4 TiB. Wie viele Platten bei RAID 5, RAID 6, RAID 10?",
`Daten: 24 / 4 = 6 Platten<br>RAID 5: 6 + 1 = <b>7</b><br>RAID 6: 6 + 2 = <b>8</b><br>RAID 10: 6 × 2 = <b>12</b>`],
["fisi1","Storage & RAID","W24","RAID 5 mit 5 Platten à 3 TiB: Nettokapazität?",
`(5 − 1) × 3 TiB = <b>12 TiB</b> (eine Plattenkapazität geht für Parität verloren).`],
["fisi1","Storage & RAID","W22","Rechnung: 15 TiB Daten, 4-TiB-Platten, RAID 6 + 1 Hot Spare. Anzahl Platten?",
`15 / 4 = 3,75 → <b>4</b> Datenplatten (immer aufrunden)<br>+ 2 Parität (RAID 6) + 1 Hot Spare = <b>7 Platten</b>`],
["fisi1","Storage & RAID","W24,S23","Was ist eine Hot-Spare-Festplatte?",
`Eine im System eingebaute, laufende, aber <b>ungenutzte Reserveplatte</b>. Fällt eine Platte im RAID aus, wird die Hot Spare automatisch im laufenden Betrieb eingebunden und der Rebuild startet sofort.`],
["fisi1","Storage & RAID","W24","Nachteile von JBOD gegenüber RAID?",
`JBOD hängt Platten nur hintereinander zu einem Volume: <b>keine Redundanz</b> (Plattenausfall gefährdet die Daten), kein Striping → keine Leistungssteigerung, keine Lastverteilung.`],
["fisi1","Storage & RAID","S22","Welche technischen Merkmale hat ein RAID-Controller?",
`Unterstützte RAID-Level, Cachegröße (+ Batterie/Flash-Backup BBU), Anzahl Anschlüsse, Schnittstelle (SAS/SATA/NVMe, PCIe-Gen), Durchsatz, Hot-Swap-/Hot-Spare-Unterstützung.`],
["fisi1","Storage & RAID","Basis","DAS, NAS und SAN – Unterschiede.",
`<b>DAS:</b> direkt am Server angeschlossen (intern/extern), nicht geteilt.<br><b>NAS:</b> Speicher im Netzwerk mit eigenem OS, Zugriff <b>dateibasiert</b> (SMB/CIFS, NFS).<br><b>SAN:</b> eigenes Speichernetz, Zugriff <b>blockbasiert</b> (Fibre Channel, iSCSI) – Server sehen LUNs wie lokale Platten; ideal für Virtualisierungscluster und Datenbanken.`],
["fisi1","Storage & RAID","W21,W24","Deduplizierung vs. Kompression.",
`<b>Deduplizierung:</b> gleiche Datenblöcke/Dateien werden nur einmal gespeichert, Duplikate durch Zeiger ersetzt (z. B. gleicher Mailanhang an 50 Empfänger). Spart viel Speicher, beschleunigt Backups.<br><b>Kompression:</b> Redundanz <i>innerhalb</i> einer Datei wird durch Kodierung entfernt – verlustfrei (ZIP, PNG) oder verlustbehaftet (JPEG, MP3).`],
["fisi1","Storage & RAID","W21,W23","Wie wählt man die Größe der Zuordnungseinheit (Clustergröße) beim Formatieren?",
`Eine Datei belegt immer ganze Cluster. <b>Viele kleine Dateien</b> → kleine Cluster (sonst Verschnitt/Platzverschwendung). <b>Große Dateien</b> (Video, Images, Backups) → große Cluster (weniger Verwaltungsaufwand, weniger Fragmentierung, schneller).`],
["fisi1","Storage & RAID","W25","Was bedeutet das „Mix-and-Match“-Prinzip bei der Plattenauswahl für ein RAID?",
`Platten werden bewusst aus <b>unterschiedlichen Chargen/Produktionsdaten</b> (ggf. Herstellern bzw. gleiche Spezifikation, aber unterschiedliche Lose) kombiniert. Platten aus derselben Charge haben oft dieselben Fehler und fallen ähnlich alt gleichzeitig aus – das kann ein RAID trotz Redundanz zerstören (v. a. beim Rebuild). Wichtig bleibt: gleiche Kapazität, Drehzahl/Leistungsklasse und Schnittstelle.`],
["fisi1","Storage & RAID","Basis","HDD vs. SSD – Vor- und Nachteile im Server.",
`<b>SSD:</b> sehr hohe IOPS, geringe Latenz, leise, stoßfest, weniger Energie; aber teurer pro TB, begrenzte Schreibzyklen (TBW/DWPD).<br><b>HDD:</b> günstig pro TB, große Kapazitäten; aber langsam bei Zufallszugriffen, mechanischer Verschleiß.<br>Oft kombiniert: SSD-Cache/Tiering + HDD für Kapazität.`],

// ---------- Rechnen ----------
["fisi1","Rechnen & Einheiten","S23,W24,W21","Unterschied TB und TiB? Rechne 1 TiB in GiB.",
`Dezimal (SI): 1 TB = 10¹² Byte = 1000 GB.<br>Binär (IEC): 1 TiB = 2⁴⁰ Byte = <b>1024 GiB</b>; 1 GiB = 1024 MiB.<br>1 TB ≈ 0,909 TiB – Hersteller geben TB an, Betriebssysteme zeigen oft binär.`],
["fisi1","Rechnen & Einheiten","S23,W24","Speicherbedarf: 6 TiB Altbestand zu 80 % belegt, Zuwachs 400 GiB/Jahr, Planung 4 Jahre. Wie viel TiB?",
`Alt: 6 × 1024 × 0,8 = 4.915,2 GiB<br>Zuwachs: 400 × 4 = 1.600 GiB<br>Summe: 6.515,2 GiB / 1024 ≈ <b>6,4 TiB</b>`],
["fisi1","Rechnen & Einheiten","S25","USV: Akku hält 50 min (100 %). Notstromaggregat braucht 5 min zum Starten; bei 20 % Restladung muss es übernommen haben. Ab welchem Ladestand muss es starten?",
`50 min = 100 % → 1 % = 0,5 min → 5 min = 10 %<br>20 % + 10 % = <b>30 %</b>`],
["fisi1","Rechnen & Einheiten","W23","Stromkosten: 3 Server à 0,5 kW laufen 24/7, Strompreis 0,35 €/kWh. Jahreskosten?",
`3 × 0,5 kW × 24 h × 365 × 0,35 €/kWh = <b>4.599,00 €</b><br>(Formel: Leistung in kW × Stunden × Preis)`],
["fisi1","Rechnen & Einheiten","S26","Netzteil dimensionieren: Komponenten brauchen zusammen 400 W, Reserve 20 %, Wirkungsgrad 90 %. Welche Nennleistung und wie viel nimmt es aus dem Netz auf?",
`Nennleistung (Ausgang) mit Reserve: 400 W × 1,2 = <b>480 W</b> → nächstgrößeres Netzteil, z. B. 500 W.<br>Aufnahme aus dem Netz bei 400 W Last: 400 W / 0,9 ≈ <b>444 W</b> (Verlust ≈ 44 W als Wärme).<br>Merke: P<sub>ein</sub> = P<sub>aus</sub> / η`],
["fisi1","Rechnen & Einheiten","W21","MTBF einer Platte 1.000.000 h. Wie hoch ist die MTBF eines Verbunds aus 8 Platten (ein Ausfall irgendeiner Platte)?",
`1.000.000 h / 8 = 125.000 h ≈ 125.000 / 8.760 ≈ <b>14,3 Jahre</b> – je mehr Platten, desto häufiger fällt statistisch eine aus.`],
["fisi1","Rechnen & Einheiten","W22","Archiv: 50 GiB/Monat, Kompression auf 30 %. Wie lange reicht 2 TiB?",
`50 × 0,3 = 15 GiB/Monat = 180 GiB/Jahr<br>2048 / 180 ≈ <b>11,4 Jahre</b> → reicht für 11 volle Jahre.`],
["fisi1","Rechnen & Einheiten","W22","RAM-Kennwerte DDR4-3200 CL16: effektiver Takt, Datenrate am 64-Bit-Bus?",
`Effektiver Takt: 3.200 MHz (MT/s)<br>Datenrate: 3.200 Mio × 64 Bit / 8 = <b>25,6 GB/s</b><br>CL16 = 16 Taktzyklen Verzögerung (CAS-Latenz).`],

// ---------- Verfügbarkeit & Hardware ----------
["fisi1","Verfügbarkeit","S23","USV-Klassen VFD, VI, VFI – was bedeuten sie?",
`<b>VFD</b> (Voltage & Frequency Dependent) = Offline/Standby: Last am Netz, schaltet erst bei Ausfall um (Umschaltzeit).<br><b>VI</b> (Voltage Independent) = Line-Interactive: regelt Spannungsschwankungen aus.<br><b>VFI</b> (Voltage & Frequency Independent) = Online/Doppelwandler: Last läuft immer über Wechselrichter, keine Umschaltzeit, bester Schutz; aber teurer, schlechterer Wirkungsgrad.`],
["fisi1","Verfügbarkeit","W21,W22,S24","Maßnahmen zur Erhöhung der Hochverfügbarkeit eines Servers.",
`Redundante Netzteile (an getrennten Stromkreisen/USV), redundante Lüfter, ECC-RAM, RAID + Hot Spare, NIC-Teaming/Link Aggregation, Server-Cluster/Failover, Load Balancing, USV + Notstrom, Monitoring, Ersatzteil-/Wartungsvertrag.`],
["fisi1","Verfügbarkeit","W21","Was leistet ECC-RAM?",
`Error Correcting Code: 1-Bit-Fehler werden <b>erkannt und korrigiert</b>, 2-Bit-Fehler werden erkannt (nicht korrigiert). Wichtig für Server, Datenbanken, Storage.`],
["fisi1","Verfügbarkeit","W25","Erkläre die Badewannenkurve am Beispiel Festplatten.",
`Ausfallrate über die Lebensdauer:<ol><li><b>Frühausfälle</b> – hohe, sinkende Rate (Fertigungsfehler, „Kindersterblichkeit“) → Burn-in/Tests, Garantie.</li><li><b>Zufallsausfälle</b> – niedrige, konstante Rate im Normalbetrieb (hier gilt die MTBF-Angabe).</li><li><b>Verschleißausfälle</b> – steigende Rate durch Alterung → rechtzeitig tauschen.</li></ol>`],
["fisi1","Verfügbarkeit","W25,W21","MTBF, MTTF und MTTR – was bedeuten sie? Wie berechnet man Verfügbarkeit?",
`<b>MTBF</b> Mean Time Between Failures – mittlere Betriebszeit zwischen zwei Ausfällen (reparierbare Systeme).<br><b>MTTF</b> Mean Time To Failure – mittlere Zeit bis zum Ausfall (nicht reparierbare Teile, z. B. Platte).<br><b>MTTR</b> Mean Time To Repair – mittlere Reparaturzeit.<br>Verfügbarkeit = MTBF / (MTBF + MTTR)`],
["fisi1","Verfügbarkeit","W25","Wie viel Ausfallzeit pro Jahr bedeuten 99 %, 99,9 % und 99,99 % Verfügbarkeit?",
`1 Jahr = 8.760 h<br>99 % → 87,6 h ≈ <b>3,65 Tage</b><br>99,9 % → <b>8,76 h</b><br>99,99 % → <b>52,6 min</b><br>99,999 % → ≈ 5,3 min`],
["fisi1","Verfügbarkeit","S23","RTO und RPO erklären.",
`<b>RTO</b> (Recovery Time Objective): maximal tolerierbare <b>Ausfallzeit</b> – vom Schaden bis zur vollständigen Wiederherstellung.<br><b>RPO</b> (Recovery Point Objective): maximal tolerierbarer <b>Datenverlust</b> (Zeitraum) – bestimmt, wie häufig gesichert werden muss.`],
["fisi1","Verfügbarkeit","W25","Welche sicherheitsrelevanten Einstellungen nimmst du im BIOS/UEFI vor?",
`BIOS-/Setup-Passwort, <b>Secure Boot</b> aktivieren, feste Bootreihenfolge (kein Booten von USB/PXE/DVD), nicht benötigte Schnittstellen deaktivieren, <b>TPM</b> aktivieren (für BitLocker), Firmware aktuell halten, CPU-Sicherheitsfunktionen (z. B. Virtualisierungsschutz) aktivieren, Intel ME/Fernwartung absichern.`],
["fisi1","Verfügbarkeit","W25","Anhand eines Task-Manager-/Monitoring-Screenshots soll ein Engpass erkannt werden. Worauf achtest du?",
`<b>CPU</b> dauerhaft nahe 100 % → CPU-Engpass (welcher Prozess?).<br><b>RAM</b> voll + hohe Auslagerung/Paging → Arbeitsspeicher-Engpass (Platte wird mitbelastet).<br><b>Datenträger</b> 100 % aktiv, hohe Warteschlange/Antwortzeit → I/O-Engpass (SSD, RAID 10).<br><b>Netzwerk</b> nahe Linkgeschwindigkeit → Bandbreite.<br>Immer: Wert nennen → Ursache → Maßnahme.`],

// ---------- Backup ----------
["fisi1","Backup & Archiv","W22,S22,W23","Vollsicherung, differenzielle und inkrementelle Sicherung – Unterschied und Archivbit.",
`<table><tr><th>Art</th><th>sichert</th><th>Archivbit</th></tr>
<tr><td>Voll</td><td>alles</td><td>wird zurückgesetzt</td></tr>
<tr><td>Differenziell</td><td>alles seit der letzten <b>Vollsicherung</b> (wächst täglich)</td><td>bleibt gesetzt</td></tr>
<tr><td>Inkrementell</td><td>alles seit der letzten <b>Sicherung</b> (klein, schnell)</td><td>wird zurückgesetzt</td></tr>
<tr><td>Klonen/Image</td><td>1:1-Abbild</td><td>unverändert</td></tr></table>`],
["fisi1","Backup & Archiv","W23,W22","Welche Bänder brauchst du zum Wiederherstellen bei differenzieller bzw. inkrementeller Sicherung?",
`<b>Differenziell:</b> letzte Vollsicherung + <b>nur die letzte</b> differenzielle Sicherung.<br><b>Inkrementell:</b> letzte Vollsicherung + <b>alle</b> inkrementellen Sicherungen seit dieser, in richtiger Reihenfolge.<br>Achtung Mischfall: Läuft zwischendurch versehentlich eine inkrementelle Sicherung, setzt sie das Archivbit zurück – dann braucht man zusätzlich dieses Band.`],
["fisi1","Backup & Archiv","S25","Was besagt die 3-2-1-Regel?",
`<b>3</b> Kopien der Daten (Original + 2 Backups), auf <b>2</b> verschiedenen Medientypen (z. B. Platte + Band/Cloud), davon <b>1</b> Kopie an einem anderen Standort (offsite).<br>Erweiterung 3-2-1-1-0: 1 Kopie offline/immutable, 0 Fehler bei Restore-Tests.`],
["fisi1","Backup & Archiv","W25","Erkläre das Großvater-Vater-Sohn-Prinzip.",
`Generationen-Prinzip für Sicherungsmedien:<br><b>Söhne</b> = tägliche Sicherungen (z. B. Mo–Do, werden wöchentlich überschrieben)<br><b>Väter</b> = wöchentliche Sicherungen (z. B. Freitag, werden monatlich überschrieben)<br><b>Großväter</b> = monatliche Sicherungen (lange aufbewahrt).<br>→ Mit wenigen Medien lange Zeiträume abgedeckt; ältere Stände verfügbar.`],
["fisi1","Backup & Archiv","S25","Wie verkürzt man die Restore-Zeit bei Bandsicherung und vermeidet Datenverlust zwischen Backups?",
`<b>D2D2T</b> (Disk-to-Disk-to-Tape): zuerst schnell auf Festplatte sichern, dann im Hintergrund auf Band → Restore meist von der schnellen Platte.<br>Datenverlust minimieren: häufige inkrementelle Sicherungen oder <b>Snapshots</b> in kurzen Abständen (kleiner RPO), ggf. Replikation.`],
["fisi1","Backup & Archiv","W25,W22","Warum heute noch Bandlaufwerke (LTO)?",
`Sehr günstig pro TB, lange Haltbarkeit (≈ 30 Jahre), hohe Kapazität, wenig Energie im Lager, <b>offline/Air-Gap</b> → Schutz vor Ransomware, leicht auslagerbar (offsite), WORM-Bänder für Archivierung, LTFS ermöglicht Dateizugriff.`],
["fisi1","Backup & Archiv","W25,W23,W21","Unterschied Datensicherung und Archivierung? Was heißt revisionssicher?",
`<b>Backup:</b> Kopie zur Wiederherstellung nach Datenverlust, wird regelmäßig überschrieben.<br><b>Archivierung:</b> langfristige, unveränderbare Aufbewahrung von (oft verschobenen) Originaldaten aus rechtlichen Gründen.<br><b>Revisionssicher</b> (GoBD/HGB/AO): vollständig, unveränderbar (WORM), nachvollziehbar, Zugriff nur für Berechtigte, Aufbewahrungsfristen (6/8/10 Jahre) eingehalten, wiederauffindbar.`],
["fisi1","Backup & Archiv","W25","Organisatorische Maßnahmen rund um Datensicherung?",
`Backup-Konzept/Richtlinie schriftlich festlegen, Verantwortliche & Vertreter benennen, <b>regelmäßige Restore-Tests</b>, Protokollierung/Kontrolle der Jobs, Medien beschriften & sicher (feuerfest, offsite) lagern, Zugriffsrechte auf Backups beschränken, Aufbewahrungsfristen, Notfallhandbuch, Schulung.`],
["fisi1","Backup & Archiv","W21","Was ist Backup as a Service (BaaS)?",
`Daten werden verschlüsselt an einen Dienstleister übertragen und dort (hochverfügbar, georedundant) gespeichert. Entlastet eigene Ressourcen, erfüllt Offsite-Anforderung; abhängig von Bandbreite und Anbieter (DSGVO/AV-Vertrag).`],

// ---------- IT-Sicherheit ----------
["fisi1","IT-Sicherheit","S24,W23","Schutzziele der Informationssicherheit (CIA) erklären.",
`<b>Vertraulichkeit</b> (Confidentiality): nur Berechtigte können Daten lesen.<br><b>Integrität</b> (Integrity): Daten sind vollständig und unverändert.<br><b>Verfügbarkeit</b> (Availability): Systeme/Daten sind zur zugesicherten Zeit nutzbar.<br>Erweitert: <b>Authentizität</b> (Echtheit von Absender/Daten), Verbindlichkeit/Nichtabstreitbarkeit.`],
["fisi1","IT-Sicherheit","S25,S23,S22","Nenne Maßnahmen zur Härtung eines Servers.",
`Nicht benötigte Dienste, Programme, Ports und Autostarts deaktivieren; unsichere Protokolle abschalten (Telnet, SMBv1, FTP); Dienste mit minimalen Rechten; Standardkonten umbenennen/deaktivieren, Standardpasswörter ändern; Updates/Patches; Host-Firewall restriktiv; Logging aktivieren; Debug-/Fehlermeldungen für Benutzer aus; BIOS-Passwort, Secure Boot; MFA für Admins; Festplattenverschlüsselung.`],
["fisi1","IT-Sicherheit","S25,S22","Least-Privilege-Prinzip und Zero-Trust-Prinzip erklären.",
`<b>Least Privilege:</b> Benutzer/Dienste erhalten nur die minimal nötigen Rechte für ihre Aufgabe → begrenzt Missbrauch & Schaden.<br><b>Zero Trust:</b> „Never trust, always verify“ – kein Gerät/Nutzer gilt automatisch als vertrauenswürdig, auch nicht im internen Netz. Jeder Zugriff wird authentifiziert und geprüft, Netz wird segmentiert → Ausbreitung von Malware wird erschwert.`],
["fisi1","IT-Sicherheit","S24","Virus, Wurm, Trojaner, Ransomware – Unterscheidung.",
`<b>Virus:</b> hängt sich an Programme/Dateien, verbreitet sich mit deren Ausführung.<br><b>Wurm:</b> verbreitet sich <b>selbstständig über das Netzwerk</b>.<br><b>Trojaner:</b> tarnt sich als nützliches Programm, führt im Hintergrund Schadfunktionen aus (z. B. Backdoor).<br><b>Ransomware:</b> verschlüsselt Daten und fordert Lösegeld.`],
["fisi1","IT-Sicherheit","S24,S23","Anzeichen für eine Malware-Infektion?",
`Hohe CPU-/Netzlast ohne Grund, langsames System, häufige Abstürze, unbekannte Prozesse/Programme, geänderte Browser-Startseite, Pop-ups, Mails werden ohne Wissen verschickt, Dateien verändert/verschlüsselt, Sicherheitssoftware deaktiviert, ungewöhnliche Anmeldeaktivitäten.`],
["fisi1","IT-Sicherheit","S24,W24","Woran erkennt man eine Phishing-Mail? Unterschied Spam/Phishing.",
`<b>Spam:</b> unerwünschte Massenmail (Werbung). <b>Phishing:</b> Betrug, um Zugangsdaten/Zahlungsdaten zu stehlen.<br>Merkmale: unpersönliche Anrede, Zeitdruck/Drohung, Absenderadresse passt nicht zur Firma, angezeigte URL ≠ echter Link, Rechtschreibfehler, unerwartete Anhänge (z. B. .exe, Makros), Aufforderung zur Dateneingabe.`],
["fisi1","IT-Sicherheit","S23","Wie schützt man sich bei E-Mails vor Schadsoftware?",
`Gefährliche Anhänge sperren (exe, js, Makro-Dokumente), Mails im Nur-Text-Modus anzeigen, Virenscanner/Sandbox am Mailgateway, SPF/DKIM/DMARC prüfen, Spamfilter, Benutzer regelmäßig schulen (Awareness).`],
["fisi1","IT-Sicherheit","S24","White-Hat- vs. Black-Hat-Hacker.",
`<b>White Hat:</b> dringt <b>im Auftrag</b> des Eigentümers ein (Penetrationstest), meldet Schwachstellen zur Verbesserung.<br><b>Black Hat:</b> nutzt Schwachstellen illegal zum eigenen Vorteil (Daten, Geld, Sabotage).<br>(Grey Hat: dazwischen, ohne Auftrag, aber meist ohne Schadensabsicht.)`],
["fisi1","IT-Sicherheit","S25","Wie überprüft man die Sicherheit der IT-Systeme (Audit)?",
`Logs auswerten, Schwachstellenscans, Penetrationstests (z. B. Login-/Brute-Force-Versuche), Konfiguration gegen Richtlinien (BSI IT-Grundschutz, CIS-Benchmarks, interne Policies) prüfen, Patchstand prüfen, Clients auf Malware prüfen, Berechtigungen reviewen.`],
["fisi1","IT-Sicherheit","S25","Was prüfst du nach einem Datenleck/Diebstahl eines Geräts als Erstes?",
`Sind Daten an Unbefugte gelangt? Waren sie verschlüsselt? Wurden sie verändert oder missbraucht? Welche Daten (personenbezogen? → DSGVO-Meldepflicht)? Können sie wiederhergestellt werden? Zugänge sperren, Passwörter ändern, Gerät per MDM sperren/löschen.`],
["fisi1","IT-Sicherheit","S24","Wie schützt man mobile Endgeräte/Notebooks gegen Diebstahl & Datenverlust?",
`Festplattenverschlüsselung mit <b>TPM</b> (BitLocker), MFA/Biometrie, MDM mit Fernsperre/-löschung, Ortung, Daten zentral statt lokal speichern, BIOS-Härtung (Bootoptionen, Secure Boot), automatische Bildschirmsperre.`],
["fisi1","IT-Sicherheit","S25","Was leistet ein Mobile-Device-Management (MDM)? Wie trennt man privat und dienstlich (BYOD)?",
`Zentrale Verwaltung mobiler Geräte: Inventarisierung, Richtlinien (PIN, Verschlüsselung), App-Verteilung, Updates, <b>Fernsperre (Lockdown)</b> und <b>Fernlöschung (Wipe)</b>, Ortung.<br>BYOD: Firmendaten in einem <b>Container</b>/Arbeitsprofil – MDM hat keinen Zugriff auf private Daten; selektives Löschen nur des Firmenbereichs.`],
["fisi1","IT-Sicherheit","S25","Welche Punkte gehören in eine Richtlinie für mobile Geräte/BYOD?",
`Passwortrichtlinie, BYOD-Regelung, private Nutzung dienstlicher Geräte, Datenklassifizierung/Schutzbedarf, erlaubte Apps, Verschlüsselung, Verhalten bei Verlust (Meldepflicht), Ortung/Bewegungsdaten (Datenschutz, Betriebsrat!), Kamera-/Mikrofonnutzung, Schulung, Rechtevergabe.`],
["fisi1","IT-Sicherheit","W23","Vorteile eines zentralen Patch-Managements (z. B. WSUS)?",
`Patches bewerten, priorisieren und kontrolliert freigeben (erst Testgruppe, dann alle), kritische Sicherheitspatches schnell verteilen, problematische Updates zurückhalten, Updates nur einmal aus dem Internet laden (spart Bandbreite), Reporting über den Patchstand, zeitgesteuerte automatische Installation.`],
["fisi1","IT-Sicherheit","S26","Was ist ein Man-in-the-Middle-Angriff? Wie schützt man sich?",
`Der Angreifer schaltet sich unbemerkt zwischen zwei Kommunikationspartner und kann Daten mitlesen/verändern. Techniken: ARP-Spoofing, DNS-Spoofing, Rogue Access Point/Evil Twin, gefälschte Zertifikate, SSL-Stripping.<br>Schutz: Ende-zu-Ende-Verschlüsselung (TLS) mit Zertifikatsprüfung, HSTS, VPN in fremden Netzen, 802.1X, Dynamic ARP Inspection/DHCP Snooping auf Switches, DNSSEC.`],

// ---------- Kryptografie ----------
["fisi1","Kryptografie","S23,W21","Symmetrische vs. asymmetrische Verschlüsselung – Prinzip, Vor- und Nachteile.",
`<b>Symmetrisch</b> (AES): ein gemeinsamer geheimer Schlüssel → schnell; Problem: sicherer Schlüsselaustausch, viele Schlüssel bei vielen Partnern.<br><b>Asymmetrisch</b> (RSA, ECC): Schlüsselpaar – mit dem <b>öffentlichen</b> Schlüssel verschlüsseln, nur der <b>private</b> entschlüsselt. Kein vorheriger Geheimaustausch nötig; aber rechenintensiv/langsam.<br><b>Hybrid</b> (TLS): asymmetrisch den Sitzungsschlüssel austauschen, Daten symmetrisch verschlüsseln.`],
["fisi1","Kryptografie","W23","Welches Verfahren für die Verschlüsselung von Datenträgern: DES, AES oder RSA?",
`<b>AES</b> (z. B. AES-256): symmetrisch, schnell, sicher.<br>DES: nur 56-Bit-Schlüssel → per Brute Force knackbar, veraltet.<br>RSA: asymmetrisch, zu langsam für große Datenmengen – nicht für Datenträgerverschlüsselung.`],
["fisi1","Kryptografie","W21,W23","Bewerte AES-128, AES-256, MD5, SHA-256.",
`AES-128: symmetrisch, noch sicher.<br>AES-256: symmetrisch, sehr sicher (Empfehlung).<br>MD5: Hashfunktion, <b>gebrochen</b> (Kollisionen) – nicht mehr verwenden.<br>SHA-256: sichere Hashfunktion (Integrität, Signaturen) – <b>keine Verschlüsselung</b>, da nicht umkehrbar.`],
["fisi1","Kryptografie","S23,W24","Schritte zum Absichern eines Webservers mit einem Zertifikat.",
`Schlüsselpaar & CSR erzeugen → Zertifikat bei (kommerzieller) CA beantragen (oder Let's Encrypt) → Zertifikat + <b>Zwischenzertifikate</b> auf dem Server installieren, privaten Schlüssel schützen → HTTPS aktivieren, HTTP umleiten, alte TLS-Versionen deaktivieren → Ablaufdatum überwachen.`],
["fisi1","Kryptografie","W24,S23,W21","Welche Informationen enthält ein X.509-Zertifikat?",
`Version, Seriennummer, Inhaber (Subject/Common Name, ggf. SAN), <b>öffentlicher Schlüssel</b> des Inhabers, Aussteller (CA), Gültigkeitszeitraum, Signaturalgorithmus, <b>Signatur der CA</b>, Verwendungszweck, Sperrinfos (CRL/OCSP).`],

// ---------- Datenschutz ----------
["fisi1","Datenschutz","S24,W22","Ordne technische und organisatorische Maßnahmen (TOM) zu: Zutritts-, Zugangs-, Zugriffskontrolle.",
`<b>Zutrittskontrolle</b> – physisch ins Gebäude/Räume: RFID-Karte, Alarmanlage, Besucheranmeldung, Schlüssel.<br><b>Zugangskontrolle</b> – an die Systeme ran: Passwortregeln, Biometrie am PC, MFA, Bildschirmsperre.<br><b>Zugriffskontrolle</b> – auf welche Daten: Berechtigungskonzept auf Dateiebene, Verschlüsselung von Datenträgern, datenschutzgerechte Vernichtung.<br>Weitere: Weitergabe-, Eingabe-, Auftrags-, Verfügbarkeitskontrolle, Trennungsgebot.`],
["fisi1","Datenschutz","S24,W21","Was ist bei einer Datenschutzverletzung (z. B. Mail an falschen Empfänger) zu tun?",
`Datenschutzbeauftragten informieren, <b>Meldung an die Aufsichtsbehörde binnen 72 h</b> (Art. 33 DSGVO), bei hohem Risiko <b>Betroffene informieren</b> (Art. 34), Empfänger zur Löschung auffordern, Vorfall dokumentieren, Ursache analysieren und Maßnahmen (Schulung, technische Sperren) ergreifen.`],
["fisi1","Datenschutz","W21","Anonymisierung vs. Pseudonymisierung.",
`<b>Anonymisierung:</b> Personenbezug wird <b>endgültig</b> entfernt – keine Rückführung möglich → keine personenbezogenen Daten mehr (DSGVO gilt nicht).<br><b>Pseudonymisierung:</b> Identifikationsmerkmale werden durch ein Pseudonym ersetzt; über eine getrennt gespeicherte Zuordnungstabelle ist die Rückführung möglich → bleibt personenbezogen.`],
["fisi1","Datenschutz","W21","Wie werden alte Festplatten datenschutzkonform entsorgt? Warum reicht Formatieren nicht?",
`Formatieren/Löschen entfernt nur Verweise im Dateisystem – Daten sind wiederherstellbar.<br>Richtig: mehrfaches Überschreiben bzw. Secure Erase (SSD), Degaussing (HDD) oder physische Vernichtung durch zertifizierten Dienstleister (DIN 66399) mit <b>Vernichtungsnachweis</b>.`],
["fisi1","Datenschutz","S24,W21","Wichtige Grundsätze der DSGVO (Art. 5).",
`Rechtmäßigkeit & Transparenz, <b>Zweckbindung</b>, <b>Datenminimierung</b>, Richtigkeit, <b>Speicherbegrenzung</b> (Löschfristen), Integrität & Vertraulichkeit, Rechenschaftspflicht.<br>Betroffenenrechte: Auskunft, Berichtigung, Löschung („Recht auf Vergessenwerden“, Art. 17), Einschränkung, Datenübertragbarkeit, Widerspruch.`],
["fisi1","Datenschutz","S24","Was gehört in ein Datenschutzkonzept eines Unternehmens?",
`Verantwortliche Stelle, Datenschutzbeauftragter, <b>Verzeichnis der Verarbeitungstätigkeiten</b>, TOMs (Firewall, Updates, Verschlüsselung …), Löschfristen, Notfallplan für Datenpannen, AV-Verträge mit Dienstleistern, Schulungen.`],
["fisi1","Datenschutz","S22","Datenschutz bei Videoüberwachung (Webcams) – was ist zu beachten?",
`Rechtsgrundlage/Einwilligung, Persönlichkeitsrecht (auch Mitarbeiter → Betriebsrat), <b>Zweckbindung</b> (klar festgelegter Zweck), Hinweisschilder, Datenminimierung, <b>Löschfristen</b> (löschen, sobald Zweck erfüllt), Zugriffsschutz.`],
["fisi1","Datenschutz","W24","Was muss bei SSL-Inspection/Überwachung des Mitarbeiter-Internetverkehrs organisatorisch geregelt werden?",
`Mitarbeiter (und <b>Betriebsrat</b>) informieren bzw. Betriebsvereinbarung, private Internetnutzung regeln/verbieten, Ausnahmen für sensible Seiten (Banking, Gesundheit), Datenschutz beachten.`],

// ---------- Lizenzen & Software ----------
["fisi1","Lizenzen & Software","S25,S24","User CAL vs. Device CAL – wann ist was sinnvoll?",
`<b>User CAL:</b> pro Benutzer – sinnvoll, wenn Mitarbeiter mehrere Geräte nutzen (PC, Laptop, Smartphone) bzw. mehr Geräte als Nutzer.<br><b>Device CAL:</b> pro Gerät – sinnvoll, wenn sich mehrere Nutzer ein Gerät teilen (Schichtbetrieb, Kiosk-PC).`],
["fisi1","Lizenzen & Software","S25,W23","Unterschied Patch/Update und Upgrade.",
`<b>Patch/Update:</b> behebt Fehler und Sicherheitslücken, meist kostenlos, kurzfristig, kein neuer Funktionsumfang (Minor-Version, z. B. 1.0 → 1.1).<br><b>Upgrade:</b> neue Hauptversion mit neuen Funktionen/Konzepten, größere Abstände, oft kostenpflichtig (z. B. 1.x → 2.0).`],
["fisi1","Lizenzen & Software","Basis","Gängige Lizenzmodelle?",
`Einzelplatz-/Volumenlizenz, OEM (an Hardware gebunden), Subscription/Abo (z. B. M365), pro Core/CPU (Server), CAL, Floating/Concurrent (gleichzeitige Nutzer), Open Source (GPL – Copyleft; MIT/Apache – permissiv), Freeware/Shareware.`],

// ---------- Berechtigungen / Skripte ----------
["fisi1","Befehle & Rechte","W23","Linux: Datei hat Rechte 664. Was bedeutet das? Wie funktioniert die Oktal-Schreibweise?",
`r = 4, w = 2, x = 1; Reihenfolge Eigentümer / Gruppe / Andere.<br>664 = <code>rw-rw-r--</code>: Eigentümer lesen+schreiben, Gruppe lesen+schreiben, Andere nur lesen.<br>Setzen: <code>chmod 664 datei</code>, Besitzer ändern: <code>chown user:gruppe datei</code>, User zur Gruppe: <code>usermod -aG gruppe user</code>.`],
["fisi1","Befehle & Rechte","S23","Windows: Programm täglich um 16:10 Uhr per Befehl planen.",
`<code>schtasks /Create /TN DiskCheck /TR C:\\tools\\check.exe /SC DAILY /ST 16:10</code><br>Linux-Gegenstück (crontab): <code>10 16 * * * /opt/tools/check</code> (Minute Stunde Tag Monat Wochentag)`],
["fisi1","Befehle & Rechte","S22","Ein Programm lässt sich in der Konsole nur mit vollem Pfad starten. Ursache und Lösung?",
`Das Programmverzeichnis ist nicht in der Umgebungsvariable <b>PATH</b>. Lösung: vollen Pfad angeben oder Verzeichnis zu PATH hinzufügen.`],
["fisi1","Befehle & Rechte","S22","Kopiere alle Logdateien vom März 2026 (Dateiname beginnt mit 202603) nach D:\\logs.",
`<code>copy 202603*.log D:\\logs</code><br>Platzhalter: <code>*</code> = beliebig viele Zeichen, <code>?</code> = genau ein Zeichen. PowerShell: <code>Copy-Item 202603*.log D:\\logs</code>`],
["fisi1","Befehle & Rechte","W24","CSV als Austauschformat – Vor- und Nachteile?",
`<b>Vorteile:</b> einfache Textdatei, plattformunabhängig, von fast allen Programmen (Excel, DB, Skripte) unterstützt, klein.<br><b>Nachteile:</b> nicht einheitlich genormt (Trennzeichen ; oder ,), keine Datentypen/Hierarchien, Probleme mit Sonderzeichen/Zeichensatz, ungeeignet für komplexe/große Daten → JSON/XML.`],
["fisi1","Befehle & Rechte","S26","Was ist GRUB?",
`GRand Unified Bootloader – Standard-Bootloader unter Linux. Lädt den Kernel, ermöglicht Auswahl mehrerer Systeme/Kernel (Dual-Boot) und Kernelparameter. Konfiguration: <code>/etc/default/grub</code>, danach <code>update-grub</code>. Absichern: GRUB-Passwort, Secure Boot.`],

// ---------- Programmierung ----------
["fisi1","Programmierung","S25,S24,W24","Wie geht man bei einer Array-Trace-Aufgabe (Schreibtischtest) vor?",
`Tabelle mit Spalten für Schleifenvariable (i) und alle relevanten Variablen/Array-Felder anlegen, Schleife <b>Schritt für Schritt</b> durchgehen, nach jedem Schritt Werte eintragen. Achtung: Index beginnt bei <b>0</b>, Abbruchbedingung genau prüfen (<code>&lt;</code> vs. <code>&lt;=</code>), Schrittweite (<code>i += 3</code>), Index-Berechnungen wie <code>i*2</code>, <code>i*2+1</code>.`],
["fisi1","Programmierung","S24","Code findet Maximum und zweitgrößten Wert falsch. Wie lautet die korrekte Logik?",
`<pre>max = 0; max2 = 0
für jedes x in werte:
  wenn x > max:
    max2 = max   // alter Höchstwert wird Zweiter
    max = x
  sonst wenn x > max2:
    max2 = x</pre>Typischer Fehler: im zweiten Zweig wird <code>max</code> statt <code>max2</code> überschrieben.`],
["fisi1","Programmierung","W23","Mittelwert eines Arrays mit 24 Stundenwerten berechnen (Pseudocode).",
`<pre>summe = 0
für i = 0 bis 23:
  summe = summe + werte[i]
mittelwert = summe / 24</pre>Für Tageshälften: Schleife 0–11 bzw. 12–23, jeweils Summe neu auf 0 setzen. Achtung: Ganzzahldivision schneidet Nachkommastellen ab.`],
["fisi1","Programmierung","W25","Was liefern Ganzzahldivision und Modulo? Beispiel: 17 / 5 und 17 % 5.",
`17 / 5 = <b>3</b> (Ganzzahldivision, Rest wird abgeschnitten)<br>17 % 5 = <b>2</b> (Modulo = Rest)<br>Typische Anwendung: gerade/ungerade (<code>x % 2 == 0</code>), Priorität/Gruppe aus einer ID ableiten, jede n-te Zeile, Stunden aus Minuten (<code>min / 60</code>, <code>min % 60</code>).`],
["fisi1","Programmierung","W25","Ein Wert soll vor dem Einfügen ins Array auf einen gültigen Bereich geprüft werden. Wie?",
`<pre>wenn wert >= MIN und wert <= MAX und index < array.Länge:
  array[index] = wert
sonst:
  Fehlermeldung</pre>Prüfen: gültiger Wertebereich <b>und</b> Index innerhalb der Arraygrenzen (sonst IndexOutOfRange).`],
["fisi1","Programmierung","S25","Syntaxfehler, Semantikfehler (logische Fehler) und Laufzeitfehler – Unterschied mit Beispiel.",
`<b>Syntaxfehler:</b> Verstoß gegen Grammatik der Sprache – Compiler meldet Fehler (Semikolon fehlt, „innt“ statt „int“).<br><b>Semantik-/Logikfehler:</b> Programm läuft, liefert aber falsche Ergebnisse (Ergebnis in falsche Variable, &lt; statt &lt;=).<br><b>Laufzeitfehler</b> (W23): tritt erst bei Ausführung auf – Array-Index außerhalb des Bereichs, Division durch 0, Lesen über Dateiende, Nullreferenz.`],
["fisi1","Programmierung","W23","Vorteile von Pseudocode?",
`Unabhängig von einer Programmiersprache, leicht verständlich (natürliche Sprache + Strukturen), kompakt, gut zur Planung und Kommunikation im Team, auch für Nicht-Programmierer lesbar.`],
["fisi1","Programmierung","S24","Wertebereich von int (32 Bit) und byte. Warum byte für Prozentwerte?",
`int (32 Bit, signed): <b>−2.147.483.648 bis 2.147.483.647</b><br>byte (8 Bit, unsigned in C#): <b>0 bis 255</b><br>Für ganzzahlige Prozentwerte (0–100) reicht byte; spart Speicher, keine negativen Werte möglich.<br>Weitere: short 16 Bit (−32.768…32.767), long 64 Bit, bool, char, float/double, string.`],
["fisi1","Programmierung","S22","Bubble Sort – wie funktioniert er?",
`Benachbarte Elemente werden verglichen und <b>getauscht</b>, wenn sie in falscher Reihenfolge stehen. Nach jedem Durchlauf steht das größte Element am Ende („steigt auf“). Äußere Schleife p = 0…n−2, innere i = 0…n−2−p.<br><pre>wenn a[i] > a[i+1]:
  temp = a[i+1]; a[i+1] = a[i]; a[i] = temp</pre>Laufzeit O(n²).`],
["fisi1","Programmierung","W25","White-Box-Test vs. Black-Box-Test.",
`<b>Black-Box:</b> Test ohne Kenntnis des Quellcodes – nur Eingaben/erwartete Ausgaben gegen die Spezifikation (Äquivalenzklassen, Grenzwerte). Typisch für Abnahme-/Systemtests.<br><b>White-Box:</b> Test mit Kenntnis des Codes – prüft interne Abläufe, Zweige, Pfade (Anweisungs-/Zweigüberdeckung). Typisch für Unit-Tests durch Entwickler.<br>Grey-Box: Mischform.`],
["fisi1","Programmierung","W22","Datenkapselung und Vererbung in der OOP.",
`<b>Kapselung:</b> Attribute sind von außen nicht direkt zugreifbar (private), Zugriff nur über Methoden (Getter/Setter) → Schutz vor ungültigen Zuständen. Sichtbarkeiten: public, protected, private.<br><b>Vererbung:</b> Eine abgeleitete Klasse übernimmt Attribute und Methoden der Basisklasse und kann sie erweitern/überschreiben.`],
["fisi1","Programmierung","S23","UML: Aggregation vs. Komposition (mit Beispiel).",
`Beide sind „Teil-Ganzes“-Beziehungen.<br><b>Aggregation</b> (leere Raute): Teil kann ohne das Ganze existieren – z. B. Abteilung ↔ Mitarbeiter.<br><b>Komposition</b> (gefüllte Raute): Teil existiert nur mit dem Ganzen – z. B. Gebäude ↔ Raum. Wird das Gebäude gelöscht, verschwinden die Räume.`],
["fisi1","Programmierung","W21","Statische und dynamische UML-Diagramme nennen.",
`<b>Statisch (Struktur):</b> Klassen-, Objekt-, Paket-, Komponenten-, Verteilungsdiagramm.<br><b>Dynamisch (Verhalten):</b> Anwendungsfall-, Aktivitäts-, Sequenz-, Zustandsdiagramm.`],

// ---------- SQL & DB ----------
["fisi1","SQL & Datenbanken","W22,S22","SELECT-Grundgerüst und Reihenfolge der Klauseln.",
`<pre>SELECT spalten | COUNT(*) | SUM(x) …
FROM tabelle
  [INNER JOIN t2 ON tabelle.id = t2.fk]
WHERE bedingung
GROUP BY spalte
HAVING bedingung_auf_gruppe
ORDER BY spalte [ASC|DESC]</pre>LIKE '8%' = beginnt mit 8; Datum als 'JJJJ-MM-TT'.`],
["fisi1","SQL & Datenbanken","W22","Zähle alle aktiven Kunden aus Köln (Tabelle Kunde, Spalten Ort, Aktiv).",
`<pre>SELECT COUNT(*)
FROM Kunde
WHERE Ort = 'Köln' AND Aktiv = TRUE;</pre>`],
["fisi1","SQL & Datenbanken","W22","CREATE TABLE mit Primär- und Fremdschlüssel schreiben.",
`<pre>CREATE TABLE Bestellung (
  BestellNr INT NOT NULL,
  Bestelldatum DATE,
  Betrag DECIMAL(10,2),
  KundenNr INT,
  PRIMARY KEY (BestellNr),
  FOREIGN KEY (KundenNr) REFERENCES Kunde(KundenNr)
);</pre>`],
["fisi1","SQL & Datenbanken","W22","Passende SQL-Datentypen für PLZ, IBAN, Telefonnummer, Datum, Ja/Nein.",
`PLZ: <b>CHAR(5)</b> (feste Länge, führende Null bleibt!)<br>IBAN: CHAR(22)<br>Telefonnummer: VARCHAR(20) (Sonderzeichen, variable Länge)<br>Datum: DATE<br>Ja/Nein: BOOLEAN<br>IDs/Anzahl: INT, Geld: DECIMAL(10,2)`],
["fisi1","SQL & Datenbanken","S22","Die 3 Sensoren mit dem höchsten Messwert am 03.05.2026 ausgeben (Tabelle Messung).",
`<pre>SELECT SensorID
FROM Messung
WHERE Datum = '2026-05-03'
ORDER BY Messwert DESC
LIMIT 3;   -- SQL Server: SELECT TOP 3 …</pre>`],
["fisi1","SQL & Datenbanken","S22","Was bewirkt referentielle Integrität?",
`Ein Fremdschlüssel darf nur auf existierende Primärschlüssel verweisen. Verhindert Einfüge-, Lösch- und Änderungsanomalien (z. B. Datensatz löschen, auf den noch verwiesen wird) → Datenkonsistenz.`],
["fisi1","SQL & Datenbanken","W25","Wozu dient ein Index in einer Datenbank? Nachteile?",
`Ein Index ist eine sortierte Hilfsstruktur (meist B-Baum) über eine oder mehrere Spalten → <b>schnelles Suchen/Sortieren/Joinen</b> ohne komplette Tabelle zu durchlaufen (Full Table Scan).<br>Nachteile: zusätzlicher Speicher, INSERT/UPDATE/DELETE werden langsamer (Index muss gepflegt werden). Sinnvoll für Spalten in WHERE/JOIN/ORDER BY, Primärschlüssel automatisch.`],
["fisi1","SQL & Datenbanken","W25","Was ist Locking in Datenbanken und wozu dient es?",
`Sperrmechanismus bei gleichzeitigen Zugriffen: Ein Datensatz/eine Tabelle wird während einer Transaktion gesperrt, damit nicht zwei Benutzer gleichzeitig ändern (Lost Update, inkonsistente Daten).<br>Lese-Sperre (shared) – andere dürfen lesen; Schreib-Sperre (exclusive) – niemand sonst.<br>Pessimistisch (vorher sperren) vs. optimistisch (beim Speichern auf Konflikt prüfen). Risiko: <b>Deadlock</b> – zwei Transaktionen warten gegenseitig.`],
["fisi1","SQL & Datenbanken","Basis","ACID-Prinzip einer Transaktion.",
`<b>A</b>tomarität – ganz oder gar nicht (Rollback)<br><b>C</b>onsistency – DB bleibt konsistent<br><b>I</b>solation – parallele Transaktionen beeinflussen sich nicht<br><b>D</b>auerhaftigkeit – nach COMMIT dauerhaft gespeichert`],
["fisi1","SQL & Datenbanken","W22","Nenne NoSQL-Datenbanktypen.",
`Dokumentenorientiert (MongoDB), Key-Value (Redis), spaltenorientiert (Cassandra), Graphdatenbanken (Neo4j), Objekt-/Vektordatenbanken.`],
["fisi1","SQL & Datenbanken","Basis","Normalformen 1NF–3NF kurz.",
`<b>1NF:</b> atomare Werte, keine Wiederholungsgruppen.<br><b>2NF:</b> 1NF + jedes Nichtschlüsselattribut voll vom <b>gesamten</b> Primärschlüssel abhängig.<br><b>3NF:</b> 2NF + keine transitiven Abhängigkeiten (Nichtschlüssel hängt nicht von Nichtschlüssel ab).<br>Ziel: Redundanzen und Anomalien vermeiden.`],

// ---------- Betrieb / ITSM ----------
["fisi1","IT-Betrieb","Basis","Was ist ein SLA und was steht drin?",
`Service Level Agreement – Vertrag zwischen Dienstleister und Kunde über die Dienstgüte: Verfügbarkeit (z. B. 99,9 %), Reaktions- und Wiederherstellungszeiten, Servicezeiten (24/7?), Support-Kanäle, Wartungsfenster, Messung/Reporting, Vertragsstrafen.`],
["fisi1","IT-Betrieb","Basis","Incident Management und Support-Level (1st/2nd/3rd Level).",
`<b>Incident:</b> ungeplante Störung → schnell wiederherstellen (Ticket aufnehmen, kategorisieren, priorisieren nach Auswirkung × Dringlichkeit, lösen, schließen).<br><b>1st Level:</b> Service Desk, Annahme & einfache Lösungen.<br><b>2nd Level:</b> Fachspezialisten/Administratoren.<br><b>3rd Level:</b> Hersteller/Entwickler.<br>Eskalation: funktional (nächster Level) oder hierarchisch (Management). Problem Management sucht die Ursache wiederkehrender Incidents.`],
]);
