export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}

      <section className="max-w-5xl mx-auto px-6 py-24">

        <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 text-sm mb-8">
          Privacy Policy
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-10">

          Privacy Policy
          <span className="block text-cyan-400 mt-2">
            CompareCSV
          </span>

        </h1>

        <p className="text-slate-300 text-lg leading-8">
          Last updated: May 2026
        </p>

      </section>

      {/* Main Content */}

      <section className="max-w-5xl mx-auto px-6 pb-32">

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 md:p-14">

          <div className="space-y-12 text-slate-300 text-lg leading-8">

            {/* Intro */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Introduction
              </h2>

              <p>
                CompareCSV ("we", "our", or "us") values your privacy
                and is committed to protecting your personal information.
              </p>

              <p className="mt-4">
                This Privacy Policy explains how we collect,
                use, process, and safeguard information
                when you use our website and AI-powered spreadsheet analysis tools.
              </p>

            </div>

            {/* Information Collected */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Information We Collect
              </h2>

              <p>
                We may collect certain types of information
                when you use CompareCSV, including:
              </p>

              <ul className="list-disc pl-6 mt-6 space-y-3">

                <li>
                  Uploaded spreadsheet files such as CSV and Excel files
                </li>

                <li>
                  Usage analytics and interaction data
                </li>

                <li>
                  Device and browser information
                </li>

                <li>
                  Contact form submissions and email communications
                </li>

              </ul>

            </div>

            {/* File Processing */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                File Processing
              </h2>

              <p>
                Uploaded files are processed for spreadsheet analysis,
                AI workflows, chart generation,
                comparison operations, and content generation features.
              </p>

              <p className="mt-4">
                We continuously work toward improving privacy,
                security, and browser-based processing capabilities
                to minimize unnecessary data storage.
              </p>

            </div>

            {/* AI Features */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                AI-Powered Features
              </h2>

              <p>
                CompareCSV uses AI technologies to generate:
              </p>

              <ul className="list-disc pl-6 mt-6 space-y-3">

                <li>Dataset insights</li>
                <li>Business summaries</li>
                <li>Charts and analytics</li>
                <li>Blog-ready content</li>
                <li>Creator-focused reports</li>
                <li>Spreadsheet analysis outputs</li>

              </ul>

              <p className="mt-4">
                AI-generated results are automated
                and may not always be fully accurate.
                Users should independently verify important information.
              </p>

            </div>

            {/* Cookies */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Cookies & Analytics
              </h2>

              <p>
                CompareCSV may use cookies,
                analytics tools,
                and similar technologies
                to improve user experience,
                performance,
                security,
                and product development.
              </p>

            </div>

            {/* Ads */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Advertising & Third-Party Services
              </h2>

              <p>
                We may use third-party advertising providers
                such as Google AdSense
                and analytics platforms
                to support and improve our services.
              </p>

              <p className="mt-4">
                Third-party services may use cookies
                and similar technologies
                according to their own privacy policies.
              </p>

            </div>

            {/* Data Security */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Data Security
              </h2>

              <p>
                We implement reasonable technical
                and organizational safeguards
                to help protect user data and platform security.
              </p>

              <p className="mt-4">
                However, no method of internet transmission
                or electronic storage is completely secure.
              </p>

            </div>

            {/* User Rights */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                User Rights
              </h2>

              <p>
                Users may contact us regarding:
              </p>

              <ul className="list-disc pl-6 mt-6 space-y-3">

                <li>Privacy concerns</li>
                <li>Data requests</li>
                <li>Feedback and support</li>
                <li>Feature or account inquiries</li>

              </ul>

            </div>

            {/* Changes */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy periodically
                to reflect changes in our platform,
                technologies,
                legal requirements,
                or business operations.
              </p>

            </div>

            {/* Contact */}

            <div>

              <h2 className="text-3xl font-bold text-white mb-6">
                Contact Us
              </h2>

              <p>
                For privacy-related questions or concerns,
                contact:
              </p>

              <div className="rounded-2xl bg-black/30 border border-white/10 p-5 mt-6 text-cyan-300 break-all">
                support@comparecsv.org
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}