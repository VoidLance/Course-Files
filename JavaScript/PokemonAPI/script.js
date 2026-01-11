/*
 * ============================================================
 * POKÉMON FINDER & COMPARISON TOOL
 * ============================================================
 * A web application for searching, comparing, and analyzing Pokémon
 * using data from the PokéAPI (https://pokeapi.co/)
 * 
 * Key Features:
 * - Search Pokémon by name or ID
 * - View detailed stats, types, and abilities
 * - Compare two Pokémon side-by-side
 * - Get team recommendations based on type coverage
 * - Responsive design with Tailwind CSS
 * 
 * Global State Management
 */

/** @type {Object|null} - Stores profile data for left/comparison Pokémon */
let leftProfile = null;

/** @type {Object|null} - Stores profile data for right/comparison Pokémon */
let rightProfile = null;

/**
 * UTILITY: In-memory cache for API responses
 * Prevents redundant API calls for the same URLs
 * @type {Map<string, any>}
 */
const jsonCache = new Map();

/**
 * UTILITY: Fetch JSON data from API with caching
 * 
 * @async
 * @param {string} url - The API endpoint URL to fetch
 * @returns {Promise<Object>} Parsed JSON response from the API
 * @throws {Error} Network errors or invalid JSON responses
 * 
 * How it works:
 * 1. Check if URL is already cached
 * 2. If cached, return cached data immediately
 * 3. If not cached, fetch from API
 * 4. Parse response and handle errors
 * 5. Store in cache and return
 */
async function fetchJSON(url) {
    // Return cached data if available (improves performance)
    if (jsonCache.has(url)) {
        console.debug(`[Cache Hit] ${url}`);
        return jsonCache.get(url);
    }

    try {
        console.debug(`[API Call] ${url}`);
        const res = await fetch(url);
        
        // Check if HTTP response status is OK (200-299)
        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }
        
        // Parse JSON response
        const data = await res.json();
        
        // Validate that we got actual data
        if (!data) {
            throw new Error('Empty response from API');
        }
        
        // Store in cache for future use
        jsonCache.set(url, data);
        return data;
    } catch (error) {
        console.error(`[Fetch Error] Failed to fetch ${url}:`, error);
        throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
}

/**
 * MAIN: Fetch Pokémon data from API and display it
 * 
 * This function:
 * 1. Shows loading state
 * 2. Fetches Pokémon data from PokéAPI
 * 3. Fetches type effectiveness data
 * 4. Displays formatted data to user
 * 5. Handles errors gracefully
 * 
 * @async
 * @param {string} pokemonName - Name or ID of Pokémon to fetch
 * @param {string} [targetId="pokemon-data"] - DOM element ID to render data into
 */
async function fetchPokemonData(pokemonName, targetId = "pokemon-data") {
    // Validate input
    if (!pokemonName || pokemonName.trim() === '') {
        showError('Please enter a Pokémon name or ID.');
        return;
    }

    // Show loading indicator
    showLoading(true);
    
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    try {
        // Fetch basic Pokémon data
        const data = await fetchJSON(url);
        
        // Fetch type effectiveness data for each type this Pokémon has
        const typeData = await Promise.all(
            data.types.map(typeInfo => fetchJSON(typeInfo.type.url))
        );
        
        // Display formatted data to user
        displayPokemonData(data, typeData, targetId);
        showError(null); // Clear any previous errors
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        
        // Show user-friendly error message
        if (error.message.includes('404')) {
            showError(`Pokémon "${pokemonName}" not found. Please check the spelling.`);
        } else if (error.message.includes('Network')) {
            showError('Network error. Please check your internet connection.');
        } else {
            showError(`Failed to fetch Pokémon data: ${error.message}`);
        }
    } finally {
        // Hide loading indicator
        showLoading(false);
    }
}

/**
 * UTILITY: Display error messages to user
 * 
 * @param {string|null} message - Error message to display, or null to clear
 */
function showError(message) {
    const errorElement = document.getElementById('error-message');
    if (!errorElement) {
        console.warn('Error element not found in DOM');
        return;
    }
    
    if (message) {
        errorElement.textContent = `⚠️ ${message}`;
        errorElement.classList.remove('hidden');
        // Auto-hide after 10 seconds
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 10000);
    } else {
        errorElement.classList.add('hidden');
    }
}

