// Constants and utilities
const INDIAN_STATES = [
    "Andhra Pradesh",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Tamil Nadu",
    "Telangana"
];

const MAJOR_CITIES = {
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"],
    "Kerala": ["Kochi", "Thiruvananthapuram"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Telangana": ["Hyderabad", "Warangal"]
};

// Mock API responses
const mockWeatherData = () => ({
    temperature: Math.round(20 + Math.random() * 15),
    humidity: Math.round(40 + Math.random() * 40)
});

const mockCrimeData = () => ({
    labels: ["2019", "2020", "2021", "2022", "2023"],
    data: Array(5).fill(0).map(() => Math.round(Math.random() * 100))
});

// Property data
const properties = [
    {
        id: 1,
        title: "Luxury Villa in Bangalore",
        description: "Beautiful 4BHK villa with modern amenities and garden",
        price: 15000000,
        area: 3500,
        bedrooms: 4,
        bathrooms: 4,
        city: "Bangalore",
        state: "Karnataka",
        address: "123 Palm Grove, Whitefield",
        imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop",
        latitude: "12.9716",
        longitude: "77.5946",
        isTrending: true
    },
    {
        id: 2,
        title: "Modern Apartment in Mumbai",
        description: "Spacious 3BHK apartment with sea view",
        price: 25000000,
        area: 2000,
        bedrooms: 3,
        bathrooms: 3,
        city: "Mumbai",
        state: "Maharashtra",
        address: "456 Sea View, Bandra West",
        imageUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&auto=format&fit=crop",
        latitude: "19.0760",
        longitude: "72.8777",
        isTrending: true
    },
    {
        id: 3,
        title: "Garden House in Chennai",
        description: "Traditional 3BHK house with large garden",
        price: 12000000,
        area: 2800,
        bedrooms: 3,
        bathrooms: 3,
        city: "Chennai",
        state: "Tamil Nadu",
        address: "789 Garden Street, Adyar",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
        latitude: "13.0827",
        longitude: "80.2707",
        isTrending: false
    },
    {
        id: 4,
        title: "Penthouse in Hyderabad",
        description: "Luxurious 4BHK penthouse with city view",
        price: 35000000,
        area: 4000,
        bedrooms: 4,
        bathrooms: 4,
        city: "Hyderabad",
        state: "Telangana",
        address: "101 Sky Tower, Banjara Hills",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
        latitude: "17.3850",
        longitude: "78.4867",
        isTrending: true
    }
];

// Utility functions
function formatPrice(price) {
    return `₹${(price / 100000).toFixed(2)}L`;
}

function createPropertyCard(property) {
    return `
        <div class="property-card bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
            <img src="${property.imageUrl}" alt="${property.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold truncate">${property.title}</h3>
                    <span class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                        ${formatPrice(property.price)}
                    </span>
                </div>
                <p class="text-sm text-gray-600 mb-2">
                    <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    ${property.city}, ${property.state}
                </p>
                <div class="grid grid-cols-3 gap-2 text-sm text-gray-600">
                    <div>${property.area} sq ft</div>
                    <div>${property.bedrooms} beds</div>
                    <div>${property.bathrooms} baths</div>
                </div>
                <button onclick="showPropertyDetail(${property.id})" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Details
                </button>
            </div>
        </div>
    `;
}

function showPropertyDetail(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const modal = document.getElementById('property-modal');
    const modalContent = modal.querySelector('.modal-content');

    // Get weather and crime data
    const weather = mockWeatherData();
    const crimeStats = mockCrimeData();

    modalContent.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-start">
                <h2 class="text-2xl font-bold">${property.title}</h2>
                <button onclick="closePropertyDetail()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <img src="${property.imageUrl}" alt="${property.title}" class="w-full h-64 object-cover rounded-lg">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="font-semibold mb-2">Property Details</h3>
                    <p class="text-gray-600 mb-4">${property.description}</p>
                    <div class="space-y-2">
                        <p>Price: ${formatPrice(property.price)}</p>
                        <p>Area: ${property.area} sq ft</p>
                        <p>Bedrooms: ${property.bedrooms}</p>
                        <p>Bathrooms: ${property.bathrooms}</p>
                        <p>Address: ${property.address}</p>
                    </div>
                </div>

                <div>
                    <h3 class="font-semibold mb-2">Current Weather</h3>
                    <div class="bg-gray-100 p-4 rounded-lg flex items-center gap-4 mb-6">
                        <div class="flex items-center gap-2">
                            <span class="text-blue-600">🌡️</span>
                            ${weather.temperature}°C
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-blue-600">💧</span>
                            ${weather.humidity}%
                        </div>
                    </div>

                    <h3 class="font-semibold mb-2">Crime Rate Trends</h3>
                    <div class="chart-container">
                        <canvas id="crimeChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="map-container">
                <iframe
                    src="https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    `;

    // Initialize crime rate chart
    const ctx = document.getElementById('crimeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: crimeStats.labels,
            datasets: [{
                label: 'Crime Rate',
                data: crimeStats.data,
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    modal.classList.remove('hidden');
}

function closePropertyDetail() {
    const modal = document.getElementById('property-modal');
    modal.classList.add('hidden');
}

// Initialize state and city dropdowns
function initializeLocationDropdowns() {
    const stateSelect = document.querySelector('select[name="state"]');
    const citySelect = document.querySelector('select[name="city"]');

    if (!stateSelect || !citySelect) return;

    // Populate states
    INDIAN_STATES.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Handle state change
    stateSelect.addEventListener('change', function() {
        citySelect.innerHTML = '<option value="">Select city</option>';
        citySelect.disabled = !this.value;

        if (this.value) {
            MAJOR_CITIES[this.value].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });
}