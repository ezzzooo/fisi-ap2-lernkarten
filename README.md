# FISI AP2 Lernkarten

Lernkarten-Web-App für die **Abschlussprüfung Teil 2 – Fachinformatiker/-in Systemintegration (AO 2020)**.

👉 **App öffnen:** https://ezzzooo.github.io/fisi-ap2-lernkarten/

## Inhalt
- ~300 Karten in drei Bereichen: *Konzeption & Administration von IT-Systemen*, *Analyse & Entwicklung von Netzwerken*, *Wirtschafts- und Sozialkunde*
- Themen aus den AP2-Prüfungen W2021 – S2025 sowie den berichteten Themen aus W2025/26 und S2026 (markiert mit **NEU**)
- Spaced Repetition (Leitner-System) – neuere Prüfungsthemen werden zuerst gelernt
- Prüfungsmodus (20 zufällige Karten), Suche, Fortschritt je Thema, Export/Import, Dark Mode, offline nutzbar (PWA)

## Hinweis
Alle Karten sind **eigene Formulierungen** zu den Prüfungsthemen. Es werden keine Original-Prüfungsaufgaben oder -lösungen der IHK/ZPA wiedergegeben; die Angabe „S25“ o. Ä. kennzeichnet lediglich, in welcher Prüfung ein Thema vorkam. Gesetzliche Werte (Beitragssätze etc.) vor der Prüfung bitte aktuell prüfen.

## Karten bearbeiten
Die Karten liegen in `data/fisi1.js`, `data/fisi2.js` und `data/wiso.js`. Format:
```js
["fisi2", "Thema", "S25,W24", "Frage?", `Antwort mit <b>HTML</b>`],
```