/**
 * UTILITY: Show/hide loading indicator
 * 
 * @param {boolean} show - Whether to show the loading message
 */
function showLoading(show) {
    const loadingElement = document.getElementById('loading-message');
    if (!loadingElement) {
        console.warn('Loading element not found in DOM');
        return;
    }
    
    if (show) {
        loadingElement.classList.remove('hidden');
    } else {
        loadingElement.classList.add('hidden');
    }
}

/**
 * CALCULATION: Calculate type effectiveness multipliers
 * 
 * Analyzes Pokémon type(s) to determine:
 * - Which types deal double damage (weaknesses)
 * - Which types deal half damage (resistances)
 * - Which types deal zero damage (immunities)
 * 
 * @param {Array<Object>} typeData - Array of type data objects from PokéAPI
 * @returns {Object} Object with type names as keys and damage multipliers as values
 * 
 * Example output:
 * {
 *   "fire": 2,      // Takes 2x damage from fire
 *   "water": 0.5,   // Takes 0.5x damage from water
 *   "ground": 0     // Immune to ground
 * }
 */
function calculateTypeEffectiveness(typeData) {
    const effectiveness = {};
    
    // Process each type this Pokémon has
    typeData.forEach(type => {
        // Weaknesses: types that deal double damage (2x)
        type.damage_relations.double_damage_from.forEach(t => {
            // Multiply if multiple types share weakness (e.g., Fire/Steel)
            effectiveness[t.name] = (effectiveness[t.name] || 1) * 2;
        });
        
        // Resistances: types that deal half damage (0.5x)
        type.damage_relations.half_damage_from.forEach(t => {
            // Average resistances from multiple types
            effectiveness[t.name] = (effectiveness[t.name] || 1) * 0.5;
        });
        
        // Immunities: types that deal zero damage (0x)
        type.damage_relations.no_damage_from.forEach(t => {
            effectiveness[t.name] = 0;
        });
    });
    
    return effectiveness;
}

/**
 * DISPLAY: Render Pokémon data to the page
 * 
 * This function generates HTML for displaying:
 * - Pokémon image and basic info (ID, height, weight, abilities)
 * - Types with color-coded badges
 * - Type effectiveness (weaknesses, resistances, immunities)
 * - Base stats with visual representation
 * - Team recommendation button
 * 
 * @param {Object} data - Pokémon data object from PokéAPI
 * @param {Array<Object>} typeData - Type effectiveness data
 * @param {string} [targetId="pokemon-data"] - DOM element ID to render into
 */
