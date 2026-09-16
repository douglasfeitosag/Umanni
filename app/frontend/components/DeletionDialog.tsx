import { useForm } from '@inertiajs/react'
import { useId, useRef, useState } from 'react'
import Field from './Field'

export default function DeletionDialog({ action, label }: { action: string; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const form = useForm({ confirmation: '' })
  const identifier = useId().replace(/:/g, '')
  const titleId = `delete-title-${identifier}`
  const confirmationId = `confirmation-${identifier}`

  function close() {
    if (dialog.current?.open) dialog.current.close()
    form.reset()
    setConfirmation('')
    setOpen(false)
    trigger.current?.focus()
  }

  function closeOnBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    const { bottom, left, right, top } = event.currentTarget.getBoundingClientRect()
    const clickedOutsideDialog = event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom

    if (clickedOutsideDialog) close()
  }

  const confirmationMatches = confirmation.trim() === 'EXCLUIR'

  return (
    <>
      <button ref={trigger} className="danger-button" type="button" onClick={() => { setOpen(true); dialog.current?.showModal() }}>{label}</button>
      <dialog ref={dialog} onClick={closeOnBackdropClick} onClose={close} aria-labelledby={titleId}>
        {open && <form onSubmit={event => {
          event.preventDefault()
          form.transform(data => ({ deletion: data }))
          form.delete(action, { onSuccess: close })
        }}>
          <h2 id={titleId}>Confirmar exclusão</h2>
          <p>Esta ação não pode ser desfeita. Digite <strong>EXCLUIR</strong>.</p>
          <Field id={confirmationId} label="Confirmação" name="confirmation" value={confirmation} onChange={event => { setConfirmation(event.target.value); form.setData('confirmation', event.target.value) }} error={form.errors.confirmation} autoFocus />
          <div className="dialog-actions">
            <button type="button" className="secondary-button" onClick={close}>Cancelar</button>
            <button type="submit" className="danger-button" disabled={form.processing || !confirmationMatches}>Excluir</button>
          </div>
        </form>}
      </dialog>
    </>
  )
}
