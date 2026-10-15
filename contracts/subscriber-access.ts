/** A self-reported checkbox is never a paid subscriber entitlement. */
export function hasSubscriberAccess(member:{isActive:boolean;role:string;facebookVerifiedUntil?:Date|string|null}|null,now=Date.now()){
 if(!member?.isActive)return false;
 if(member.role==='admin')return true;
 const until=member.facebookVerifiedUntil?new Date(member.facebookVerifiedUntil).getTime():0;
 return Number.isFinite(until)&&until>now;
}
