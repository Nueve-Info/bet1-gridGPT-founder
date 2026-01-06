import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <img src="/assets/logo.svg" alt="GridGPT Logo" className="h-6 sm:h-8 w-auto" />
          </button>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              onClick={() => navigate('/')}
              className="bg-[#111111] text-white hover:bg-black/90 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
            >
              Back to Home
            </Button>
          </div>

          {/* Privacy Policy Section */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] mb-8">
              Privacy Policy for gridGPT
            </h1>
            
            <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
              <p className="text-base sm:text-lg">
                Effective Date: January 6, 2026
              </p>
              
              <p>
                Welcome to gridGPT! Your privacy matters to us. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services available at <a href="https://gridgpt.tech" className="text-[#111111] underline">https://gridgpt.tech</a> ("Service," "we," "us," or "our").
              </p>
              
              <p>
                By accessing or using the Service, you agree to this Privacy Policy and consent to the data practices described below.
              </p>

              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">1. Information We Collect</h2>
                  <p className="mb-4">
                    We collect information that you voluntarily provide to us, as well as information that is automatically collected when you use the Service.
                  </p>
                  
                  <h3 className="text-xl font-medium text-[#111111] mb-3 mt-6">A. Personal Information You Provide</h3>
                  <p className="mb-4">
                    We may collect personal information when you:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Create an account</li>
                    <li>Use features of the Service</li>
                    <li>Contact support or communicate with us</li>
                  </ul>
                  <p className="mb-4">This may include:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Username</li>
                    <li>Payment and billing information</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                  <p>
                    We use this information to operate the Service, manage accounts, process payments, communicate with users, and provide customer support.
                  </p>
                  
                  <h3 className="text-xl font-medium text-[#111111] mb-3 mt-6">B. Automatically Collected Information</h3>
                  <p className="mb-4">
                    When you access or use gridGPT, we may automatically collect:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>IP address</li>
                    <li>Device identifiers, browser type, and operating system</li>
                    <li>Usage data such as pages visited, actions taken, and feature interactions</li>
                    <li>Log files and diagnostic data</li>
                  </ul>
                  <p>
                    This information is used for analytics, performance optimization, product improvement, and security purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">2. Cookies and Tracking Technologies</h2>
                  <p className="mb-4">We use cookies and similar technologies to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Remember user preferences</li>
                    <li>Understand how users interact with the Service</li>
                    <li>Improve functionality and performance</li>
                  </ul>
                  <p>
                    You can control cookies through your browser settings. Please note that disabling cookies may limit certain features of the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">3. How We Use Your Information</h2>
                  <p className="mb-4">We use collected information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve gridGPT</li>
                    <li>Create and manage user accounts</li>
                    <li>Process subscriptions and payments</li>
                    <li>Communicate with users about updates, features, and support</li>
                    <li>Monitor and prevent fraud, abuse, or security incidents</li>
                    <li>Comply with applicable laws and regulations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">4. Sharing of Information</h2>
                  <p className="mb-4">
                    We do not sell your personal data.
                  </p>
                  <p className="mb-4">
                    We may share information only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Service Providers:</strong> trusted third parties who assist us with hosting, payments, analytics, or infrastructure</li>
                    <li><strong>Legal Requirements:</strong> when required by law, regulation, or legal process</li>
                    <li><strong>Business Transfers:</strong> in connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                  <p>
                    All third parties are required to safeguard your data and use it only for authorized purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">5. Data Retention</h2>
                  <p className="mb-4">We retain personal information only for as long as necessary to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Provide the Service</li>
                    <li>Fulfill legal and contractual obligations</li>
                    <li>Resolve disputes</li>
                    <li>Enforce agreements</li>
                  </ul>
                  <p>
                    When data is no longer needed, it is securely deleted or anonymized.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">6. Your Rights</h2>
                  <p className="mb-4">
                    Depending on your location, you may have the right to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct or update inaccurate information</li>
                    <li>Request deletion of your personal data</li>
                    <li>Object to or restrict certain data processing</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us using the details below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">7. Data Security</h2>
                  <p>
                    We implement reasonable administrative, technical, and organizational safeguards to protect your personal information. However, no system is completely secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">8. International Data Transfers</h2>
                  <p>
                    Your information may be transferred to and processed in countries outside of your country of residence. By using the Service, you consent to such transfers in accordance with this Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">9. Children's Privacy</h2>
                  <p>
                    gridGPT is not intended for individuals under the age of 13 (or the minimum legal age in your jurisdiction). We do not knowingly collect personal information from children.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">10. Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on gridgpt.tech with an updated Effective Date. Continued use of the Service after changes means you accept the revised Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium text-[#111111] mb-4">11. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <ul className="list-none pl-0 mt-4 space-y-2">
                    <li>Email: <a href="mailto:support@gridgpt.com" className="text-[#111111] underline">support@gridgpt.com</a></li>
                    <li>Website: <a href="https://gridgpt.tech" className="text-[#111111] underline">https://gridgpt.tech</a></li>
                  </ul>
                </section>
              </div>
            </div>
          </div>

            <div className="pt-8">
              <Button 
                onClick={() => navigate('/')}
                className="bg-[#111111] text-white hover:bg-black/90 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
              >
                Back to Home
              </Button>
            </div>
        </div>
      </section>
    </div>
  );
}

