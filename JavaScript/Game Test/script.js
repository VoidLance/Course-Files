// ===============================================
// GAME STATE (Central state management for all game data)
// ===============================================
const gameState = {
    // Core game data
    score: 0,
    level: 1,
    lives: 3,
    isGameOver: false,
    inCombat: false,
    discoveries: 0,
    
    // Player character (contains all player data and behavior)
    character: {
        hp: 100,
        maxHp: 100,
        mana: 50,
        maxMana: 50,
        strength: 20,
        agility: 15,
        
        // Character methods (encapsulate character behavior for better organization)
        takeDamage: function(damage) {
            this.hp = Math.max(0, this.hp - damage);
            UI.updateDisplay();
            return this.hp <= 0;
        },
        
        heal: function(amount) {
            this.hp = Math.min(this.maxHp, this.hp + amount);
            UI.updateDisplay();
        },
        
        consumeMana: function(amount) {
            if (this.mana >= amount) {
                this.mana -= amount;
                UI.updateDisplay();
                return true;
            }
            return false;
        },
        
        restoreMana: function(amount) {
            this.mana = Math.min(this.maxMana, this.mana + amount);
            UI.updateDisplay();
        },
        
        levelUp: function(hpBonus = 20, manaBonus = 10, strBonus = 3, agiBonus = 2) {
            this.maxHp += hpBonus;
            this.hp = this.maxHp; // Full heal on level up
            this.maxMana += manaBonus;
            this.mana = this.maxMana; // Full mana on level up
            this.strength += strBonus;
            this.agility += agiBonus;
        },
        
        rest: function() {
            const hpRestore = Math.floor(this.maxHp * 0.3);
            const manaRestore = Math.floor(this.maxMana * 0.5);
            this.heal(hpRestore);
            this.restoreMana(manaRestore);
            return { hpRestore, manaRestore };
        }
    },
    
    // Current enemy (dynamically created during combat)
    currentEnemy: null,
    
    // Game state methods (centralize game logic to avoid scattered functions)
    reset: function() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.isGameOver = false;
        this.inCombat = false;
        this.discoveries = 0;
        this.currentEnemy = null;
        
        // Reset character
        this.character.hp = 100;
        this.character.maxHp = 100;
        this.character.mana = 50;
        this.character.maxMana = 50;
        this.character.strength = 20;
        this.character.agility = 15;
    },
    
    addScore: function(points) {
        if (this.isGameOver) return;
        
        this.score += points;
        
        // Check for level up
        const newLevel = Math.floor(this.score / 500) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.character.levelUp();
            UI.addToLog(`🌟 LEVEL UP! You are now level ${newLevel}! All stats increased and fully restored!`, "levelup");
        }
        
        UI.updateDisplay();
        UI.addToLog(`Score increased by ${points}! Total: ${this.score}`, "score");
    },
    
    playerDeath: function() {
        this.lives--;
        if (this.lives <= 0) {
            this.triggerGameOver();
        } else {
            this.character.hp = Math.floor(this.character.maxHp / 2); // Revive with half health
            UI.addToLog(`💀 You died! Respawning with ${this.lives} lives remaining...`, "death");
            UI.updateStory("☠️ Death! You have been defeated but your spirit endures. You respawn at the dungeon entrance.");
            Combat.endBattle();
        }
    },
    
    triggerGameOver: function() {
        this.isGameOver = true;
        this.inCombat = false;
        const gameOverMessage = `💀 GAME OVER! 💀<br>Final Score: ${this.score}<br>Level Reached: ${this.level}<br>Discoveries Made: ${this.discoveries}`;
        UI.updateStory(gameOverMessage);
        UI.addToLog("GAME OVER! Click 'Start New Game' to try again.", "gameover");
        UI.showExplorationButtons();
    }
};