function displayPokemonData(data, typeData, targetId = "pokemon-data") {
    // Hide previous messages
    const errorMessage = document.getElementById('error-message');
    const loadingMessage = document.getElementById('loading-message');
    if (errorMessage) errorMessage.classList.add('hidden');
    if (loadingMessage) loadingMessage.classList.add('hidden');
    
    // ====== Format Abilities ======
    // Pokémon can have 1-3 abilities; join with comma
    const abilities = data.abilities
        .map(abilityInfo => abilityInfo.ability.name)
        .join(', ');
    
    // ====== Format Stats ======
    // Create list items for each stat (HP, Attack, Defense, etc.)
    const statsHTML = data.stats
        .map(stat => {
            const statName = stat.stat.name.replace('-', ' '); // "special-attack" -> "special attack"
            return `<li><strong>${statName}:</strong> <span>${stat.base_stat}</span></li>`;
        })
        .join('');
    
    // ====== Format Types ======
    // Create badge for each type (usually 1-2)
    const typesHTML = data.types
        .map(typeInfo => `<li>${typeInfo.type.name}</li>`)
        .join('');
    
    // ====== Calculate Type Effectiveness ======
    const effectiveness = calculateTypeEffectiveness(typeData);
    
    // ====== Separate into Weaknesses, Resistances, Immunities ======
    const weaknesses = Object.entries(effectiveness)
        .filter(([_, mult]) => mult > 1)
        .sort((a, b) => b[1] - a[1]); // Sort by damage multiplier descending
    
    const resistances = Object.entries(effectiveness)
        .filter(([_, mult]) => mult < 1 && mult > 0)
        .sort((a, b) => a[1] - b[1]); // Sort by damage multiplier ascending
    
    const immunities = Object.entries(effectiveness)
        .filter(([_, mult]) => mult === 0);
    
    // ====== Format Effectiveness HTML ======
    const weaknessHTML = weaknesses.length > 0 
        ? weaknesses.map(([type, mult]) => `<li class="weakness">${type} (×${mult})</li>`).join('')
        : '<li class="neutral">None</li>';
    
    const resistanceHTML = resistances.length > 0 
        ? resistances.map(([type, mult]) => `<li class="resistance">${type} (×${mult})</li>`).join('')
        : '<li class="neutral">None</li>';
    
    const immunityHTML = immunities.length > 0 
        ? immunities.map(([type]) => `<li class="immunity">${type} (×0)</li>`).join('')
        : '';
    
    // ====== Generate Full Pokemon Card HTML ======
    const pokemonInfo = `
        <div class="pokemon-card">
            <div class="pokemon-left">
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}" class="pokemon-image">
                <div id="pokemon-info">
                    <p><strong>ID:</strong> #${data.id}</p>
                    <p><strong>Height:</strong> ${(data.height / 10).toFixed(1)} m</p>
                    <p><strong>Weight:</strong> ${(data.weight / 10).toFixed(1)} kg</p>
                    <p><strong>Abilities:</strong> ${abilities}</p>
                </div>
                <h3>Team Recommendations</h3>
                <button class="recommend-btn">Show Team Recommendations</button>
                <div class="team-recommendations"></div>
            </div>
            <div class="pokemon-right">
                <h3>Types</h3>
                <ul id="pokemon-types">
                    ${typesHTML}
                </ul>
                <h3>Type Effectiveness</h3>
                <div id="type-effectiveness">
                    <h4>Weaknesses</h4>
                    <ul id="pokemon-weaknesses">
                        ${weaknessHTML}
                    </ul>
                    <h4>Resistances</h4>
                    <ul id="pokemon-resistances">
                        ${resistanceHTML}
                    </ul>
                    ${immunities.length > 0 ? `<h4>Immunities</h4><ul id="pokemon-immunities">${immunityHTML}</ul>` : ''}
                </div>
                <h3>Stats</h3>
                <ul id="pokemon-stats">
                    ${statsHTML}
                </ul>
                <div class="team-recommendations-right"></div>
            </div>
        </div>
    `;
    
    // ====== Render to DOM ======
    const target = document.getElementById(targetId);
    if (!target) {
        console.error(`Target element with ID "${targetId}" not found`);
        showError('Error displaying Pokémon data.');
        return;
    }
    
    target.innerHTML = pokemonInfo;

    // ====== Store Profile for Comparison ======
    // Extract important data for comparison summary
    const profile = extractProfile(data);
    if (targetId === 'pokemon-data') {
        leftProfile = profile;
    } else if (targetId === 'pokemon-data-2') {
        rightProfile = profile;
    }

    // Update comparison summary if both are loaded
    renderComparisonSummary();

    // ====== Wire Up Team Recommendations Button ======
    // This needs to happen after DOM rendering
    const card = target.querySelector('.pokemon-card');
    if (card) {
        const recBtn = card.querySelector('.recommend-btn');
        const leftContainer = card.querySelector('.team-recommendations');
        const rightContainer = card.querySelector('.team-recommendations-right');
        
        if (recBtn && leftContainer) {
            recBtn.addEventListener('click', async () => {
                // Disable button and show loading state
                recBtn.disabled = true;
                recBtn.textContent = 'Loading…';
                
                // Initialize containers with headers
                leftContainer.innerHTML = '<h4>Recommended Team Members</h4><div class="team-grid" id="left-grid"></div>';
                if (rightContainer) {
                    rightContainer.innerHTML = '<h4>Recommended Team Members</h4><div class="team-grid" id="right-grid"></div>';
                }
                
                const leftGrid = leftContainer.querySelector('#left-grid');
                const rightGrid = rightContainer ? rightContainer.querySelector('#right-grid') : null;

                // Set up click handlers for recommended Pokémon
                // Clicking a recommendation adds it to the opposite panel
                const oppositeTarget = targetId === 'pokemon-data' ? 'pokemon-data-2' : 'pokemon-data';
                const handleGridClick = (evt) => {
                    const item = evt.target.closest('.team-member');
                    if (!item) return;
                    const name = item.getAttribute('data-name');
                    if (name) fetchPokemonData(name, oppositeTarget);
                };
                const handleGridKeydown = (evt) => {
                    // Handle Enter and Space keys for accessibility
                    const isEnter = evt.key === 'Enter';
                    const isSpace = evt.key === ' ' || evt.key === 'Spacebar' || evt.code === 'Space';
                    if (!isEnter && !isSpace) return;
                    const item = evt.target.closest('.team-member');
                    if (!item) return;
                    evt.preventDefault();
                    const name = item.getAttribute('data-name');
                    if (name) fetchPokemonData(name, oppositeTarget);
                };
                leftGrid.addEventListener('click', handleGridClick);
                leftGrid.addEventListener('keydown', handleGridKeydown);
                if (rightGrid) {
                    rightGrid.addEventListener('click', handleGridClick);
                    rightGrid.addEventListener('keydown', handleGridKeydown);
                }

                // Stream recommendations as they load (improves perceived performance)
                let count = 0;
                try {
                    for await (const rec of getTeamRecommendationsStream(data, typeData)) {
                        count++;
                        const recHTML = `
                            <div class="team-member" data-name="${rec.name}" tabindex="0" role="button" aria-label="Add ${rec.name} to comparison" aria-keyshortcuts="Enter Space">
                                <img src="${rec.sprite}" alt="${rec.name}" class="team-member-image">
                                <div class="team-member-name">${rec.name}</div>
                                <div class="team-member-reason">Covers: ${rec.coveredWeaknesses.join(', ')}</div>
                            </div>
                        `;
                        
                        // First 3 recommendations go to left, rest to right
                        if (count <= 3) {
                            leftGrid.innerHTML += recHTML;
                        } else if (rightGrid) {
                            rightGrid.innerHTML += recHTML;
                        }
                    }
                    
                    // Show message if no recommendations found
                    if (count === 0) {
                        leftContainer.innerHTML = '<div class="neutral">No recommendations found.</div>';
                        if (rightContainer) rightContainer.innerHTML = '';
                    }
                } catch (error) {
                    console.error('Error generating team recommendations:', error);
                    showError('Could not generate team recommendations. Please try again.');
                    leftContainer.innerHTML = '<div class="neutral">Error loading recommendations</div>';
                }
                
                // Re-enable button
                recBtn.textContent = 'Show Team Recommendations';
                recBtn.disabled = false;
            });
        }
    }
}

