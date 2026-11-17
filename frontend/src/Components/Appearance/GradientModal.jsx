import React, { useState } from 'react'
import { X } from 'lucide-react'

const GradientModal = ({ isOpen, onClose, onApply }) => {
    const [direction, setDirection] = useState('to right')
    const [color1, setColor1] = useState('#1e2d24')
    const [color2, setColor2] = useState('#6b8f71')

    if (!isOpen) return null

    const handleApply = () => {
        const gradientString = `linear-gradient(${direction}, ${color1}, ${color2})`
        if (onApply) {
            onApply(gradientString)
        }
        if (onClose) {
            onClose()
        }
    }

    const currentGradient = `linear-gradient(${direction}, ${color1}, ${color2})`

    return (
        <div className='fixed inset-0 z-60 flex items-center justify-center dark:bg-modal-shadow-bg bg-black/60 p-4 backdrop-blur-xs'>
            {/* Backdrop click to close */}
            <div className='fixed inset-0' onClick={onClose} />

            {/* Modal Card */}
            <div className='relative z-10 w-full max-w-md border dark:border-modal-border border-headings-light/40 rounded-2xl dark:bg-modal-bg bg-white overflow-hidden shadow-2xl'>
                {/* Header */}
                <div className='p-6 border-b dark:border-modal-border/30 border-neutral-200 flex items-center justify-between'>
                    <h2 className='text-xl font-bold dark:text-font-dark text-font-light'>
                        Customize Gradient
                    </h2>
                    <button
                        type='button'
                        onClick={onClose}
                        title="Close modal"
                        aria-label="Close modal"
                        className='cursor-pointer text-neutral-400 hover:text-font-light dark:hover:text-font-dark transition-colors'
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className='p-6 flex flex-col gap-5'>
                    {/* Live Preview Box */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium dark:text-font-dark text-font-light'>
                            Preview
                        </label>
                        <div
                            className='h-16 w-full rounded-xl border dark:border-headings-dark border-headings-light/40 shadow-inner transition-all duration-200'
                            style={{ background: currentGradient }}
                        />
                    </div>

                    {/* Direction Dropdown */}
                    <div className='flex flex-col gap-1.5'>
                        <label className='text-sm font-medium dark:text-font-dark text-font-light'>
                            Direction
                        </label>
                        <select
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                            className='h-11 px-3 rounded-xl border dark:border-headings-dark border-headings-light/40 dark:bg-navbg-dark bg-input-bg-light dark:text-font-dark text-font-light focus:outline-none cursor-pointer text-sm'
                        >
                            <option value='to right'>→ To Right</option>
                            <option value='to left'>← To Left</option>
                            <option value='to bottom'>↓ To Bottom</option>
                            <option value='to top'>↑ To Top</option>
                            <option value='45deg'>↗ 45° Angle</option>
                            <option value='135deg'>↘ 135° Angle</option>
                        </select>
                    </div>

                    {/* Color Pickers */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-sm font-medium dark:text-font-dark text-font-light'>
                                Start Color
                            </label>
                            <div className='flex items-center gap-2 h-11 px-3 rounded-xl border dark:border-headings-dark border-headings-light/40 dark:bg-navbg-dark bg-input-bg-light'>
                                <input
                                    type='color'
                                    value={color1}
                                    onChange={(e) => setColor1(e.target.value)}
                                    className='w-7 h-7 rounded cursor-pointer border-none bg-transparent'
                                />
                                <span className='text-xs font-mono dark:text-font-dark text-font-light uppercase'>
                                    {color1}
                                </span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-sm font-medium dark:text-font-dark text-font-light'>
                                End Color
                            </label>
                            <div className='flex items-center gap-2 h-11 px-3 rounded-xl border dark:border-headings-dark border-headings-light/40 dark:bg-navbg-dark bg-input-bg-light'>
                                <input
                                    type='color'
                                    value={color2}
                                    onChange={(e) => setColor2(e.target.value)}
                                    className='w-7 h-7 rounded cursor-pointer border-none bg-transparent'
                                />
                                <span className='text-xs font-mono dark:text-font-dark text-font-light uppercase'>
                                    {color2}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className='p-6 border-t dark:border-modal-border/30 border-neutral-200 flex justify-end gap-3'>
                    <button
                        type='button'
                        onClick={onClose}
                        title="Cancel"
                        aria-label="Cancel"
                        className='px-4 py-2 text-sm font-medium rounded-[10px] dark:text-font-dark/70 text-neutral-600 hover:text-font-light dark:hover:text-font-dark cursor-pointer transition-colors'
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        onClick={handleApply}
                        title="Apply Gradient"
                        aria-label="Apply Gradient"
                        className='h-10 px-6 dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] active:scale-95 hover:scale-105 text-white font-medium rounded-[10px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer flex items-center justify-center text-sm'
                    >
                        Apply Gradient
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GradientModal
