import {vi, beforeEach, describe, it, expect, afterEach} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {useCoachStore} from "@/stores/coach-store/CoachStore.ts";
import type {CoachState} from "@/stores/state-types/CoachState.ts";
import {type Coach, CoachingFocus} from "@/domain/Coach.ts";
import {coachHttpService} from "@/service/CoachHttpService.ts";

describe('coach store', () => {

  let store: ReturnType<typeof useCoachStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers()

    store = useCoachStore();
    store.coachState = { coaches: [], error: undefined, isLoading: false };
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  })

  it('should have initial state', () => {
    const expectedState = { coaches: [], error: undefined, isLoading: false }
    const actual: CoachState = store.coachState;
    expect(actual).toStrictEqual(expectedState)

  })

  it('should get all coaches when instantiated', async () => {

    vi.spyOn(coachHttpService, 'getAllCoaches')
      .mockResolvedValue(createMockedCoaches());

    const expectedCoaches = createMockedCoaches();

    await store.getAllCoaches();

    await vi.waitFor(() => {
      expect(store.coaches).toEqual(expectedCoaches);
    })
  })


  it('should use loading state if needed', async () => {
   let resolvePromise: (coaches: Coach[]) => void;

    const delayedPromise = new Promise<Coach[]>(resolve => resolvePromise = resolve);
    const spy = vi.spyOn(coachHttpService, 'getAllCoaches').mockReturnValue(delayedPromise)

    const promise = store.getAllCoaches();
    expect(store.isLoading).toBe(true);

    resolvePromise!(createMockedCoaches());

    await promise;

    expect(store.isLoading).toBe(false);


    expect(store.coaches).toEqual(createMockedCoaches());
    spy.mockRestore();
  })

  it('should add coach to store', async () => {

    const coachToCreate: Coach = {
      id: "1",
      firstName: 'John',
      lastName: 'Doe',
      description: 'Test',
      rating: 100,
      birthday: "2026-01-01",
      coasts: 12,
      city: "Munich",
      email: "test@test.de",
      image: "example.com",
      coachingFocus: [CoachingFocus.FRONTEND]
    }

    vi.spyOn(coachHttpService, 'getAllCoaches').mockResolvedValue([]);
    vi.spyOn(coachHttpService, 'createCoach').mockResolvedValue(coachToCreate);

    await store.getAllCoaches();

    expect(store.coaches).toEqual([]);

    await store.createCoach(coachToCreate);

    expect(store.coaches).toEqual([coachToCreate]);
  })

  it('should delete coach from store', async () => {

    const deleteCoachId = "1";

    vi.spyOn(coachHttpService, "getAllCoaches").mockResolvedValue(createMockedCoaches());
    vi.spyOn(coachHttpService, "deleteCoach").mockResolvedValue();

    await store.getAllCoaches();

    await store.deleteCoach(deleteCoachId)

    const expectedCoaches = [{
      id: "2",
      firstName: 'Jane',
      lastName: 'Doe',
      description: 'Test',
      rating: 100,
      birthday: "2026-01-01",
      coasts: 12,
      city: "Munich",
      email: "test@test.de",
      image: "example.com",
      coachingFocus: [CoachingFocus.FRONTEND]
    }]
    await vi.waitFor(() => expect(store.coaches).toEqual(expectedCoaches))
  })

  it('should display errors', async () => {

    const errorMessage = "Test error"
    const error = new Error(errorMessage);

    vi.spyOn(coachHttpService, 'getAllCoaches').mockRejectedValue(error);
    await store.getAllCoaches();
    await vi.waitFor(() => expect(store.error).toEqual(errorMessage))
  })

  it('should reset error state if needed', async () => {

    const errorMessage = "Test error"
    const error = new Error(errorMessage);
    vi.spyOn(coachHttpService, 'getAllCoaches').mockRejectedValue(error);
    await store.getAllCoaches();
    await vi.waitFor(() => expect(store.error).toEqual(errorMessage))

    store.resetErrorState();
    await vi.waitFor(() => expect(store.error).toBe(undefined));
  })

   function createMockedCoaches() : Coach[] {
    return [
      {
        id: "1",
        firstName: 'John',
        lastName: 'Doe',
        description: 'Test',
        rating: 100,
        birthday: "2026-01-01",
        coasts: 12,
        city: "Munich",
        email: "test@test.de",
        image: "example.com",
        coachingFocus: [ CoachingFocus.FRONTEND ]
      },
      {
        id: "2",
        firstName: 'Jane',
        lastName: 'Doe',
        description: 'Test',
        rating: 100,
        birthday: "2026-01-01",
        coasts: 12,
        city: "Munich",
        email: "test@test.de",
        image: "example.com",
        coachingFocus: [ CoachingFocus.FRONTEND ]
      }
    ];
  }
});
