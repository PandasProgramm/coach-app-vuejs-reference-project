import type {Request} from "@/domain/Request.ts";

export type RequestState = {
  readonly request: Request | undefined,
  readonly isLoading: boolean,
  readonly error: string | undefined,
}
