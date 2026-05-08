import { trpc } from "@/providers/trpc";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useMemo } from "react";

// Static fallback forms — render immediately even if database is empty
const FALLBACK_FORMS = [
  { id: 1, slug: "motion-to-dismiss", title: "Motion to Dismiss", description: "Challenge the charges against you with proper legal grounds such as insufficient evidence, constitutional violations, or statute of limitations.", category: "criminal", fileUrl: null, fileSize: null, content: null, downloadCount: 0, isActive: true, createdAt: new Date() },
  { id: 2, slug: "motion-for-bond-reduction", title: "Motion for Bond Reduction", description: "Request a lower bond amount when the current bail is excessive and beyond financial means.", category: "criminal", fileUrl: null, fileSize: null, content: null, downloadCount: 0, isActive: true, createdAt: new Date() },
  { id: 3, slug: "motion-to-suppress-evidence", title: "Motion to Suppress Evidence", description: "Challenge evidence obtained through unconstitutional search, seizure, or coerced confession.", category: "criminal", fileUrl: null, fileSize: null, content: null, downloadCount: 0, isActive: true, createdAt: new Date() },
  { id: 4, slug: "writ-of-habeas-corpus", title: "Writ of Habeas Corpus", description: "Challenge unlawful detention and demand the right to appear before a court.", category: "criminal", fileUrl: null, fileSize: null, content: null, downloadCount: 0, isActive: true, createdAt: new Date() },
  { id: 5, slug: "motion-for-new-trial", title: "Motion for New Trial", description: "Request a new trial based on legal errors, newly discovered evidence, or jury misconduct.", category: "criminal", fileUrl: null, fileSize: null, content: null, downloadCount: 0, isActive: true, createdAt: new Date() },
  { id: 6, slug: "motion-in-limine", title: "Motion In Limine", description: "Request the court to exclude certain prejudicial evidence from being presented at trial.", category: "criminal", fileUrl: null, fileSize: null, content: null, downloadCount: 0, isActive: true, createdAt: new Date() },
];

export default function LegalHubPage() {
  const { data: apiForms, isLoading } = trpc.legal.list.useQuery();
  // Use API data if available, otherwise show static fallback content
  const forms = useMemo(() => (apiForms && apiForms.length > 0 ? apiForms : FALLBACK_FORMS), [apiForms]);

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/bg-legal.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#1B2838]/80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-4">
          Legal Forms Hub
        </h1>
        <p className="text-lg text-[#C9B99A] mb-4 max-w-2xl">
          Free legal forms and motions for informational purposes. These are tools to help you understand the system — not a substitute for licensed legal counsel.
        </p>

        <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6 mb-12" style={{ borderLeft: "3px solid #FF9500" }}>
          <p className="text-sm text-[#C9B99A]">
            <strong className="text-[#FF9500]">Important:</strong> These forms are provided for informational and educational purposes only. They do not constitute legal advice. Always consult with a licensed attorney regarding your specific situation. #TheKingsTake and AASOTU Media Group LLC are not law firms.
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms?.map((form, i) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.2)] p-6 hover:border-[rgba(255,149,0,0.5)] transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText size={20} className="text-[#FF9500]" />
                <span className="text-xs uppercase tracking-[0.08em] text-[#FFB840]">{form.category}</span>
              </div>
              <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.03em] mb-2">
                {form.title}
              </h3>
              <p className="text-sm text-[#C9B99A] mb-4">{form.description}</p>

              <div className="flex items-center gap-3">
                <Link
                  to={`/legal/${form.slug}`}
                  className="flex items-center gap-2 text-xs text-[#FF9500] uppercase tracking-[0.04em] hover:underline"
                >
                  <Download size={14} />
                  View & Download
                </Link>
                {form.downloadCount ? (
                  <span className="text-xs text-dimmed">{form.downloadCount} downloads</span>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
