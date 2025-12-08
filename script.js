document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Check which page we're on
    const isLoginPage = document.querySelector('.login-container');
    const isDashboardPage = document.querySelector('.dashboard-container');
    
    // Pre-assigned data from Excel
    const preAssignedData = [
        { id: 1, name: 'Dewmini Kodithuwakku', empNumber: 'S07045', email: 'dewmini.kodithuwakku@dimolanka.com', assignedTo: 'Anushi Chathurika' },
        { id: 2, name: 'Anushi Chathurika', empNumber: 'T00551', email: 'Anushi.Amaraweera@dimolanka.com', assignedTo: 'Nilumi Amanda' },
        { id: 3, name: 'Nilumi Amanda', empNumber: 'S07016', email: 'Nilumi.Jayarathne@dimolanka.com', assignedTo: 'Dilshani Namarathne' },
        { id: 4, name: 'Dilshani Namarathne', empNumber: 'E03988', email: 'dilshani.namarathna@dimolanka.com', assignedTo: 'Nipuna Habaragamuwa' },
        { id: 5, name: 'Nipuna Habaragamuwa', empNumber: 'TA6866', email: 'Nipuna.Habaragamuwa@dimolanka.com', assignedTo: 'Raveen Akalanka' },
        { id: 6, name: 'Raveen Akalanka', empNumber: 'TAXXXX', email: 'Raveen.Akalanka@dimolanka.com', assignedTo: 'Hasini Maduhansi' },
        { id: 7, name: 'Hasini Maduhansi', empNumber: 'TA6869', email: 'Hasini.Maduhansi@dimolanka.com', assignedTo: 'Dewmini Kodithuwakku' }
    ];
    
    // Initialize data storage with pre-assigned data
    function initializePreAssignedData() {
        localStorage.setItem('santaEmployees', JSON.stringify(preAssignedData));
        
        // Generate assignments from pre-assigned data
        const assignments = [];
        preAssignedData.forEach(santa => {
            const receiver = preAssignedData.find(emp => emp.name === santa.assignedTo);
            if (receiver) {
                assignments.push({
                    santa: { id: santa.id, name: santa.name, empNumber: santa.empNumber, email: santa.email },
                    receiver: { id: receiver.id, name: receiver.name, empNumber: receiver.empNumber, email: receiver.email }
                });
            }
        });
        
        localStorage.setItem('santaAssignments', JSON.stringify(assignments));
        localStorage.setItem('santaGenerated', 'true');
        localStorage.setItem('lastGenerated', new Date().toLocaleString());
    }
    
    // Check if data exists, if not, initialize with pre-assigned data
    if (!localStorage.getItem('santaEmployees') || !localStorage.getItem('santaAssignments')) {
        initializePreAssignedData();
    }
    
    // LOGIN PAGE FUNCTIONALITY
    if (isLoginPage) {
        const loginBtn = document.getElementById('loginBtn');
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        const adminModal = document.getElementById('adminModal');
        const closeModal = document.querySelector('.close');
        const adminAccessBtn = document.getElementById('adminAccessBtn');
        const adminPasswordInput = document.getElementById('adminPassword');
        
        // Employee Login
        loginBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!username || !password) {
                alert('Please enter both name and employee number');
                return;
            }
            
            const employees = JSON.parse(localStorage.getItem('santaEmployees')) || preAssignedData;
            
            // Check if employee exists (case insensitive name match)
            const employee = employees.find(emp => 
                emp.name.toLowerCase() === username.toLowerCase() && 
                emp.empNumber === password
            );
            
            if (employee) {
                // Store current user in session
                sessionStorage.setItem('currentUser', JSON.stringify(employee));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials. Please check your name and employee number.');
            }
        });
        
        // Enter key to login
        document.getElementById('username').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') loginBtn.click();
        });
        
        document.getElementById('password').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') loginBtn.click();
        });
        
        // Admin Login Button
        adminLoginBtn.addEventListener('click', function() {
            adminModal.style.display = 'flex';
            adminPasswordInput.focus();
        });
        
        // Close Modal
        closeModal.addEventListener('click', function() {
            adminModal.style.display = 'none';
        });
        
        // Admin Access
        adminAccessBtn.addEventListener('click', function() {
            const adminPassword = adminPasswordInput.value;
            const correctPassword = 'HabourRay12@';
            
            if (adminPassword === correctPassword) {
                // Redirect to admin panel
                window.location.href = 'admin.html';
            } else {
                alert('Incorrect admin password. Please try again.');
                adminPasswordInput.focus();
            }
        });
        
        // Enter key in admin password
        adminPasswordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') adminAccessBtn.click();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === adminModal) {
                adminModal.style.display = 'none';
            }
        });
    }
    
    // DASHBOARD PAGE FUNCTIONALITY
    if (isDashboardPage) {
        // Check if user is logged in
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        
        if (!currentUser) {
            window.location.href = 'index.html';
            return;
        }
        
        // Display user info
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('displayName').textContent = currentUser.name;
        document.getElementById('currentUser').textContent = currentUser.name;
        
        // Get assignments
        const assignments = JSON.parse(localStorage.getItem('santaAssignments')) || [];
        const userAssignment = assignments.find(a => a.santa.id === currentUser.id);
        
        // Update status message
        const statusMessage = document.getElementById('statusMessage');
        const statusIndicator = document.getElementById('statusIndicator');
        
        if (userAssignment) {
            statusMessage.innerHTML = '<span style="color:#4caf50;">Ready to discover your Secret Santa!</span>';
            statusIndicator.style.borderLeft = '5px solid #4caf50';
        } else {
            statusMessage.innerHTML = '<span style="color:#ff6b6b;">Assignments not ready yet. Please contact admin.</span>';
            statusIndicator.style.borderLeft = '5px solid #ff6b6b';
        }
        
        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
        
        // Wheel spin functionality
        const wheel = document.getElementById('wheel');
        const wheelInner = document.getElementById('wheelInner');
        const spinBtn = document.getElementById('spinBtn');
        const slowSpinBtn = document.getElementById('slowSpinBtn');
        const totalParticipants = document.getElementById('totalParticipants');
        const resultContainer = document.getElementById('resultContainer');
        const revealModal = document.getElementById('revealModal');
        const closeRevealBtn = document.getElementById('closeRevealBtn');
        
        let allParticipants = [];
        let userAssignmentObj = userAssignment;
        let wheelSegments = [];
        let isSpinning = false;
        
        // Initialize wheel with participant names
        function initializeWheel() {
            const employees = JSON.parse(localStorage.getItem('santaEmployees')) || preAssignedData;
            allParticipants = employees;
            
            // Update participant count
            totalParticipants.textContent = employees.length;
            
            // Clear previous wheel segments
            wheelInner.innerHTML = '';
            wheelSegments = [];
            
            if (employees.length === 0) {
                wheelInner.innerHTML = `
                    <div class="wheel-center">
                        <i class="fas fa-users-slash"></i>
                    </div>
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; color:#666; width:100%;">
                        No participants loaded
                    </div>
                `;
                return;
            }
            
            // Add center circle
            const center = document.createElement('div');
            center.className = 'wheel-center';
            center.innerHTML = '<i class="fas fa-gift"></i>';
            wheelInner.appendChild(center);
            
            // Create wheel segments for each participant
            const total = employees.length;
            const segmentAngle = 360 / total;
            
            employees.forEach((participant, index) => {
                // Calculate rotation for this segment
                const rotation = index * segmentAngle;
                
                // Create segment element
                const segment = document.createElement('div');
                segment.className = 'wheel-segment';
                segment.style.transform = `rotate(${rotation}deg)`;
                segment.style.backgroundColor = getSegmentColor(index);
                
                // Create name element
                const nameElement = document.createElement('div');
                nameElement.className = 'wheel-name';
                nameElement.textContent = participant.name;
                
                // Check if this is the user's assignment
                if (userAssignmentObj && userAssignmentObj.receiver.id === participant.id) {
                    nameElement.classList.add('assignment');
                    nameElement.title = 'Your Secret Santa Assignment!';
                }
                
                segment.appendChild(nameElement);
                wheelInner.appendChild(segment);
                
                // Store segment info
                wheelSegments.push({
                    element: segment,
                    participant: participant,
                    rotation: rotation,
                    centerAngle: rotation + (segmentAngle / 2),
                    isAssignment: userAssignmentObj && userAssignmentObj.receiver.id === participant.id
                });
            });
        }
        
        // Get color for segment
        function getSegmentColor(index) {
            const colors = [
                '#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff',
                '#9b59b6', '#1abc9c', '#e74c3c', '#f39c12',
                '#2ecc71', '#3498db', '#e67e22', '#95a5a6'
            ];
            return colors[index % colors.length];
        }
        
        // Function to spin the wheel
        function spinWheel(slowMode = false) {
            if (isSpinning || !userAssignmentObj) {
                if (!userAssignmentObj) {
                    alert('Secret Santa assignments have not been generated yet. Please contact admin.');
                }
                return;
            }
            
            if (allParticipants.length === 0) {
                alert('No participants found. Please contact admin.');
                return;
            }
            
            isSpinning = true;
            spinBtn.disabled = true;
            slowSpinBtn.disabled = true;
            
            // Find the segment with the user's assignment
            const assignmentSegment = wheelSegments.find(s => s.isAssignment);
            if (!assignmentSegment) {
                console.error('Assignment segment not found');
                resetWheel(slowMode);
                return;
            }
            
            // Disable transition while setting up
            wheelInner.style.transition = 'none';
            
            // Calculate target rotation (always lands on the assigned person)
            const extraRotations = slowMode ? 3 : 6;
            const targetDegrees = (extraRotations * 360) + (360 - assignmentSegment.centerAngle);
            
            // Apply initial rotation (reset to 0)
            wheelInner.style.transform = `rotate(0deg)`;
            
            // Force reflow
            wheelInner.offsetHeight;
            
            // Apply spinning animation
            if (slowMode) {
                wheelInner.style.transition = 'transform 8s cubic-bezier(0.2, 0.8, 0.3, 1)';
                spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Slow Spinning...';
            } else {
                wheelInner.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
                spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Spinning...';
            }
            
            // Apply the rotation
            setTimeout(() => {
                wheelInner.style.transform = `rotate(${targetDegrees}deg)`;
            }, 50);
            
            // Show result after animation completes
            const animationTime = slowMode ? 8000 : 4000;
            setTimeout(() => {
                showAssignmentResult();
                resetWheel(slowMode);
            }, animationTime + 500);
        }
        
        // Reset wheel after spin
        function resetWheel(slowMode) {
            // Re-enable buttons
            setTimeout(() => {
                spinBtn.disabled = false;
                slowSpinBtn.disabled = false;
                spinBtn.innerHTML = '<i class="fas fa-redo"></i> Spin to Reveal Secret Santa';
                isSpinning = false;
            }, 1000);
        }
        
        // Show assignment result
        function showAssignmentResult() {
            if (!userAssignmentObj) return;
            
            const recipient = userAssignmentObj.receiver;
            
            // Update modal with assignment details
            document.getElementById('assignedPerson').textContent = recipient.name;
            document.getElementById('recipientEmail').textContent = recipient.email || 'Not provided';
            
            // Also update the result container on the page
            resultContainer.innerHTML = `
                <div class="assignment-result">
                    <div class="result-icon">
                        <i class="fas fa-gift"></i>
                    </div>
                    <h3 class="result-heading">
                        <i class="fas fa-check-circle"></i> Assignment Found!
                    </h3>
                    
                    <div class="assignment-display">
                        <div class="from-to-card">
                            <div><i class="fas fa-user"></i></div>
                            <h4>You Are:</h4>
                            <div class="person-name">${currentUser.name}</div>
                            <div class="person-details">Emp #${currentUser.empNumber}</div>
                        </div>
                        
                        <div class="arrow-container">
                            <i class="fas fa-long-arrow-alt-right"></i>
                            <div class="arrow-text">will gift to</div>
                        </div>
                        
                        <div class="from-to-card to-card">
                            <div><i class="fas fa-user-circle"></i></div>
                            <h4>Your Secret Santa:</h4>
                            <div class="person-name">${recipient.name}</div>
                            <div class="person-details">Emp #${recipient.empNumber}</div>
                            <div class="person-details">${recipient.email || ''}</div>
                        </div>
                    </div>
                    
                    <div class="result-message">
                        <p><i class="fas fa-info-circle"></i> <strong>Remember:</strong> Keep this assignment secret until the gift exchange party on December 20th!</p>
                        <p>Gift spending Minimum: Rs2000 | Please have your gift wrapped and ready by the exchange date.</p>
                    </div>
                </div>
            `;
            
            // Show the modal
            revealModal.style.display = 'flex';
        }
        
        // Initialize wheel when page loads
        initializeWheel();
        
        // Event Listeners
        spinBtn.addEventListener('click', () => spinWheel(false));
        slowSpinBtn.addEventListener('click', () => spinWheel(true));
        
        // Close reveal modal
        closeRevealBtn.addEventListener('click', function() {
            revealModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === revealModal) {
                revealModal.style.display = 'none';
            }
        });
    }
});
