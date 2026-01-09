import type {Request} from "@/domain/Request.ts";

export type RequestState = {
  requests: Request[],
  isLoading: boolean,
  error: string | undefined,
}
