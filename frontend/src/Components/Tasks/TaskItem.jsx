import React, { useState, useRef, useEffect } from 'react'
import { Square, Check, ChevronDown, MoreVertical } from 'lucide-react'
import TaskMenu from './TaskMenu'
import { useTasks } from '../../Context/TasksContext'

const TaskItem = ({ task }) => {
  const [priority, setPriority] = useState(task.priority || 'P0')
  const [priorityOpen, setPriorityOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.task)
  const colorInputRef = useRef(null)

  const { toggleTask, deleteTask, toggleActiveTask, editTask, setTaskColor } = useTasks()

  useEffect(() => {
    setEditText(task.task)
  }, [task.task])

  const priorityStyles = {
    P0: 'dark:bg-red-500/20 dark:border-red-400 dark:text-red-400 bg-red-50 border-red-500 text-red-600',
    P1: 'dark:bg-amber-500/20 dark:border-amber-400 dark:text-amber-400 bg-amber-50 border-amber-500 text-amber-700',
    P2: 'dark:bg-gray-500/20 dark:border-gray-400 dark:text-gray-400 bg-slate-50 border-slate-400 text-slate-700',
  }

  const handleDelete = () => {
    deleteTask(task.id)
    setMenuOpen(false)
    setContextMenuPos(null)
  }

  const handleToggleActive = () => {
    toggleActiveTask(task.id)
    setMenuOpen(false)
    setContextMenuPos(null)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setMenuOpen(false)
    setContextMenuPos(null)
  }

  const handleSaveEdit = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.task) {
      editTask(task.id, trimmed)
    } else {
      setEditText(task.task)
    }
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit()
    if (e.key === 'Escape') {
      setEditText(task.task)
      setIsEditing(false)
    }
  }

  const handleChooseColor = () => {
    setMenuOpen(false)
    setContextMenuPos(null)
    colorInputRef.current?.click()
  }

  const handleRemoveColor = () => {
    setTaskColor(task.id, '')
    setMenuOpen(false)
    setContextMenuPos(null)
  }

  const handleColorChange = (e) => {
    setTaskColor(task.id, e.target.value)
  }

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenuPos({ x: e.clientX, y: e.clientY })
        setMenuOpen(false)
        setPriorityOpen(false)
      }}
      style={task.color ? { backgroundColor: task.color } : undefined}
      className={`flex justify-between px-3 sm:px-4 border dark:border-headings-dark border-headings-light/30 ${task.color ? '' : 'dark:bg-transparent bg-item-bg-light hover:bg-item-hover-light dark:hover:bg-white/5'} transition-all rounded-[10px] min-h-12 py-2 items-center text-[15px] sm:text-[16px] gap-1 sm:gap-2 shadow-2xs`}
    >
      {/* Hidden native color picker */}
      <input
        ref={colorInputRef}
        type="color"
        value={task.color || '#6b8f71'}
        onChange={handleColorChange}
        className="hidden"
      />

      <div className="flex items-center gap-2 flex-1 min-w-0 mr-1 sm:mr-2">
        <button
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          title={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
          aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
          onClick={() => toggleTask(task.id)}
          className={`w-4.5 h-4.5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 ${
            task.completed
              ? 'dark:bg-headings-dark bg-headings-light dark:border-headings-dark border-headings-light text-white'
              : 'dark:border-headings-dark/60 border-headings-light/60 hover:border-headings-light dark:hover:border-headings-dark'
          }`}
        >
          {task.completed && <Check size={12} strokeWidth={3.5} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            onBlur={handleSaveEdit}
            autoFocus
            className="bg-transparent border-b dark:border-headings-dark border-headings-light dark:text-font-dark text-font-light focus:outline-none text-[16px] px-1 py-0.5 w-full font-medium"
          />
        ) : (
          <p
            className={`min-w-0 flex-1 [overflow-wrap:anywhere] [word-break:break-word] break-words leading-snug transition-all duration-200 ${
              task.completed ? 'line-through text-neutral-400 opacity-60' : 'dark:text-font-dark text-font-light font-medium'
            }`}
          >
            {task.task}
          </p>
        )}
      </div>

      <div className="ml-auto shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div
              onClick={() => {
                setPriorityOpen(!priorityOpen)
                setContextMenuPos(null)
                setMenuOpen(false)
              }}
              title={`Priority: ${priority} (click to change)`}
              role="button"
              tabIndex={0}
              className={`flex justify-center items-center h-7.5 sm:h-8 min-w-13 sm:min-w-15 px-1.5 sm:px-2 rounded-[15px] border-2 cursor-pointer select-none font-semibold text-xs sm:text-sm transition-all ${priorityStyles[priority]} ${
                task.completed ? 'opacity-40 pointer-events-none' : 'opacity-100'
              }`}
            >
              <span>{priority}</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${priorityOpen ? 'rotate-180' : ''}`} />
            </div>
            {priorityOpen && (
              <>
                <div onClick={() => setPriorityOpen(false)} className="fixed inset-0 z-20" />
                <div className="absolute top-full left-0 mt-1.5 w-full dark:bg-navbg-dark bg-white border dark:border-headings-dark border-headings-light/40 rounded-xl overflow-hidden shadow-xl z-20">
                  <div onClick={() => { setPriority('P0'); setPriorityOpen(false); }} className="px-3 py-2 text-center font-semibold text-sm text-red-500 hover:bg-red-500/10 cursor-pointer">P0</div>
                  <div onClick={() => { setPriority('P1'); setPriorityOpen(false); }} className="px-3 py-2 text-center font-semibold text-sm text-amber-500 hover:bg-amber-500/10 cursor-pointer">P1</div>
                  <div onClick={() => { setPriority('P2'); setPriorityOpen(false); }} className="px-3 py-2 text-center font-semibold text-sm text-neutral-500 hover:bg-neutral-500/10 cursor-pointer">P2</div>
                </div>
              </>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(!menuOpen)
                setContextMenuPos(null)
                setPriorityOpen(false)
              }}
              title="Task options"
              aria-label="Task options"
              className="cursor-pointer text-neutral-400 hover:text-font-light dark:hover:text-white transition-colors p-1 flex items-center justify-center"
            >
              <MoreVertical size={20} />
            </button>
            {menuOpen && (
              <>
                <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-20" />
                <div className="absolute top-full right-0 mt-1.5 z-30">
                  <TaskMenu
                    onDelete={handleDelete}
                    onToggleActive={handleToggleActive}
                    isActive={task.isActive}
                    onEdit={handleEdit}
                    onChooseColor={handleChooseColor}
                    onRemoveColor={handleRemoveColor}
                    hasColor={Boolean(task.color)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {contextMenuPos && (
        <>
          <div
            onClick={() => setContextMenuPos(null)}
            onContextMenu={(e) => {
              e.preventDefault()
              setContextMenuPos(null)
            }}
            className="fixed inset-0 z-40"
          />
          <div style={{ top: contextMenuPos.y, left: contextMenuPos.x }} className="fixed z-50">
            <TaskMenu
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              isActive={task.isActive}
              onEdit={handleEdit}
              onChooseColor={handleChooseColor}
              onRemoveColor={handleRemoveColor}
              hasColor={Boolean(task.color)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default TaskItem