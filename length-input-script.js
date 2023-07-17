// Get the length input element
const lengthInput = document.getElementById('length-input');
// Get the length unit element
const lengthUnit = document.getElementById('length-unit');

// Function to retrieve the length value
function getLength() {
  // Fetch the length value from storage or use a default value
  return parseFloat(localStorage.getItem('length')) || 0;
}

// Function to calculate the greatest common divisor (GCD) of two numbers
function getGCD(a, b) {
  if (b === 0) {
    return a;
  }
  return getGCD(b, a % b);
}

// Function to convert length from centimeters to the user's chosen system and precision
function convertLength(length, system, precision) {
  if (system === 'Metric') {
    switch (precision) {
      case 'Kilometers':
        return length / 100000 + ' km';
      case 'Meters':
        return length / 100 + ' m';
      case 'Centimeters':
        return length + ' cm';
      case 'Millimeters':
        return length * 10 + ' mm';
      case 'Microns':
        return length * 10000 + ' µm';
    }
  } else if (system === 'Imperial') {
    switch (precision) {
      case 'Miles':
        return length * 0.00000621371192237334 + ' mi';
      case 'Yards':
        return length * 0.010936132983377077 + ' yd';
      case 'Feet':
        return length * 0.03280839895013123 + ' ft';
      case 'Feet & Inches (Decimal)':
        const feet = Math.floor(length * 0.03280839895013123);
        const inches = (length * 0.03280839895013123 - feet) * 12;
        return `${feet}' ${inches.toFixed(2)}"`;
      case 'Feet & Inches (Fractional)':
        const totalInches = length * 0.03280839895013123 * 12;
        const feetFraction = Math.floor(totalInches / 12);
        const inchesFraction = totalInches % 12;
        const wholeInches = Math.floor(inchesFraction);
        const fractionalInches = inchesFraction - wholeInches;
        const fractionNumerator = Math.round(fractionalInches * 64);
        const fractionDenominator = 64;

        // Reduce the fraction to its lowest terms
        const gcd = getGCD(fractionNumerator, fractionDenominator);
        const reducedNumerator = fractionNumerator / gcd;
        const reducedDenominator = fractionDenominator / gcd;

        return `${feetFraction}' ${wholeInches} ${reducedNumerator}/${reducedDenominator}"`;
    }
  }
  return ''; // Return an empty string if no conversion is applied
}

// Function to update the length value and unit on the page
function updateLength() {
  const length = getLength();
  const system = localStorage.getItem('system');
  const precision = localStorage.getItem('precision');

  const convertedLength = convertLength(length, system, precision);

  lengthInput.value = convertedLength; // Update the input value with the converted length

  lengthUnit.textContent = precision;
}

// Event listener for the Update Length button
document.getElementById('update-btn').addEventListener('click', function () {
  const newLength = parseFloat(lengthInput.value);
  if (!isNaN(newLength)) {
    localStorage.setItem('length', newLength);
    updateLength();
    alert('Length has been updated successfully.');
  } else {
    alert('Please enter a valid length value.');
  }
});

// Event listener for the Preferences button
document.getElementById('preferences-btn').addEventListener('click', function () {
  window.location.href = 'index.html';
});

// Call the updateLength function when the page loads
updateLength();
