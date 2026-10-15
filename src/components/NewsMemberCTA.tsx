import { useState } from "react";
import MemberAuthModal from "./MemberAuthModal";
import { useMember } from "@/providers/MemberProvider";
import { Link } from "react-router";
export default function NewsMemberCTA() {
 const [open, setOpen] = useState(false); const { member } = useMember();
 return <aside className="my-8 rounded-xl border border-[#FFB840]/25 bg-[#182635] p-5 text-[#F0EBE1]"><h2 className="text-xl">The King’s Circle</h2><p className="my-2 text-sm text-[#C9B99A]">News is free. Join the private subscriber Feed to share ideas, links and conversation. Facebook subscribers receive website access after owner verification.</p><a href="https://www.facebook.com/TheKingsTake/subscribe/" target="_blank" rel="noopener noreferrer" className="mr-5 inline-block py-3 text-[#FFB840] underline">Subscribe on Facebook →</a>{member ? <Link to="/feed" className="text-[#FFB840]">Enter the community →</Link> : <button onClick={() => setOpen(true)} className="text-[#FFB840]">Subscribe / unlock member comments →</button>}<MemberAuthModal isOpen={open} onClose={() => setOpen(false)} /></aside>;
}
