const defaultEstablishedMeans = {
  "6-MAM 1": { peakArea: 100, retentionTime: 1 },
  "Alprazolam": { peakArea: 200, retentionTime: 2 },
  "Amphetamine": { peakArea: 300, retentionTime: 3 },
  "Benzoylecgonine": { peakArea: 400, retentionTime: 4 },
  "Buprenorphine": { peakArea: 500, retentionTime: 5 },
  "Carisoprodol": { peakArea: 600, retentionTime: 6 },
  "Chlordiazepoxide": { peakArea: 700, retentionTime: 7 },
  "Clonazepam": { peakArea: 800, retentionTime: 8 },
  "Codeine": { peakArea: 900, retentionTime: 9 },
  "Cotinine": { peakArea: 1000, retentionTime: 10 },
  "Diazepam": { peakArea: 1100, retentionTime: 11 },
  "EDDP": { peakArea: 1200, retentionTime: 12 },
  "Fentanyl": { peakArea: 1300, retentionTime: 13 },
  "Flurazepam": { peakArea: 1400, retentionTime: 14 },
  "Gabapentin": { peakArea: 1500, retentionTime: 15 },
  "Hydrocodone": { peakArea: 1600, retentionTime: 16 },
  "Hydromorphone": { peakArea: 1700, retentionTime: 17 },
  "Lorazepam": { peakArea: 1800, retentionTime: 18 },
  "Methadone": { peakArea: 1900, retentionTime: 19 },
  "Methamphetamine": { peakArea: 2000, retentionTime: 20 },
  "Midazolam": { peakArea: 2100, retentionTime: 21 },
  "Morphine": { peakArea: 2200, retentionTime: 22 },
  "Naloxone": { peakArea: 2300, retentionTime: 23 },
  "Naltrexone": { peakArea: 2400, retentionTime: 24 },
  "Nordiazepam": { peakArea: 2500, retentionTime: 25 },
  "Norhydrocodone": { peakArea: 2600, retentionTime: 26 },
  "Oxazepam": { peakArea: 2700, retentionTime: 27 },
  "Oxycodone": { peakArea: 2800, retentionTime: 28 },
  "Oxymorphone": { peakArea: 2900, retentionTime: 29 },
  "Phencyclidine": { peakArea: 3000, retentionTime: 30 },
  "Temazepam": { peakArea: 3100, retentionTime: 31 },
  "THC": { peakArea: 3200, retentionTime: 32 },
  "Tramadol": { peakArea: 3300, retentionTime: 33 },
  "Zolpidem": { peakArea: 3400, retentionTime: 34 }
};

let establishedMeans = loadEstablishedMeans();

function loadEstablishedMeans() {
  const storedMeans = localStorage.getItem('establishedMeans');
  return storedMeans ? JSON.parse(storedMeans) : defaultEstablishedMeans;
}

function saveEstablishedMeans() {
  const updatedMeans = {};

  for (const analyte in establishedMeans) {
    if (establishedMeans.hasOwnProperty(analyte)) {
      const peakArea = parseFloat(document.getElementById(`peakArea_${analyte}`).value);
      const retentionTime = parseFloat(document.getElementById(`retentionTime_${analyte}`).value);
      updatedMeans[analyte] = { peakArea, retentionTime };
    }
  }

  establishedMeans = updatedMeans;
  localStorage.setItem('establishedMeans', JSON.stringify(establishedMeans));
  console.log('Updated Established Means:', establishedMeans);
  displayEstablishedMeans(); // Refresh the display with updated values
  alert('Established means have been saved successfully!'); // Display alert
}

function displayEstablishedMeans() {
  const container = document.getElementById('establishedMeansContainer');
  container.innerHTML = '';

  for (const analyte in establishedMeans) {
    if (establishedMeans.hasOwnProperty(analyte)) {
      const { peakArea, retentionTime } = establishedMeans[analyte];
      const analyteDiv = document.createElement('div');
      analyteDiv.classList.add('established-means-item');
      analyteDiv.innerHTML = `
        <label for="peakArea_${analyte}">${analyte} Peak Area:</label>
        <input type="number" id="peakArea_${analyte}" value="${peakArea}">
        <label for="retentionTime_${analyte}">${analyte} Retention Time:</label>
        <input type="number" id="retentionTime_${analyte}" value="${retentionTime}">
      `;
      container.appendChild(analyteDiv);
    }
  }
}

