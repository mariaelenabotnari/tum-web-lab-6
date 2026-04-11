import { useState, useEffect } from 'react';

function RatingModal({ movie, onClose, onSubmit }) {
    const [value, setValue] = useState(movie.rating || 5);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'auto';
    }, []);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal rating-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <div className="comment-modal-header">
                    <i className="fas fa-star"></i>
                    <h3>{movie.rating ? 'Edit Rating' : 'Rate this Movie'}</h3>
                    <p>How would you rate <strong>{movie.title}</strong>?</p>
                </div>

                <div className="rating-display">
                    <span className="rating-number">{value}</span>
                    <span className="rating-out-of">/10</span>
                </div>

                <div className="rating-slider-wrap">
                    <span className="rating-min"><i className="fas fa-face-frown"></i></span>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={value}
                        onChange={e => setValue(Number(e.target.value))}
                        className="rating-slider"
                    />
                    <span className="rating-max"><i className="fas fa-face-grin-stars"></i></span>
                </div>

                <div className="rating-stars-preview">
                    {Array.from({ length: 10 }, (_, i) => (
                        <i
                            key={i}
                            className={i < value ? 'fas fa-star' : 'far fa-star'}
                            onClick={() => setValue(i + 1)}
                        />
                    ))}
                </div>

                <button className="btn-primary comment-submit" onClick={() => onSubmit(value)}>
                    <i className="fas fa-check"></i> Confirm Rating
                </button>
            </div>
        </div>
    );
}

export default RatingModal;