// ===============================================
// GAME DATA (Centralized configuration and content data)
// ===============================================
const GameData = {
    enemyTypes: [
        { name: "Goblin", hp: 30, attack: 10, defense: 5, reward: 50, description: "A small, green creature with sharp teeth" },
        { name: "Orc Warrior", hp: 60, attack: 18, defense: 8, reward: 100, description: "A fierce orc wielding a rusty axe" },
        { name: "Shadow Beast", hp: 45, attack: 15, defense: 3, reward: 75, description: "A mysterious creature made of darkness" },
        { name: "Fire Elemental", hp: 80, attack: 25, defense: 12, reward: 150, description: "A blazing creature of pure fire" },
        { name: "Ice Troll", hp: 100, attack: 20, defense: 15, reward: 200, description: "A massive troll covered in ice and frost" }
    ],
    
    randomEvents: [
        {
            text: "You find a healing potion in an old chest!",
            effect: function() {
                const healing = 20;
                gameState.character.heal(healing);
                return `You recover ${healing} HP!`;
            }
        },
        {
            text: "You discover a mana crystal glowing softly in the cave wall!",
            effect: function() {
                const manaGain = 15;
                gameState.character.restoreMana(manaGain);
                return `You gain ${manaGain} mana!`;
            }
        },
        {
            text: "You find ancient coins scattered on the ground!",
            effect: function() {
                const points = Math.floor(Math.random() * 30) + 20;
                gameState.addScore(points);
                return `You gain ${points} points!`;
            }
        },
        {
            text: "You stumble upon a training dummy and practice your combat skills!",
            effect: function() {
                gameState.character.strength += 1;
                gameState.character.agility += 1;
                UI.updateDisplay();
                return "Your strength and agility increase by 1!";
            }
        }
    ],
    
    getAvailableEnemies: function(playerLevel) {
        return this.enemyTypes.filter(enemy => {
            if (playerLevel === 1) return enemy.hp <= 50;
            if (playerLevel <= 3) return enemy.hp <= 80;
            return true;
        });
    }
};

// ===============================================
// WORLD SYSTEM (Handles exploration, events, and world state)
// ===============================================
const World = {
    explore: function() {
        if (gameState.isGameOver || gameState.inCombat) return;
        
        gameState.discoveries++;
        const exploreChance = Math.random();
        
        if (exploreChance < 0.6) {
            // Encounter enemy - higher probability for more action
            this.spawnEnemy();
        } else {
            // Random event - provides variety and rewards
            this.triggerRandomEvent();
        }
    },
    
    spawnEnemy: function() {
        const availableEnemies = GameData.getAvailableEnemies(gameState.level);
        const enemyData = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
        
        // Create enemy instance with methods for self-contained behavior
        gameState.currentEnemy = {
            ...enemyData,
            maxHp: enemyData.hp,
            
            // Enemy methods (encapsulate enemy behavior)
            takeDamage: function(damage) {
                const actualDamage = Math.max(damage - this.defense, 1);
                this.hp -= actualDamage;
                UI.addToLog(`You attack for ${actualDamage} damage!`, "combat");
                
                if (this.hp <= 0) {
                    gameState.addScore(this.reward);
                    UI.addToLog(`${this.name} defeated! You gain ${this.reward} points!`, "victory");
                    UI.updateStory(`🏆 Victory! The ${this.name} falls before your might!`);
                    Combat.endBattle();
                } else {
                    // Enemy counter-attack
                    setTimeout(() => Combat.enemyAttack(), 500);
                }
                
                UI.updateDisplay();
            },
            
            performAttack: function() {
                const enemyDamage = Math.floor(this.attack + Math.random() * 8);
                const actualDamage = Math.max(enemyDamage - Math.floor(gameState.character.agility / 4), 1);
                
                const playerDied = gameState.character.takeDamage(actualDamage);
                UI.addToLog(`${this.name} attacks you for ${actualDamage} damage!`, "damage");
                
                if (playerDied) {
                    gameState.playerDeath();
                }
            }
        };
        
        gameState.inCombat = true;
        UI.updateStory(`⚔️ Combat! You encounter a ${enemyData.name}! ${enemyData.description}`);
        UI.addToLog(`A wild ${enemyData.name} appears!`, "combat");
        UI.showCombatButtons();
        UI.updateDisplay();
    },
    
    triggerRandomEvent: function() {
        const event = GameData.randomEvents[Math.floor(Math.random() * GameData.randomEvents.length)];
        const result = event.effect();
        
        UI.updateStory(`🔍 Exploration Result: ${event.text} ${result}`);
        UI.addToLog(`Discovery #${gameState.discoveries}: ${event.text} ${result}`, "event");
        gameState.addScore(10); // Small reward for exploring
    }
};

