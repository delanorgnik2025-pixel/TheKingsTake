import {z} from 'zod';
export const servicePaths = ['/brand-studio','/writing-services','/services','/contact'] as const;
export const journeyInput = z.object({event:z.enum(['service_interest_click','service_view']),path:z.enum(servicePaths)});
export function journeyValues(contactId:number,sessionId:string,event:string,path:string){return {contactId,sessionId,event,path};}
