import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../services/api';
import './EmployeeList.css';

const EmployeeList = ({ onAddClick, onEditClick, refreshTrigger }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, [refreshTrigger]);

    const loadEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error loading employees", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id);
                loadEmployees();
            } catch (error) {
                console.error("Error deleting employee", error);
            }
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Employee List</h2>
                <button onClick={onAddClick} className="btn-add-employee">
                    <span className="plus-icon">+</span> Add New Employee
                </button>
            </div>

            <div className="table-responsive">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map(emp => (
                                <tr key={emp.id}>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>₹{emp.salary?.toLocaleString()}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => onEditClick(emp.id)} className="btn-edit">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(emp.id)} className="btn-delete">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default EmployeeList;
