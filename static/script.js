document.addEventListener('DOMContentLoaded', () => {
    const employeeTable = document.getElementById('employee-table');
    const employeeForm = document.getElementById('employee-form');
    const employeeIdInput = document.getElementById('employee-id');
    const nameInput = document.getElementById('name');
    const positionInput = document.getElementById('position');

    // Fetch and display employees
    const fetchEmployees = async () => {
        const response = await fetch('/api/employees');
        const employees = await response.json();
        employeeTable.innerHTML = '';
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>
                    <button onclick="editEmployee(${employee.id}, '${employee.name}', '${employee.position}')">Edit</button>
                    <button onclick="deleteEmployee(${employee.id})">Delete</button>
                </td>
            `;
            employeeTable.appendChild(row);
        });
    };

    // Add or update an employee
    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = employeeIdInput.value;
        const name = nameInput.value;
        const position = positionInput.value;
        const employee = { name, position };

        if (id) {
            // Update existing employee
            const response = await fetch(`/api/employees/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: parseInt(id), ...employee })
            });
        } else {
            // Add new employee
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: Date.now(), ...employee })
            });
        }
        fetchEmployees();
        employeeForm.reset();
        employeeIdInput.value = '';
    });

    // Edit an employee
    window.editEmployee = (id, name, position) => {
        employeeIdInput.value = id;
        nameInput.value = name;
        positionInput.value = position;
    };

    // Delete an employee
    window.deleteEmployee = async (id) => {
        await fetch(`/api/employees/${id}`, { method: 'DELETE' });
        fetchEmployees();
    };

    fetchEmployees();
});