/**
 * UTILITY: Extract minimal profile data from full Pokémon data
 * 
 * This creates a lightweight version of Pokémon data for storage
 * and comparison, reducing memory usage
 * 
 * @param {Object} data - Full Pokémon data from PokéAPI
 * @returns {Object} Simplified profile with essential data
 */
function extractProfile(data) {
    return {
        name: data.name,
        id: data.id,
        types: data.types.map(t => t.type.name),
        stats: Object.fromEntries(data.stats.map(s => [s.stat.name, s.base_stat])),
        sprite: data.sprites.front_default
    };
}

/**
 * GENERATOR: Stream team recommendations for a Pokémon
 * 
 * This async generator function yields recommendations one at a time
 * using a multi-pass algorithm:
 * 
 * Pass 1: Prioritize coverage of team weaknesses (best recommendations)
 * Pass 2: Cover any team weaknesses (medium recommendations)
 * Pass 3: Stat diversity fallback (filler recommendations)
 * 
 * @async
 * @generator
 * @param {Object} pokemonData - Pokémon data object
 * @param {Array<Object>} typeData - Type effectiveness data
 * @yields {Object} Recommendation objects with name, sprite, coverage
 */
async function* getTeamRecommendationsStream(pokemonData, typeData) {
    // Calculate what this Pokémon is weak to
    const effectiveness = calculateTypeEffectiveness(typeData);
    const mainWeaknesses = new Set(
        Object.entries(effectiveness)
            .filter(([_, mult]) => mult > 1)
            .map(([type]) => type)
    );
    
    // If no weaknesses, no recommendations needed
    if (mainWeaknesses.size === 0) return;

    /**
     * Helper: Convert stats array to vector for distance calculation
     * Enables stat diversity scoring
     */
    const buildStatVector = (pk) => {
        const order = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
        const vec = new Array(order.length).fill(0);
        try {
            pk.stats.forEach(s => {
                const idx = order.indexOf(s.stat.name);
                if (idx >= 0) vec[idx] = s.base_stat || 0;
            });
        } catch (e) {
            console.warn('Error building stat vector:', e);
        }
        return vec;
    };

    /**
     * Helper: Calculate Euclidean distance between stat vectors
     * Used to find diverse team members
     */
    const dist = (a, b) => a.reduce((sum, v, i) => sum + Math.pow(v - (b[i] || 0), 2), 0);
    
    /**
     * Helper: Calculate average vector from multiple vectors
     * Used to find team stat balance
     */
    const avgVector = (vectors) => {
        if (!vectors.length) return [0, 0, 0, 0, 0, 0];
        const acc = new Array(6).fill(0);
        vectors.forEach(v => v.forEach((val, i) => acc[i] += val));
        return acc.map(x => x / vectors.length);
    };

    try {
        // ====== FETCH CANDIDATES ======
        // Fetch Pokémon types that cover this Pokémon's weaknesses
        // Limits API calls by getting candidates from type endpoints
        const typeEndpoints = await Promise.all([...mainWeaknesses].map(w => 
            fetchJSON(`https://pokeapi.co/api/v2/type/${w}`)
        ));
        const candidateNames = new Set();
        typeEndpoints.forEach(te => {
            // Get first 60 Pokémon of each type (PokéAPI limits per type)
            te.pokemon.slice(0, 60).forEach(p => candidateNames.add(p.pokemon.name));
        });

        // Remove the current Pokémon (don't recommend it to itself)
        candidateNames.delete(pokemonData.name.toLowerCase());

        // Shuffle for variety in recommendations
        const shuffled = Array.from(candidateNames).sort(() => Math.random() - 0.5);

        // ====== TRACKING VARIABLES ======
        const usedChains = new Set(); // Evolution chains already used
        const selectedRecs = [];
        const selectedVectors = [];
        const typeCounts = new Map(); // Track type frequency
        const coveredAttackTypes = new Set(); // Already covered weaknesses
        const teamWeaknesses = new Set([...mainWeaknesses]);

        const incrementTypeCounts = (types) => {
            types.forEach(t => typeCounts.set(t, (typeCounts.get(t) || 0) + 1));
        };

        const respectsTypeLimit = (types) => {
            // Allow max 2 of same type in recommendations
            for (const t of types) {
                if ((typeCounts.get(t) || 0) >= 2) return false;
            }
            return true;
        };

        // ====== PASS 1: NEW COVERAGE ======
        // Prioritize Pokémon that cover weaknesses not yet covered
        for (const name of shuffled) {
            if (selectedRecs.length >= 5) break; // Max 5 recommendations
            try {
                const baseData = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${name}`);
                
                // Get evolution chain to find final form
                const species = await fetchJSON(baseData.species.url);
                const chainUrl = species.evolution_chain?.url;
                if (!chainUrl || usedChains.has(chainUrl)) continue;

                const chain = await fetchJSON(chainUrl);
                let node = chain.chain;
                let finalSpeciesName = node.species.name;
                
                // Traverse evolution chain to final form
                while (node.evolves_to && node.evolves_to.length > 0) {
                    node = node.evolves_to[0];
                    finalSpeciesName = node.species.name;
                }

                const finalData = finalSpeciesName === baseData.name ? baseData : 
                    await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${finalSpeciesName}`);
                const finalTypes = finalData.types.map(t => t.type.name);

                if (!respectsTypeLimit(finalTypes)) continue;

                // Calculate what this candidate resists/is immune to
                const typeDatas = await Promise.all(
                    finalTypes.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`))
                );
                const eff = calculateTypeEffectiveness(typeDatas);
                const resistOrImmune = new Set(
                    Object.entries(eff).filter(([_, mult]) => mult < 1).map(([type]) => type)
                );
                const covers = [...resistOrImmune].filter(t => teamWeaknesses.has(t));
                const newCoverage = covers.filter(t => !coveredAttackTypes.has(t));

                // Accept if provides NEW coverage
                if (newCoverage.length > 0) {
                    usedChains.add(chainUrl);
                    newCoverage.forEach(t => coveredAttackTypes.add(t));
                    const candWeaknesses = Object.entries(eff)
                        .filter(([_, mult]) => mult > 1)
                        .map(([type]) => type);
                    candWeaknesses.forEach(t => teamWeaknesses.add(t));
                    incrementTypeCounts(finalTypes);
                    const vec = buildStatVector(finalData);
                    selectedVectors.push(vec);

                    const rec = {
                        name: finalData.name,
                        sprite: finalData.sprites.front_default,
                        score: newCoverage.length,
                        coveredWeaknesses: newCoverage,
                        types: finalTypes
                    };
                    selectedRecs.push(rec);
                    yield rec;
                }
            } catch (e) {
                console.debug(`Skipped candidate ${name}:`, e.message);
                continue;
            }
        }

        // ====== PASS 2: ADDITIONAL COVERAGE ======
        // Fill remaining slots with Pokémon that cover ANY team weakness
        if (selectedRecs.length < 5) {
            for (const name of shuffled) {
                if (selectedRecs.length >= 5) break;
                try {
                    const baseData = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    const species = await fetchJSON(baseData.species.url);
                    const chainUrl = species.evolution_chain?.url;
                    if (!chainUrl || usedChains.has(chainUrl)) continue;

                    const chain = await fetchJSON(chainUrl);
                    let node = chain.chain;
                    let finalSpeciesName = node.species.name;
                    while (node.evolves_to && node.evolves_to.length > 0) {
                        node = node.evolves_to[0];
                        finalSpeciesName = node.species.name;
                    }
                    const finalData = finalSpeciesName === baseData.name ? baseData : 
                        await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${finalSpeciesName}`);
                    const finalTypes = finalData.types.map(t => t.type.name);
                    if (!respectsTypeLimit(finalTypes)) continue;

                    const typeDatas = await Promise.all(
                        finalTypes.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`))
                    );
                    const eff = calculateTypeEffectiveness(typeDatas);
                    const resistOrImmune = new Set(
                        Object.entries(eff).filter(([_, mult]) => mult < 1).map(([type]) => type)
                    );
                    const covers = [...resistOrImmune].filter(t => teamWeaknesses.has(t));
                    if (covers.length === 0) continue;

                    usedChains.add(chainUrl);
                    const candWeaknesses = Object.entries(eff)
                        .filter(([_, mult]) => mult > 1)
                        .map(([type]) => type);
                    candWeaknesses.forEach(t => teamWeaknesses.add(t));
                    incrementTypeCounts(finalTypes);
                    const vec = buildStatVector(finalData);
                    selectedVectors.push(vec);
                    const rec = {
                        name: finalData.name,
                        sprite: finalData.sprites.front_default,
                        score: covers.length * 0.5,
                        coveredWeaknesses: covers,
                        types: finalTypes
                    };
                    selectedRecs.push(rec);
                    yield rec;
                } catch (e) {
                    console.debug(`Skipped candidate ${name}:`, e.message);
                    continue;
                }
            }
        }

        // ====== PASS 3: STAT DIVERSITY ======
        // Fill final slots with stat-diverse Pokémon
        if (selectedRecs.length < 5) {
            const meanVec = avgVector(selectedVectors);
            for (const name of shuffled) {
                if (selectedRecs.length >= 5) break;
                try {
                    const baseData = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    const species = await fetchJSON(baseData.species.url);
                    const chainUrl = species.evolution_chain?.url;
                    if (!chainUrl || usedChains.has(chainUrl)) continue;

                    const chain = await fetchJSON(chainUrl);
                    let node = chain.chain;
                    let finalSpeciesName = node.species.name;
                    while (node.evolves_to && node.evolves_to.length > 0) {
                        node = node.evolves_to[0];
                        finalSpeciesName = node.species.name;
                    }
                    const finalData = finalSpeciesName === baseData.name ? baseData : 
                        await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${finalSpeciesName}`);
                    const finalTypes = finalData.types.map(t => t.type.name);
                    if (!respectsTypeLimit(finalTypes)) continue;

                    const vec = buildStatVector(finalData);
                    const diversityScore = dist(vec, meanVec);
                    if (diversityScore <= 0) continue;

                    usedChains.add(chainUrl);
                    incrementTypeCounts(finalTypes);
                    selectedVectors.push(vec);
                    const rec = {
                        name: finalData.name,
                        sprite: finalData.sprites.front_default,
                        score: Math.min(2, Math.floor(diversityScore / 120)),
                        coveredWeaknesses: [],
                        types: finalTypes
                    };
                    selectedRecs.push(rec);
                    yield rec;
                } catch (e) {
                    console.debug(`Skipped candidate ${name}:`, e.message);
                    continue;
                }
            }
        }
    } catch (error) {
        console.error('Error generating team recommendations:', error);
        showError(`Could not generate recommendations: ${error.message}`);
    }
}

