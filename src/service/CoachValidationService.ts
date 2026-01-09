export class CoachValidationService {
  isValidLength(value: string, minLength: number): boolean {
    return value.trim().length >= minLength
  }

  isValidEmail(email: string): boolean {
    return email.includes('@')
  }

  isAtLeast18(birthday: string): { isValid: boolean; message?: string } {
    if (!birthday) return { isValid: false, message: 'Birthday is required.' }

    const birthDate = new Date(birthday)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age < 18) return { isValid: false, message: 'You must be at least 18 years old.' }
    return { isValid: true }
  }
}

export const coachValidationService = new CoachValidationService()
