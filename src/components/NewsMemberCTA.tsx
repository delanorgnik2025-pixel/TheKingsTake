import { useState } from "react";
import MemberAuthModal from "./MemberAuthModal";
import { useMember } from "@/providers/MemberProvider";
import { Link } from "react-router";
export default function NewsMemberCTA() {
 const [open, setOpen] = useState(false); const { member } = useMember();
 return <aside className="my-8 rounded-xl border border-[#FFB840]/25 bg-[#182635] p-5 text-[#F0EBE1]"><h2 className="text-xl">The King’s Circle</h2><p className="my-2 text-sm text-[#C9B99A]">Stay connected to the reporting and community. Membership uses the existing invitation and access-code system.</p>{member ? <Link to="/feed" className="text-[#FFB840]">Enter the community →</Link> : <button onClick={() => setOpen(true)} className="text-[#FFB840]">Use your member access code →</button>}<MemberAuthModal isOpen={open} onClose={() => setOpen(false)} /></aside>;
}
