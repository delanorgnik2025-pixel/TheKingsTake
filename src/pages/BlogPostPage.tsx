import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug: slug ?? "" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="text-center">
          <h1 className="text-2xl text-[#F0EBE1] mb-2">Post not found</h1>
          <Link to="/blog" className="text-[#FF9500] hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      {post.coverImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.coverImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-[#1B2838]/85" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1 text-xs text-[#FF9500] uppercase tracking-[0.08em]">
            <Tag size={12} />
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-dimmed">
            <Calendar size={12} />
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </span>
          <span className="flex items-center gap-1 text-xs text-dimmed">
            <User size={12} />
            Ronald Lee King
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-[#C9B99A] italic mb-8 border-l-2 border-[#FF9500] pl-4">
            {post.excerpt}
          </p>
        )}

        <div className="bg-[rgba(27,40,56,0.9)] backdrop-blur-lg rounded-lg border border-[rgba(255,149,0,0.2)] p-8">
          <div
            className="prose prose-invert max-w-none text-[#C9B99A] leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n\n/g, "</p><p>")
                .replace(/\n/g, "<br />")
                .replace(/^/, "<p>")
                .replace(/$/, "</p>")
                .replace(/<p><\/p>/g, "")
                .replace(/## (.*?)<\/p>/g, "<h2 class=\"text-2xl text-[#F0EBE1] mt-8 mb-4\">$1</h2>")
                .replace(/<h2.*?>(.*?)<\/h2>/g, "<h2 class=\"text-2xl text-[#F0EBE1] mt-8 mb-4\">$1</h2>"),
            }}
          />
        </div>

        <div className="mt-12 p-6 bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FF9500] flex items-center justify-center text-[#1B2838] font-bold text-lg">
              RK
            </div>
            <div>
              <p className="text-[#F0EBE1] font-medium">Ronald Lee King</p>
              <p className="text-sm text-[#C9B99A]">Author, Founder of AASOTU Media Group LLC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
