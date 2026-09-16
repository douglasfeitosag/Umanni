import { router } from '@inertiajs/react'
import { createConsumer, type Subscription } from '@rails/actioncable'
import { useEffect, useRef, useState } from 'react'

export function useUserImportProgress(importId: string) {
  const inFlight = useRef(false)
  const pending = useRef(false)
  const subscription = useRef<Subscription | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const reload = () => {
      if (inFlight.current) {
        pending.current = true
        return
      }
      inFlight.current = true
      setUpdating(true)
      router.reload({ only: ['userImport', 'results', 'pagination'], preserveState: true, preserveScroll: true, onFinish: () => {
        inFlight.current = false
        setUpdating(false)
        if (pending.current) {
          pending.current = false
          reload()
        }
      } } as Parameters<typeof router.reload>[0])
    }

    const consumer = createConsumer('/cable')
    subscription.current = consumer.subscriptions.create({ channel: 'UserImportChannel', id: importId }, {
      received: (payload: unknown) => {
        const event = payload as { type?: string; schemaVersion?: number; importId?: string }
        if (event.type === 'user_import.changed' && event.schemaVersion === 1 && event.importId === importId) reload()
      },
      rejected: () => consumer.disconnect(),
    })

    return () => {
      subscription.current?.unsubscribe()
      consumer.disconnect()
      subscription.current = null
    }
  }, [importId])

  return { updating }
}
