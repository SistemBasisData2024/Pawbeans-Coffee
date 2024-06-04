import React from 'react';
import '../style/DeleteConfirmationModalStyle.css';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-confirmation-modal">
            <div className="modal-content">
                <h2>Really want to delete your personalized coffee?</h2>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>Confirm</button>
                    <button className="cancel-button" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
