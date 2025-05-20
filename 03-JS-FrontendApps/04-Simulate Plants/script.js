/**
 * Class representing a Neighborhood with power demands
 */
class Neighborhood {
    constructor(name, baseDemand, maxDemand) {
        this.name = name;
        this.baseDemand = baseDemand; // Base power needed in MW
        this.maxDemand = maxDemand;   // Maximum possible demand in MW
        this.currentDemand = baseDemand;
        this.allocated = 0;
        this.satisfied = true;
    }

    /**
     * Simulates random changes in power demand
     */
    fluctuateDemand() {
        // Random demand fluctuation between 80% and 120% of base
        const fluctuation = 0.8 + Math.random() * 0.4;
        this.currentDemand = Math.min(
            Math.max(this.baseDemand * fluctuation, this.baseDemand * 0.5),
            this.maxDemand
        );
        this.currentDemand = Math.round(this.currentDemand * 10) / 10; // Round to 1 decimal
        return this.currentDemand;
    }

    /**
     * Receive allocated power from the plant
     */
    receivePower(amount) {
        this.allocated = amount;
        this.satisfied = this.allocated >= this.currentDemand;
        return this.satisfied;
    }

    /**
     * Get the status report for this neighborhood
     */
    getStatus() {
        return {
            name: this.name,
            demand: this.currentDemand,
            allocated: this.allocated,
            satisfied: this.satisfied,
            efficiency: this.allocated > 0 ? 
                Math.round((Math.min(this.currentDemand, this.allocated) / this.allocated) * 100) : 0
        };
    }
}

/**
 * Class representing a PowerPlant that distributes electricity
 */
class PowerPlant {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity; // Total capacity in MW
        this.neighborhoods = [];
        this.reservePercentage = 10; // Reserve power percentage
        this.running = false;
        this.simulationInterval = null;
    }

    /**
     * Add a neighborhood to the power distribution network
     */
    addNeighborhood(neighborhood) {
        this.neighborhoods.push(neighborhood);
        return this.neighborhoods.length;
    }

    /**
     * Calculate total current demand from all neighborhoods
     */
    getTotalDemand() {
        return this.neighborhoods.reduce((sum, n) => sum + n.currentDemand, 0);
    }

    /**
     * Allocate power to neighborhoods based on their demands
     * Uses proportional allocation when demand exceeds capacity
     */
    allocatePower() {
        const totalDemand = this.getTotalDemand();
        const availableCapacity = this.capacity * (1 - this.reservePercentage / 100);
        
        // If we have enough capacity, give everyone what they need
        if (totalDemand <= availableCapacity) {
            this.neighborhoods.forEach(neighborhood => {
                neighborhood.receivePower(neighborhood.currentDemand);
            });
            return { success: true, surplus: availableCapacity - totalDemand };
        }
        
        // Otherwise, allocate proportionally based on demand
        this.neighborhoods.forEach(neighborhood => {
            const allocation = (neighborhood.currentDemand / totalDemand) * availableCapacity;
            neighborhood.receivePower(Math.round(allocation * 10) / 10); // Round to 1 decimal
        });
        
        return { success: false, deficit: totalDemand - availableCapacity };
    }

    /**
     * Simulate a power outage by reducing capacity
     */
    simulateOutage(severityPercent) {
        const oldCapacity = this.capacity;
        this.capacity = this.capacity * (1 - severityPercent / 100);
        this.allocatePower();
        
        setTimeout(() => {
            this.capacity = oldCapacity;
            this.allocatePower();
            console.log(`Power restored to ${this.name}`);
        }, 5000);
        
        return `${this.name} experiencing ${severityPercent}% outage`;
    }

    /**
     * Get system status for reporting
     */
    getSystemStatus() {
        const totalDemand = this.getTotalDemand();
        const availableCapacity = this.capacity * (1 - this.reservePercentage / 100);
        const neighborhoodStatuses = this.neighborhoods.map(n => n.getStatus());
        
        return {
            plantName: this.name,
            capacity: this.capacity,
            availableCapacity: availableCapacity,
            totalDemand: totalDemand,
            overloaded: totalDemand > availableCapacity,
            reserve: this.capacity - availableCapacity,
            utilization: Math.round((totalDemand / this.capacity) * 100),
            neighborhoods: neighborhoodStatuses
        };
    }

    /**
     * Start simulation with regular updates
     */
    startSimulation(updateCallback, intervalMs = 2000) {
        this.running = true;
        
        const simulate = () => {
            // Fluctuate demands
            this.neighborhoods.forEach(n => n.fluctuateDemand());
            
            // Allocate power
            this.allocatePower();
            
            // Random events (5% chance of outage)
            if (Math.random() < 0.05) {
                const severity = Math.floor(Math.random() * 30) + 10; // 10-40% severity
                this.simulateOutage(severity);
            }
            
            // Report status
            if (updateCallback) {
                updateCallback(this.getSystemStatus());
            }
        };
        
        // Initial simulation
        simulate();
        
        // Continue simulation at intervals
        this.simulationInterval = setInterval(simulate, intervalMs);
        return true;
    }

    /**
     * Stop the simulation
     */
    stopSimulation() {
        this.running = false;
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
        return true;
    }
}

