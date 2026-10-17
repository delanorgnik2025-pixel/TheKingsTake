import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useMember } from "@/providers/MemberProvider";
import MemberAuthModal from "@/components/MemberAuthModal";
import type { CaseCourse } from "@contracts/case2court";
import FacebookSubscribeCTA from "@/components/FacebookSubscribeCTA";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Case2CourtPage() {
  const { token } = useMember();
  const session = token || localStorage.getItem("adminToken") || "";
  const course = trpc.courses.caseCourse.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: true,
  });
  const progress = trpc.courses.caseProgress.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: true,
  });
  const submit = trpc.courses.caseSubmit.useMutation();
  const utils = trpc.useUtils();
  const [authorizedSession, setAuthorizedSession] = useState(""),
    [recordsSession, setRecordsSession] = useState(""),
    [authOpen, setAuthOpen] = useState(false),
    [step, setStep] = useState(0),
    [tab, setTab] = useState("lesson"),
    [answer, setAnswer] = useState(-1),
    [finalAnswers, setFinalAnswers] = useState<number[]>([]),
    [review, setReview] = useState(false),
    [locked, setLocked] = useState(false),
    [message, setMessage] = useState("");
  const lessonTitle = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    let active = true;
    setAuthorizedSession("");
    setRecordsSession("");
    initialized.current = false;
    Promise.all([course.refetch(), progress.refetch()]).then(([c, p]) => {
      if (active && c.data) setAuthorizedSession(session);
      if (active && p.data) setRecordsSession(session);
    });
    return () => {
      active = false;
    };
  }, [session]);
  useEffect(() => {
    setAnswer(-1);
    setLocked(false);
    setMessage("");
    lessonTitle.current?.focus();
  }, [step]);
  const data =
    authorizedSession === session && session && !course.isError && course.data
      ? course.data
      : null;
  const state =
    recordsSession === session && !progress.isError ? progress.data : undefined;
  const initialized = useRef(false);
  useEffect(() => {
    if (data && state && !initialized.current) {
      setStep(state.completed.length);
      initialized.current = true;
    }
  }, [data, state]);
  if (!data)
    return (
      <main className="min-h-screen bg-[#101b28] px-5 pb-20 pt-28 text-[#F0EBE1]">
        <div className="mx-auto max-w-3xl">
          <Link to="/case2court" className="text-[#FFB840]">
            ← Explore Case2Court
          </Link>
          <h1 className="mt-6 text-4xl">Enter the Case2Court classroom</h1>
          <p className="my-5 leading-8 text-[#C9B99A]">
            Your guided case room, practice documents and assessments are
            included for verified Inner Circle subscribers. Sign in with your
            website access code after subscription verification.
          </p>
          {course.isLoading ? (
            <p role="status">Checking classroom access…</p>
          ) : (
            <>
              <button
                onClick={() => setAuthOpen(true)}
                className="mb-6 min-h-12 rounded-full bg-[#FFB840] px-6 py-3 text-[#101b28]"
              >
                Sign in with my access code
              </button>
              <FacebookSubscribeCTA />
              <p className="mt-4 text-sm text-[#C9B99A]">
                If you already subscribe, request verification through{" "}
                <Link to="/contact" className="text-[#FFB840] underline">
                  Contact
                </Link>
                . A course-interest email signup does not unlock lessons.
              </p>
            </>
          )}
          <Link
            to="/learn2file"
            className="mt-6 inline-flex min-h-12 items-center text-[#FFB840] underline"
          >
            Start with free Learn2File →
          </Link>
          <MemberAuthModal
            isOpen={authOpen}
            onClose={() => {
              setAuthOpen(false);
              course.refetch();
              progress.refetch();
            }}
          />
        </div>
      </main>
    );
  const lesson = data.lessons[step];
  const attempts = state?.attempts || [];
  const completed = state?.completed || [];
  const finalStep = step === data.lessons.length;
  const mistakes = attempts.flatMap(a =>
    a.feedback
      .filter(f => !f.correct)
      .map(f => ({ ...f, at: a.createdAt, kind: a.kind }))
  );
  const latest = attempts
    .filter(a => a.kind === "checkpoint" && a.lessonIndex === step)
    .at(-1);
  const lastFinal = attempts.filter(a => a.kind === "final").at(-1);
  const move = (n: number) => {
    setStep(Math.min(n, completed.length, data.lessons.length));
    setTab("lesson");
  };
  const save = async () => {
    setMessage("");
    try {
      const result = await submit.mutateAsync({
        version: data.version as "2026-10-15.1",
        submissionId: crypto.randomUUID(),
        kind: finalStep ? "final" : "checkpoint",
        lessonIndex: finalStep ? null : step,
        answers: finalStep ? finalAnswers : [answer],
      });
      utils.courses.caseProgress.setData(undefined, result);
      await progress.refetch();
      setLocked(true);
      setMessage(
        "Submission recorded. Review the explanation before continuing."
      );
    } catch {
      setMessage(
        "Your submission was not confirmed. Check access and try again; your earlier record is preserved."
      );
    }
  };
  const download = () => {
    const blob = new Blob([data.workbook], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Case2Court_Practice_Workbook.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <main className="min-h-screen bg-[#101b28] px-4 pb-20 pt-24 text-[#F0EBE1] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link to="/courses" className="text-sm text-[#FFB840]">
          ← The King’s Take · Courses
        </Link>
        <header className="mt-5">
          <p className="text-xs uppercase tracking-widest text-[#FFB840]">
            Inner Circle classroom
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl">Case2Court</h1>
          <p className="mt-3 text-xl">The Civil Rights Case Blueprint</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#C9B99A]">
            {data.scope}
          </p>
        </header>
        <section
          aria-label="Your course progress"
          className="my-6 rounded-2xl border border-[#FFB840]/30 bg-[#182635] p-5"
        >
          <div className="flex flex-wrap justify-between gap-2">
            <span>
              {state?.passed
                ? "Knowledge checks completed"
                : `${completed.length} of ${data.lessons.length} lessons completed`}
            </span>
            <span className="text-[#FFB840]">
              {attempts.length} recorded submissions · {mistakes.length} errors
            </span>
          </div>
          <progress
            aria-label="Case2Court completion"
            value={completed.length + (state?.passed ? 1 : 0)}
            max={data.lessons.length + 1}
            className="mt-3 h-3 w-full accent-[#FFB840]"
          />
          <p className="mt-2 text-xs leading-6 text-[#C9B99A]">
            Answers, scores and retries are saved to your member account.
            Earlier mistakes remain in your learning record. Workbook exercises
            are self-reviewed and are not uploaded.
          </p>
          <button
            onClick={() => setReview(true)}
            className="mt-3 min-h-11 text-[#FFB840] underline"
          >
            Review my learning record ({mistakes.length} errors)
          </button>
          {progress.isError && (
            <p role="alert" className="mt-3 text-red-200">
              Your learning record could not be loaded. Refresh access before
              submitting.
            </p>
          )}
        </section>
        <nav
          aria-label="Classroom sections"
          className="mb-5 flex flex-wrap gap-2"
        >
          {[
            ["lesson", "My lesson"],
            ["case", "Case room"],
            ["workbook", "Practice workbook"],
            ["docket", "PACER practice lab"],
            ["terms", "Course information"],
          ].map(([key, label]) => (
            <button
              key={key}
              aria-current={tab === key ? "page" : undefined}
              onClick={() => setTab(key)}
              className={`min-h-12 rounded-full border px-4 py-2 ${tab === key ? "border-[#FFB840] bg-[#FFB840] text-[#101b28]" : "border-white/25 text-[#F0EBE1]"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <details className="mb-6 rounded-xl border border-white/15 p-4">
          <summary className="min-h-11 cursor-pointer py-2 text-[#FFB840]">
            My learning path · 6 chapters / 16 lessons
          </summary>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {data.lessons.map((l, i) => (
              <li key={l.title}>
                <button
                  onClick={() => move(i)}
                  disabled={i > completed.length}
                  className="min-h-12 w-full rounded-lg border border-white/15 p-3 text-left text-sm disabled:opacity-40"
                >
                  {completed.includes(i) ? "✓ " : ""}
                  {i + 1}. {l.title}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => move(data.lessons.length)}
                disabled={completed.length !== data.lessons.length}
                className="min-h-12 w-full p-3 text-left text-[#FFB840] disabled:opacity-40"
              >
                17. Final scenario assessment
              </button>
            </li>
          </ol>
        </details>
        {tab === "case" && (
          <section className="space-y-5">
            <h2 className="text-3xl">The Avery training file</h2>
            <p className="leading-7 text-[#C9B99A]">
              Every person, event, record extract and case number below is
              fictional. These exhibits are intentionally incomplete. Keep
              source, allegation and conclusion separate.
            </p>
            {data.exhibits.map(e => (
              <article
                key={e.id}
                className="rounded-2xl border border-[#FFB840]/25 bg-[#182635] p-5"
              >
                <p className="text-xs text-[#FFB840]">EXHIBIT {e.id}</p>
                <h3 className="mt-2 text-xl">{e.title}</h3>
                <p className="mt-4 leading-8 text-[#C9B99A]">{e.text}</p>
              </article>
            ))}
          </section>
        )}
        {tab === "workbook" && (
          <section className="rounded-2xl border border-[#FFB840]/25 bg-[#182635] p-5 sm:p-8">
            <h2 className="text-3xl">Your practice workbook</h2>
            <p className="mt-4 leading-7 text-[#C9B99A]">
              Use the fictional case room to complete eight deliverables.
              Compare each with the model notes in its lesson. No instructor
              reviews your workbook or your real case.
            </p>
            <button
              onClick={download}
              className="my-5 min-h-12 rounded-full bg-[#FFB840] px-5 py-3 text-[#101b28]"
            >
              Download the workbook (.txt)
            </button>
            <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-[#C9B99A]">
              {data.workbook}
            </pre>
          </section>
        )}
        {tab === "docket" && <DocketLab entries={data.docket} />}
        {tab === "terms" && (
          <section className="rounded-2xl border border-white/15 p-5 sm:p-8">
            <h2 className="text-3xl">About this course and your access</h2>
            <div className="mt-5 space-y-5 text-sm leading-8 text-[#C9B99A]">
              {data.terms.map(t => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <p className="mt-5 text-sm">
              Course edition {data.version}. Sources checked October 15, 2026.{" "}
              <Link to="/privacy-policy" className="text-[#FFB840] underline">
                Privacy policy
              </Link>{" "}
              ·{" "}
              <Link to="/contact" className="text-[#FFB840] underline">
                Access support
              </Link>
            </p>
          </section>
        )}
        {tab === "lesson" &&
          (lesson ? (
            <article className="rounded-2xl border border-[#FFB840]/25 bg-[#182635] p-5 sm:p-8">
              <p className="text-xs uppercase tracking-widest text-[#FFB840]">
                {lesson.chapter} · Lesson {step + 1}
              </p>
              <h2
                ref={lessonTitle}
                tabIndex={-1}
                className="mt-3 text-3xl outline-none"
              >
                {lesson.title}
              </h2>
              <p className="mt-4 border-l-2 border-[#FFB840] pl-4 leading-7 text-[#C9B99A]">
                Your goal: {lesson.goal}
              </p>
              <div className="mt-6 space-y-6 text-base leading-8 text-[#C9B99A]">
                {lesson.reading.map(p => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <section className="mt-7 rounded-xl border border-[#FFB840]/25 p-5">
                <h3 className="text-xl text-[#FFB840]">Inside the case room</h3>
                <p className="mt-3 leading-8 text-[#C9B99A]">{lesson.worked}</p>
                <button
                  onClick={() => setTab("case")}
                  className="mt-3 min-h-11 text-[#FFB840] underline"
                >
                  Open Exhibits A–H →
                </button>
              </section>
              <section className="mt-6">
                <h3 className="text-xl">Your document task</h3>
                <p className="mt-3 leading-8 text-[#C9B99A]">{lesson.task}</p>
                <details className="mt-3">
                  <summary className="min-h-11 cursor-pointer py-2 text-[#FFB840]">
                    Compare with the fictional model notes
                  </summary>
                  <p className="mt-3 leading-8 text-[#C9B99A]">
                    {lesson.model}
                  </p>
                </details>
              </section>
              <h3 className="mt-7 text-xl">Check the official sources</h3>
              <ul className="mt-3 space-y-2">
                {lesson.sources.map(k => (
                  <li key={k}>
                    <a
                      href={data.sources[k].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-sm text-[#FFB840] underline"
                    >
                      {data.sources[k].label} ↗
                    </a>
                  </li>
                ))}
              </ul>
              <fieldset className="mt-7 rounded-xl border border-white/20 p-4">
                <legend className="px-2 text-xl">
                  Checkpoint · record your answer
                </legend>
                <p className="my-3 leading-7">{lesson.checkpoint.prompt}</p>
                {lesson.checkpoint.options.map((o, i) => (
                  <label
                    key={o}
                    className="my-2 flex min-h-12 items-start gap-3 rounded-lg border border-white/15 p-3 leading-7"
                  >
                    <input
                      type="radio"
                      name="checkpoint"
                      checked={answer === i}
                      disabled={locked || submit.isPending}
                      onChange={() => setAnswer(i)}
                      className="mt-2"
                    />
                    {o}
                  </label>
                ))}
                <button
                  disabled={
                    answer < 0 ||
                    locked ||
                    submit.isPending ||
                    progress.isError ||
                    !state
                  }
                  onClick={save}
                  className="mt-4 min-h-12 rounded-full bg-[#FFB840] px-5 py-3 text-[#101b28] disabled:opacity-40"
                >
                  {submit.isPending ? "Recording…" : "Submit checkpoint"}
                </button>
              </fieldset>
              {locked && latest && (
                <div
                  role="status"
                  className="mt-5 rounded-xl border border-[#FFB840]/30 p-5"
                >
                  <p className="font-semibold">
                    {latest.passed
                      ? "Correct · checkpoint recorded"
                      : "Incorrect · attempt recorded"}
                  </p>
                  <p className="mt-3 leading-7 text-[#C9B99A]">
                    {latest.feedback[0].explanation}
                  </p>
                  <button
                    onClick={() => setReview(true)}
                    className="mt-3 min-h-11 text-[#FFB840] underline"
                  >
                    Open my review
                  </button>
                  {!latest.passed && (
                    <button
                      onClick={() => {
                        setLocked(false);
                        setAnswer(-1);
                        setMessage("");
                      }}
                      className="ml-4 min-h-11 text-[#FFB840] underline"
                    >
                      Try this question again
                    </button>
                  )}
                </div>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  disabled={step === 0}
                  onClick={() => move(step - 1)}
                  className="min-h-12 rounded-full border border-white/25 px-5 py-3 disabled:opacity-40"
                >
                  Previous lesson
                </button>
                <button
                  disabled={!completed.includes(step)}
                  onClick={() => move(step + 1)}
                  className="min-h-12 rounded-full bg-[#FFB840] px-5 py-3 text-[#101b28] disabled:opacity-40"
                >
                  {step === data.lessons.length - 1
                    ? "Open the final assessment"
                    : "Continue to the next lesson"}{" "}
                  →
                </button>
              </div>
            </article>
          ) : (
            <section className="rounded-2xl border border-[#FFB840]/30 bg-[#182635] p-5 sm:p-8">
              <h2
                ref={lessonTitle}
                tabIndex={-1}
                className="text-3xl outline-none"
              >
                Final Case Blueprint assessment
              </h2>
              <p className="mt-4 leading-8 text-[#C9B99A]">
                Use the fictional file to answer all {data.final.length}{" "}
                questions. A complete pass requires every answer correct. Every
                submitted attempt is saved, including errors. Review
                explanations and retry as needed. This does not evaluate a real
                case.
              </p>
              {state?.passed && (
                <p
                  role="status"
                  className="my-5 rounded-xl border border-emerald-300/40 p-4 text-emerald-200"
                >
                  Knowledge checks completed. Your workbook is self-reviewed;
                  this is not a professional credential or court approval.
                </p>
              )}
              {data.final.map((q, i) => (
                <fieldset
                  key={q.prompt}
                  className="my-6 rounded-xl border border-white/20 p-4"
                >
                  <legend className="px-2">Question {i + 1}</legend>
                  <p className="mb-3 leading-7">{q.prompt}</p>
                  {q.options.map((o, n) => (
                    <label
                      key={o}
                      className="my-2 flex min-h-12 items-start gap-3 rounded-lg border border-white/15 p-3 leading-7"
                    >
                      <input
                        type="radio"
                        name={`final-${i}`}
                        checked={finalAnswers[i] === n}
                        disabled={locked || submit.isPending}
                        onChange={() =>
                          setFinalAnswers(a =>
                            Array.from({ length: data.final.length }, (_, j) =>
                              j === i ? n : (a[j] ?? -1)
                            )
                          )
                        }
                        className="mt-2"
                      />
                      {o}
                    </label>
                  ))}
                </fieldset>
              ))}
              <button
                disabled={
                  locked ||
                  submit.isPending ||
                  progress.isError ||
                  !state ||
                  finalAnswers.length !== data.final.length ||
                  finalAnswers.some(a => a < 0)
                }
                onClick={save}
                className="min-h-12 rounded-full bg-[#FFB840] px-5 py-3 text-[#101b28] disabled:opacity-40"
              >
                {submit.isPending ? "Recording…" : "Submit final assessment"}
              </button>
              {locked && lastFinal && (
                <div role="status" className="mt-5">
                  <p>
                    {lastFinal.correctCount} / {lastFinal.totalCount} ·{" "}
                    {lastFinal.passed
                      ? "Knowledge check passed"
                      : "Review and retry required"}
                  </p>
                  <button
                    onClick={() => setReview(true)}
                    className="mt-3 min-h-11 text-[#FFB840] underline"
                  >
                    Review recorded answers
                  </button>
                  <button
                    onClick={() => {
                      setLocked(false);
                      setFinalAnswers([]);
                      setMessage("");
                    }}
                    className="ml-5 min-h-11 text-[#FFB840] underline"
                  >
                    Start a new attempt
                  </button>
                </div>
              )}
              <Link
                to="/pre-order"
                className="mt-7 block text-[#FFB840] underline"
              >
                Explore Ronald’s book →
              </Link>
            </section>
          ))}
        {message && (
          <p role="status" className="mt-5 leading-7 text-[#FFB840]">
            {message}
          </p>
        )}
        {submit.error && (
          <p role="alert" className="mt-3 text-red-200">
            {submit.error.message}
          </p>
        )}
        <Dialog open={review} onOpenChange={setReview}>
          <DialogContent
            data-lenis-prevent
            className="max-h-[85dvh] overflow-y-auto border-[#FFB840]/30 bg-[#101b28] text-[#F0EBE1] sm:max-w-2xl"
          >
            <DialogTitle>Your recorded learning history</DialogTitle>
            <DialogDescription className="text-[#C9B99A]">
              Original answers remain after retries. Open a lesson to review its
              explanation, then return and submit a new answer.
            </DialogDescription>
            {attempts.length === 0 ? (
              <p>No submissions yet.</p>
            ) : (
              attempts.map((a, i) => (
                <section
                  key={a.id}
                  className="rounded-xl border border-white/15 p-4"
                >
                  <h3 className="text-[#FFB840]">
                    Attempt {i + 1} ·{" "}
                    {a.kind === "final"
                      ? "Final assessment"
                      : `Lesson ${(a.lessonIndex ?? 0) + 1}`}{" "}
                    · {a.correctCount}/{a.totalCount}
                  </h3>
                  <p className="mt-2 text-xs text-[#C9B99A]">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                  {a.feedback.map((f, n) => (
                    <div key={n} className="mt-4 border-t border-white/10 pt-3">
                      <p>{f.prompt}</p>
                      <p
                        className={`mt-2 ${f.correct ? "text-emerald-200" : "text-red-200"}`}
                      >
                        Your answer: {f.options[f.chosen]} ·{" "}
                        {f.correct ? "Correct" : "Incorrect"}
                      </p>
                      <p className="mt-2 text-emerald-200">
                        Correct answer: {f.options[f.answer]}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#C9B99A]">
                        {f.explanation}
                      </p>
                      <button
                        onClick={() => {
                          setReview(false);
                          move(f.lesson);
                        }}
                        className="mt-2 min-h-11 text-[#FFB840] underline"
                      >
                        Review lesson {f.lesson + 1}
                      </button>
                    </div>
                  ))}
                </section>
              ))
            )}
            <button
              onClick={() => setReview(false)}
              className="min-h-12 rounded-full bg-[#FFB840] px-5 py-3 text-[#101b28]"
            >
              Return to my classroom
            </button>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

function DocketLab({ entries }: { entries: CaseCourse["docket"] }) {
  const [entry, setEntry] = useState(0),
    [pages, setPages] = useState(5),
    [kind, setKind] = useState("document"),
    [prior, setPrior] = useState(0);
  const cost = kind === "document" ? Math.min(3, pages * 0.1) : pages * 0.1;
  const accrued = Math.round((prior + cost) * 100) / 100;
  return (
    <section className="rounded-2xl border border-[#FFB840]/30 bg-[#182635] p-5 sm:p-8">
      <p className="text-xs text-[#FFB840]">
        FICTIONAL PRACTICE · NO REAL RECORDS SEARCH
      </p>
      <h2 className="mt-3 text-3xl">Read the docket. Open the order.</h2>
      <p className="mt-4 leading-8 text-[#C9B99A]">
        Training case 1:26-cv-00001 is invented. Select an entry to see what it
        establishes and what remains unknown.
      </p>
      <div className="my-5 grid gap-2 sm:grid-cols-2">
        {entries.map((e, i) => (
          <button
            key={e.id}
            onClick={() => setEntry(i)}
            aria-pressed={entry === i}
            className={`min-h-16 rounded-xl border p-4 text-left ${entry === i ? "border-[#FFB840]" : "border-white/20"}`}
          >
            {e.id}. {e.title}
            <span className="block text-xs text-[#C9B99A]">{e.date}</span>
          </button>
        ))}
      </div>
      <div role="status" className="rounded-xl border border-white/20 p-5">
        <h3 className="text-xl">
          Entry {entries[entry].id}: {entries[entry].title}
        </h3>
        <p className="mt-3 leading-8 text-[#C9B99A]">{entries[entry].body}</p>
      </div>
      <h3 className="mt-8 text-2xl">Practice the fee rules</h3>
      <p className="mt-3 text-sm leading-7 text-[#C9B99A]">
        General rules checked October 15, 2026. No actual PACER account or
        charge is created. This illustration assumes no separate fee exemption
        and excludes audio and other special charges.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          Retrieval type
          <select
            value={kind}
            onChange={e => setKind(e.target.value)}
            className="mt-2 min-h-12 w-full rounded-lg bg-[#101b28] p-3"
          >
            <option value="document">Ordinary document</option>
            <option value="search">Name-search results</option>
            <option value="transcript">Transcript</option>
          </select>
        </label>
        <label className="text-sm">
          Pages
          <input
            type="number"
            min="1"
            max="5000"
            value={pages}
            onChange={e =>
              setPages(Math.max(1, Math.min(5000, Number(e.target.value) || 1)))
            }
            className="mt-2 min-h-12 w-full rounded-lg bg-[#101b28] p-3"
          />
        </label>
        <label className="text-sm">
          Earlier quarterly charges ($)
          <input
            type="number"
            min="0"
            max="10000"
            step="0.01"
            value={prior}
            onChange={e =>
              setPrior(
                Math.max(0, Math.min(10000, Number(e.target.value) || 0))
              )
            }
            className="mt-2 min-h-12 w-full rounded-lg bg-[#101b28] p-3"
          />
        </label>
      </div>
      <div
        role="status"
        className="mt-5 rounded-xl border border-[#FFB840]/30 p-5"
      >
        <p>
          Practice retrieval: ${cost.toFixed(2)} · quarter accrued: $
          {accrued.toFixed(2)}
        </p>
        <p className="mt-3 leading-7 text-[#C9B99A]">
          {accrued <= 30
            ? "At $30 or less in the quarter, the general quarterly fee waiver applies."
            : `Above $30, the entire $${accrued.toFixed(2)} accrued quarter may be billable; the rule is not a $30 credit.`}{" "}
          {kind === "document"
            ? "The ordinary-document $3 cap is applied here."
            : "The ordinary-document $3 cap does not apply to this retrieval type."}
        </p>
      </div>
      <a
        href="https://pacer.uscourts.gov/pacer-pricing-how-fees-work"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-12 items-center text-[#FFB840] underline"
      >
        Check official PACER pricing ↗
      </a>
    </section>
  );
}
