// TMZ - Time Zone Manager
// Main JavaScript file

// Access Luxon library
const { DateTime, Info } = luxon;

// DOM Elements
const localTimeDisplay = document.getElementById('local-time-display');
const useLocalTimeBtn = document.getElementById('use-local-time-btn');
const locationSearch = document.getElementById('location-search');
const lookupResults = document.getElementById('lookup-results');
const fromLocation = document.getElementById('from-location');
const toLocation = document.getElementById('to-location');
const fromDate = document.getElementById('from-date');
const fromTime = document.getElementById('from-time');
const conversionResults = document.getElementById('conversion-results');
const autocompleteSuggestions = document.getElementById('autocomplete-suggestions');
const fromAutocomplete = document.getElementById('from-autocomplete');
const toAutocomplete = document.getElementById('to-autocomplete');

// Global variables
let userTimeZone = '';
let timeZoneList = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    fromDate.value = formattedDate;
    
    // Set current time as default
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    fromTime.value = `${hours}:${minutes}`;
    
    // Detect user's time zone
    detectUserTimeZone();
    
    // Generate list of time zones
    generateTimeZoneList();
    
    // Set up event listeners
    setupEventListeners();
});

// Feature C: Detect user's time zone
function detectUserTimeZone() {
    try {
        // Get the user's time zone
        userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Display local time
        updateLocalTimeDisplay();
        
        // Update every minute
        setInterval(updateLocalTimeDisplay, 60000);
    } catch (error) {
        console.error('Error detecting time zone:', error);
        localTimeDisplay.innerHTML = '<p><i class="fas fa-exclamation-circle"></i> Unable to detect your time zone. Please enter it manually.</p>';
    }
}

// Update the local time display
function updateLocalTimeDisplay() {
    try {
        const now = DateTime.now().setZone(userTimeZone);
        const formattedTime = now.toLocaleString(DateTime.DATETIME_FULL);
        
        localTimeDisplay.innerHTML = `
            <p><i class="fas fa-clock"></i> <strong>${formattedTime}</strong></p>
            <p><i class="fas fa-map-marker-alt"></i> Time Zone: ${userTimeZone}</p>
        `;
    } catch (error) {
        console.error('Error displaying local time:', error);
        localTimeDisplay.innerHTML = '<p><i class="fas fa-exclamation-circle"></i> Error displaying local time.</p>';
    }
}

// Generate list of time zones for autocomplete
function generateTimeZoneList() {
    try {
        // Get all IANA time zones
        timeZoneList = Intl.supportedValuesOf('timeZone');
    } catch (error) {
        console.error('Error generating time zone list:', error);
        // Fallback list of common time zones
        timeZoneList = [
            'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
            'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
            'Australia/Sydney', 'Pacific/Auckland', 'America/Sao_Paulo', 'Asia/Dubai',
            'Asia/Kolkata', 'Africa/Johannesburg', 'America/Mexico_City', 'Asia/Hong_Kong'
        ];
    }
}

// Set up event listeners
function setupEventListeners() {
    // Use local time button
    useLocalTimeBtn.addEventListener('click', function() {
        if (userTimeZone) {
            fromLocation.value = userTimeZone;
            hideAllAutocomplete();
            
            // Add visual feedback
            useLocalTimeBtn.innerHTML = '<i class="fas fa-check"></i> Location Set!';
            setTimeout(() => {
                useLocalTimeBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Use My Location';
            }, 2000);
        }
    });
    
    // Location search (instant lookup)
    locationSearch.addEventListener('input', function() {
        showAutocomplete(this, autocompleteSuggestions);
    });
    
    // From location search
    fromLocation.addEventListener('input', function() {
        showAutocomplete(this, fromAutocomplete);
    });
    
    // To location search
    toLocation.addEventListener('input', function() {
        showAutocomplete(this, toAutocomplete);
    });
    
    // Handle selection from autocomplete
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('suggestion-item')) {
            selectTimeZone(e.target);
        }
    });
    
    // Perform time lookup when pressing Enter in search box
    locationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performTimeLookup(locationSearch.value);
            hideAllAutocomplete();
        }
    });
    
    // Perform conversion when all inputs are filled
    [fromLocation, toLocation, fromDate, fromTime].forEach(element => {
        element.addEventListener('change', performTimeConversion);
    });
    
    // Add focus effects to input fields
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
    });
}

// Show autocomplete suggestions
function showAutocomplete(inputElement, suggestionContainer) {
    const inputValue = inputElement.value.toLowerCase();
    
    if (inputValue.length < 2) {
        suggestionContainer.style.display = 'none';
        return;
    }
    
    // Filter time zones based on input
    const filteredZones = timeZoneList.filter(zone => 
        zone.toLowerCase().includes(inputValue)
    ).slice(0, 10); // Limit to 10 suggestions
    
    if (filteredZones.length > 0) {
        suggestionContainer.innerHTML = '';
        filteredZones.forEach(zone => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `<i class="fas fa-globe-americas"></i> ${zone}`;
            div.dataset.zone = zone;
            suggestionContainer.appendChild(div);
        });
        
        suggestionContainer.style.display = 'block';
        positionAutocomplete(inputElement, suggestionContainer);
    } else {
        suggestionContainer.style.display = 'none';
    }
}