// ===============================================
// COMBAT SYSTEM (Manages all combat interactions)
// ===============================================
const Combat = {
    playerAttack: function() {
        if (!gameState.inCombat || !gameState.currentEnemy) return;
        
        // Calculate player damage with some randomness for variety
        const baseDamage = gameState.character.strength;
        const damage = Math.floor(baseDamage + Math.random() * 10);
        
        // Apply damage through enemy's takeDamage method
        gameState.currentEnemy.takeDamage(damage);
    },
    
    playerCastSpell: function() {
        if (!gameState.inCombat || !gameState.currentEnemy) return;
        
        // Check mana cost before casting
        if (!gameState.character.consumeMana(15)) {
            UI.addToLog("Not enough mana to cast spell! (Requires 15 mana)", "error");
            return;
        }
        
        // Calculate spell damage based on agility (mages need agility for spell casting)
        const spellDamage = Math.floor(gameState.character.agility * 1.5 + Math.random() * 15);
        UI.addToLog(`✨ You cast a magic spell for ${spellDamage} damage!`, "combat");
        
        // Spells partially bypass defense for balance
        const actualDamage = Math.max(spellDamage - Math.floor(gameState.currentEnemy.defense / 2), spellDamage);
        gameState.currentEnemy.hp -= actualDamage;
        
        if (gameState.currentEnemy.hp <= 0) {
            const reward = Math.floor(gameState.currentEnemy.reward * 1.2); // Bonus for using magic
            gameState.addScore(reward);
            UI.addToLog(`${gameState.currentEnemy.name} defeated with magic! You gain ${reward} points!`, "victory");
            UI.updateStory(`🎭 Magical Victory! Your spell obliterates the ${gameState.currentEnemy.name}!`);
            this.endBattle();
        } else {
            // Enemy counter-attack
            setTimeout(() => this.enemyAttack(), 500);
        }
        
        UI.updateDisplay();
    },
    
    attemptEscape: function() {
        if (!gameState.inCombat) return;
        
        // Agility affects escape chance - fast characters can run better
        const escapeChance = gameState.character.agility / 100 + 0.5;
        if (Math.random() < escapeChance) {
            UI.addToLog("You successfully escaped!", "escape");
            UI.updateStory("🏃 You manage to escape from the enemy! You live to fight another day.");
            this.endBattle();
        } else {
            UI.addToLog("Failed to escape! The enemy blocks your path!", "error");
            this.enemyAttack();
        }
        
        UI.updateDisplay();
    },
    
    enemyAttack: function() {
        if (!gameState.currentEnemy || !gameState.inCombat) return;
        gameState.currentEnemy.performAttack();
    },
    
    endBattle: function() {
        gameState.inCombat = false;
        gameState.currentEnemy = null;
        UI.showExplorationButtons();
    }
};

