import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Lock, Mail, Crown, ExternalLink } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { useMember } from "@/providers/MemberProvider";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberAuthModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useMember();

  const loginMutation = trpc.member.login.useMutation();
  const registerMutation = trpc.member.register.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await loginMutation.mutateAsync({ email, password });
        login(res.token, res.member);
      } else {
        if (!name.trim()) {
          setError("Name is required.");
          setLoading(false);
          return;
        }
        const res = await registerMutation.mutateAsync({ name, email, password });
        login(res.token, res.member);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#111827] border border-[#FF9500]/20 rounded-2xl p-6 shadow-2xl shadow-black/50"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#C9B99A]/50 hover:text-[#C9B99A] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <Crown size={32} className="mx-auto text-[#FF9500] mb-2" />
              <h2 className="text-xl font-bold text-[#F5F1E8]">
                {mode === "login" ? "Member Login" : "Join the Community"}
              </h2>
              <p className="text-sm text-[#C9B99A]/60 mt-1">
                {mode === "login"
                  ? "Welcome back, Royal."
                  : "Subscribe to post, comment, and connect."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C9B99A]/60 mb-1.5">
                    Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/40" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#182635] border border-[#C9B99A]/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-[#F5F1E8] placeholder:text-[#C9B99A]/30 focus:outline-none focus:border-[#FF9500]/50"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C9B99A]/60 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#182635] border border-[#C9B99A]/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-[#F5F1E8] placeholder:text-[#C9B99A]/30 focus:outline-none focus:border-[#FF9500]/50"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C9B99A]/60 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9B99A]/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#182635] border border-[#C9B99A]/10 rounded-lg pl-10 pr-3 py-2.5 text-sm text-[#F5F1E8] placeholder:text-[#C9B99A]/30 focus:outline-none focus:border-[#FF9500]/50"
                    placeholder={mode === "register" ? "Min 6 characters" : "Your password"}
                    required
                    minLength={mode === "register" ? 6 : undefined}
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-xs bg-red-400/10 rounded-lg px-3 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF9500] hover:bg-[#CC6A00] text-[#182635] font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                className="text-xs text-[#FF9500] hover:underline"
              >
                {mode === "login" ? "Don't have an account? Join" : "Already a member? Log in"}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-[#C9B99A]/10 text-center">
              <a
                href="https://www.facebook.com/thekingstake"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#C9B99A]/60 hover:text-[#FF9500] transition-colors"
              >
                <ExternalLink size={12} />
                Subscribe on Facebook for exclusive updates
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
