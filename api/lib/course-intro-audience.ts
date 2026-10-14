export function isCourseIntroRecipient(contact: {email: string; status: string; consentedAt: Date | null}, excludedEmails: string[] = []) {
 const email = contact.email.trim().toLowerCase();
 return contact.status === 'subscribed' && Boolean(contact.consentedAt) && !email.endsWith('.invalid') && !excludedEmails.map(e=>e.trim().toLowerCase()).includes(email);
}
