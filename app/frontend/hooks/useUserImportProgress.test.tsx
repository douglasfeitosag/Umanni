import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createConsumer } from '@rails/actioncable'
import { router } from '@inertiajs/react'
import { useUserImportProgress } from './useUserImportProgress'

const unsubscribe = vi.fn()
const disconnect = vi.fn()
let callbacks: { received?: (payload: unknown) => void; rejected?: () => void } = {}

vi.mock('@rails/actioncable', () => ({
  createConsumer: vi.fn(() => ({
    subscriptions: { create: vi.fn((_channel, handlers) => { callbacks = handlers; return { unsubscribe } }) },
    disconnect,
  })),
}))
vi.mock('@inertiajs/react', () => ({ router: { reload: vi.fn() } }))

describe('useUserImportProgress', () => {
  afterEach(() => { vi.clearAllMocks(); callbacks = {} })

  it('reloads only safe import props and coalesces import change signals', () => {
    let finish: (() => void) | undefined
    vi.mocked(router.reload).mockImplementation(options => { finish = options?.onFinish as () => void })
    const { result, unmount } = renderHook(() => useUserImportProgress('42'))

    act(() => callbacks.received?.({ type: 'user_import.changed', schemaVersion: 1, importId: '42' }))
    act(() => callbacks.received?.({ type: 'user_import.changed', schemaVersion: 1, importId: '42' }))
    expect(result.current.updating).toBe(true)
    expect(router.reload).toHaveBeenCalledWith(expect.objectContaining({ only: ['userImport', 'results', 'pagination'] }))

    act(() => finish?.())
    expect(router.reload).toHaveBeenCalledTimes(2)
    act(() => finish?.())
    expect(result.current.updating).toBe(false)
    act(() => callbacks.received?.({ type: 'user_import.changed', schemaVersion: 2, importId: '42' }))
    act(() => callbacks.received?.({ type: 'user_import.changed', schemaVersion: 1, importId: 'other' }))
    expect(router.reload).toHaveBeenCalledTimes(2)

    act(() => callbacks.rejected?.())
    unmount()
    expect(createConsumer).toHaveBeenCalledWith('/cable')
    expect(unsubscribe).toHaveBeenCalledOnce()
    expect(disconnect).toHaveBeenCalledTimes(2)
  })
})
