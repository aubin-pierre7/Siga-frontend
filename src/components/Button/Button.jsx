import React from 'react'
import './Button.css'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  loading = false,
  onClick,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark',
    link: 'btn-link',
    'outline-primary': 'btn-outline-primary',
    'outline-secondary': 'btn-outline-secondary',
    'outline-success': 'btn-outline-success',
    'outline-danger': 'btn-outline-danger',
    'outline-warning': 'btn-outline-warning',
    'outline-info': 'btn-outline-info',
    'outline-light': 'btn-outline-light',
    'outline-dark': 'btn-outline-dark'
  }
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }

  const buttonClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size],
    fullWidth ? 'w-100' : '',
    className
  ].join(' ').trim()

  const renderIcon = () => {
    if (!icon) return null
    const iconElement = React.cloneElement(icon, {
      className: `btn-icon ${iconPosition === 'right' ? 'ms-2' : 'me-2'}`
    })
    return iconElement
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      )}
      {icon && iconPosition === 'left' && renderIcon()}
      {children}
      {icon && iconPosition === 'right' && renderIcon()}
    </button>
  )
}

export default Button