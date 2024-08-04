//Business Logic
const defaultEstablishedMeans = {
  '6-MAM 1': { peakArea: 1000, retentionTime: 5 },
  'Alprazolam 1': { peakArea: 1000, retentionTime: 5 },
  'Aminoclonazepam 1': { peakArea: 1000, retentionTime: 5 },
  'Aminoflunitrazepam 1': { peakArea: 1000, retentionTime: 5 },
  'Amitriptyline 1': { peakArea: 1000, retentionTime: 5 },
  'Amphetamine 1': { peakArea: 1000, retentionTime: 5 },
  'Benzoylecgonine 1': { peakArea: 1000, retentionTime: 5 },
  'Buprenorphine 1': { peakArea: 1000, retentionTime: 5 },
  'Bupropion 1': { peakArea: 1000, retentionTime: 5 },
  'Carisoprodol 1': { peakArea: 1000, retentionTime: 5 },
  'Citalopram 1': { peakArea: 1000, retentionTime: 5 },
  'Clonidine 1': { peakArea: 1000, retentionTime: 5 },
  'Codeine 1': { peakArea: 1000, retentionTime: 5 },
  'Cotinine 1': { peakArea: 1000, retentionTime: 5 },
  'Cyclobenzaprine 1': { peakArea: 1000, retentionTime: 5 },
  'Desipramine 1': { peakArea: 1000, retentionTime: 5 },
  'Desmethyldoxepin 1': { peakArea: 1000, retentionTime: 5 },
  'Desmethyltapentadol 1': { peakArea: 1000, retentionTime: 5 },
  'Desmethyltramadol 1': { peakArea: 1000, retentionTime: 5 },
  'Dextromethorphan 1': { peakArea: 1000, retentionTime: 5 },
  'Diazepam 1': { peakArea: 1000, retentionTime: 5 },
  'Doxepin 1': { peakArea: 1000, retentionTime: 5 },
  'EDDP 1': { peakArea: 1000, retentionTime: 5 },
  'Fentanyl 1': { peakArea: 1000, retentionTime: 5 },
  'Fluoxetine 1': { peakArea: 1000, retentionTime: 5 },
  'Hydrocodone 1': { peakArea: 1000, retentionTime: 5 },
  'Hydromorphone 1': { peakArea: 1000, retentionTime: 5 },
  'Hydroxyalprazolam 1': { peakArea: 1000, retentionTime: 5 },
  'Hydroxybupropion 1': { peakArea: 1000, retentionTime: 5 },
  'Imipramine 1': { peakArea: 1000, retentionTime: 5 },
  'Ketamine 1': { peakArea: 1000, retentionTime: 5 },
  'Lorazepam 1': { peakArea: 1000, retentionTime: 5 },
  'MDA 1': { peakArea: 1000, retentionTime: 5 },
  'MDEA 1': { peakArea: 1000, retentionTime: 5 },
  'MDMA 1': { peakArea: 1000, retentionTime: 5 },
  'Meperidine 1': { peakArea: 1000, retentionTime: 5 },
  'Meprobamate 1': { peakArea: 1000, retentionTime: 5 },
  'Methadone 1': { peakArea: 1000, retentionTime: 5 },
  'Methamphetamine 1': { peakArea: 1000, retentionTime: 5 },
  'Methylphenidate 1': { peakArea: 1000, retentionTime: 5 },
  'Morphine 1': { peakArea: 1000, retentionTime: 5 },
  'Naloxone 1': { peakArea: 1000, retentionTime: 5 },
  'Naltrexone 1': { peakArea: 1000, retentionTime: 5 },
  'Norbuprenorphine 1': { peakArea: 1000, retentionTime: 5 },
  'Nordiazepam 1': { peakArea: 1000, retentionTime: 5 },
  'Norfentanyl 1': { peakArea: 1000, retentionTime: 5 },
  'Norhydrocodone 1': { peakArea: 1000, retentionTime: 5 },
  'Norketamine 1': { peakArea: 1000, retentionTime: 5 },
  'Normeperidine 1': { peakArea: 1000, retentionTime: 5 },
  'Noroxycodone 1': { peakArea: 1000, retentionTime: 5 },
  'Nortriptyline 1': { peakArea: 1000, retentionTime: 5 },
  'Oxazepam 1': { peakArea: 1000, retentionTime: 5 },
  'Oxycodone 1': { peakArea: 1000, retentionTime: 5 },
  'Oxymorphone 1': { peakArea: 1000, retentionTime: 5 },
  'Phencyclidine 1': { peakArea: 1000, retentionTime: 5 },
  'Ritalinic Acid 1': { peakArea: 1000, retentionTime: 5 },
  'Tapentadol 1': { peakArea: 1000, retentionTime: 5 },
  'Temazepam 1': { peakArea: 1000, retentionTime: 5 },
  'Tramadol 1': { peakArea: 1000, retentionTime: 5 },
  'Zaleplon 1': { peakArea: 1000, retentionTime: 5 },
  'Zolpidem 1': { peakArea: 1000, retentionTime: 5 },
  'Zolpidem Phenyl COOH 1': { peakArea: 1000, retentionTime: 5 },
  'Amobarbital 1': { peakArea: 1000, retentionTime: 5 },
  'Butalbital 1': { peakArea: 1000, retentionTime: 5 },
  'Phenobarbital 1': { peakArea: 1000, retentionTime: 5 },
  'THC-COOH 1': { peakArea: 1000, retentionTime: 5 }
};

