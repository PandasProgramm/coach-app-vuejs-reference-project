import type {Coach} from "@/domain/Coach.ts";

export type CoachState = {
  coaches: Coach[],
  isLoading: boolean,
  error: string | undefined,
}
