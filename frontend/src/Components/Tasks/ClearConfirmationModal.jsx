import React, { useEffect } from 'react'

const ClearConfirmationModal = ({ onClose, onConfirm }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose()
      }}
      className="flex items-center justify-center bg-black/60 backdrop-blur-xs fixed inset-0 z-1200 p-4">
      <div className="w-full max-w-md border dark:border-modal-border border-headings-light/40 rounded-2xl dark:bg-modal-bg bg-white shadow-2xl p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center gap-3">
          <h2 className="text-2xl font-bold dark:text-font-dark text-font-light">Clear all tasks?</h2>
          <p className="dark:text-neutral-300 text-neutral-600 text-sm leading-relaxed max-w-xs">
            This will permanently delete all tasks. <span className="dark:text-white text-font-light font-semibold">This action cannot be undone.</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            title="Cancel and keep tasks"
            aria-label="Cancel and keep tasks"
            className="h-11 w-28 rounded-[10px] dark:text-white text-font-light font-medium text-base dark:bg-headings-dark bg-neutral-200 dark:hover:bg-[#5e7f64] hover:bg-neutral-300 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            title="Permanently delete all tasks"
            aria-label="Permanently delete all tasks"
            className="h-11 w-28 rounded-[10px] text-white font-medium text-base bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            Clear all
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClearConfirmationModal
