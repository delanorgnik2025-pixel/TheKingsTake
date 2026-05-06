import { trpc } from "@/providers/trpc";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

export default function BlogPage() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery({ limit: 50 });

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/bg-blog.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#1B2838]/80" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-4">
          The Blog
        </h1>
        <p className="text-lg text-[#C9B99A] mb-12 max-w-xl">
          Takes, insights, and truth from the frontlines of justice.
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#FF9500] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts?.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded-lg border border-[rgba(255,149,0,0.2)] overflow-hidden hover:border-[rgba(255,149,0,0.4)] transition-all"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                {post.coverImage && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center gap-1 text-xs text-[#FF9500] uppercase tracking-[0.08em]">
                      <Tag size={12} />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-dimmed">
                      <Calendar size={12} />
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                    </span>
                  </div>
                  <h2 className="text-xl text-[#F0EBE1] group-hover:text-[#FFB840] transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-[#C9B99A] line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
