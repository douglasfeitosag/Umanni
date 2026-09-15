import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export default function Field({ label, error, id, ...props }: Props) {
  const fieldId = id ?? props.name
  const errorId = `${fieldId}-error`
  return (
    <div className="field">
      <label htmlFor={fieldId}>{label}</label>
      <input id={fieldId} aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined} {...props} />
      {error && <p className="field-error" id={errorId}>{error}</p>}
    </div>
  )
}
