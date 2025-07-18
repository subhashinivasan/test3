from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

# Load initial employee data from a JSON file
with open('employees.json', 'r') as f:
    employees = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/employees', methods=['GET'])
def get_employees():
    return jsonify(employees)

@app.route('/api/employees', methods=['POST'])
def add_employee():
    new_employee = request.json
    employees.append(new_employee)
    return jsonify(new_employee), 201

@app.route('/api/employees/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    updated_employee = request.json
    for i, employee in enumerate(employees):
        if employee['id'] == employee_id:
            employees[i] = updated_employee
            return jsonify(updated_employee)
    return jsonify({'error': 'Employee not found'}), 404

@app.route('/api/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    for i, employee in enumerate(employees):
        if employee['id'] == employee_id:
            del employees[i]
            return jsonify({'message': 'Employee deleted'})
    return jsonify({'error': 'Employee not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