/**
 * UTILITY: Get all team recommendations (non-streaming version)
 * Collects all results from the generator into an array
 * 
 * @async
 * @param {Object} pokemonData - Pokémon data object
 * @param {Array<Object>} typeData - Type effectiveness data
 * @returns {Promise<Array>} Array of recommendation objects
 */
async function getTeamRecommendations(pokemonData, typeData) {
    const recommendations = [];
    try {
        for await (const rec of getTeamRecommendationsStream(pokemonData, typeData)) {
            recommendations.push(rec);
        }
    } catch (error) {
        console.error('Error in getTeamRecommendations:', error);
    }
    return recommendations;
}

/**
 * DISPLAY: Render comparison summary of two Pokémon
 * 
 * Shows a side-by-side analysis including:
 * - Shared weaknesses and resistances
 * - Unique strengths and weaknesses for each
 * - Stat comparison with visual bars
 * 
 * This function builds complex HTML asynchronously as type data loads
 */
function renderComparisonSummary() {
    const container = document.getElementById('comparison-summary');
    if (!container) {
        console.warn('Comparison summary container not found');
        return;
    }

    // Show placeholder if only one or zero Pokémon loaded
    if (!leftProfile || !rightProfile) {
        container.innerHTML = `
            <div class="comparison-summary">
                <div class="comparison-summary-title">Comparison Summary</div>
                <div class="summary-section">
                    Search two Pokémon to see a quick comparison of types and stats.
                </div>
            </div>
        `;
        return;
    }

    // Fetch type data and build comparison asynchronously
    Promise.all([
        ...leftProfile.types.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`)),
    ]).then(leftTypeData => {
        // Calculate effectiveness for left Pokémon
        const leftEff = calculateTypeEffectiveness(leftTypeData);
        const leftWeak = new Set();
        const leftResist = new Set();
        Object.entries(leftEff).forEach(([type, mult]) => {
            if (mult > 1) leftWeak.add(type);
            if (mult < 1 && mult > 0) leftResist.add(type);
        });

        // Now fetch right Pokémon's type data
        return Promise.all([
            ...rightProfile.types.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`)),
        ]).then(rightTypeData => {
            // Calculate effectiveness for right Pokémon
            const rightEff = calculateTypeEffectiveness(rightTypeData);
            const rightWeak = new Set();
            const rightResist = new Set();
            Object.entries(rightEff).forEach(([type, mult]) => {
                if (mult > 1) rightWeak.add(type);
                if (mult < 1 && mult > 0) rightResist.add(type);
            });

            // ====== COMPARE TYPE DATA ======
            // Find shared and unique weaknesses/resistances
            const sharedWeaknesses = [...leftWeak].filter(t => rightWeak.has(t)).sort();
            const leftUniqueWeak = [...leftWeak].filter(t => !rightWeak.has(t)).sort();
            const rightUniqueWeak = [...rightWeak].filter(t => !leftWeak.has(t)).sort();
            
            const sharedResistances = [...leftResist].filter(t => rightResist.has(t)).sort();
            const leftUniqueResist = [...leftResist].filter(t => !rightResist.has(t)).sort();
            const rightUniqueResist = [...rightResist].filter(t => !leftResist.has(t)).sort();

            // ====== COMPARE STATS ======
            const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
            
            // Find max stat value across both Pokémon for bar scaling
            const maxStat = Math.max(
                ...statNames.map(name => Math.max(
                    leftProfile.stats[name] ?? 0, 
                    rightProfile.stats[name] ?? 0
                ))
            );
            
            // Generate HTML for each stat comparison
            const barRows = statNames.map(name => {
                const l = leftProfile.stats[name] ?? 0;
                const r = rightProfile.stats[name] ?? 0;
                const lWidth = (l / maxStat) * 100;
                const rWidth = (r / maxStat) * 100;
                return `
                    <div class="stat-bar-row">
                        <div class="stat-name">${name}</div>
                        <div class="stat-bars">
                            <div class="bar bar-left" style="width: ${lWidth}%;" title="${l}"></div>
                            <span class="bar-label">${l}</span>
                        </div>
                        <div class="stat-bars">
                            <div class="bar bar-right" style="width: ${rWidth}%;" title="${r}"></div>
                            <span class="bar-label">${r}</span>
                        </div>
                    </div>
                `;
            }).join('');

            // ====== RENDER FINAL HTML ======
            container.innerHTML = `
                <div class="comparison-summary">
                    <div class="comparison-summary-title">Comparison Summary</div>
                    <div class="summary-grid">
                        <div class="summary-section">
                            <h3>Shared Weaknesses</h3>
                            <ul class="type-list">${sharedWeaknesses.length ? sharedWeaknesses.map(t => `<li class="type-badge weakness">${t}</li>`).join('') : '<li class="neutral">None</li>'}</ul>
                        </div>
                        <div class="summary-section">
                            <h3>Shared Resistances</h3>
                            <ul class="type-list">${sharedResistances.length ? sharedResistances.map(t => `<li class="type-badge resistance">${t}</li>`).join('') : '<li class="neutral">None</li>'}</ul>
                        </div>
                    </div>
                    <div class="summary-grid">
                        <div class="summary-section">
                            <h3>Unique Weaknesses: ${leftProfile.name}</h3>
                            <ul class="type-list">${leftUniqueWeak.length ? leftUniqueWeak.map(t => `<li class="type-badge weakness">${t}</li>`).join('') : '<li class="neutral">None</li>'}</ul>
                        </div>
                        <div class="summary-section">
                            <h3>Unique Weaknesses: ${rightProfile.name}</h3>
                            <ul class="type-list">${rightUniqueWeak.length ? rightUniqueWeak.map(t => `<li class="type-badge weakness">${t}</li>`).join('') : '<li class="neutral">None</li>'}</ul>
                        </div>
                    </div>
                    <div class="summary-grid">
                        <div class="summary-section">
                            <h3>Unique Resistances: ${leftProfile.name}</h3>
                            <ul class="type-list">${leftUniqueResist.length ? leftUniqueResist.map(t => `<li class="type-badge resistance">${t}</li>`).join('') : '<li class="neutral">None</li>'}</ul>
                        </div>
                        <div class="summary-section">
                            <h3>Unique Resistances: ${rightProfile.name}</h3>
                            <ul class="type-list">${rightUniqueResist.length ? rightUniqueResist.map(t => `<li class="type-badge resistance">${t}</li>`).join('') : '<li class="neutral">None</li>'}</ul>
                        </div>
                    </div>
                    <div class="summary-grid">
                        <div class="summary-section summary-section--full">
                            <h3>Stats Comparison</h3>
                            <div class="stat-legend">
                                <span class="legend-item"><span class="legend-swatch" style="background: linear-gradient(135deg, #4da3ff 0%, #2a6bff 100%)"></span> ${leftProfile.name}</span>
                                <span class="legend-item"><span class="legend-swatch" style="background: linear-gradient(135deg, #ff9f1c 0%, #ff4040 100%)"></span> ${rightProfile.name}</span>
                            </div>
                            ${barRows}
                        </div>
                    </div>
                </div>
            `;
        });
    }).catch(error => {
        console.error('Error rendering comparison summary:', error);
        showError('Could not load comparison data. Please try again.');
    });
}

