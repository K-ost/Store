import React from 'react'

interface IField {
  label: string
  type: string
  options: any
  error?: string | null
}

const Field: React.FC<IField> = ({ label, options, type, error }) => {
  const formClass = !error ? "form-control" : "form-control error"
  return (
    <div className="input-field">
      <div className="form-floating">
        {type !== 'select' && <input type={type} placeholder={label} className={formClass} {...options} />}
        {type === 'select' &&
          <select className="form-select" {...options}>
            <option>Харьков</option>
            <option>Киев</option>
            <option>Одесса</option>
            <option>Донецк</option>
            <option>Херсон</option>
            <option>Луганск</option>
          </select>
        }
        <label>{label}</label>
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  )
}

export default Field