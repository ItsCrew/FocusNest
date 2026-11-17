import { Palette, Pencil, Star, Trash2 } from 'lucide-react'
import React from 'react'

const menuItems = [
    { label: 'Edit', icon: Pencil, id: 'edit' },
    { label: 'Set Active', icon: Star, id: 'active' },
    { label: 'Choose Color', icon: Palette, id: 'color' },
    { label: 'Delete', icon: Trash2, id: 'delete', danger: true },
];
const TaskMenu = ({ onDelete, onToggleActive, isActive, onEdit, onChooseColor, onRemoveColor, hasColor }) => {
    return (
        <div className='flex flex-col dark:bg-navbg-dark bg-white border dark:border-headings-dark border-headings-light/40 rounded-xl shadow-2xl p-1 w-40'>
            {menuItems.map(({ label, icon: Icon, id, danger }) => {
                const itemLabel = id === 'active' 
                    ? (isActive ? 'Set Inactive' : 'Set Active')
                    : id === 'color' 
                    ? (hasColor ? 'Remove Color' : 'Choose Color')
                    : label;

                return (
                    <button
                        type="button"
                        onClick={() => {
                            if (id === 'delete' && onDelete) onDelete();
                            if (id === 'active' && onToggleActive) onToggleActive();
                            if (id === 'edit' && onEdit) onEdit();
                            if (id === 'color') {
                                if (hasColor && onRemoveColor) onRemoveColor();
                                else if (onChooseColor) onChooseColor();
                            }
                        }}
                        key={id}
                        title={itemLabel}
                        aria-label={itemLabel}
                        className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors w-full font-medium ${danger
                            ? 'text-red-500 hover:bg-red-500/10'
                            : 'dark:text-neutral-200 text-font-light dark:hover:bg-white/10 hover:bg-neutral-100'
                            }`}
                    >
                        <Icon size={16} />
                        <span>{itemLabel}</span>
                    </button>
                );
            })}
        </div>
    )
}

export default TaskMenu