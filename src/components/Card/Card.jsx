import React from 'react'
import './Card.css'

const Card = ({
  children,
  className = '',
  title,
  subtitle,
  header,
  footer,
  noPadding = false,
  hoverEffect = false,
  ...props
}) => {
  const cardClasses = [
    'card',
    hoverEffect ? 'card-hover' : '',
    className
  ].join(' ').trim()

  const bodyClasses = [
    'card-body',
    noPadding ? 'p-0' : ''
  ].join(' ').trim()

  return (
    <div className={cardClasses} {...props}>
      {header && (
        <div className="card-header">
          {header}
        </div>
      )}
      
      {(title || subtitle) && !header && (
        <div className="card-header">
          {title && <h5 className="card-title">{title}</h5>}
          {subtitle && <h6 className="card-subtitle text-muted">{subtitle}</h6>}
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card