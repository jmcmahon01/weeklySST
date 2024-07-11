const establishedMeans = {
  morphine: { peakArea: 1000, retentionTime: 5 },
  hydromorphone: { peakArea: 1200, retentionTime: 5.5 },
  THC: { peakArea: 1500, retentionTime: 6 },
  amitriptyline: { peakArea: 900, retentionTime: 4.5 }
};

let selectedInstrument;

document.getElementById('lcms').addEventListener('change', (event) => {
  selectedInstrument = event.target.value;
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

    const runResult = passCount >= 2 ? 'PASS' : 'FAIL';
    resultDiv.innerHTML += `<h2>Overall Result: ${runResult}</h2>`;

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
    console.error('Search input element not found.');
    return;
  }

  const searchTerm = searchInput.value.trim().toLowerCase();
  const previousRuns = JSON.parse(localStorage.getItem('previousRuns')) || [];

  const filteredRuns = previousRuns.filter(run => {
    return run.instrument && run.instrument.toLowerCase().includes(searchTerm);
  });

  const previousRunsDiv = document.getElementById('previousRuns');
  previousRunsDiv.innerHTML = '';

  if (filteredRuns.length === 0) {
    const noResultsDiv = document.createElement('div');
    noResultsDiv.textContent = 'No results found.';
    previousRunsDiv.appendChild(noResultsDiv);
  } else {
    filteredRuns.forEach(run => {
      const runDiv = document.createElement('div');
      runDiv.textContent = `Instrument: ${run.instrument}, Result: ${run.result}, Date: ${new Date(run.timestamp).toLocaleString()}`;
      previousRunsDiv.appendChild(runDiv);
    });
  }
}
