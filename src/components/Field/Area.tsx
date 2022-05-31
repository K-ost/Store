import React from 'react'

interface IArea {
  label: string
  options: any
  error?: string | null
}

const Area: React.FC<IArea> = ({ label, options, error }) => {
  const formClass = !error ? "form-control" : "form-control error"
  return (
    <div className="input-field">
      <div className="form-floating">
        <textarea className={formClass} style={{height: '100px'}} {...options}></textarea>
        <label>{label}</label>
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  )
}

export default Area