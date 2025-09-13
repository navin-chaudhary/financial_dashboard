import React, { useState, useRef, useEffect } from 'react';
import { useDashboardData } from '../context/DashboardDataContext';

const EditableValue = ({ 
    path, 
    defaultValue, 
    className = "", 
    prefix = "", 
    suffix = "", 
    type = "text",
    validation = null 
}) => {
    const { getData, updateData } = useDashboardData();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const inputRef = useRef(null);

    const currentValue = getData(path) || defaultValue;

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleClick = () => {
        setEditValue(currentValue.toString());
        setIsEditing(true);
    };

    const handleSave = () => {
        let newValue = editValue;
        
        // Apply type conversion
        if (type === 'number') {
            newValue = parseFloat(editValue);
            if (isNaN(newValue)) {
                setIsEditing(false);
                return;
            }
        }
        
        // Apply validation if provided
        if (validation && !validation(newValue)) {
            setIsEditing(false);
            return;
        }
        
        updateData(path, newValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const handleBlur = () => {
        handleSave();
    };

    if (isEditing) {
        return (
            <input
                ref={inputRef}
                type={type === 'number' ? 'number' : 'text'}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={`${className} border-2 border-blue-500 rounded px-1 bg-blue-50 min-w-0`}
                style={{ width: `${Math.max(editValue.length * 10, 70)}px` }}
            />
        );
    }

    return (
        <span
            onClick={handleClick}
            className={`${className} cursor-pointer hover:bg-blue-100 hover:border-blue-300 border border-transparent rounded px-1 transition-colors inline-block`}
            title="Click to edit"
        >
            {prefix}{currentValue}{suffix}
        </span>
    );
};

export default EditableValue;
