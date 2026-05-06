import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { ArrowLeft, Download, AlertTriangle, FileText } from "lucide-react";

export default function LegalFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: form, isLoading } = trpc.legal.bySlug.useQuery({ slug: slug ?? "" });
  const trackDownload = trpc.legal.trackDownload.useMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="text-center">
          <h1 className="text-2xl text-[#F0EBE1] mb-2">Form not found</h1>
          <Link to="/legal" className="text-[#FF9500] hover:underline">Back to Legal Hub</Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    trackDownload.mutate({ id: form.id });
    if (form.fileUrl) {
      window.open(form.fileUrl, "_blank");
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/bg-legal.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#1B2838]/85" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Link to="/legal" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Legal Hub
        </Link>

        <div className="bg-[rgba(27,40,56,0.9)] backdrop-blur-lg rounded-lg border border-[rgba(255,149,0,0.3)] p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-[#FF9500]" />
            <span className="text-xs uppercase tracking-[0.08em] text-[#FFB840]">{form.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-4">
            {form.title}
          </h1>
          <p className="text-[#C9B99A] mb-6">{form.description}</p>

          <div className="flex items-center gap-1 p-4 bg-[rgba(255,149,0,0.1)] rounded border border-[rgba(255,149,0,0.2)] mb-6">
            <AlertTriangle size={16} className="text-[#FF9500] shrink-0" />
            <p className="text-xs text-[#C9B99A]">
              This form is for informational purposes only and does not constitute legal advice. Consult a licensed attorney for your specific case.
            </p>
          </div>

          {/* If there's AI-generated content, show it */}
          {form.content && (
            <div className="mb-6">
              <h3 className="text-lg text-[#F0EBE1] mb-3">Document Preview</h3>
              <div className="bg-[rgba(42,58,74,0.6)] rounded p-6 border border-[rgba(255,149,0,0.15)] max-h-96 overflow-y-auto">
                <pre className="text-sm text-[#C9B99A] whitespace-pre-wrap font-mono">{form.content}</pre>
              </div>
            </div>
          )}

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader']"
            style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}
          >
            <Download size={18} />
            {form.fileUrl ? "Download PDF" : form.content ? "Copy Document" : "Download Coming Soon"}
          </button>

          {form.fileSize && (
            <span className="ml-4 text-xs text-dimmed">{form.fileSize}</span>
          )}

          {form.downloadCount ? (
            <p className="text-xs text-dimmed mt-3">Downloaded {form.downloadCount} times</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
