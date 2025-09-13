import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';

const EditableNumber = ({ 
  path, 
  format = 'number', 
  prefix = '', 
  suffix = '', 
  className = '',
  decimals = 0 
}) => {
  const { data, updateField } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef(null);

  // Get the value from the data using the path
  const getValue = () => {
    const keys = path.split('.');
    let value = data;
    for (const key of keys) {
      value = value?.[key];
    }
    return value || 0;
  };

  const value = getValue();

  // Format the display value
  const formatValue = (val) => {
    const num = parseFloat(val) || 0;
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }).format(num);
      case 'percentage':
        return `${num.toFixed(decimals)}%`;
      case 'number':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }).format(num);
      default:
        return num.toString();
    }
  };

  const handleClick = () => {
    setIsEditing(true);
    setTempValue(value.toString());
  };

  const handleBlur = () => {
    if (tempValue !== '') {
      const numValue = parseFloat(tempValue);
      if (!isNaN(numValue)) {
        updateField(path, numValue);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`editable-number ${className}`}
        style={{ width: `${Math.max(tempValue.length * 10, 120)}px` }}
        step={decimals > 0 ? `0.${'0'.repeat(decimals - 1)}1` : '1'}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer hover:bg-blue-50 hover:ring-1 hover:ring-blue-500 rounded px-1 transition-colors ${className}`}
      title="Click to edit"
    >
      {prefix}{formatValue(value)}{suffix}
    </span>
  );
};

export default EditableNumber;
