import {CoachingFocus} from "@/domain/Coach.ts";

export type CoachToCreate = {
  readonly firstName: string,
  readonly lastName: string,
  readonly birthday: string,
  readonly city: string,
  readonly email: string,
  readonly description: string,
  readonly rating: number,
  readonly coasts: number,
  readonly image: string,
  readonly coachingFocus: CoachingFocus[]
}
