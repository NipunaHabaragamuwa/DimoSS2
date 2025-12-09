document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Check which page we're on
    const isLoginPage = document.querySelector('.login-container');
    const isDashboardPage = document.querySelector('.dashboard-container');
    
    // Pre-assigned data from Excel (Full list)
    const preAssignedData = [
        // Column A Employees
        { id: 1, name: 'Mr. H.M.P.D.B. DEMATAWA', empNumber: 'E02170', email: 'Priyanga.Dematawa@dimolanka.com' },
        { id: 2, name: 'Mr. W.P.J. KUMARA', empNumber: 'E02381', email: 'Jagath.Kumara@dimolanka.com' },
        { id: 3, name: 'Mr. S.G. MATHURANAGE', empNumber: 'E02388', email: 'Sampath.Gunasena@dimolanka.com' },
        { id: 4, name: 'Mr. W.M.W.C. JAYATHILAKE', empNumber: 'E02483', email: 'Wenura.Jayathilake@dimolanka.com' },
        { id: 5, name: 'Ms. M. S. KULARATHNA', empNumber: 'E01106', email: 'Mayuri.Kularathna@dimolanka.com' },
        { id: 6, name: 'Ms. S.K.D. HEWAMANAGE', empNumber: 'E02151', email: 'Kanchana.Hewamanage@dimolanka.com' },
        { id: 7, name: 'Mr. L.L.W.N. PUSHPAKUMARA', empNumber: 'E03397', email: 'Nalin.Pushpakumara@dimolanka.com' },
        { id: 8, name: 'Mr. L. H. D. J. HARISCHANDRA', empNumber: 'E03468', email: 'Dinujaya.Jayasanka@dimolanka.com' },
        { id: 9, name: 'Mr. W. S. D. SILVA', empNumber: 'E03777', email: 'shahen.silva@dimolanka.com' },
        { id: 10, name: 'Mr. M. B. D. DARSHANA', empNumber: 'E03910', email: 'damindu.darshana@dimolanka.com' },
        { id: 11, name: 'Mr. S. D. L. D. S. GUNASEKARA', empNumber: 'E04222', email: 'Dulanjaya.Gunasekara@dimolanka.com' },
        { id: 12, name: 'Mr. R. L. P. RANDARA', empNumber: 'S06699', email: 'Pasindu.Randara@dimolanka.com' },
        { id: 13, name: 'Mr. E. P. M. BHASHITHA', empNumber: 'S06798', email: 'miyuru.bhashitha@dimolanka.com' },
        { id: 14, name: 'Mr. J. N. JAYATILLAKE', empNumber: 'E04179', email: 'nilantha.jayatillake@dimolanka.com' },
        { id: 15, name: 'Ms. M. W. H. B. K. MAKULOLUWA', empNumber: 'E03504', email: 'bhagya.makuloluwa@dimolanka.com' },
        { id: 16, name: 'Mr. N. S. R. SILVA', empNumber: 'E03873', email: 'sanjana.silva@dimolanka.com' },
        { id: 17, name: 'Mr. D. M. A. U. BANDARA', empNumber: 'S06638', email: 'avishka.bandara@dimolanka.com' },
        { id: 18, name: 'Ms. T. N. WANIGARATNE', empNumber: 'E03509', email: 'tharindra.nishanjani@dimolanka.com' },
        { id: 19, name: 'Mr. V. K. A. D. P KURUPPU', empNumber: 'E03861', email: 'Danusha.Prabath@dimolanka.com' },
        { id: 20, name: 'Ms. K. P. D. A. PATHIRAGE', empNumber: 'T00501', email: 'dilini.pathirage@dimolanka.com' },
        { id: 21, name: 'Ms. A. W. G. A. CHATHURIKA', empNumber: 'T00551', email: 'Anushi.Amaraweera@dimolanka.com' },
        { id: 22, name: 'Ms. D.U Kodithuwakku', empNumber: 'S07045', email: 'dewmini.kodithuwakku@dimolanka.com' },
        { id: 23, name: 'Ms. W. A. D. NAMARATHNA', empNumber: 'E03988', email: 'dilshani.namarathna@dimolanka.com' },
        { id: 24, name: 'Ms. J. G. N. AMANDA', empNumber: 'S07016', email: 'Nilumi.Jayarathne@dimolanka.com' },
        { id: 25, name: 'Ms. T. A. H. P. THILAKARATHNE', empNumber: 'E03306', email: 'Hansi.Thilakarathne@dimolanka.com' },
        { id: 26, name: 'Mr. A. HAMEED', empNumber: 'E03487', email: 'Althaf.Hameed@dimolanka.com' },
        { id: 27, name: 'Mr. W.A.M.T.M. ABEYSHINGHE', empNumber: 'E02516', email: 'Thilina.Abeyshinghe@dimolanka.com' },
        { id: 28, name: 'Mr. C.M.G.K. PREMARATHNE', empNumber: 'E02539', email: 'Gamini.Premarathne@dimolanka.com' },
        { id: 29, name: 'Mr. D.W.R.W KUMARA', empNumber: 'E03434', email: 'randika.kumara@dimolanka.com' },
        { id: 30, name: 'Mr. W. P. B. P. WEERAWARDHENA', empNumber: 'E04071', email: 'buddhika.prabath@dimolanka.com' },
        { id: 31, name: 'Mr. M. D. S. L. ATTANAYAKA', empNumber: 'S06625', email: 'Sajith.Aththanayaka@dimolanka.com' },
        { id: 32, name: 'Mr. A. M. D. SOMARATHNA', empNumber: 'S06935', email: 'dhanushka.dilshan@dimolanka.com' },
        { id: 33, name: 'H. C. THISARANEE', empNumber: 'S06360', email: 'chamodya.hettiarachchige@dimolanka.com' },
        { id: 34, name: 'Mr. T.C. SANJEEWA', empNumber: 'E02480', email: 'Chanaka.Thilakahewa@dimolanka.com' },
        { id: 35, name: 'Mr. J.A.S.M SERAM', empNumber: 'E03421', email: 'Malshan.Seram@dimolanka.com' },
        { id: 36, name: 'Mr. T.L.P. CHATHURANGA', empNumber: 'E03546', email: 'Pramod.Liyanage@dimolanka.com' },
        { id: 37, name: 'Mr. W.S. THARAKA', empNumber: 'E03822', email: 'supun.wawegedarage@dimolanka.com' },
        { id: 38, name: 'Mr. K. A. B. AYESH', empNumber: 'S06538', email: 'Buddika.Ayesh@dimolanka.com' },
        { id: 39, name: 'Mr. W. P. G. M. WIJEKUMARA', empNumber: 'S07011', email: 'gayan.maduwantha@dimolanka.com' },
        { id: 40, name: 'Mr. A. T. R. DHARMASIRI', empNumber: 'S07012', email: 'Tharuksha.Rashmika@dimolanka.com' },
        { id: 41, name: 'Mr. R. M. S. I. RATHNAYAKE', empNumber: 'S06601', email: 'Suranga.Rathnayake@dimolanka.com' },
        { id: 42, name: 'Mr. W. A. S. THARINDA', empNumber: 'E04244', email: 'Shanuka.Weerasuriya@dimolanka.com' },
        { id: 43, name: 'Mr. P.A.N.S. PATHIRAJA', empNumber: 'E02478', email: 'Sampath.Pathiraja@dimolanka.com' },
        { id: 44, name: 'Ms. I. Y. NAWARATHNE', empNumber: 'E03701', email: 'Irani.Nawarathne@dimolanka.com' },
        { id: 45, name: 'Mr. K. A. K. N. KUMARA', empNumber: 'E04070', email: 'kasun.kumara@dimolanka.com' },
        { id: 46, name: 'Mr. A. M. A. D. JAYATHILAKE', empNumber: 'E03190', email: 'aruna.jayathilake@dimolanka.com' },
        { id: 47, name: 'Mr. A. R. P. PRIYADARSHANA', empNumber: 'E03191', email: 'Rasika.Priyadarshana@dimolanka.com' },
        { id: 48, name: 'Mr. T. M. D. L. THENNAKOON', empNumber: 'E03107', email: 'Danushka.Thennakoon@dimolanka.com' },
        { id: 49, name: 'Mr. B. M. C. L. B. BASNAYAKE', empNumber: 'E03305', email: 'Chamal.Basnayake@dimolanka.com' },
        { id: 50, name: 'Mr. I.M.S.N.K PERERA', empNumber: 'S03254', email: 'Sujith.Nishantha@dimolanka.com' },
        { id: 51, name: 'Mr. D.S.P.N.P. GUNASEKARA', empNumber: 'S05842', email: 'Pathirana.Gunasekara@dimolanka.com' },
        { id: 52, name: 'Mr. P. A. A. U. PEIRIS', empNumber: 'S06346', email: 'Udesha.Peiris@dimolanka.com' },
        { id: 53, name: 'Mr. B. L. L. K. KARUNARATHNA', empNumber: 'S06494', email: 'Lahiru.Karunarathna@dimolanka.com' },
        { id: 54, name: 'Mr. A. S. D. I. PRASAD', empNumber: 'S06501', email: 'Indika.Prasad@dimolanka.com' },
        { id: 55, name: 'Mr. M. H. S. A. NIMAL', empNumber: 'S06526', email: 'Sudath.Nimal@dimolanka.com' },
        { id: 56, name: 'Mr. M. H. D. RATHNAYAKA', empNumber: 'S06527', email: 'Darshana.Rathnayaka@dimolanka.com' },
        { id: 57, name: 'Mr. J. A. S. JAYASURIYA', empNumber: 'S06592', email: 'Sanath.Jayasuriya@dimolanka.com' },
        { id: 58, name: 'Mr. L. S. SENEVIRATHNE', empNumber: 'S06537', email: 'Lakshan.Senevirathne@dimolanka.com' },
        { id: 59, name: 'Mr. R. D. S. SANDAKELUM', empNumber: 'S06600', email: 'Salinda.Sandakelum@dimolanka.com' },
        { id: 60, name: 'Mr. T. M. K. S. THILAKARATHNA', empNumber: 'S06841', email: 'Kithmina.Sandaruwan@dimolanka.com' },
        { id: 61, name: 'Mr. D.A.D. PREMACHANDRA', empNumber: 'E04082', email: 'Asitha.Premachandra@dimolanka.com' },
        { id: 62, name: 'Mr. H. M. M. N. JAYASINGHE', empNumber: 'S06959', email: 'Nihara.Jayasinghe@dimolanka.com' },
        { id: 63, name: 'W.D.A. SUBASH', empNumber: 'E01631', email: 'Subash.Warnakulasooriya@dimolanka.com' },
        { id: 64, name: 'R. U. KARUNANAYAKE', empNumber: 'E03704', email: 'Ridmi.Karunanayake@dimolanka.com' },
        { id: 65, name: 'N. M. D. NAWARATHNA', empNumber: 'E03751', email: 'Muthu.Nawarathna@dimolanka.com' },
        { id: 66, name: 'Mr. P. K. S. P. WEERAWARDANA', empNumber: 'SS0158', email: 'Sampath.Weerawardana@dimolanka.com' },
        
        // Additional employees from other columns
        { id: 67, name: 'Mandira Dewasmitha', empNumber: 'N/A', email: '' },
        { id: 68, name: 'Minuri Hansana', empNumber: 'N/A', email: '' },
        { id: 69, name: 'Yeshika Pramodi', empNumber: 'N/A', email: 'Yashika.Pramodi@dimolanka.com' },
        { id: 70, name: 'Nipuna Habaragamuwa', empNumber: 'N/A', email: 'Nipuna.Habaragamuwa@dimolanka.com' },
        { id: 71, name: 'Raveen Akalanka', empNumber: 'N/A', email: 'Raveen.Akalanka@dimolanka.com' },
        { id: 72, name: 'Hasini Maduhansi', empNumber: 'N/A', email: 'Hasini.Maduhansi@dimolanka.com' },
        { id: 73, name: 'Nadini', empNumber: 'N/A', email: '' },
        { id: 74, name: 'kaweesha', empNumber: 'N/A', email: '' },
        { id: 75, name: 'dilshan', empNumber: 'N/A', email: '' },
        { id: 76, name: 'Imesh', empNumber: 'N/A', email: 'Imesha.Kumarage@dimolanka.com' },
        { id: 77, name: 'Parami Sulochana', empNumber: 'N/A', email: 'paramisulochana1@gmail.com' }
    ];
    
    // Initialize data storage with pre-assigned data
    function initializePreAssignedData() {
        localStorage.setItem('santaEmployees', JSON.stringify(preAssignedData));
        
        // Generate circular assignments (each person gives to the next, last gives to first)
        const assignments = [];
        
        for (let i = 0; i < preAssignedData.length; i++) {
            const santa = preAssignedData[i];
            const receiver = preAssignedData[(i + 1) % preAssignedData.length];
            
            assignments.push({
                santa: { 
                    id: santa.id, 
                    name: santa.name, 
                    empNumber: santa.empNumber, 
                    email: santa.email 
                },
                receiver: { 
                    id: receiver.id, 
                    name: receiver.name, 
                    empNumber: receiver.empNumber, 
                    email: receiver.email 
                }
            });
        }
        
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
                emp.name.toLowerCase().includes(username.toLowerCase()) && 
                emp.empNumber === password
            );
            
            if (employee) {
                // Store current user in session
                sessionStorage.setItem('currentUser', JSON.stringify(employee));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Try with partial name match
                const employeePartial = employees.find(emp => {
                    const empNameLower = emp.name.toLowerCase();
                    const inputNameLower = username.toLowerCase();
                    return (empNameLower.includes(inputNameLower) || 
                           inputNameLower.includes(empNameLower.split(' ').pop().toLowerCase())) && 
                           emp.empNumber === password;
                });
                
                if (employeePartial) {
                    sessionStorage.setItem('currentUser', JSON.stringify(employeePartial));
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Invalid credentials. Please check your name and employee number.\n\nExample: Name: "Mr. H.M.P.D.B. DEMATAWA" or "DEMATAWA", Emp#: "E02170"');
                }
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
            
            // Create wheel segments for each participant (show only first 12 names for visibility)
            const displayCount = Math.min(employees.length, 12); // Limit to 12 for better visibility
            const segmentAngle = 360 / displayCount;
            
            for (let i = 0; i < displayCount; i++) {
                const participant = employees[i];
                const rotation = i * segmentAngle;
                
                // Create segment element
                const segment = document.createElement('div');
                segment.className = 'wheel-segment';
                segment.style.transform = `rotate(${rotation}deg)`;
                segment.style.backgroundColor = getSegmentColor(i);
                
                // Create name element (shortened for display)
                const nameElement = document.createElement('div');
                nameElement.className = 'wheel-name';
                const displayName = participant.name.length > 15 ? 
                    participant.name.substring(0, 12) + '...' : participant.name;
                nameElement.textContent = displayName;
                nameElement.title = participant.name; // Full name on hover
                
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
            }
            
            // If there are more than 12 participants, add a "more" segment
            if (employees.length > 12) {
                const moreSegment = document.createElement('div');
                moreSegment.className = 'wheel-segment';
                moreSegment.style.transform = `rotate(${11 * segmentAngle + segmentAngle}deg)`;
                moreSegment.style.backgroundColor = '#95a5a6';
                
                const moreElement = document.createElement('div');
                moreElement.className = 'wheel-name';
                moreElement.textContent = `+${employees.length - 12} more`;
                moreElement.title = `${employees.length - 12} more participants`;
                
                moreSegment.appendChild(moreElement);
                wheelInner.appendChild(moreSegment);
            }
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
                            <div class="person-details">${recipient.email || 'Email not provided'}</div>
                            <div class="person-details">Emp #${recipient.empNumber}</div>
                        </div>
                    </div>
                    
                    <div class="result-message">
                        <p><i class="fas fa-info-circle"></i> <strong>Remember:</strong> Keep this assignment secret until the gift exchange party!</p>
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
