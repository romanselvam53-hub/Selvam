class Stopwatch {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.lapTimes = [];
        this.timerInterval = null;
        
        this.display = document.getElementById('display');
        this.lapTimesElement = document.getElementById('lapTimes');
        this.lapCountElement = document.getElementById('lapCount');
        
        this.initializeButtons();
    }
    
    initializeButtons() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('lapBtn').addEventListener('click', () => this.recordLap());
    }
    
    start() {
        if (!this.isRunning) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.updateTime(), 10);
            this.isRunning = true;
        }
    }
    
    pause() {
        if (this.isRunning) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
        }
    }
    
    reset() {
        this.pause();
        this.elapsedTime = 0;
        this.lapTimes = [];
        this.updateDisplay();
        this.updateLapDisplay();
    }
    
    recordLap() {
        if (this.isRunning) {
            const currentLapTime = this.elapsedTime;
            const previousLapTime = this.lapTimes.length > 0 
                ? this.lapTimes[this.lapTimes.length - 1].totalTime 
                : 0;
            
            this.lapTimes.push({
                lapNumber: this.lapTimes.length + 1,
                totalTime: currentLapTime,
                splitTime: currentLapTime - previousLapTime
            });
            
            this.updateLapDisplay();
        }
    }
    
    updateTime() {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
    }
    
    formatTime(ms) {
        const date = new Date(ms);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
    
    formatShortTime(ms) {
        const date = new Date(ms);
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const seconds = date.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
        
        return `${minutes}:${seconds}.${milliseconds}`;
    }
    
    updateDisplay() {
        this.display.textContent = this.formatTime(this.elapsedTime);
    }
    
    updateLapDisplay() {
        this.lapCountElement.textContent = this.lapTimes.length;
        
        // Clear existing laps
        this.lapTimesElement.innerHTML = '';
        
        // Add new laps (in reverse order - newest first)
        this.lapTimes.slice().reverse().forEach(lap => {
            const row = document.createElement('tr');
            
            const lapCell = document.createElement('td');
            lapCell.textContent = lap.lapNumber;
            
            const totalCell = document.createElement('td');
            totalCell.textContent = this.formatShortTime(lap.totalTime);
            
            const splitCell = document.createElement('td');
            splitCell.textContent = this.formatShortTime(lap.splitTime);
            
            row.appendChild(lapCell);
            row.appendChild(totalCell);
            row.appendChild(splitCell);
            
            this.lapTimesElement.appendChild(row);
        });
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});