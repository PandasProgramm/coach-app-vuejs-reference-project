import type {User} from "@/domain/User.ts";

export type AuthState = {
  readonly user: User | undefined
  readonly isAuthenticated: boolean
  readonly token: string | undefined
  readonly isLoading: boolean
  readonly error: string | undefined
}
