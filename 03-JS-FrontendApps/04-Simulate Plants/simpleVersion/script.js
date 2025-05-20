/**
 * Simple Neighborhood class
 */
class Neighborhood {
    constructor(name, demand) {
        this.name = name;
        this.baseDemand = demand;
        this.currentDemand = demand;
        this.allocated = 0;
        this.satisfied = false;
    }

    // Update demand with small random variations
    updateDemand() {
        // Fluctuate between 80% and 120% of base demand
        const variation = 0.8 + Math.random() * 0.4;
        this.currentDemand = Math.round(this.baseDemand * variation);
        return this.currentDemand;
    }

    // Receive power allocation
    receivePower(amount) {
        this.allocated = amount;
        this.satisfied = this.allocated >= this.currentDemand;
        return this.satisfied;
    }
}

/**
 * Simple PowerPlant class
 */
class PowerPlant {
    constructor(name, capacity) {
        this.name = name;
        this.capacity = capacity;
        this.neighborhoods = [];
        this.isRunning = false;
        this.simulationInterval = null;
    }

    // Add a neighborhood to the grid
    addNeighborhood(neighborhood) {
        this.neighborhoods.push(neighborhood);
    }

    // Calculate total demand from all neighborhoods
    getTotalDemand() {
        return this.neighborhoods.reduce((total, n) => total + n.currentDemand, 0);
    }

    // Distribute power to neighborhoods
    distributePower() {
        const totalDemand = this.getTotalDemand();
        
        // If we have enough capacity, everyone gets what they need
        if (totalDemand <= this.capacity) {
            this.neighborhoods.forEach(n => {
                n.receivePower(n.currentDemand);
            });
            return { success: true, surplus: this.capacity - totalDemand };
        } 
        
        // Otherwise, distribute proportionally
        else {
            this.neighborhoods.forEach(n => {
                const share = (n.currentDemand / totalDemand) * this.capacity;
                n.receivePower(Math.round(share));
            });
            return { success: false, deficit: totalDemand - this.capacity };
        }
    }

    // Simulate a power outage
    simulateOutage(percentage) {
        const originalCapacity = this.capacity;
        this.capacity = Math.round(this.capacity * (1 - percentage / 100));
        this.distributePower();
        updateDisplay();
        
        // Restore after 3 seconds
        setTimeout(() => {
            this.capacity = originalCapacity;
            this.distributePower();
            updateDisplay();
            alert("Power has been restored!");
        }, 3000);
    }

    // Start the simulation
    startSimulation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        
        const simulate = () => {
            // Update demands
            this.neighborhoods.forEach(n => n.updateDemand());
            
            // Distribute power
            this.distributePower();
            
            // Update display
            updateDisplay();
        };
        
        // Run immediately and then every 2 seconds
        simulate();
        this.simulationInterval = setInterval(simulate, 2000);
    }

    // Stop the simulation
    stopSimulation() {
        this.isRunning = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }
}

// Create the power plant and neighborhoods
const plant = new PowerPlant("Main Power Plant", 1000);
const neighborhoods = [
    new Neighborhood("Downtown", 300),
    new Neighborhood("Residential Area", 200),
    new Neighborhood("Industrial Park", 400),
    new Neighborhood("Shopping District", 150)
];

// Add neighborhoods to the plant
neighborhoods.forEach(n => plant.addNeighborhood(n));

// Update the display with current information
function updateDisplay() {
    const totalDemand = plant.getTotalDemand();
    const statusText = totalDemand > plant.capacity ? "OVERLOADED" : "STABLE";
    const statusClass = totalDemand > plant.capacity ? "overloaded" : "stable";
    
    // Update plant status
    document.getElementById('plantName').textContent = plant.name;
    document.getElementById('plantCapacity').textContent = plant.capacity;
    document.getElementById('totalDemand').textContent = totalDemand;
    document.getElementById('plantStatus').textContent = statusText;
    document.getElementById('plantStatus').className = statusClass;
    
    // Update utilization bar
    const utilizationPercent = Math.min(Math.round((totalDemand / plant.capacity) * 100), 100);
    document.getElementById('utilizationBar').style.width = `${utilizationPercent}%`;
    document.getElementById('utilizationText').textContent = `${utilizationPercent}%`;
    
    // Update neighborhoods
    const neighborhoodsList = document.getElementById('neighborhoods');
    neighborhoodsList.innerHTML = '';
    
    plant.neighborhoods.forEach(n => {
        const satisfied = n.satisfied ? "Satisfied" : "Unsatisfied";
        const statusClass = n.satisfied ? "satisfied" : "unsatisfied";
        
        const neighborhoodDiv = document.createElement('div');
        neighborhoodDiv.className = `neighborhood ${statusClass}`;
        neighborhoodDiv.innerHTML = `
            <h3>${n.name}</h3>
            <p>Demand: ${n.currentDemand} MW</p>
            <p>Allocated: ${n.allocated} MW</p>
            <p>Status: <span class="${statusClass}">${satisfied}</span></p>
        `;
        
        neighborhoodsList.appendChild(neighborhoodDiv);
    });
}

// Initialize the UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners
    document.getElementById('startBtn').addEventListener('click', () => {
        plant.startSimulation();
    });
    
    document.getElementById('stopBtn').addEventListener('click', () => {
        plant.stopSimulation();
    });
    
    document.getElementById('outageBtn').addEventListener('click', () => {
        const outagePercentage = Math.floor(Math.random() * 40) + 20; // 20% to 60%
        alert(`Simulating a ${outagePercentage}% power outage!`);
        plant.simulateOutage(outagePercentage);
    });
    
    document.getElementById('capacitySlider').addEventListener('input', (e) => {
        const newCapacity = parseInt(e.target.value);
        plant.capacity = newCapacity;
        document.getElementById('capacityValue').textContent = newCapacity;
        plant.distributePower();
        updateDisplay();
    });
    
    // Initial update
    plant.distributePower();
    updateDisplay();
});