/**
 * Helper function to display simulation results in the DOM
 */
function displayResults(status, elementId = 'output') {
    const outputEl = document.getElementById(elementId);
    if (!outputEl) return;

    let html = `
        <div class="plant-status ${status.overloaded ? 'overloaded' : ''}">
            <h2>${status.plantName}</h2>
            <div class="stats">
                <p>Capacity: ${status.capacity} MW (${status.utilization}% utilized)</p>
                <p>Total Demand: ${status.totalDemand.toFixed(1)} MW</p>
                <p>Reserve: ${status.reserve.toFixed(1)} MW</p>
                <p class="status">${status.overloaded ? '⚠️ OVERLOADED' : '✅ STABLE'}</p>
            </div>
            <h3>Neighborhoods</h3>
            <div class="neighborhoods">
    `;

    status.neighborhoods.forEach(n => {
        html += `
            <div class="neighborhood ${n.satisfied ? 'satisfied' : 'unsatisfied'}">
                <h4>${n.name}</h4>
                <p>Demand: ${n.demand.toFixed(1)} MW</p>
                <p>Allocated: ${n.allocated.toFixed(1)} MW</p>
                <p>Efficiency: ${n.efficiency}%</p>
                <div class="status-indicator ${n.satisfied ? 'green' : 'red'}"></div>
            </div>
        `;
    });

    html += `</div></div>`;
    outputEl.innerHTML = html;
}

// Initialize the simulation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create power plant
    const mainPlant = new PowerPlant("Central Power Station", 1000);
    
    // Create neighborhoods with various demands
    const neighborhoods = [
        new Neighborhood("Downtown", 250, 400),
        new Neighborhood("Suburbia", 180, 300),
        new Neighborhood("Industrial Zone", 350, 600),
        new Neighborhood("Residential Heights", 120, 200),
        new Neighborhood("Commercial District", 200, 350)
    ];
    
    // Add neighborhoods to the power plant
    neighborhoods.forEach(n => mainPlant.addNeighborhood(n));
    
    // Add UI controls
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <button id="startBtn">Start Simulation</button>
        <button id="stopBtn" disabled>Stop Simulation</button>
        <button id="outageBtn">Simulate Outage</button>
        <div class="slider-container">
            <label for="capacitySlider">Plant Capacity: <span id="capacityValue">1000</span> MW</label>
            <input type="range" id="capacitySlider" min="500" max="2000" value="1000">
        </div>
    `;
    document.body.appendChild(controls);
    
    // Create output container
    const output = document.createElement('div');
    output.id = 'output';
    document.body.appendChild(output);
    
    // Add event listeners
    document.getElementById('startBtn').addEventListener('click', () => {
        mainPlant.startSimulation(status => displayResults(status));
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    });
    
    document.getElementById('stopBtn').addEventListener('click', () => {
        mainPlant.stopSimulation();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    });
    
    document.getElementById('outageBtn').addEventListener('click', () => {
        const severity = Math.floor(Math.random() * 50) + 20; // 20-70% severity
        alert(mainPlant.simulateOutage(severity));
    });
    
    document.getElementById('capacitySlider').addEventListener('input', (e) => {
        const capacity = parseInt(e.target.value);
        mainPlant.capacity = capacity;
        document.getElementById('capacityValue').textContent = capacity;
        mainPlant.allocatePower();
        displayResults(mainPlant.getSystemStatus());
    });
    
    // Initial display
    displayResults(mainPlant.getSystemStatus());
});

// Add some basic CSS for visualization
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }
    .controls {
        margin-bottom: 20px;
        padding: 15px;
        background: #f0f0f0;
        border-radius: 5px;
    }
    .controls button {
        margin-right: 10px;
        padding: 8px 12px;
        cursor: pointer;
    }
    .slider-container {
        margin-top: 15px;
    }
    .plant-status {
        border: 1px solid #ddd;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
        background: #f9f9f9;
    }
    .plant-status.overloaded {
        background: #fff0f0;
        border-color: #ffcccc;
    }
    .neighborhoods {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
    .neighborhood {
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        width: calc(33% - 15px);
        position: relative;
        background: white;
    }
    .neighborhood.unsatisfied {
        background: #fff0f0;
    }
    .status-indicator {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
    }
    .status-indicator.green {
        background-color: #4CAF50;
    }
    .status-indicator.red {
        background-color: #F44336;
    }
`;
document.head.appendChild(style);