// Position autocomplete below the input
function positionAutocomplete(inputElement, suggestionContainer) {
    const rect = inputElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    suggestionContainer.style.top = (rect.top + rect.height + scrollTop) + 'px';
    suggestionContainer.style.left = (rect.left) + 'px';
    suggestionContainer.style.width = (rect.width) + 'px';
}

// Hide all autocomplete containers
function hideAllAutocomplete() {
    autocompleteSuggestions.style.display = 'none';
    fromAutocomplete.style.display = 'none';
    toAutocomplete.style.display = 'none';
}

// Select a time zone from autocomplete
function selectTimeZone(element) {
    const zone = element.dataset.zone;
    
    // Find the closest input field
    let inputField;
    if (element.parentElement.id === 'autocomplete-suggestions') {
        inputField = locationSearch;
    } else if (element.parentElement.id === 'from-autocomplete') {
        inputField = fromLocation;
    } else if (element.parentElement.id === 'to-autocomplete') {
        inputField = toLocation;
    }
    
    if (inputField) {
        inputField.value = zone;
        hideAllAutocomplete();
        
        // Add visual feedback
        inputField.classList.add('input-success');
        setTimeout(() => {
            inputField.classList.remove('input-success');
        }, 1500);
        
        // Trigger appropriate action based on which field was filled
        if (inputField === locationSearch) {
            performTimeLookup(zone);
        } else {
            performTimeConversion();
        }
    }
}

// Feature A: Perform time lookup for a location
function performTimeLookup(location) {
    if (!location) return;
    
    try {
        const now = DateTime.now().setZone(location);
        
        // Check if the time zone is valid
        if (!now.isValid) {
            lookupResults.innerHTML = `<p class="error"><i class="fas fa-exclamation-circle"></i> Invalid time zone: ${location}</p>`;
            return;
        }
        
        const timeDetails = `
            <div class="time-details">
                <div class="time-detail">
                    <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
                    <p>${location}</p>
                </div>
                <div class="time-detail">
                    <h4><i class="fas fa-clock"></i> Current Time</h4>
                    <p>${now.toLocaleString(DateTime.TIME_WITH_SECONDS)}</p>
                </div>
                <div class="time-detail">
                    <h4><i class="fas fa-calendar-alt"></i> Current Date</h4>
                    <p>${now.toLocaleString(DateTime.DATE_FULL)}</p>
                </div>
                <div class="time-detail">
                    <h4><i class="fas fa-globe-americas"></i> Time Zone</h4>
                    <p>${now.zone.name}</p>
                </div>
                <div class="time-detail">
                    <h4><i class="fas fa-exchange-alt"></i> UTC Offset</h4>
                    <p>UTC${now.offsetNameShort}</p>
                </div>
            </div>
        `;
        
        lookupResults.innerHTML = timeDetails;
    } catch (error) {
        console.error('Error performing time lookup:', error);
        lookupResults.innerHTML = `<p class="error"><i class="fas fa-exclamation-circle"></i> Error looking up time for ${location}. Please check the time zone name.</p>`;
    }
}

// Feature B: Perform time conversion
function performTimeConversion() {
    const fromZone = fromLocation.value;
    const toZone = toLocation.value;
    const date = fromDate.value;
    const time = fromTime.value;
    
    // Check if all fields are filled
    if (!fromZone || !toZone || !date || !time) {
        return;
    }
    
    try {
        // Create DateTime object for the "from" location
        const fromDateTime = DateTime.fromISO(`${date}T${time}`, { zone: fromZone });
        
        // Check if the "from" time is valid
        if (!fromDateTime.isValid) {
            conversionResults.innerHTML = `<p class="error"><i class="fas fa-exclamation-circle"></i> Invalid date/time for ${fromZone}</p>`;
            return;
        }
        
        // Convert to the "to" location
        const toDateTime = fromDateTime.setZone(toZone);
        
        // Check if the "to" time is valid
        if (!toDateTime.isValid) {
            conversionResults.innerHTML = `<p class="error"><i class="fas fa-exclamation-circle"></i> Invalid time zone: ${toZone}</p>`;
            return;
        }
        
        // Calculate time difference
        const fromOffset = fromDateTime.offset;
        const toOffset = toDateTime.offset;
        const offsetDifference = (toOffset - fromOffset) / 60; // In hours
        
        const conversionDetails = `
            <div class="time-details">
                <div class="time-detail">
                    <h4><i class="fas fa-arrow-right"></i> From: ${fromZone}</h4>
                    <p>${fromDateTime.toLocaleString(DateTime.DATETIME_FULL)}</p>
                </div>
                <div class="time-detail">
                    <h4><i class="fas fa-arrow-left"></i> To: ${toZone}</h4>
                    <p>${toDateTime.toLocaleString(DateTime.DATETIME_FULL)}</p>
                </div>
                <div class="time-detail">
                    <h4><i class="fas fa-exchange-alt"></i> Time Difference</h4>
                    <p>${offsetDifference >= 0 ? '+' : ''}${offsetDifference} hours</p>
                </div>
            </div>
        `;
        
        conversionResults.innerHTML = conversionDetails;
    } catch (error) {
        console.error('Error performing time conversion:', error);
        conversionResults.innerHTML = `<p class="error"><i class="fas fa-exclamation-circle"></i> Error converting time. Please check your inputs.</p>`;
    }
}

// Close autocomplete when clicking elsewhere
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container') && 
        !e.target.closest('#time-converter-section')) {
        hideAllAutocomplete();
    }
});