// ===============================================
// USER INTERFACE SYSTEM (Centralizes all UI operations)
// ===============================================
const UI = {
    elements: {}, // Cache for DOM elements to improve performance
    
    initialize: function() {
        // Cache DOM elements to avoid repeated getElementById calls
        this.elements = {
            score: document.getElementById('score'),
            level: document.getElementById('level'),
            lives: document.getElementById('lives'),
            playerHp: document.getElementById('player-hp'),
            playerMaxHp: document.getElementById('player-max-hp'),
            playerMana: document.getElementById('player-mana'),
            playerMaxMana: document.getElementById('player-max-mana'),
            playerStrength: document.getElementById('player-strength'),
            playerAgility: document.getElementById('player-agility'),
            playerHpBar: document.getElementById('player-hp-bar'),
            playerManaBar: document.getElementById('player-mana-bar'),
            enemyPanel: document.getElementById('enemy-panel'),
            enemyName: document.getElementById('enemy-name'),
            enemyHp: document.getElementById('enemy-hp'),
            enemyMaxHp: document.getElementById('enemy-max-hp'),
            enemyAttack: document.getElementById('enemy-attack'),
            enemyDefense: document.getElementById('enemy-defense'),
            enemyHpBar: document.getElementById('enemy-hp-bar'),
            gameStory: document.getElementById('game-story'),
            gameLog: document.getElementById('game-log'),
            exploreBtn: document.getElementById('explore-btn'),
            restBtn: document.getElementById('rest-btn'),
            attackBtn: document.getElementById('attack-btn'),
            spellBtn: document.getElementById('spell-btn'),
            runBtn: document.getElementById('run-btn')
        };
        
        this.updateDisplay();
        this.showExplorationButtons();
        this.addToLog("Welcome to Adventure Quest! Click 'Start New Game' to begin your journey!", "start");
    },
    
    updateDisplay: function() {
        // Update game stats display
        this.elements.score.textContent = gameState.score;
        this.elements.level.textContent = gameState.level;
        this.elements.lives.textContent = gameState.lives;
        
        // Update player stats display
        this.elements.playerHp.textContent = gameState.character.hp;
        this.elements.playerMaxHp.textContent = gameState.character.maxHp;
        this.elements.playerMana.textContent = gameState.character.mana;
        this.elements.playerMaxMana.textContent = gameState.character.maxMana;
        this.elements.playerStrength.textContent = gameState.character.strength;
        this.elements.playerAgility.textContent = gameState.character.agility;
        
        // Update visual progress bars for better user feedback
        const hpPercent = (gameState.character.hp / gameState.character.maxHp) * 100;
        const manaPercent = (gameState.character.mana / gameState.character.maxMana) * 100;
        this.elements.playerHpBar.style.width = `${hpPercent}%`;
        this.elements.playerManaBar.style.width = `${manaPercent}%`;
        
        // Update enemy panel only when in combat
        if (gameState.inCombat && gameState.currentEnemy) {
            this.elements.enemyPanel.style.display = 'block';
            this.elements.enemyName.textContent = gameState.currentEnemy.name;
            this.elements.enemyHp.textContent = Math.max(0, gameState.currentEnemy.hp);
            this.elements.enemyMaxHp.textContent = gameState.currentEnemy.maxHp;
            this.elements.enemyAttack.textContent = gameState.currentEnemy.attack;
            this.elements.enemyDefense.textContent = gameState.currentEnemy.defense;
            
            const enemyHpPercent = Math.max(0, (gameState.currentEnemy.hp / gameState.currentEnemy.maxHp) * 100);
            this.elements.enemyHpBar.style.width = `${enemyHpPercent}%`;
        } else {
            this.elements.enemyPanel.style.display = 'none';
        }
    },
    
    updateStory: function(text) {
        this.elements.gameStory.innerHTML = `<h3>📖 Current Situation</h3><p>${text}</p>`;
    },
    
    addToLog: function(message, type = 'normal') {
        const timestamp = new Date().toLocaleTimeString();
        let colorClass = this.getLogColorClass(type);
        
        // Create and append log entry with timestamp for better debugging
        const entry = document.createElement('p');
        entry.innerHTML = `<span style="color: #888;">[${timestamp}]</span> <span style="${colorClass}">${message}</span>`;
        this.elements.gameLog.appendChild(entry);
        this.elements.gameLog.scrollTop = this.elements.gameLog.scrollHeight;
    },
    
    getLogColorClass: function(type) {
        // Color-coded messages for better visual feedback
        const colors = {
            'combat': 'color: #ff6b6b;',
            'victory': 'color: #51cf66;',
            'damage': 'color: #ff8cc8;',
            'score': 'color: #74c0fc;',
            'levelup': 'color: #ffd43b;',
            'event': 'color: #d0bfff;',
            'rest': 'color: #8ce99a;',
            'escape': 'color: #a9e34b;',
            'death': 'color: #ff6b6b;',
            'gameover': 'color: #ff6b6b; font-weight: bold;',
            'start': 'color: #69db7c; font-weight: bold;',
            'error': 'color: #ffa8a8;'
        };
        return colors[type] || '';
    },
    
    showExplorationButtons: function() {
        // Show exploration UI when not in combat
        this.elements.exploreBtn.classList.remove('hidden');
        this.elements.restBtn.classList.remove('hidden');
        this.elements.attackBtn.classList.add('hidden');
        this.elements.spellBtn.classList.add('hidden');
        this.elements.runBtn.classList.add('hidden');
    },
    
    showCombatButtons: function() {
        // Show combat UI when in battle
        this.elements.exploreBtn.classList.add('hidden');
        this.elements.restBtn.classList.add('hidden');
        this.elements.attackBtn.classList.remove('hidden');
        this.elements.spellBtn.classList.remove('hidden');
        this.elements.runBtn.classList.remove('hidden');
    }
};

// ===============================================
// GAME CONTROLLER (Handles input and coordinates between systems)
// ===============================================
const GameController = {
    startNewGame: function() {
        gameState.reset();
        UI.updateDisplay();
        UI.updateStory("🎮 Game Reset! Your adventure begins anew. The dungeon awaits...");
        UI.addToLog("Game started! Your character has been fully restored.", "start");
        UI.showExplorationButtons();
    },
    
    exploreDungeon: function() {
        World.explore();
    },
    
    restAtCamp: function() {
        if (gameState.inCombat) {
            UI.addToLog("You cannot rest during combat!", "error");
            return;
        }
        
        const restResult = gameState.character.rest();
        UI.updateStory("😴 You rest at your camp, recovering strength and mana...");
        UI.addToLog(`Resting... Recovered ${restResult.hpRestore} HP and ${restResult.manaRestore} mana.`, "rest");
    },
    
    attackEnemy: function() {
        Combat.playerAttack();
    },
    
    castSpell: function() {
        Combat.playerCastSpell();
    },
    
    runAway: function() {
        Combat.attemptEscape();
    }
};

// ===============================================
// GLOBAL FUNCTIONS (Interface for HTML button clicks)
// ===============================================
function startNewGame() {
    GameController.startNewGame();
}

function exploreDungeon() {
    GameController.exploreDungeon();
}

function restAtCamp() {
    GameController.restAtCamp();
}

function attackEnemy() {
    GameController.attackEnemy();
}

function castSpell() {
    GameController.castSpell();
}

function runAway() {
    GameController.runAway();
}

// ===============================================
// GAME INITIALIZATION (Sets up all systems when page loads)
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems in proper order
    UI.initialize();
    
    // Game is ready to play
    console.log("Adventure Quest initialized successfully!");
});