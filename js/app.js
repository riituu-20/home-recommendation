// Home page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load trending properties
    const trendingProperties = properties.filter(p => p.isTrending);
    const trendingContainer = document.getElementById('trending-properties');

    function createPropertyCard(property) {
        return `
                <div class="property-card bg-white rounded-lg overflow-hidden shadow hover:shadow-md">
                    <div class="relative h-48">
                        <img 
                            src="${property.imageUrl}" 
                            alt="${property.title}" 
                            class="w-full h-full object-cover"
                            onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop'"
                        >
                        ${property.isTrending ? '<span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">Trending</span>' : ''}
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-semibold truncate">${property.title}</h3>
                            <span class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                                ₹${(property.price / 100000).toFixed(2)}L
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

    if (trendingContainer) {
        trendingContainer.innerHTML = trendingProperties
            .map(property => createPropertyCard(property))
            .join('');
    }

    const propertyList = document.getElementById('propertyList');

    if (propertyList) {
        propertyList.innerHTML = properties
            .map(property => createPropertyCard(property))
            .join('');
    }
});