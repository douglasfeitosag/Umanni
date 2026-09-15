import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { router } from '@inertiajs/react'
import { createConsumer } from '@rails/actioncable'
import { useDashboardMetrics } from './useDashboardMetrics'

const unsubscribe = vi.fn()
let callbacks: { connected?: () => void; received?: (payload: unknown) => void; rejected?: () => void } = {}

vi.mock('@rails/actioncable', () => ({
  createConsumer: vi.fn(() => ({
    subscriptions: { create: vi.fn((_channel, handlers) => { callbacks = handlers; return { unsubscribe } }) },
    disconnect: vi.fn(),
  })),
}))
vi.mock('@inertiajs/react', () => ({ router: { reload: vi.fn() } }))

describe('useDashboardMetrics', () => {
  afterEach(() => { vi.clearAllMocks(); callbacks = {} })

  it('US7.2 reloads only metrics and coalesces signals received in flight', () => {
    let finish: (() => void) | undefined
    vi.mocked(router.reload).mockImplementation(options => { finish = options?.onFinish as () => void })
    const { unmount } = renderHook(() => useDashboardMetrics())

    act(() => callbacks.connected?.())
    act(() => callbacks.received?.({ type: 'dashboard.metrics.changed', schemaVersion: 1 }))
    act(() => callbacks.received?.({ type: 'dashboard.metrics.changed', schemaVersion: 1 }))
    expect(router.reload).toHaveBeenCalledTimes(1)
    expect(router.reload).toHaveBeenCalledWith(expect.objectContaining({ only: ['metrics'], preserveState: true, preserveScroll: true }))

    act(() => finish?.())
    expect(router.reload).toHaveBeenCalledTimes(2)
    act(() => finish?.())
    act(() => callbacks.received?.({ type: 'unknown', schemaVersion: 1 }))
    expect(router.reload).toHaveBeenCalledTimes(2)
    act(() => callbacks.rejected?.())

    unmount()
    expect(unsubscribe).toHaveBeenCalledOnce()
    expect(createConsumer).toHaveBeenCalledWith('/cable')
  })
})
