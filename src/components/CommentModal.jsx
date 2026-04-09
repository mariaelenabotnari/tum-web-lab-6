import { useState, useEffect } from 'react';

function CommentModal({ movie, onClose, onSubmit }) {
    const [text, setText] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    const handleSubmit = () => {
        if (!text.trim()) return;
        onSubmit(text.trim());
        setText('');
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal comment-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="comment-modal-header">
                    <i className="fas fa-feather-alt"></i>
                    <h3>Leave a Thought</h3>
                    <p>What did you think about <strong>{movie.title}</strong>?</p>
                </div>

                <textarea
                    className="comment-input"
                    placeholder="Share some thoughts... was it a masterpiece or a snooze fest?"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows={4}
                />

                <button
                    className="btn-primary comment-submit"
                    onClick={handleSubmit}
                    disabled={!text.trim()}
                >
                    <i className="fas fa-paper-plane"></i> Post Comment
                </button>
            </div>
        </div>
    );
}

export default CommentModal;