# Versiebeheer en Backup Plan

1. Git Repository Setup:
   - Initialiseer een Git repository in de project root.
   - Maak een .gitignore bestand om onnodige bestanden uit te sluiten.

2. Branch Strategie:
   - main: Stabiele, productie-klare code.
   - develop: Integratie branch voor features.
   - feature/[feature-naam]: Voor het ontwikkelen van nieuwe features.

3. Commit Strategie:
   - Maak kleine, gerichte commits.
   - Gebruik duidelijke, beschrijvende commit berichten.

4. Wanneer Opslaan/Committen:
   - Na het voltooien van elke module.
   - Na het implementeren van een belangrijke feature binnen een module.
   - Voor en na het maken van grote architecturale veranderingen.
   - Aan het einde van elke ontwikkelsessie.

5. Tagging:
   - Gebruik semantische versioning (bijv. v1.0.0).
   - Tag na het voltooien van belangrijke mijlpalen of releases.

6. Backup:
   - Voer wekelijks backups uit van de gehele projectdirectory.
   - Bewaar backups op een veilige, externe locatie.

7. Pull Requests:
   - Gebruik pull requests voor code review voordat features in develop worden gemerged.

8. Documentatie:
   - Houd een CHANGELOG.md bestand bij met alle significante wijzigingen.

Onthoud: Commit vroeg, commit vaak. Het is makkelijker om kleine veranderingen terug te draaien dan grote.
