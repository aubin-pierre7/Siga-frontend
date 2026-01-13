import React, { forwardRef } from 'react'
import './Input.css'

const Input = forwardRef(({
  id,
  name,
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  readOnly = false,
  required = false,
  className = '',
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}, ref) => {
  const inputClasses = [
    'form-control',
    error ? 'is-invalid' : '',
    className
  ].join(' ').trim()

  const containerClasses = [
    'input-container',
    fullWidth ? 'w-100' : '',
    disabled ? 'disabled' : ''
  ].join(' ').trim()

  return (
    <div className={`form-group ${fullWidth ? 'w-100' : ''}`}>
      {label && (
        <label htmlFor={id || name} className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      
      <div className={containerClasses}>
        {startIcon && (
          <span className="input-icon start-icon">
            {startIcon}
          </span>
        )}
        
        <input
          ref={ref}
          id={id || name}
          name={name}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          {...props}
        />
        
        {endIcon && (
          <span className="input-icon end-icon">
            {endIcon}
          </span>
        )}
      </div>
      
      {helperText && !error && (
        <div className="form-text text-muted">{helperText}</div>
      )}
      
      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input