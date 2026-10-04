"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { formatUsd, PRICING_USD } from '@/lib/pricing';

interface FAQ {
  question: string;
  answer: string;
}

/**
 * Eight questions, one list.
 *
 * This was 28 Q&A split across four tabs — ~1,000 words, of which three
 * quarters sat behind a tab interaction almost nobody performs. What survives
 * is the highest-intent set: what it is, how it differs, what it can do, and
 * the four objections people actually raise before signing up (skill level,
 * keys, price, security). Everything else lives on the pages that own it.
 */
const FAQS: FAQ[] = [
  {
    question: "What is Trooper?",
    answer:
      "Trooper is an AI workforce you can give real work to. Deploy teams of AI employees that use your tools, run loops you approved, and come back when they need a sign-off. Built on OpenClaw; bring your own API keys.",
  },
  {
    question: "How is Trooper different from ChatGPT or Claude?",
    answer:
      "ChatGPT and Claude are single-model chat interfaces. Trooper gives you an entire AI workforce: multiple specialized agents that collaborate, share persistent memory, make real GitHub commits, control browsers, send emails, and run 24/7 on their own Always-on Virtual PC. Chat assistants answer. Troopers finish the job, on their own machine or in the cloud, even when you're offline.",
  },
  {
    question: "What can the AI agents actually do?",
    answer:
      "Agents can write and commit code to GitHub, create and review pull requests, browse any website, fill forms, extract data, send and read emails, run shell commands, query databases, process files, manage projects, write documentation, and coordinate with other agents on complex multi-step workflows.",
  },
  {
    question: "Do I need technical knowledge to use Trooper?",
    answer:
      "No. You assign tasks in plain language via chat. Trooper handles the execution: writing code, running commands, browsing the web, sending emails. Self-host on your machine, or use cloud if you want us to run it.",
  },
  {
    question: "Do I need my own API keys?",
    answer:
      "No. Recharge credits on Trooper, or bring your own Claude, ChatGPT, or OpenRouter key. You can also use an existing Claude or ChatGPT subscription.",
  },
  {
    question: "What does a seat cost?",
    answer: `A seat is ${formatUsd(PRICING_USD.seatMonthly)} per person per month, with a 7-day free trial. Recharge credits on Trooper, or bring your own keys. You can also use an existing Claude or ChatGPT subscription. Self install is ${formatUsd(PRICING_USD.selfInstallLifetime)} once, for life, on a machine you own. Enterprise (SSO, private VPC) is a conversation.`,
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Every organization gets an isolated workspace with encrypted connections. When you bring your own keys, they stay yours. When you recharge credits, Trooper manages the API key. Enterprise customers get additional controls: SSO, private VPC, on-prem deployment, and custom security agreements.",
  },
  {
    question: "Can I self-host Trooper?",
    answer:
      `Yes. Self install is ${formatUsd(PRICING_USD.selfInstallLifetime)} once, for life, on your laptop or a virtual machine. You bring your own keys. Enterprise adds VPC, SSO, and on-prem.`,
  },
];

const FAQCell: React.FC<FAQ> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group h-fit rounded-xl bg-white shadow-xs ring-1 ring-black/5">
      <button
        className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-start gap-3 sm:gap-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-semibold text-neutral-800 text-[15px] sm:text-base leading-snug">
          {question}
        </span>
        {/* Was `[+]` / `[−]` in monospace — ASCII-art affordances belong in a
            terminal, not on a marketing page. */}
        <ChevronDown
          className={`mt-0.5 size-4 shrink-0 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed text-ink-muted">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Padding and measure belong to the SectionShell wrapping this — it used to
 * re-declare `max-w-7xl mx-auto` inside the shell's own padded `max-w-7xl`,
 * so the block could never reach the width it asked for and sat 25px inside
 * every other section's rail.
 */
const FAQ: React.FC = () => (
  <div>
    <div className="max-w-2xl">
      <h2 className="h2-section">
        Questions.
      </h2>
      <p className="lede">
        Missing something? Email{' '}
        <a
          href="mailto:vaibhav@trooper.so"
          className="text-trooper hover:underline"
          target="_blank"
          rel="noopener"
        >
          vaibhav@trooper.so
        </a>
        .
      </p>
    </div>

    {/* Cards with a real gap — see the note in HowItWorksSteps on why the
        `gap-px` hairline table is gone. */}
    <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
      {FAQS.map((faq) => (
        <FAQCell key={faq.question} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  </div>
);

export default FAQ;
