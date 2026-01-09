import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRequestStore } from '@/stores/request-store/RequestStore.ts'
import type { RequestState } from '@/stores/state-types/RequestState.ts'
import { requestHttpService } from '@/service/RequestHttpService.ts'
import type { Request } from '@/domain/Request.ts'

describe('request store', () => {
  let store: ReturnType<typeof useRequestStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useRequestStore()
    store.requestState = { requests: [], error: undefined, isLoading: false }
  })

  it('should have initial state', () => {
    const expectedState = { requests: [], error: undefined, isLoading: false }
    const actual: RequestState = store.requestState
    expect(actual).toStrictEqual(expectedState)
  })

  it('should set isLoading to true when fetching requests', async () => {

    vi.spyOn(requestHttpService, 'getAllRequests')
      .mockResolvedValue([{ id: 1, coachId: 1, email: 'test-mail', message: 'test-message' }])

    await store.fetchAll()

    const expected: Request[] = [{ id: 1, coachId: 1, email: 'test-mail', message: 'test-message' }]

    expect(store.requests).toEqual(expected)
    expect(store.isLoading).toBe(false)
  })

  it('should set isLoading to false after fetching requests', async () => {

    let resolvePromise: (requests: Request[]) => void

    const delayedPromise = new Promise<Request[]>(resolve => resolvePromise = resolve)
    vi.spyOn(requestHttpService, 'getAllRequests').mockResolvedValue(delayedPromise)

    const promise = store.fetchAll()
    expect(store.isLoading).toBe(true)

    resolvePromise!([{ id: 1, coachId: 1, email: 'test-mail', message: 'test-message' }])
    await promise
    expect(store.isLoading).toBe(false)
    expect(store.requests).toEqual([{ id: 1, coachId: 1, email: 'test-mail', message: 'test-message'}])
  })

  it('should create a request', () => {})
})
