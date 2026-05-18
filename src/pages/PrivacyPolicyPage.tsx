import { Link } from 'react-router'
import { ArrowLeft, Shield, Mail } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MarqueeDivider from '../components/MarqueeDivider'

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center px-6 md:px-12 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-book.jpg)' }} />
        <div className="absolute inset-0 bg-[#1B2838]/85" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <Shield size={28} className="text-[#FF9500]" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A]">PRIVACY & DATA PROTECTION</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h1 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
              Privacy Policy
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-base text-[#C9B99A] leading-relaxed max-w-2xl">
              Last Updated: May 18, 2026. This Privacy Policy describes how your information is collected, used, and shared when you visit, interact with, or make a purchase from our website, platforms, or mobile applications (collectively, the "Services").
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="inline-flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1.5 mt-4">
              <Shield size={12} /> Registered New Jersey LLC
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeDivider text="#TheKingsTake — Privacy & Protection — AASOTU Media Group — Your Data. Your Trust." />

      {/* Policy Content */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#0C1520]">
        <div className="max-w-4xl mx-auto">

          {/* Section 1 */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">1. Information We Collect</h2>
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                We collect several different types of information for various purposes to provide and improve our Services to you.
              </p>

              <h3 className="text-sm text-[#F0EBE1] uppercase tracking-[0.04em] mb-3">Personal Data You Provide Voluntarily</h3>
              <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                While using our Services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This includes, but is not limited to:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                  <div>
                    <strong className="text-[#F0EBE1]">Identity & Contact Data:</strong>{' '}
                    <span className="text-[#C9B99A]">First and last name, email address, phone number, and account usernames.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                  <div>
                    <strong className="text-[#F0EBE1]">Billing and Financial Data:</strong>{' '}
                    <span className="text-[#C9B99A]">Credit card details, billing address, and payment processor tokens (processed securely through third-party encrypted gateways).</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                  <div>
                    <strong className="text-[#F0EBE1]">Shipping Data:</strong>{' '}
                    <span className="text-[#C9B99A]">Physical delivery address, phone number, and recipient name (required for upcoming paperback shipments and physical merchandise).</span>
                  </div>
                </li>
              </ul>

              <h3 className="text-sm text-[#F0EBE1] uppercase tracking-[0.04em] mb-3">Data Collected Automatically</h3>
              <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                When you access the Services, we may collect certain information automatically through cookies, log files, and web beacons:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                  <div>
                    <strong className="text-[#F0EBE1]">Usage & Device Data:</strong>{' '}
                    <span className="text-[#C9B99A]">Your IP address, browser type, operating system, referring URLs, device identifiers, and pages viewed on our site.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                  <div>
                    <strong className="text-[#F0EBE1]">Tracking & Cookies:</strong>{' '}
                    <span className="text-[#C9B99A]">We use cookies to maintain your session, remember your preferences, and understand how visitors interact with our content. You can instruct your browser to refuse all cookies, but some portions of our Services may not function properly as a result.</span>
                  </div>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Section 2 */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">2. How We Use Your Information</h2>
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                We use the collected data for various operational and commercial purposes, including:
              </p>
              <ul className="space-y-3">
                {[
                  'Order Fulfillment: To process transactions, deliver digital book downloads, manage subscriptions, and ship physical paperbacks or materials.',
                  'Communication & Marketing: To send you newsletters, promotional materials, updates on new book releases, or direct messages, provided you have opted in to receive them.',
                  'Platform Operations: To create and maintain user accounts, deliver digital curriculum or educational modules, and secure our digital infrastructure.',
                  'Legal Compliance: To comply with applicable New Jersey state laws, federal regulations, and to protect our platform against fraud or unauthorized access.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                    <span className="text-sm text-[#C9B99A] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Section 3 */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">3. Sharing and Disclosure of Your Data</h2>
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                We do not sell, rent, or trade your personal data to third parties. We only share your information with trusted third-party service providers necessary to execute our business operations:
              </p>
              <ul className="space-y-3">
                {[
                  'Payment Processors: To handle secure payment transactions (e.g., Stripe, PayPal, Shopify Payments).',
                  'E-book & Digital Delivery Networks: To securely distribute digital files and media content to your device.',
                  'Shipping & Fulfillment Partners: To print, pack, and mail physical books and paperback editions to your designated shipping address.',
                  'Marketing & Automation Tools: To manage our email lists, newsletter campaigns, and audience communication platforms.',
                  'Legal Requirements: We may disclose your data if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                    <span className="text-sm text-[#C9B99A] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Section 4 */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">4. Data Retention and Security</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-[#F0EBE1] uppercase tracking-[0.04em] mb-2">Retention</h3>
                  <p className="text-sm text-[#C9B99A] leading-relaxed">
                    We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy, or to comply with our legal, accounting, and reporting obligations.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-[#F0EBE1] uppercase tracking-[0.04em] mb-2">Security</h3>
                  <p className="text-sm text-[#C9B99A] leading-relaxed">
                    The security of your data is important to us. We implement commercial-grade administrative, technical, and physical security measures (such as SSL encryption) to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 5 */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">5. Your Privacy Rights</h2>
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                Depending on your location, you may have rights regarding your personal data, including the right to access, correct, update, or request the deletion of the personal information we hold about you.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                  <span className="text-sm text-[#C9B99A] leading-relaxed">
                    If you wish to opt-out of marketing communications, you can click the "Unsubscribe" link at the bottom of any email we send.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-2" />
                  <span className="text-sm text-[#C9B99A] leading-relaxed">
                    To request a copy or deletion of your stored data, please contact us directly using the contact information provided below.
                  </span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Section 6 */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">6. Children's Privacy</h2>
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed">
                Our Services are not intended for use by anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us so that we can take immediate steps to remove that information from our servers.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 7 */}
          <ScrollReveal>
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">7. Changes to This Privacy Policy</h2>
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed">
                We may update our Privacy Policy from time to time to reflect changes in our business operations, technological shifts, or legal requirements. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </ScrollReveal>

          {/* Section 8 - Contact */}
          <ScrollReveal>
            <div className="mb-12 bg-[rgba(27,40,56,0.75)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.2)] p-6 md:p-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FFB840]" />)}
                </div>
                <h2 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em]">8. Contact Us</h2>
              </div>
              <p className="text-sm text-[#C9B99A] leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your data, please contact us at:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#FF9500]" />
                  <span className="text-sm text-[#F0EBE1]">aasotumediagroup@gmail.com</span>
                </div>
                <p className="text-sm text-[#C9B99A] ml-7">AASOTU Media Group LLC</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <MarqueeDivider text="#TheKingsTake — Privacy & Protection — AASOTU Media Group — Your Data. Your Trust." />
    </main>
  )
}
