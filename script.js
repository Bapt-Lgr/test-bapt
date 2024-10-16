// Fonction pour charger le fichier CSV et afficher les données dans la liste déroulante
async function loadCSV() {
    // Charger le fichier CSV avec fetch
    const response = await fetch('data.csv');
    const csvData = await response.text();

    // Utiliser PapaParse pour parser le CSV
    Papa.parse(csvData, {
        header: true, // Si la première ligne du fichier CSV est une ligne d'en-tête
        complete: function(results) {
            const items = results.data;

            // Récupérer l'élément select dans le DOM
            const select = document.getElementById('item-select');

            // Parcourir les données CSV et ajouter les options à la liste déroulante
            items.forEach(item => {
                if (item.name) { // S'assurer que l'élément a une valeur
                    const option = document.createElement('option');
                    option.value = item.name;
                    option.textContent = item.name;
                    select.appendChild(option);
                }
            });
        }
    });
}

// Appel de la fonction au chargement de la page
window.onload = loadCSV;

document.addEventListener("DOMContentLoaded", () => {
    fetch('../static/csv/materials.csv')
        .then(response => response.text())
        .then(data => {
            // Vérifier le séparateur du fichier CSV (utiliser ; ou ,)
            const rows = data.split('\n').map(row => row.split(';'));

            const table = document.createElement('table');
            const tableBody = document.createElement('tbody');

            // Créer l'en-tête du tableau
            const headerRow = document.createElement('tr');
            const headers = rows[0];
            headers.forEach(headerText => {
                const headerCell = document.createElement('th');
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });
            table.appendChild(headerRow);

            // Ajouter les données du tableau
            rows.slice(1).forEach(row => {
                const rowElement = document.createElement('tr');
                row.forEach(columnText => {
                    const cell = document.createElement('td');
                    cell.textContent = columnText;
                    rowElement.appendChild(cell);
                });
                tableBody.appendChild(rowElement);
            });

            table.appendChild(tableBody);
            document.querySelector('.content').appendChild(table);
        })
        .catch(error => console.error('Erreur lors du chargement du CSV:', error));
});