let establishedMeans = JSON.parse(localStorage.getItem('establishedMeans')) || { ...defaultEstablishedMeans };

function saveEstablishedMeans() {
  const updatedMeans = {};

  for (const analyte in establishedMeans) {
    if (establishedMeans.hasOwnProperty(analyte)) {
      const peakArea = parseFloat(document.getElementById(`peakArea_${analyte}`).value);
      const retentionTime = parseFloat(document.getElementById(`retentionTime_${analyte}`).value);
      updatedMeans[analyte] = { peakArea, retentionTime };
    }
  }

  establishedMeans = { ...updatedMeans };
  localStorage.setItem('establishedMeans', JSON.stringify(establishedMeans));
  console.log('Updated Established Means:', establishedMeans);
  alert('Established means have been saved successfully!');
}

function analyzeData() {
  const fileInput = document.getElementById('fileUpload');
  const reader = new FileReader();

  reader.onload = function (event) {
    const csvData = event.target.result;
    const rows = csvData.split('\n').slice(1); // Skip header row
    let passCount = 0;
    let failCount = 0;
    const results = [];

    rows.forEach(row => {
      if (row.trim() === '') return; // Skip empty rows

      const [analyte, peakArea, retentionTime] = row.split(',').map(item => item.trim());
      if (!analyte || isNaN(peakArea) || isNaN(retentionTime)) return;

      const meanValues = establishedMeans[analyte];
      if (!meanValues) return;

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
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    const runResult = passCount >= Object.keys(defaultEstablishedMeans).length / 2 ? 'PASS' : 'FAIL';
    resultDiv.innerHTML = `<h2>Overall Result: ${runResult}</h2>`;

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

    const selectedInstrument = document.getElementById('lcms').value;
    saveRun(selectedInstrument, runResult, csvData);
  };

  reader.onerror = function (error) {
    console.error('Error reading file:', error);
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
    console.error('Search input element not found');
    return;
  }

  const query = searchInput.value.toLowerCase();
  const previousRuns = JSON.parse(localStorage.getItem('previousRuns')) || [];

  if (!Array.isArray(previousRuns)) {
    console.error('previousRuns is not an array');
    return;
  }

  const filteredRuns = previousRuns.filter(run => {
    const instrumentValid = typeof run.instrument === 'string';
    const resultValid = typeof run.result === 'string';

    if (!instrumentValid || !resultValid) {
      console.warn('Invalid run format:', run);
      return false;
    }

    return (
      run.instrument.toLowerCase().includes(query) ||
      run.result.toLowerCase().includes(query)
    );
  });

  const previousRunsDiv = document.getElementById('previousRuns');
  previousRunsDiv.innerHTML = ''; // Clear previous runs display

  if (filteredRuns.length === 0) {
    previousRunsDiv.innerHTML = '<p>No matching runs found.</p>';
  } else {
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
}

function resetForm() {
  document.getElementById('lcms').value = ''; // Clear instrument selection
  document.getElementById('fileUpload').value = ''; // Clear file input
  document.getElementById('search').value = ''; // Clear search input
  document.getElementById('result').innerHTML = ''; // Clear analyze data results
  document.getElementById('previousRuns').innerHTML = ''; // Clear search previous runs results

  // Do not reset established means to default
  displayEstablishedMeans(); // Re-display the current established means
}


// UI Logic

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

  // Add the "Save Changes" button
  const saveButton = document.createElement('button');
  saveButton.id = 'saveMeansBtn';
  saveButton.textContent = 'Save Changes';
  container.appendChild(saveButton);

  // Add another "Hide Established Means" button at the bottom
  const hideButtonBottom = document.createElement('button');
  hideButtonBottom.id = 'hideMeansBtnBottom';
  hideButtonBottom.textContent = 'Hide Established Means';
  container.appendChild(hideButtonBottom);

  // Attach event listener to the save button
  saveButton.addEventListener('click', saveEstablishedMeans);
  hideButtonBottom.addEventListener('click', toggleEstablishedMeans);
}

// Toggle Established Means Function
function toggleEstablishedMeans() {
  const meansContainer = document.getElementById('establishedMeansContainer');
  const toggleButton = document.getElementById('toggleMeansBtn');
  
  if (meansContainer.style.display === 'none' || !meansContainer.style.display) {
    meansContainer.style.display = 'block';
    toggleButton.textContent = 'Hide Established Means';
  } else {
    meansContainer.style.display = 'none';
    toggleButton.textContent = 'Show Established Means';
  }
}

// Initialize established means display and event listeners
document.addEventListener('DOMContentLoaded', () => {
  displayEstablishedMeans();

  // Initially hide established means section
  const meansContainer = document.getElementById('establishedMeansContainer');
  const toggleButton = document.getElementById('toggleMeansBtn');

  // Ensure initial display state
  if (meansContainer) {
    meansContainer.style.display = 'none'; // Or 'block' based on initial state
  }

  // Check if button exists
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleEstablishedMeans);
  }
  
  // Add event listeners for other buttons
  document.getElementById('searchBtn').addEventListener('click', searchRuns);
  document.getElementById('search').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      searchRuns();
    }
  });
  document.getElementById('analyzeBtn').addEventListener('click', analyzeData);
  document.getElementById('resetBtn').addEventListener('click', resetForm);
});