import React, { useState, useRef } from 'react'
import { Palette, ChevronDown } from 'lucide-react'
import { useTheme } from '../../Context/ThemeContext'
import GradientModal from './GradientModal';

const AppearanceBox = () => {
    const [themeOpen, setThemeOpen] = useState(false)
    const { theme, setTheme, bgType, setbgType, setSolidColor, setGradient } = useTheme();

    const [bgOpen, setBgOpen] = useState(false)
    const [selectedBg, setSelectedBg] = useState('None')

    const [uiOpen, setUiOpen] = useState(false)
    const [selectedUi, setSelectedUi] = useState('Coming Soon')
    const [isGradientModalOpen, setIsGradientModalOpen] = useState(false);
    const colorInputRef = useRef(null);

    const themeLabels = {
        dark: 'Dark Mode',
        light: 'Light Mode',
        system: 'Sync with system'
    }

    const backgroundLabels = {
        none: "None",
        solid: "Solid Colour",
        gradient: "Gradient Background"
    }

    return (
        <div className='flex flex-col gap-2 py-2 dark:text-font-dark text-font-light'>
            {/* Theme Selector */}
            <label className='flex items-center gap-2 text-lg font-medium dark:text-font-dark text-font-light'>
                <Palette size={20} className='dark:text-headings-dark text-headings-light' /> Choose a Theme
            </label>
            <div className='relative w-full sm:w-64 max-w-xs'>
                <div
                    onClick={() => setThemeOpen(!themeOpen)}
                    title="Select theme"
                    role="button"
                    tabIndex={0}
                    className='flex items-center justify-between h-12 px-4 dark:bg-navbg-dark bg-input-bg-light rounded-xl border dark:border-headings-dark border-headings-light/40 dark:text-font-dark text-font-light cursor-pointer select-none text-base shadow-2xs'
                >
                    <span>{themeLabels[theme] || 'Sync with system'}</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${themeOpen ? 'rotate-180' : ''}`} />
                </div>
                {themeOpen && (
                    <>
                        <div
                            onClick={() => setThemeOpen(false)}
                            className="fixed inset-0 z-10"
                        />
                        <div className='absolute top-full left-0 right-0 mt-1 dark:bg-background-dark bg-white border dark:border-headings-dark border-headings-light/40 rounded-xl z-20 overflow-hidden shadow-xl text-base dark:text-font-dark text-font-light'>
                            <div
                                onClick={() => { setTheme('dark'); setThemeOpen(false); }}
                                className='px-4 py-2.5 dark:hover:bg-navigation-hover-dark hover:bg-neutral-100 transition-colors cursor-pointer font-medium'
                            >
                                Dark Mode
                            </div>
                            <div
                                onClick={() => { setTheme('light'); setThemeOpen(false); }}
                                className='px-4 py-2.5 dark:hover:bg-navigation-hover-dark hover:bg-neutral-100 transition-colors cursor-pointer font-medium'
                            >
                                Light Mode
                            </div>
                            <div
                                onClick={() => { setTheme('system'); setThemeOpen(false); }}
                                className='px-4 py-2.5 dark:hover:bg-navigation-hover-dark hover:bg-neutral-100 transition-colors cursor-pointer font-medium'
                            >
                                Sync with system
                            </div>
                        </div>
                    </>
                )}
            </div>

            <hr className='my-3 dark:border-border-version-dark/30 border-neutral-200' />

            {/* Background Options */}
            <label className='flex items-center gap-2 text-lg font-medium dark:text-font-dark text-font-light'>
                <Palette size={20} className='dark:text-headings-dark text-headings-light' /> Background Options
            </label>
            <div className='relative w-full sm:w-64 max-w-xs'>
                <input type="color" className='hidden' ref={colorInputRef} onChange={(e) => { setSolidColor(e.target.value); setbgType('solid') }} />
                <div
                    onClick={() => setBgOpen(!bgOpen)}
                    title="Select background option"
                    role="button"
                    tabIndex={0}
                    className='flex items-center justify-between h-12 px-4 dark:bg-navbg-dark bg-input-bg-light rounded-xl border dark:border-headings-dark border-headings-light/40 dark:text-font-dark text-font-light cursor-pointer select-none text-base shadow-2xs'
                >
                    <span>{backgroundLabels[bgType] || 'None'}</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${bgOpen ? 'rotate-180' : ''}`} />
                </div>
                {bgOpen && (
                    <>
                        <div
                            onClick={() => setBgOpen(false)}
                            className="fixed inset-0 z-10"
                        />
                        <div className='absolute top-full left-0 right-0 mt-1 dark:bg-background-dark bg-white border dark:border-headings-dark border-headings-light/40 rounded-xl z-20 overflow-hidden shadow-xl text-base dark:text-font-dark text-font-light'>
                            <div
                                onClick={() => { setbgType('none'); setBgOpen(false); }}
                                className='px-4 py-2.5 dark:hover:bg-navigation-hover-dark hover:bg-neutral-100 transition-colors cursor-pointer font-medium'
                            >
                                None
                            </div>
                            <div
                                onClick={() => { setbgType('solid'); setBgOpen(false); colorInputRef.current.click(); }}
                                className='px-4 py-2.5 dark:hover:bg-navigation-hover-dark hover:bg-neutral-100 transition-colors cursor-pointer font-medium'
                            >
                                Solid Colour
                            </div>
                            <div
                                onClick={() => { setIsGradientModalOpen(true); setBgOpen(false); }}
                                className='px-4 py-2.5 dark:hover:bg-navigation-hover-dark hover:bg-neutral-100 transition-colors cursor-pointer font-medium'
                            >
                                Gradient Background
                            </div>
                        </div>
                    </>
                )}
            </div>

            <hr className='my-3 dark:border-border-version-dark/30 border-neutral-200' />

            {/* UI Density */}
            <label className='flex items-center gap-2 text-lg font-medium dark:text-font-dark text-font-light'>
                <Palette size={20} className='dark:text-headings-dark text-headings-light' /> UI Density
            </label>
            <div className='relative w-full sm:w-64 max-w-xs'>
                <div
                    onClick={() => setUiOpen(!uiOpen)}
                    title="UI Density (Coming Soon)"
                    role="button"
                    tabIndex={0}
                    className='flex items-center justify-between h-12 px-4 dark:bg-navbg-dark bg-input-bg-light rounded-xl border dark:border-headings-dark border-headings-light/40 dark:text-font-dark text-font-light select-none text-base shadow-2xs opacity-75'
                >
                    <span>{selectedUi}</span>
                </div>
            </div>

            <hr className='my-3 dark:border-border-version-dark/30 border-neutral-200' />

            {/* Reset Button */}
            <div className='flex justify-center items-center pt-2 pb-1'>
                <button
                    type='button'
                    onClick={() => {
                        setTheme('system')
                        setbgType('none')
                    }}
                    title="Reset theme and background to default"
                    aria-label="Reset theme and background to default"
                    className='h-11.25 w-37.5 dark:bg-headings-dark bg-headings-light hover:bg-[#34523b] dark:hover:bg-[#5e7f64] active:scale-95 hover:scale-105 text-white font-medium rounded-[10px] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer flex items-center justify-center text-base'
                >
                    Reset to Default
                </button>
            </div>

            <GradientModal
                isOpen={isGradientModalOpen}
                onClose={() => setIsGradientModalOpen(false)}
                onApply={(gradientString) => {
                    setGradient(gradientString);
                    setbgType('gradient');
                }}
            />
        </div>
    )
}

export default AppearanceBox