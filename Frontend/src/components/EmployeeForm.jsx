import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/api';
import './EmployeeForm.css';

const EmployeeForm = ({ id, onSuccess, onCancel }) => {
    const isEdit = Boolean(id);

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        salary: ''
    });

    useEffect(() => {
        if (isEdit) {
            loadEmployee();
        } else {
            setEmployee({
                firstName: '',
                lastName: '',
                email: '',
                department: '',
                salary: ''
            });
        }
    }, [id]);

    const loadEmployee = async () => {
        try {
            const data = await getEmployeeById(id);
            setEmployee(data);
        } catch (error) {
            console.error("Error loading employee", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...employee,
                salary: parseFloat(employee.salary)
            };

            if (isEdit) {
                await updateEmployee(id, payload);
            } else {
                await createEmployee(payload);
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving employee", error);
            alert(`Error saving employee: ${error.message}`);
        }
    };

    return (
        <div className="employee-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="e.g. Piyush"
                        value={employee.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="e.g. Layge"
                        value={employee.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="e.g. piyushlayge@example.com"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            placeholder="e.g. Engineering"
                            value={employee.department}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Salary</label>
                        <div className="salary-input-wrapper">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                name="salary"
                                placeholder="0.00"
                                value={employee.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-save">
                        {isEdit ? 'Update Employee' : 'Create Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
};


export default EmployeeForm;
