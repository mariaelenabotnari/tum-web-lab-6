import { useEffect } from 'react';

function ViewCommentsModal({ movie, onClose }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    return (
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
                        <p>No comments yet, be the first to share your thoughts!</p>
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
                                    <p>{c.text}</p>
                                    <span className="comment-date">
                                        <i className="fas fa-calendar-alt"></i> {c.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewCommentsModal;