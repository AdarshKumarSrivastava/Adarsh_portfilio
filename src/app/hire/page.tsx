"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

function FloatingLabel({ htmlFor, label, isFocused, hasValue }: {
  htmlFor: string;
  label: string;
  isFocused: boolean;
  hasValue: boolean;
}) {
  const up = isFocused || hasValue;
  return (
    <label
      htmlFor={htmlFor}
      className={`absolute left-4 font-mono transition-all duration-300 pointer-events-none ${
        up ? "-top-5 text-[10px] text-accent tracking-[0.3em] font-semibold uppercase" : "top-3.5 text-sm text-secondary tracking-wide"
      }`}
    >
      {label}
    </label>
  );
}

function FormField({ id, label, type = "text", textarea = false, value, onChange, required = true, placeholder }: {
  id: string; label: string; type?: string; textarea?: boolean; value: string; onChange: (val: string) => void; required?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative pt-6 mb-8 group">
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={focused ? placeholder : ""}
          className="w-full bg-transparent hover:bg-accent/[0.04] px-4 pt-4 border-b border-white/10 rounded-t-xl text-white font-sans text-sm outline-none resize-none focus:bg-accent/[0.06] focus:border-accent/50 transition-all duration-500 ease-out"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          placeholder={focused ? placeholder : ""}
          className="w-full bg-transparent hover:bg-accent/[0.04] px-4 h-12 border-b border-white/10 rounded-t-xl text-white font-sans text-sm outline-none focus:bg-accent/[0.06] focus:border-accent/50 transition-all duration-500 ease-out"
        />
      )}
      <FloatingLabel htmlFor={id} label={label} isFocused={focused} hasValue={value.length > 0} />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/AdarshKumarSrivastava",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adarsh-kumar-srivastava-8198b3387",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:adarshsrivastava1524@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
];

export default function HireMe() {
  const [formData, setFormData] = useState({ email: "", role: "", budget: "", message: "" });
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);

      // Send OTP to user's email
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_OTP_TEMPLATE_ID!,
        {
          to_email: formData.email,
          otp_code: otp,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      
      setStep("otp");
    } catch (err) {
      console.error("EmailJS Error:", err);
      const errorObj = err as { text?: string; message?: string };
      setError(errorObj?.text || errorObj?.message || "Failed to send verification code. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userOtp !== generatedOtp) {
      setError("Incorrect verification code.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Send the actual message to the portfolio owner using the Contact template
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
        {
          from_name: "Recruiter (" + formData.role + ")",
          from_email: formData.email,
          subject: "🔥 HIRE INQUIRY: " + formData.role,
          message: "Budget: " + (formData.budget || "Not Specified") + "\n\nMessage:\n" + formData.message,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setStep("success");
      setFormData({ email: "", role: "", budget: "", message: "" });
      setUserOtp("");
      setGeneratedOtp("");
    } catch (err) {
      console.error("EmailJS Error:", err);
      const errorObj = err as { text?: string; message?: string };
      setError(errorObj?.text || errorObj?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#030303] flex items-center justify-center py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Back Button */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50">
        <Link href="/" className="flex items-center gap-2 text-secondary hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Portfolio
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy & Socials */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4">
            <span className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase">Recruitment Portal</span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-tight">
            Let&apos;s discuss your <span className="italic font-serif text-white/40">next hire</span>.
          </h1>
          <p className="text-secondary font-sans text-lg font-light leading-relaxed max-w-md mb-12">
            I specialize in architecting scalable, ultra-premium digital experiences. If you have an open role that demands a rare blend of engineering precision and design mastery, I’m ready to listen.
          </p>

          <div className="flex items-center gap-4">
            {socials.map((l) => (
              <MagneticButton key={l.label} as="a" href={l.href} variant="icon" aria-label={l.label}>
                {l.icon}
              </MagneticButton>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === "form" && (
            <form onSubmit={handleSendOtp} className="glass rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/[0.05]">
              <h3 className="font-heading text-2xl text-white font-medium mb-8">Offer Details</h3>
              <FormField id="email" label="Your Email" type="email" value={formData.email} onChange={v => setFormData(f => ({...f, email: v}))} />
              <FormField id="role" label="Role / Position" value={formData.role} onChange={v => setFormData(f => ({...f, role: v}))} />
              <FormField id="budget" label="Estimated Compensation / Budget" required={false} placeholder="e.g. $5000" value={formData.budget} onChange={v => { const nums = v.replace(/\D/g, ''); setFormData(f => ({...f, budget: nums ? '$' + nums : ''})); }} />
              <FormField id="message" label="Additional Details" textarea value={formData.message} onChange={v => setFormData(f => ({...f, message: v}))} />

              {error && <p className="text-red-400 font-sans text-xs mb-4">{error}</p>}

              <MagneticButton type="submit" disabled={submitting} variant="primary" className="w-full mt-6 py-4 text-base">
                {submitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-2a8 8 0 01-8-8z"/>
                    </svg>
                    Verifying Email...
                  </span>
                ) : (
                  "Next: Verify Email"
                )}
              </MagneticButton>
            </form>
          )}

          {step === "otp" && (
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onSubmit={handleVerifyAndSubmit}
              className="glass rounded-[2rem] p-6 sm:p-8 md:p-12 flex flex-col justify-center min-h-[500px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/[0.05]"
            >
              <div className="mb-8 text-center">
                <h3 className="font-heading text-3xl font-medium text-white mb-3">Verify your email</h3>
                <p className="text-secondary font-sans text-base">
                  We sent a 6-digit code to <span className="text-accent">{formData.email}</span>
                </p>
              </div>
              
              <FormField id="otp" label="Enter 6-digit Code" value={userOtp} onChange={(v) => setUserOtp(v.replace(/\D/g, '').slice(0, 6))} />
              
              {error && <p className="text-red-400 font-sans text-xs mb-4 text-center">{error}</p>}

              <div className="flex gap-4 mt-6">
                <MagneticButton type="button" onClick={() => setStep("form")} disabled={submitting} variant="ghost" className="w-1/3 py-4">
                  Back
                </MagneticButton>
                <MagneticButton type="submit" disabled={submitting || userOtp.length !== 6} variant="primary" className="w-2/3 py-4 text-base">
                  {submitting ? "Dispatching..." : "Verify & Send Proposal"}
                </MagneticButton>
              </div>
            </motion.form>
          )}

          {step === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-[2rem] p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[500px] gap-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/[0.05]"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                  className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                >
                  <motion.svg className="w-10 h-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <motion.polyline 
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                      points="20 6 9 17 4 12" 
                    />
                  </motion.svg>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-accent"
                />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-medium tracking-tight text-white mb-3">Proposal Received</h3>
                <p className="text-secondary font-sans text-base mb-8 max-w-xs mx-auto">
                  Thank you for reaching out. I will review the details and respond to your email shortly.
                </p>
                <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
                  Return to Portfolio
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