// Initialize established means display
displayEstablishedMeans();

document.getElementById('saveMeansBtn').addEventListener('click', saveEstablishedMeans);

let selectedInstrument = document.getElementById('lcms').value; // Initialize with default selected value

document.getElementById('lcms').addEventListener('change', (event) => {
  selectedInstrument = event.target.value;
  console.log('Selected Instrument:', selectedInstrument); // Debug
});

document.getElementById('analyzeBtn').addEventListener('click', analyzeData);

document.getElementById('resetBtn').addEventListener('click', function () {
  document.getElementById('lcms').selectedIndex = 0; // Reset LCMS selection
  document.getElementById('fileUpload').value = ''; // Clear file upload field
  document.getElementById('result').innerHTML = ''; // Clear result display
  document.getElementById('search').value = ''; // Clear search input
  clearPreviousRuns(); // Clear previous runs display
});

function clearPreviousRuns() {
  const previousRunsDiv = document.getElementById('previousRuns');
  previousRunsDiv.innerHTML = ''; // Clear previous runs display
}

function analyzeData() {
  const fileInput = document.getElementById('fileUpload');
  if (fileInput.files.length === 0) {
    alert('Please upload a CSV file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const csvData = event.target.result;
    const rows = csvData.split('\n').slice(1); // Skip header row

    let passCount = 0;
    let failCount = 0;

    const results = [];

    rows.forEach(row => {
      const [analyte, peakArea, retentionTime] = row.split(',').map(item => item.trim());
      const meanValues = establishedMeans[analyte];

      if (meanValues) {
        const peakAreaPass = parseFloat(peakArea) >= meanValues.peakArea;
        const retentionTimePass = parseFloat(retentionTime) >= meanValues.retentionTime;

        const analyteResult = {
          analyte: analyte,
          peakArea: parseFloat(peakArea),
          retentionTime: parseFloat(retentionTime),
          peakAreaPass: peakAreaPass,
          retentionTimePass: retentionTimePass
        };

        results.push(analyteResult);

        if (peakAreaPass && retentionTimePass) {
          passCount++;
        } else {
          failCount++;
        }
      }
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    // Display overall result at the top
    const runResult = passCount >= 2 ? 'PASS' : 'FAIL';
    resultDiv.innerHTML = `<h2>Overall Result: ${runResult}</h2>`;

    // Display individual analyte results
    results.forEach(result => {
      const analyteDiv = document.createElement('div');
      analyteDiv.classList.add('analyte-result');
      analyteDiv.innerHTML = `
        <h3>${result.analyte}</h3>
        <p>Peak Area: ${result.peakArea} (${result.peakAreaPass ? 'Pass' : 'Fail'})</p>
        <p>Retention Time: ${result.retentionTime} (${result.retentionTimePass ? 'Pass' : 'Fail'})</p>
        <hr>
      `;
      resultDiv.appendChild(analyteDiv);
    });

    // Save the run data
    saveRun(selectedInstrument, runResult, csvData);
  };

  reader.readAsText(fileInput.files[0]);
}

function saveRun(instrument, result, data) {
  const previousRuns = JSON.parse(localStorage.getItem('previousRuns')) || [];
  previousRuns.push({ instrument, result, data, timestamp: new Date().toISOString() });
  localStorage.setItem('previousRuns', JSON.stringify(previousRuns));
}

function searchRuns() {
  const searchInput = document.getElementById('search');
  if (!searchInput) {
    return;
  }

  const query = searchInput.value.toLowerCase();
  const previousRuns = JSON.parse(localStorage.getItem('previousRuns')) || [];
  const filteredRuns = previousRuns.filter(run => run.instrument.toLowerCase().includes(query) || run.result.toLowerCase().includes(query));

  const previousRunsDiv = document.getElementById('previousRuns');
  previousRunsDiv.innerHTML = ''; // Clear previous runs display

  filteredRuns.forEach(run => {
    const runDiv = document.createElement('div');
    runDiv.classList.add('run-result');
    runDiv.innerHTML = `
      <p>Instrument: ${run.instrument}</p>
      <p>Result: ${run.result}</p>
      <p>Date: ${new Date(run.timestamp).toLocaleString()}</p>
      <hr>
    `;
    previousRunsDiv.appendChild(runDiv);
  });
}

document.getElementById('searchBtn').addEventListener('click', searchRuns);
document.getElementById('search').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchRuns();
  }
});