'use client'

import { useRef, useEffect } from 'react'

const Modal = ({ open, onClose }) => {
    const modalRef = useRef(null);

    // Trap focus inside modal
    useEffect(() => {
        if (!open) return;
        const previouslyFocused = document.activeElement;
        const focusable = modalRef.current?.querySelector('a,button');
        focusable?.focus();
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
            previouslyFocused?.focus();
        };
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            onClick={onClose}
        >
            <div
                ref={modalRef}
                className="bg-card text-card-foreground rounded-xl p-8 min-w-[320px] shadow-2xl text-center relative animate-in fade-in zoom-in-95"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-6 text-2xl text-muted-foreground hover:text-foreground focus:outline-none"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <h2 className="mb-4 text-xl font-bold">Contact Developer</h2>
                <div className="space-y-2">
                    <div><strong>GitHub:</strong> <a className="text-primary hover:underline font-medium" href="https://github.com/shrivastavpush" target="_blank" rel="noopener noreferrer">shrivastavpush</a></div>
                    <div><strong>Email:</strong> <a className="text-primary hover:underline font-medium" href="mailto:shrivastavpush@gmail.com">shrivastavpush@gmail.com</a></div>
                </div>
            </div>
        </div>
    );
}


export default Modal