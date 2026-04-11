import { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';

function ViewCommentsModal({ movie, onClose, onEdit, onDelete }) {
    const [editingIndex, setEditingIndex]       = useState(null);
    const [editText, setEditText]               = useState('');
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    const startEdit = (index, currentText) => {
        setEditingIndex(index);
        setEditText(currentText);
    };

    const submitEdit = (index) => {
        if (!editText.trim()) return;
        onEdit(index, editText.trim());
        setEditingIndex(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditText('');
    };

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}>
                <div className="modal comments-view-modal" onClick={e => e.stopPropagation()}>
                    <button className="modal-close" onClick={onClose}>×</button>

                    <div className="comment-modal-header">
                        <i className="fas fa-comments"></i>
                        <h3>Comments</h3>
                        <p>Thoughts on <strong>{movie.title}</strong></p>
                    </div>

                    {movie.comments.length === 0 ? (
                        <div className="no-comments">
                            <i className="fas fa-comment-slash"></i>
                            <p>No comments yet, feel free to share your thoughts!</p>
                        </div>
                    ) : (
                        <div className="comments-list">
                            {movie.comments.map((c, i) => (
                                <div key={i} className="comment-item">
                                    <i className="fas fa-user-circle"></i>
                                    <div className="comment-text">
                                        <span className="comment-label">
                                            <i className="fas fa-quote-left"></i> You said
                                        </span>

                                        {editingIndex === i ? (
                                            <div className="comment-edit-area">
                                                <textarea
                                                    className="comment-input"
                                                    value={editText}
                                                    onChange={e => setEditText(e.target.value)}
                                                    rows={3}
                                                />
                                                <div className="comment-edit-actions">
                                                    <button className="btn-primary comment-submit" onClick={() => submitEdit(i)}>
                                                        <i className="fas fa-check"></i> Save
                                                    </button>
                                                    <button className="btn-secondary" onClick={cancelEdit}>
                                                        <i className="fas fa-times"></i> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p>{c.text}</p>
                                                <span className="comment-date">
                                                    <i className="fas fa-calendar-alt"></i> {c.date}
                                                </span>
                                                <div className="comment-actions-row">
                                                    <button className="btn-secondary comment-action-btn" onClick={() => startEdit(i, c.text)}>
                                                        <i className="fas fa-pen"></i> Edit
                                                    </button>
                                                    <button className="btn-secondary comment-action-btn delete" onClick={() => setConfirmDeleteIndex(i)}>
                                                        <i className="fas fa-trash"></i> Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {confirmDeleteIndex !== null && (
                <ConfirmModal
                    title="Delete Comment"
                    message="Are you sure you want to delete this comment?"
                    icon="fas fa-comment-slash"
                    confirmLabel="Delete Comment"
                    onConfirm={() => { onDelete(confirmDeleteIndex); setConfirmDeleteIndex(null); }}
                    onCancel={() => setConfirmDeleteIndex(null)}
                />
            )}
        </>
    );
}

export default ViewCommentsModal;