/**
 * EVENT HANDLER: Left-side search button click
 * Fetches Pokémon from left search input and displays in left panel
 */
document.getElementById('fetch-button').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemon-name').value.trim();
    if (pokemonName) {
        fetchPokemonData(pokemonName, 'pokemon-data');
    } else {
        showError('Please enter a Pokémon name or ID.');
    }
});

/**
 * EVENT HANDLER: Left-side search input Enter key
 * Allows users to press Enter instead of clicking button
 */
document.getElementById('pokemon-name').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('fetch-button').click();
    }
});

/**
 * EVENT HANDLER: Right-side search button click
 * Fetches Pokémon from right search input and displays in right panel
 */
const rightSearchBtn = document.getElementById('fetch-button-2');
const rightSearchInput = document.getElementById('pokemon-name-2');

if (rightSearchBtn && rightSearchInput) {
    rightSearchBtn.addEventListener('click', () => {
        const name = rightSearchInput.value.trim();
        if (name) {
            fetchPokemonData(name, 'pokemon-data-2');
        } else {
            showError('Please enter a Pokémon name or ID to compare.');
        }
    });

    /**
     * EVENT HANDLER: Right-side search input Enter key
     * Allows users to press Enter instead of clicking button
     */
    rightSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            rightSearchBtn.click();
        }
    });
} else {
    console.warn('Right search button or input element not found');
}

