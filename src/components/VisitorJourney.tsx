import {useEffect,useRef} from 'react';
import {useLocation} from 'react-router';
import {trpc} from '@/providers/trpc';
import {servicePaths} from '@contracts/visitor-journey';
export default function VisitorJourney(){
 const {pathname}=useLocation();const seen=useRef(new Set<string>());const record=trpc.visitor.recordJourney.useMutation();
 useEffect(()=>{if(!servicePaths.includes(pathname as typeof servicePaths[number])||seen.current.has(pathname))return;seen.current.add(pathname);record.mutate({event:'service_view',path:pathname as typeof servicePaths[number]});},[pathname]);
 return null;
}
