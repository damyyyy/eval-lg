// Import du module fs promisifié pour utiliser async/await
const fs = require('fs').promises;

// Fonction pour lire et parser un fichier JSON, retournant dans notre cas un array
const readFileJSON = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

// Fonction pour transformer un tableau JSON en un tableau de lignes CSV
const transformToCSV = (jsonArray) => {
  // Initialise avec l'en-tête
  const lines = ['Nom;Compagnie'];
  // Parcourt l'array JSON
  for (const { name, company, isActive } of jsonArray) {
      // Si le client est actif, ajoute une ligne
      if (isActive) {
          lines.push(`${name};${company}`);
      }
  }
  return lines;
};

// Fonction pour écrire un fichier CSV
const writeCSV = async (filePath, lines) => {
    // Prépare les données et ajoute le BOM UTF-8 pour résoudre le problème d'accents
    const output = '\uFEFF' + lines.join('\n');

    await fs.writeFile(filePath, output, 'utf8');
};

// Fonction principale, auto-exécutée
(async () => {
    
    const inputFile = '/home/d/logicgram/eval-lg/data/users.json';
    const outputFile = '/home/d/logicgram/eval-lg/data/sortie.csv';

    try {
        // Lecture et parsing du fichier JSON
        const jsonData = await readFileJSON(inputFile);
        // Transformation en lignes CSV
        const csvLines = transformToCSV(jsonData);
        // Écriture du fichier CSV
        await writeCSV(outputFile, csvLines);

        console.log("Fichier CSV généré avec succès !");
    } catch (error) {
        console.error("Erreur :", error);
    }
})();
