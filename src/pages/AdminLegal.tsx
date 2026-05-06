import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Wand2, FileText, Download, X, Save } from "lucide-react";

export default function AdminLegal() {
  const { user, isLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const [showCreate, setShowCreate] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [form, setForm] = useState({ title: "", slug: "", description: "", category: "criminal", fileUrl: "", content: "" });
  const [aiForm, setAiForm] = useState({ documentType: "Motion to Dismiss", jurisdiction: "", details: "", provider: "openai" as "openai" | "google" });

  const { data: forms, isLoading: formsLoading } = trpc.legal.list.useQuery();
  const createForm = trpc.legal.create.useMutation({ onSuccess: () => { utils.legal.list.invalidate(); setShowCreate(false); resetForm(); } });
  const deleteForm = trpc.legal.delete.useMutation({ onSuccess: () => utils.legal.list.invalidate() });
  const generateAI = trpc.ai.generateLegalDocument.useMutation({
    onSuccess: (data) => { setAiResult(data.content); },
  });

  useEffect(() => { if (!isLoading && !user) navigate("/login"); }, [user, isLoading, navigate]);

  const resetForm = () => setForm({ title: "", slug: "", description: "", category: "criminal", fileUrl: "", content: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.description) return;
    createForm.mutate(form);
  };

  const saveAIGenerated = () => {
    if (!aiResult) return;
    const slug = aiForm.documentType.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    createForm.mutate({
      title: aiForm.documentType,
      slug,
      description: `AI-generated ${aiForm.documentType}${aiForm.jurisdiction ? ` for ${aiForm.jurisdiction}` : ""}`,
      category: "criminal",
      content: aiResult,
    });
    setShowAI(false);
    setAiResult("");
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#1B2838]"><div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" /></div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center bg-[#1B2838]"><div className="text-center"><h1 className="text-2xl text-[#F0EBE1]">Access Denied</h1><Link to="/" className="text-[#FF9500]">Home</Link></div></div>;

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12 bg-[#1B2838]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-sm text-[#C9B99A] hover:text-[#FF9500]"><ArrowLeft size={18} /></Link>
            <h1 className="text-3xl text-[#F0EBE1]">Legal Forms Manager</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setShowAI(true); setShowCreate(false); setAiResult(""); }} className="flex items-center gap-2 px-4 py-2 bg-[rgba(255,149,0,0.2)] text-[#FF9500] border border-[#FF9500] rounded hover:bg-[rgba(255,149,0,0.3)] transition-colors text-sm">
              <Wand2 size={16} /> Generate with AI
            </button>
            <button onClick={() => { setShowCreate(true); setShowAI(false); resetForm(); }} className="flex items-center gap-2 px-4 py-2 bg-[#FF9500] text-[#1B2838] rounded hover:bg-[#CC6A00] transition-colors text-sm font-medium">
              <Plus size={16} /> Add Form
            </button>
          </div>
        </div>

        {/* AI Generator */}
        {showAI && (
          <div className="bg-[rgba(42,58,74,0.9)] rounded-lg border border-[rgba(255,149,0,0.3)] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#F0EBE1] flex items-center gap-2"><Wand2 size={20} className="text-[#FF9500]" /> AI Document Generator</h2>
              <button onClick={() => setShowAI(false)} className="text-[#C9B99A] hover:text-[#FF9500]"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <select value={aiForm.documentType} onChange={e => setAiForm({ ...aiForm, documentType: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1]">
                <option>Motion to Dismiss</option>
                <option>Motion for Bond Reduction</option>
                <option>Motion to Suppress Evidence</option>
                <option>Writ of Habeas Corpus</option>
                <option>Motion for New Trial</option>
                <option>Motion In Limine</option>
                <option>Notice of Appeal</option>
                <option>Probation Modification Request</option>
              </select>
              <input type="text" placeholder="Jurisdiction (e.g., California)" value={aiForm.jurisdiction} onChange={e => setAiForm({ ...aiForm, jurisdiction: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] placeholder:text-[#C9B99A]/50" />
              <select value={aiForm.provider} onChange={e => setAiForm({ ...aiForm, provider: e.target.value as "openai" | "google" })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1]">
                <option value="openai">ChatGPT (OpenAI)</option>
                <option value="google">Google AI</option>
              </select>
            </div>
            <textarea placeholder="Additional details (optional)" value={aiForm.details} onChange={e => setAiForm({ ...aiForm, details: e.target.value })} rows={3} className="w-full bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] placeholder:text-[#C9B99A]/50 mb-4" />
            <div className="flex gap-3">
              <button onClick={() => generateAI.mutate(aiForm)} disabled={generateAI.isPending} className="px-6 py-2 bg-[#FF9500] text-[#1B2838] rounded hover:bg-[#CC6A00] transition-colors disabled:opacity-50 font-medium">
                {generateAI.isPending ? "Generating..." : "Generate Document"}
              </button>
              {generateAI.error && <p className="text-sm text-red-400 self-center">{generateAI.error.message}</p>}
            </div>

            {aiResult && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-[#FFB840] uppercase">Generated Document</h3>
                  <button onClick={saveAIGenerated} className="flex items-center gap-1 px-4 py-1.5 bg-green-600/20 text-green-400 rounded text-xs hover:bg-green-600/30">
                    <Save size={12} /> Save & Publish
                  </button>
                </div>
                <div className="bg-[rgba(27,40,56,0.9)] rounded border border-[rgba(255,149,0,0.15)] p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-[#C9B99A] whitespace-pre-wrap font-mono">{aiResult}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manual Create */}
        {showCreate && (
          <div className="bg-[rgba(42,58,74,0.9)] rounded-lg border border-[rgba(255,149,0,0.3)] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#F0EBE1]">Add New Form</h2>
              <button onClick={() => setShowCreate(false)} className="text-[#C9B99A] hover:text-[#FF9500]"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Title *" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1]" />
                <input type="text" placeholder="Slug *" required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} className="bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] font-mono text-sm" />
              </div>
              <textarea placeholder="Description *" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1]" />
              <textarea placeholder="Document content (or leave blank if uploading PDF)" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} className="w-full bg-[rgba(27,40,56,0.8)] border border-[rgba(255,149,0,0.2)] rounded px-4 py-2 text-[#F0EBE1] font-mono text-sm" />
              <button type="submit" disabled={createForm.isPending} className="px-6 py-2 bg-[#FF9500] text-[#1B2838] rounded hover:bg-[#CC6A00] transition-colors disabled:opacity-50 font-medium">
                {createForm.isPending ? "Saving..." : "Save Form"}
              </button>
            </form>
          </div>
        )}

        {/* Forms List */}
        <div className="bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,149,0,0.15)]">
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Title</th>
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4 hidden md:table-cell">Category</th>
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4 hidden md:table-cell">Downloads</th>
                <th className="text-left text-xs uppercase tracking-[0.08em] text-[#FFB840] p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formsLoading && <tr><td colSpan={4} className="p-8 text-center text-[#C9B99A]">Loading...</td></tr>}
              {forms?.map(legalForm => (
                <tr key={legalForm.id} className="border-b border-[rgba(240,235,225,0.05)] hover:bg-[rgba(255,149,0,0.05)]">
                  <td className="p-4">
                    <p className="text-sm text-[#F0EBE1] font-medium">{legalForm.title}</p>
                    {legalForm.fileUrl ? (
                      <span className="text-xs text-green-400 flex items-center gap-1"><FileText size={10} /> PDF available</span>
                    ) : legalForm.content ? (
                      <span className="text-xs text-blue-400 flex items-center gap-1"><Wand2 size={10} /> AI-generated</span>
                    ) : (
                      <span className="text-xs text-dimmed">No content yet</span>
                    )}
                  </td>
                  <td className="p-4 hidden md:table-cell"><span className="text-xs text-[#FF9500] uppercase">{legalForm.category}</span></td>
                  <td className="p-4 hidden md:table-cell text-sm text-dimded">{legalForm.downloadCount}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/legal/${legalForm.slug}`} target="_blank" className="p-2 text-[#C9B99A] hover:text-[#FF9500]"><Download size={14} /></Link>
                      <button onClick={() => { if (confirm("Delete this form?")) deleteForm.mutate({ id: legalForm.id }); }} className="p-2 text-[#C9B99A] hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
