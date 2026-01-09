import { CoachingFocus } from '@/domain/Coach.ts'

export class CoachFocusService {

  getFocusColor(coachingFocus: CoachingFocus): string {
    switch (coachingFocus) {
      case CoachingFocus.BACKEND:
        return 'green';
      case CoachingFocus.CAREER:
        return 'blue';
      case CoachingFocus.FRONTEND:
        return 'orange';
      default:
        return 'gray';
    }
  }
}
