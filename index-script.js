document.addEventListener('DOMContentLoaded', function () {
  const setPreferencesBtn = document.getElementById('set-preferences-btn');
  const precisionSelect = document.getElementById('precision-select');
  const resolutionSection = document.getElementById('resolution-section');
  const resolutionSelect = document.getElementById('resolution-select');

  // Function to show or hide the resolution section based on the selected precision
  function toggleResolutionSection() {
    if (precisionSelect.value === 'Feet & Inches (Fractional)') {
      resolutionSection.style.display = 'block';
      setFractionalResolutionOptions();
    } else {
      resolutionSection.style.display = 'block'; // Change to 'block' to display the resolution section
      setDecimalResolutionOptions();
    }
  }

  // Function to set the resolution options for feet & inches (fractional) precision
  function setFractionalResolutionOptions() {
    resolutionSelect.innerHTML = `
      <option value="none">None</option>
      <option value="1/2">1/2</option>
      <option value="1/4">1/4</option>
      <option value="1/8">1/8</option>
      <option value="1/16">1/16</option>
      <option value="1/32">1/32</option>
      <option value="1/64">1/64</option>
      <option value="full-resolution">Full Resolution</option>
    `;
  }

  // Function to set the resolution options for other precision choices
  function setDecimalResolutionOptions() {
    resolutionSelect.innerHTML = `
      <option value="1">1</option>
      <option value="0.1">.1</option>
      <option value="0.01">.01</option>
      <option value="0.001">.001</option>
      <option value="0.0001">.0001</option>
      <option value="0.00001">.00001</option>
      <option value="0.000001">.000001</option>
      <option value="no-limit">No Limit</option>
    `;
  }

  // Event listener for the precision select dropdown
  precisionSelect.addEventListener('change', toggleResolutionSection);

  // Function to save preferences
  function savePreferences(event) {
    event.preventDefault();

    const system = precisionSelect.selectedOptions[0].parentNode.label; // Get the selected system based on the parent label
    const precision = precisionSelect.value;
    const resolution = resolutionSelect.value;

    localStorage.setItem('system', system);
    localStorage.setItem('precision', precision);
    localStorage.setItem('resolution', resolution);

    alert('Preferences have been saved');
    window.location.href = 'length-input.html';
  }

  setPreferencesBtn.addEventListener('click', savePreferences);

  toggleResolutionSection(); // Initially toggle the resolution section based on the selected precision

  // Display saved precision and resolution values
  const savedPrecision = localStorage.getItem('precision');
  if (savedPrecision) {
    precisionSelect.value = savedPrecision;
    toggleResolutionSection(); // Call this again to update the resolution options based on the saved precision
  }

  const savedResolution = localStorage.getItem('resolution');
  if (savedResolution) {
    resolutionSelect.value = savedResolution;
  }
});
