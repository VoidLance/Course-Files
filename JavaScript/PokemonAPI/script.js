let leftProfile = null;
let rightProfile = null;

const jsonCache = new Map();
async function fetchJSON(url) {
    if (jsonCache.has(url)) return jsonCache.get(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok ' + res.status);
    const data = await res.json();
    jsonCache.set(url, data);
    return data;
}

async function fetchPokemonData(pokemonName, targetId = "pokemon-data") {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    try {
        const data = await fetchJSON(url);
        
        // Fetch type data for weaknesses and strengths
        const typeData = await Promise.all(
            data.types.map(typeInfo => fetchJSON(typeInfo.type.url))
        );
        
        displayPokemonData(data, typeData, targetId);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Failed to fetch Pokémon data. Please check the name and try again.');
    }
}

function calculateTypeEffectiveness(typeData) {
    const effectiveness = {};
    
    typeData.forEach(type => {
        // Double damage from (weaknesses)
        type.damage_relations.double_damage_from.forEach(t => {
            effectiveness[t.name] = (effectiveness[t.name] || 1) * 2;
        });
        
        // Half damage from (resistances)
        type.damage_relations.half_damage_from.forEach(t => {
            effectiveness[t.name] = (effectiveness[t.name] || 1) * 0.5;
        });
        
        // No damage from (immunities)
        type.damage_relations.no_damage_from.forEach(t => {
            effectiveness[t.name] = 0;
        });
    });
    
    return effectiveness;
}

function displayPokemonData(data, typeData, targetId = "pokemon-data") {
    // Hide error and loading messages
    const errorMessage = document.getElementById('error-message');
    const loadingMessage = document.getElementById('loading-message');
    if (errorMessage) errorMessage.classList.add('hidden');
    if (loadingMessage) loadingMessage.classList.add('hidden');
    
    // Get abilities
    const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
    
    // Get stats
    const statsHTML = data.stats.map(stat => 
        `<li><strong>${stat.stat.name}:</strong> <span>${stat.base_stat}</span></li>`
    ).join('');
    
    // Get types
    const typesHTML = data.types.map(typeInfo => 
        `<li>${typeInfo.type.name}</li>`
    ).join('');
    
    // Calculate type effectiveness
    const effectiveness = calculateTypeEffectiveness(typeData);
    
    // Separate weaknesses, resistances, and immunities
    const weaknesses = Object.entries(effectiveness).filter(([_, mult]) => mult > 1);
    const resistances = Object.entries(effectiveness).filter(([_, mult]) => mult < 1 && mult > 0);
    const immunities = Object.entries(effectiveness).filter(([_, mult]) => mult === 0);
    
    const weaknessHTML = weaknesses.length > 0 
        ? weaknesses.map(([type, mult]) => `<li class="weakness">${type} (×${mult})</li>`).join('')
        : '<li class="neutral">None</li>';
    
    const resistanceHTML = resistances.length > 0 
        ? resistances.map(([type, mult]) => `<li class="resistance">${type} (×${mult})</li>`).join('')
        : '<li class="neutral">None</li>';
    
    const immunityHTML = immunities.length > 0 
        ? immunities.map(([type]) => `<li class="immunity">${type} (×0)</li>`).join('')
        : '';
    
    const pokemonInfo = `
        <div class="pokemon-card">
            <div class="pokemon-left">
                <h2>${data.name}</h2>
                <img id="pokemon-image" src="${data.sprites.front_default}" alt="${data.name}">
                <div id="pokemon-info">
                    <p><strong>ID:</strong> #${data.id}</p>
                    <p><strong>Height:</strong> ${data.height / 10} m</p>
                    <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
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
    const target = document.getElementById(targetId);
    if (target) {
        target.innerHTML = pokemonInfo;
    }

    // Track profiles for comparison summary
    const profile = extractProfile(data);
    if (targetId === 'pokemon-data') {
        leftProfile = profile;
    } else if (targetId === 'pokemon-data-2') {
        rightProfile = profile;
    }

    renderComparisonSummary();

    // Wire up Team Recommendations button for this card
    const card = target.querySelector('.pokemon-card');
    if (card) {
        const recBtn = card.querySelector('.recommend-btn');
        const leftContainer = card.querySelector('.team-recommendations');
        const rightContainer = card.querySelector('.team-recommendations-right');
        if (recBtn && leftContainer) {
            recBtn.addEventListener('click', async () => {
                recBtn.disabled = true;
                recBtn.textContent = 'Loading…';
                
                // Initialize containers with headers
                leftContainer.innerHTML = '<h4>Recommended Team Members</h4><div class="team-grid" id="left-grid"></div>';
                if (rightContainer) rightContainer.innerHTML = '<h4>Recommended Team Members</h4><div class="team-grid" id="right-grid"></div>';
                
                const leftGrid = leftContainer.querySelector('#left-grid');
                const rightGrid = rightContainer ? rightContainer.querySelector('#right-grid') : null;

                // Click-to-compare: delegate clicks to opposite panel
                const oppositeTarget = targetId === 'pokemon-data' ? 'pokemon-data-2' : 'pokemon-data';
                const handleGridClick = (evt) => {
                    const item = evt.target.closest('.team-member');
                    if (!item) return;
                    const name = item.getAttribute('data-name');
                    if (name) fetchPokemonData(name, oppositeTarget);
                };
                const handleGridKeydown = (evt) => {
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
                if (rightGrid) rightGrid.addEventListener('click', handleGridClick);
                if (rightGrid) rightGrid.addEventListener('keydown', handleGridKeydown);

                // Stream recommendations as they load
                let count = 0;
                for await (const rec of getTeamRecommendationsStream(data, typeData)) {
                    count++;
                    const recHTML = `
                        <div class="team-member" data-name="${rec.name}" tabindex="0" role="button" aria-label="Add ${rec.name} to comparison" aria-keyshortcuts="Enter Space">
                            <img src="${rec.sprite}" alt="${rec.name}" class="team-member-image">
                            <div class="team-member-name">${rec.name}</div>
                            <div class="team-member-reason">Covers: ${rec.coveredWeaknesses.join(', ')}</div>
                        </div>
                    `;
                    
                    // First 3 go to left, rest to right
                    if (count <= 3) {
                        leftGrid.innerHTML += recHTML;
                    } else if (rightGrid) {
                        rightGrid.innerHTML += recHTML;
                    }
                }
                
                if (count === 0) {
                    leftContainer.innerHTML = '<div class="neutral">No recommendations found.</div>';
                    if (rightContainer) rightContainer.innerHTML = '';
                }
                
                recBtn.textContent = 'Show Team Recommendations';
                recBtn.disabled = false;
            });
        }
    }
}

function extractProfile(data) {
    return {
        name: data.name,
        id: data.id,
        types: data.types.map(t => t.type.name),
        stats: Object.fromEntries(data.stats.map(s => [s.stat.name, s.base_stat])),
        sprite: data.sprites.front_default
    };
}

async function* getTeamRecommendationsStream(pokemonData, typeData) {
    const effectiveness = calculateTypeEffectiveness(typeData);
    const mainWeaknesses = new Set(Object.entries(effectiveness).filter(([_, mult]) => mult > 1).map(([type]) => type));
    if (mainWeaknesses.size === 0) return;

    // Helper: build stat vector
    const buildStatVector = (pk) => {
        const order = ['hp','attack','defense','special-attack','special-defense','speed'];
        const vec = new Array(order.length).fill(0);
        try {
            pk.stats.forEach(s => {
                const idx = order.indexOf(s.stat.name);
                if (idx >= 0) vec[idx] = s.base_stat || 0;
            });
        } catch {}
        return vec;
    };

    // Helper: euclidean distance between vectors
    const dist = (a, b) => a.reduce((sum, v, i) => sum + Math.pow(v - (b[i] || 0), 2), 0);
    const avgVector = (vectors) => {
        if (!vectors.length) return [0,0,0,0,0,0];
        const acc = new Array(6).fill(0);
        vectors.forEach(v => v.forEach((val, i) => acc[i] += val));
        return acc.map(x => x / vectors.length);
    };

    try {
        // Fetch candidates by type to reduce total API calls
        const typeEndpoints = await Promise.all([...mainWeaknesses].map(w => fetchJSON(`https://pokeapi.co/api/v2/type/${w}`)));
        const candidateNames = new Set();
        typeEndpoints.forEach(te => {
            te.pokemon.slice(0, 60).forEach(p => candidateNames.add(p.pokemon.name));
        });

        // Exclude the current Pokémon from recommendations
        candidateNames.delete(pokemonData.name.toLowerCase());

        // Shuffle candidates for variety
        const shuffled = Array.from(candidateNames).sort(() => Math.random() - 0.5);

        const usedChains = new Set();
        const selectedRecs = [];
        const selectedVectors = [];
        const typeCounts = new Map(); // type -> occurrences among selected picks
        const coveredAttackTypes = new Set(); // attack types already covered (resisted/immunity) by team
        const teamWeaknesses = new Set([...mainWeaknesses]);

        // Helper to update type counts
        const incrementTypeCounts = (types) => {
            types.forEach(t => typeCounts.set(t, (typeCounts.get(t) || 0) + 1));
        };

        // Helper to check repetition limit (allow at most 2 occurrences of any type)
        const respectsTypeLimit = (types) => {
            for (const t of types) {
                if ((typeCounts.get(t) || 0) >= 2) return false;
            }
            return true;
        };

        // PASS 1: prioritize new coverage of team weaknesses via resistances/immunities
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

                const finalData = finalSpeciesName === baseData.name ? baseData : await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${finalSpeciesName}`);
                const finalTypes = finalData.types.map(t => t.type.name);

                if (!respectsTypeLimit(finalTypes)) continue;

                // Candidate effectiveness
                const typeDatas = await Promise.all(finalTypes.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`)));
                const eff = calculateTypeEffectiveness(typeDatas);
                const resistOrImmune = new Set(Object.entries(eff).filter(([_, mult]) => mult < 1).map(([type]) => type));
                const covers = [...resistOrImmune].filter(t => teamWeaknesses.has(t));
                const newCoverage = covers.filter(t => !coveredAttackTypes.has(t));

                if (newCoverage.length > 0) {
                    // Accept pick
                    usedChains.add(chainUrl);
                    newCoverage.forEach(t => coveredAttackTypes.add(t));
                    // Update team weaknesses by adding candidate's own weaknesses
                    const candWeaknesses = Object.entries(eff).filter(([_, mult]) => mult > 1).map(([type]) => type);
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
                continue;
            }
        }

        // PASS 2: cover any team weaknesses (even if already covered), still respecting type repetition
        if (selectedRecs.length < 5) {
            for (const name of shuffled) {
                if (selectedRecs.length >= 5) break;
                // Skip ones already used by chain
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
                    const finalData = finalSpeciesName === baseData.name ? baseData : await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${finalSpeciesName}`);
                    const finalTypes = finalData.types.map(t => t.type.name);
                    if (!respectsTypeLimit(finalTypes)) continue;

                    const typeDatas = await Promise.all(finalTypes.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`)));
                    const eff = calculateTypeEffectiveness(typeDatas);
                    const resistOrImmune = new Set(Object.entries(eff).filter(([_, mult]) => mult < 1).map(([type]) => type));
                    const covers = [...resistOrImmune].filter(t => teamWeaknesses.has(t));
                    if (covers.length === 0) continue;

                    // Accept
                    usedChains.add(chainUrl);
                    const candWeaknesses = Object.entries(eff).filter(([_, mult]) => mult > 1).map(([type]) => type);
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
                    continue;
                }
            }
        }

        // PASS 3: stat diversity fallback while respecting type repetition
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
                    const finalData = finalSpeciesName === baseData.name ? baseData : await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${finalSpeciesName}`);
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
                    continue;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching team recommendations:', error);
    }
}

async function getTeamRecommendations(pokemonData, typeData) {
    const recommendations = [];
    for await (const rec of getTeamRecommendationsStream(pokemonData, typeData)) {
        recommendations.push(rec);
    }
    return recommendations;
}

function renderComparisonSummary() {
    const container = document.getElementById('comparison-summary');
    if (!container) return;

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

    // Get type effectiveness for both Pokémon
    const leftWeak = new Set();
    const leftResist = new Set();
    const rightWeak = new Set();
    const rightResist = new Set();

    // We need to recalculate effectiveness from stored types
    // For simplicity, we'll fetch type data again (cached)
    Promise.all([
        ...leftProfile.types.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`)),
    ]).then(leftTypeData => {
        const leftEff = calculateTypeEffectiveness(leftTypeData);
        Object.entries(leftEff).forEach(([type, mult]) => {
            if (mult > 1) leftWeak.add(type);
            if (mult < 1 && mult > 0) leftResist.add(type);
        });

        return Promise.all([
            ...rightProfile.types.map(t => fetchJSON(`https://pokeapi.co/api/v2/type/${t}`)),
        ]);
    }).then(rightTypeData => {
        const rightEff = calculateTypeEffectiveness(rightTypeData);
        Object.entries(rightEff).forEach(([type, mult]) => {
            if (mult > 1) rightWeak.add(type);
            if (mult < 1 && mult > 0) rightResist.add(type);
        });

        // Find shared and unique weaknesses/resistances
        const sharedWeaknesses = [...leftWeak].filter(t => rightWeak.has(t));
        const leftUniqueWeak = [...leftWeak].filter(t => !rightWeak.has(t));
        const rightUniqueWeak = [...rightWeak].filter(t => !leftWeak.has(t));
        
        const sharedResistances = [...leftResist].filter(t => rightResist.has(t));
        const leftUniqueResist = [...leftResist].filter(t => !rightResist.has(t));
        const rightUniqueResist = [...rightResist].filter(t => !leftResist.has(t));

        const statNames = ['hp','attack','defense','special-attack','special-defense','speed'];
        const maxStat = Math.max(...statNames.map(name => Math.max(leftProfile.stats[name] ?? 0, rightProfile.stats[name] ?? 0)));
        
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
}

document.getElementById('fetch-button').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemon-name').value;
    if (pokemonName) {
        fetchPokemonData(pokemonName, 'pokemon-data');
    } else {
        alert('Please enter a Pokémon name.');
    }
});

document.getElementById('pokemon-name').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('fetch-button').click();
    }
});

// Right-side compare search handlers
const rightSearchBtn = document.getElementById('fetch-button-2');
const rightSearchInput = document.getElementById('pokemon-name-2');

if (rightSearchBtn && rightSearchInput) {
    rightSearchBtn.addEventListener('click', () => {
        const name = rightSearchInput.value;
        if (name) {
            fetchPokemonData(name, 'pokemon-data-2');
        } else {
            alert('Please enter a Pokémon name to compare.');
        }
    });

    rightSearchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            rightSearchBtn.click();
        }
    });
}

