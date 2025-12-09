document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
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
    
    // DOM Elements
    const excelFile = document.getElementById('excelFile');
    const browseBtn = document.getElementById('browseBtn');
    const dropArea = document.getElementById('dropArea');
    const uploadStatus = document.getElementById('uploadStatus');
    const excelData = document.getElementById('excelData');
    const processDataBtn = document.getElementById('processDataBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    const generateAssignmentsBtn = document.getElementById('generateAssignmentsBtn');
    const resetAllBtn = document.getElementById('resetAllBtn');
    const exportDataBtn = document.getElementById('exportDataBtn');
    const sendAllEmailsBtn = document.getElementById('sendAllEmailsBtn');
    const addTestDataBtn = document.getElementById('addTestDataBtn');
    const backToLoginBtn = document.getElementById('backToLogin');
    const viewDashboardBtn = document.getElementById('viewDashboard');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close');
    const closeModalBtn = document.getElementById('closeModal');
    const methodButtons = document.querySelectorAll('.method-btn');
    
    let employees = [];
    let assignments = [];
    
    // Initialize
    loadData();
    updateUI();
    
    // Method selector
    methodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.dataset.method;
            
            // Update active button
            methodButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.getElementById('fileUploadContainer').classList.remove('active');
            document.getElementById('pasteContainer').classList.remove('active');
            document.getElementById(`${method}${method === 'file' ? 'Upload' : ''}Container`).classList.add('active');
        });
    });
    
    // File upload functionality
    browseBtn.addEventListener('click', function() {
        excelFile.click();
    });
    
    excelFile.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });
    
    // Drag and drop functionality
    dropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropArea.style.borderColor = '#4caf50';
        dropArea.style.background = '#e8f5e9';
    });
    
    dropArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dropArea.style.borderColor = '#c8e6c9';
        dropArea.style.background = '#f8fdf7';
    });
    
    dropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        dropArea.style.borderColor = '#c8e6c9';
        dropArea.style.background = '#f8fdf7';
        
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    
    // Handle Excel file
    function handleFile(file) {
        const fileName = file.name;
        const fileExt = fileName.split('.').pop().toLowerCase();
        
        if (!['xlsx', 'xls', 'csv'].includes(fileExt)) {
            alert('Please upload only Excel files (.xlsx, .xls, .csv)');
            return;
        }
        
        uploadStatus.innerHTML = `<i class="fas fa-spinner fa-spin"></i><p>Processing ${fileName}...</p>`;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                
                processExcelData(jsonData);
                uploadStatus.innerHTML = `<i class="fas fa-check-circle" style="color:#4caf50;"></i><p>Successfully processed ${fileName}</p><p>Loaded ${employees.length} employees</p>`;
                
                // Show success modal
                showModal('File Uploaded', `Successfully imported ${employees.length} employees from ${fileName}`);
                
            } catch (error) {
                console.error('Error reading file:', error);
                uploadStatus.innerHTML = `<i class="fas fa-exclamation-circle" style="color:#ff6b6b;"></i><p>Error processing file. Please try again.</p>`;
                alert('Error reading Excel file. Please make sure the file is in correct format.');
            }
        };
        
        reader.readAsArrayBuffer(file);
    }
    
    // Process Excel data
    function processExcelData(jsonData) {
        employees = [];
        
        // Skip header row if exists
        let startRow = 0;
        if (jsonData.length > 0) {
            const firstRow = jsonData[0];
            // Check if first row looks like headers
            if (typeof firstRow[0] === 'string' && 
                (firstRow[0].toLowerCase().includes('name') || 
                 firstRow[0].toLowerCase().includes('emp'))) {
                startRow = 1;
            }
        }
        
        for (let i = startRow; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (!row || row.length < 2) continue;
            
            const name = String(row[0] || '').trim();
            const empNumber = String(row[1] || '').trim();
            
            if (name && empNumber) {
                const email = row[2] ? String(row[2]).trim() : '';
                
                const employee = {
                    id: Date.now() + i,
                    name: name,
                    empNumber: empNumber,
                    email: email,
                    department: row[3] ? String(row[3]).trim() : 'General'
                };
                
                employees.push(employee);
            }
        }
        
        // Save to localStorage
        localStorage.setItem('santaEmployees', JSON.stringify(employees));
        localStorage.setItem('santaGenerated', 'false');
        localStorage.setItem('santaAssignments', JSON.stringify([]));
        
        updateUI();
    }
    
    // Process pasted data
    processDataBtn.addEventListener('click', function() {
        const data = excelData.value.trim();
        
        if (!data) {
            alert('Please paste employee data first');
            return;
        }
        
        const lines = data.split('\n');
        employees = [];
        
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;
            
            // Split by comma, tab, or pipe
            const parts = line.split(/[,|\t]/).map(part => part.trim());
            
            if (parts.length >= 2) {
                const name = parts[0];
                const empNumber = parts[1];
                const email = parts[2] || '';
                
                // Create employee object
                const employee = {
                    id: Date.now() + Math.random(),
                    name: name,
                    empNumber: empNumber,
                    email: email,
                    department: parts[3] || 'General'
                };
                
                employees.push(employee);
            }
        }
        
        if (employees.length === 0) {
            alert('No valid employee data found. Please check the format.');
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('santaEmployees', JSON.stringify(employees));
        localStorage.setItem('santaGenerated', 'false');
        localStorage.setItem('santaAssignments', JSON.stringify([]));
        
        updateUI();
        showModal('Data Imported', `Successfully imported ${employees.length} employees from pasted data.`);
        
        // Clear textarea
        excelData.value = '';
    });
    
    // Clear data
    clearDataBtn.addEventListener('click', function() {
        excelData.value = '';
        excelData.focus();
    });
    
    // Generate assignments using circular chain
    generateAssignmentsBtn.addEventListener('click', function() {
        if (employees.length < 2) {
            alert('Need at least 2 employees to generate Secret Santa assignments');
            return;
        }
        
        // Create assignments using circular chain
        assignments = [];
        
        for (let i = 0; i < employees.length; i++) {
            const santa = employees[i];
            const receiver = employees[(i + 1) % employees.length];
            
            assignments.push({
                santa: santa,
                receiver: receiver
            });
        }
        
        // Save assignments
        localStorage.setItem('santaAssignments', JSON.stringify(assignments));
        localStorage.setItem('santaGenerated', 'true');
        localStorage.setItem('lastGenerated', new Date().toLocaleString());
        
        updateUI();
        showModal('Assignments Generated', `Successfully generated Secret Santa assignments for ${employees.length} employees using circular chain method.`);
    });
    
    // Reset all data
    resetAllBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset ALL data? This will delete all employees and assignments.')) {
            employees = [];
            assignments = [];
            
            localStorage.setItem('santaEmployees', JSON.stringify([]));
            localStorage.setItem('santaAssignments', JSON.stringify([]));
            localStorage.setItem('santaGenerated', 'false');
            
            updateUI();
            showModal('Data Reset', 'All data has been reset successfully.');
        }
    });
    
    // Export data
    exportDataBtn.addEventListener('click', function() {
        if (assignments.length === 0) {
            alert('No assignments to export. Generate assignments first.');
            return;
        }
        
        // Create CSV content
        let csv = 'Santa Name,Santa Email,Santa Emp#,Recipient Name,Recipient Email,Recipient Emp#\n';
        
        assignments.forEach(assignment => {
            csv += `"${assignment.santa.name}","${assignment.santa.email || ''}","${assignment.santa.empNumber}","${assignment.receiver.name}","${assignment.receiver.email || ''}","${assignment.receiver.empNumber}"\n`;
        });
        
        // Create download link
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `secret-santa-assignments-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showModal('Data Exported', 'Assignments exported as CSV file.');
    });
    
    // Send emails (simulated)
    sendAllEmailsBtn.addEventListener('click', function() {
        if (assignments.length === 0) {
            alert('No assignments to send. Generate assignments first.');
            return;
        }
        
        // Simulate email sending
        const originalText = sendAllEmailsBtn.innerHTML;
        sendAllEmailsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Test Email...';
        sendAllEmailsBtn.disabled = true;
        
        setTimeout(() => {
            sendAllEmailsBtn.innerHTML = originalText;
            sendAllEmailsBtn.disabled = false;
            showModal('Test Email Sent', `Test email sent successfully. In production, emails would be sent to all ${assignments.length} employees.`);
        }, 2000);
    });
    
    // Add pre-assigned test data
    addTestDataBtn.addEventListener('click', function() {
        employees = preAssignedData;
        localStorage.setItem('santaEmployees', JSON.stringify(employees));
        
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
        
        updateUI();
        showModal('Pre-assigned Data Added', 'Added 7 pre-assigned employees. Assignments have been generated from the chain.');
    });
    
    // Back to login
    backToLoginBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // View dashboard preview
    viewDashboardBtn.addEventListener('click', function() {
        // Open dashboard in new tab with test user
        const testUser = employees.length > 0 ? employees[0] : { name: 'Dewmini Kodithuwakku', empNumber: 'S07045' };
        sessionStorage.setItem('currentUser', JSON.stringify(testUser));
        window.open('dashboard.html', '_blank');
    });
    
    // Modal functionality
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    closeModalBtn.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Helper functions
    function loadData() {
        employees = JSON.parse(localStorage.getItem('santaEmployees')) || preAssignedData;
        assignments = JSON.parse(localStorage.getItem('santaAssignments')) || [];
    }
    
    function updateUI() {
        updateEmployeeList();
        updateAssignmentsPreview();
        updateStats();
    }
    
    function updateEmployeeList() {
        const employeeList = document.getElementById('employeeList');
        
        if (employees.length === 0) {
            employeeList.innerHTML = `
                <div class="empty-list">
                    <i class="fas fa-users-slash"></i>
                    <p>No employee data loaded yet. Import data using the section above.</p>
                </div>
            `;
            return;
        }
        
        employeeList.innerHTML = '';
        employees.forEach(employee => {
            const item = document.createElement('div');
            item.className = 'employee-item';
            item.innerHTML = `
                <div class="employee-details">
                    <div class="employee-name">${employee.name}</div>
                    <div class="employee-meta">
                        Emp #${employee.empNumber} | ${employee.email || 'No email'} | ${employee.department || 'General'}
                    </div>
                </div>
                <div class="employee-id">ID: ${employee.id.toString().substring(0, 6)}</div>
            `;
            employeeList.appendChild(item);
        });
    }
    
    function updateAssignmentsPreview() {
        const assignmentsList = document.getElementById('assignmentsList');
        
        if (assignments.length === 0) {
            assignmentsList.innerHTML = '<p class="empty-preview">Assignments will appear here after generation</p>';
            return;
        }
        
        // Show first 5 assignments as preview
        assignmentsList.innerHTML = '';
        const previewCount = Math.min(5, assignments.length);
        
        for (let i = 0; i < previewCount; i++) {
            const assignment = assignments[i];
            const row = document.createElement('div');
            row.className = 'assignment-row';
            row.innerHTML = `
                <div><strong>${assignment.santa.name}</strong> (${assignment.santa.empNumber})</div>
                <div><i class="fas fa-long-arrow-alt-right"></i></div>
                <div><strong>${assignment.receiver.name}</strong> (${assignment.receiver.empNumber})</div>
            `;
            assignmentsList.appendChild(row);
        }
        
        if (assignments.length > previewCount) {
            const more = document.createElement('p');
            more.className = 'empty-preview';
            more.textContent = `... and ${assignments.length - previewCount} more assignments`;
            assignmentsList.appendChild(more);
        }
    }
    
    function updateStats() {
        const lastGenerated = localStorage.getItem('lastGenerated');
        const generated = localStorage.getItem('santaGenerated') === 'true';
        
        document.getElementById('employeeCount').textContent = employees.length;
        document.getElementById('totalEmployees').textContent = employees.length;
        document.getElementById('assignmentCount').textContent = assignments.length;
        document.getElementById('lastGenerated').textContent = lastGenerated || 'Never';
        
        // Update data status
        const dataStatus = document.getElementById('dataStatus');
        if (employees.length === 0) {
            dataStatus.innerHTML = '<span style="color:#ff6b6b;">No data loaded</span>';
        } else {
            dataStatus.innerHTML = `<span style="color:#4caf50;">${employees.length} employees loaded</span>`;
        }
        
        // Update assignments status
        const assignmentsStatus = document.getElementById('assignmentsStatus');
        if (generated) {
            assignmentsStatus.innerHTML = `<span style="color:#4caf50;">Generated (${assignments.length} assignments)</span>`;
        } else {
            assignmentsStatus.innerHTML = '<span style="color:#ff6b6b;">Not generated</span>';
        }
    }
    
    function showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        successModal.style.display = 'flex';
    }
});
