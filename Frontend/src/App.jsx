import React, { useState, useRef } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Modal from './components/Modal';
import './App.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const openAddModal = () => {
        setEditEmployeeId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (id) => {
        setEditEmployeeId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditEmployeeId(null);
    };

    const handleFormSuccess = () => {
        closeModal();
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Employee Management System</h1>
            </header>
            <main>
                <div className="container mt-4">
                    <EmployeeList
                        onAddClick={openAddModal}
                        onEditClick={openEditModal}
                        refreshTrigger={refreshTrigger}
                    />
                </div>
            </main>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editEmployeeId ? 'Edit Employee' : 'Add New Employee'}
            >
                <EmployeeForm
                    id={editEmployeeId}
                    onSuccess={handleFormSuccess}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
}

export default App;

