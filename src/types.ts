export interface Account {
  email_address: string
  email_address_verification: string
  email_address_verification_valid_until: string
  password_reset_verification: string
  password_reset_verification_valid_until: string
  username: string
}

export interface AccountPasswordResetRequestMailOptions {
  account: Account
  template: Template
}

export interface AccountRegistrationMailOptions {
  account: Account
  template: Template
}

export interface EventInvitationMailOptions {
  invitationId: BigInt
  template: Template
}

export interface MaevsiContact {
  id: BigInt
  accountUsername: string
  emailAddress: string
  emailAddressHash: string
  firstName: string
  lastName: string
  address: string
  authorAccountUsername: string
}

export interface MaevsiEvent {
  id: BigInt
  authorUsername: string
  description: string | null
  end: string | null // Date
  inviteeCountMaximum: number | null
  isArchived: boolean
  isInPerson: boolean
  isRemote: boolean
  location: string | null
  name: string
  slug: string
  start: string // Date
  visibility: 'public' | 'private'
}

export interface MaevsiInvitation {
  id: BigInt
  uuid: string
  eventId: BigInt
  contactId: BigInt
  feedback: 'accepted' | 'canceled'
  feedbackPaper: 'digital' | 'none' | 'paper'
}

export interface MaevsiProfilePicture {
  id: BigInt
  uploadStorageKey: string
  username: string
}

export interface MomentFormatOptionsBase {
  format: string
  language: string
}

export interface DateFormatOptions extends MomentFormatOptionsBase {
  input: string
}

export interface DurationFormatOptions extends MomentFormatOptionsBase {
  start: string
  end: string
}

export interface Mail {
  html?: string
  icalEvent?: Record<string, unknown> // https://nodemailer.com/message/calendar-events/
  subject?: string
  template?: Template
  text?: string
  to: string
}

export interface Template {
  language: string
  namespace: string
  variables: Record<string, unknown>
}
