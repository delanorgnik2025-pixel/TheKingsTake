import {getDb} from './queries/connection';
import {visitorJourneyEvents} from '../db/schema';
import {visitorFromRequest} from './security/visitor-session';
import {journeyValues} from '../contracts/visitor-journey';
export async function recordJourney(contactId:number,sessionId:string,event:string,path:string){
 try {await getDb().insert(visitorJourneyEvents).values(journeyValues(contactId,sessionId,event,path)).onDuplicateKeyUpdate({set:{event}});return true;}
 catch {console.warn('[visitor-journey] Measurement unavailable');return false;}
}
export async function recordInquiryJourney(req:Request){
 const visitor=await visitorFromRequest(req);if(visitor)await recordJourney(visitor.contactId,visitor.sessionId,'inquiry_submitted','/brand-studio');
}
