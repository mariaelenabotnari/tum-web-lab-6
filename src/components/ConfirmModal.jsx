import { useEffect } from 'react';

function ConfirmModal({ title, message, icon, confirmLabel, onConfirm, onCancel }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    return (
        <div className="modal-backdrop" onClick={onCancel}>
            <div className="modal confirm-modal" onClick={e => e.stopPropagation()}>
                <div className="comment-modal-header">
                    <i className={icon}></i>
                    <h3>{title}</h3>
                    <p>{message}</p>
                </div>
                <div className="confirm-actions">
                    <button className="btn-secondary" onClick={onCancel}>
                        <i className="fas fa-times"></i> Cancel
                    </button>
                    <button className="btn-confirm-delete" onClick={onConfirm}>
                        <i className="fas fa-trash"></i> {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;