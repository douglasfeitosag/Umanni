import { router } from '@inertiajs/react'
import { createConsumer, type Subscription } from '@rails/actioncable'
import { useEffect, useRef, useState } from 'react'

const EXPECTED_EVENT = { type: 'dashboard.metrics.changed', schemaVersion: 1 }

export function useDashboardMetrics() {
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
      const options = {
        only: ['metrics'], preserveState: true, preserveScroll: true,
        onFinish: () => {
          inFlight.current = false
          setUpdating(false)
          if (pending.current) {
            pending.current = false
            reload()
          }
        },
      } as unknown as Parameters<typeof router.reload>[0]
      router.reload(options)
    }

    const consumer = createConsumer('/cable')
    subscription.current = consumer.subscriptions.create('DashboardMetricsChannel', {
      connected: reload,
      received: (payload: unknown) => {
        const event = payload as Partial<typeof EXPECTED_EVENT>
        if (event.type === EXPECTED_EVENT.type && event.schemaVersion === EXPECTED_EVENT.schemaVersion) reload()
        else console.debug('Ignored unknown dashboard metrics event')
      },
      rejected: () => consumer.disconnect(),
    })

    return () => {
      subscription.current?.unsubscribe()
      consumer.disconnect()
      subscription.current = null
    }
  }, [])

  return { updating }
}
