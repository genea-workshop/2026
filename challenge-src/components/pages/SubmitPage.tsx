import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  FileText,
  AlertCircle,
  CheckCircle2,
  Send,
  Info,
  Shield,
  Users,
  HelpCircle
} from 'lucide-react';

// Reusable components for consistent styling
const SectionTitle: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <div className="flex items-center gap-3 mt-10 mb-6 pb-2 border-b border-gray-200">
    {icon && <span className="text-brand-primary">{icon}</span>}
    <h3 className="text-2xl font-bold text-brand-text">{children}</h3>
  </div>
);

const Par: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-brand-text-muted leading-relaxed mb-4 text-justify">{children}</p>
);

const OrderedList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ol className="space-y-4 text-brand-text-muted leading-relaxed text-justify">
    {items.map((item, index) => (
      <li key={index} className="flex gap-3">
        <span className="font-bold text-brand-primary min-w-[1.5rem]">{index + 1}.</span>
        <span>{item}</span>
      </li>
    ))}
  </ol>
);

const UnorderedList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-4 text-brand-text-muted leading-relaxed text-justify">
    {items.map((item, index) => (
      <li key={index} className="flex gap-3 items-start">
        <span className="mt-1.5 min-w-[6px] h-1.5 rounded-full bg-brand-primary shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const CheckList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="space-y-3 text-brand-text-muted leading-relaxed text-justify">
    {items.map((item, index) => (
      <li key={index} className="flex gap-3 items-start">
        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const SubmitPage: React.FC = () => {
  // const [showForm, setShowForm] = useState(false);
  const GOOGLE_FORM_EMBED_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScwTIR43liXvuN0oF0OB0muLLjBa8t04UwuEJHj1XN8fykmtw/viewform?embedded=true';

  return (
    <div className="mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-brand-primary/10 rounded-xl">
            <Send className="w-8 h-8 text-brand-primary" />
          </div>
          <h2 className="text-3xl font-bold text-brand-text">Submission Process</h2>
        </div>

        <div className="bg-blue-50 border border-blue-100 text-blue-900 px-6 py-5 rounded-xl flex gap-4 items-start">
          <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-lg">Please read the rules before submitting!</p>
            <p>The submission form is at the bottom of the page.</p>
            <p className="text-blue-800">
              Submissions are reviewed on a monthly basis. After each monthly submission deadline, the evaluation results are published approximately two weeks later.
            </p>
          </div>
        </div>
      </div>

      {/* Rules Section */}
      <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-brand-text" />
          <h2 className="text-3xl font-bold text-brand-text">Rules</h2>
        </div>

        <div className="prose prose-lg max-w-none text-brand-text-muted">
          <Par><strong>Please ensure that you have read these rules before submitting to the leaderboard. By submitting to the leaderboard, you agree to fully comply with these rules.</strong></Par>
          <Par>This is version 2025-11-17 of the rules, governing initial submissions to the leaderboard until a newer version is published by the leaderboard organisers. The rules are likely to evolve over time.</Par>
        </div>

        <SectionTitle icon={<Shield className="w-6 h-6" />}>Goal of the leaderboard</SectionTitle>
        <Par>The GENEA Leaderboard seeks to advance scientific knowledge relating to automatic gesture generation, by means of open science and large-scale, best-practices human evaluations presented in a leaderboard format. It is not a competition, and the point is not to find who does best, but what works best. The rules of the leaderboard have been designed with the intent of best furthering this goal.</Par>

        <SectionTitle icon={<Database className="w-6 h-6" />}>Data and materials</SectionTitle>
        <h4 className="text-lg font-bold text-brand-text mb-3">Training data and pre-trained models</h4>
        <Par>To ensure reproducibility and a level playing field, you may only use data and pre-trained model weights that are open and non-proprietary (or that will become open and non-proprietary upon publication) to create submissions to the leaderboard. For this leaderboard, open and non-proprietary means:</Par>
        <div className="bg-gray-100 p-6 rounded-xl mb-6 border border-gray-200">
          <CheckList
            items={[
              "Publicly available and findable.",
              "Released under an open license that permits research use (including academic research as well as research performed by/at companies).",
            ]}
          />
        </div>

        <Par>If you use machine-learning models, e.g., foundation models, to initialise and/or train your system, these models must be open and non-proprietary as well. This requirement for example includes machine-learning models of text, audio, and/or 2D/3D motion. You may still use proprietary components in your data processing pipeline if the data resulting from that processing is released as open and non-proprietary data.</Par>
        <Par>Data processing and model training that integrate trained machine-learning models available through publicly available APIs, including paid APIs like ChatGPT, is permitted, both at training time and at synthesis time. However, you must publicly disclose the date(s) you queried these APIs and the prompts you used for doing so, for example in your system description and its appendices.</Par>
        <Par>Note that we do not require that you release the weights of your gesture-generation model we evaluate on the leaderboard. If you would like to be evaluated on the leaderboard even though you cannot be fully compliant with the requirements on open and non-proprietary data and models, please contact us. We are also open to adjusting these rules in the future.</Par>

        <div className="mt-6">
          <h4 className="text-lg font-bold text-brand-text mb-3 text-red-600 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            You must not train your system on:
          </h4>
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <UnorderedList
              items={[
                "Any data from the BEAT2 test or validation sets, or the corresponding material in the original BEAT dataset.",
                "Any data derived from the BEAT2 test or validation sets, or from the corresponding material in the original BEAT dataset. This includes, e.g., augmented versions of the data in question, or output from any model trained on that data.",
              ]}
            />
          </div>
        </div>

        <div className="mt-6">
          <Par>As a remark, you are not required to train your system on any BEAT2 training data.</Par>
          <Par><strong>It is your responsibility to respect the licences of data and models you use, and to give proper attribution (including citations) to any datasets and models you have used to build your system.</strong></Par>
        </div>

        <h4 className="text-lg font-bold text-brand-text mt-8 mb-3">Synthesising motion for the test set</h4>
        <Par>Synthetic gesture motion must be submitted in the same format as that used by the leaderboard dataset (SMPL-X, same frame rate, etc.). The organisers take no responsibility for any effects that may occur if the submitted motion is not in the correct format.</Par>
        <Par>Systems that require a motion input at synthesis time to produce output motion, such as few-shot systems with motion “prompting”, or variational autoencoders, may only use training data as synthesis-time input.</Par>
        <Par>Since the idea is to evaluate how systems would perform in an unattended setting, manually tweaking the test inputs or the generated output motion is not allowed. For systems with stochastic output, it is similarly not permitted to manually cherry pick which random samples are submitted for evaluation. Only automated processing is permitted at synthesis time.</Par>
        <Par>Non-deterministic systems, i.e., ones that use random-number generators to produce different output motion for the same input speech, must submit five random samples for each speech file in the test set.</Par>

        <h4 className="text-lg font-bold text-brand-text mt-8 mb-3">Retention and distribution of submitted materials</h4>
        <Par>All motion and other materials (e.g., form responses and system-description documents) that you submit to the leaderboard will be retained by the organisers for future use. You retain ownership and still have the right to do whatever you like with your data and your documents.</Par>

        <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 mt-6">
          <Par><strong>By submitting motion and other materials to the leaderboard, you agree to the following terms and conditions:</strong></Par>
          <OrderedList
            items={[
              "You certify that you have all rights and permissions necessary to submit these materials and to grant the rights described below, and that the rights granted do not conflict with any other agreement to which you are bound.",
              "For submitted motion and form responses, you grant us a perpetual, worldwide, non-exclusive, irrevocable, royalty-free, transferable license to distribute these materials under a CC-BY-NC license, labelled as coming from your system. The same goes for any system-description documents that are not already permanently publicly available through the arXiv and/or open-access publishing.",
              "You agree not to seek indemnity or other recovery from us for any claims, losses, liabilities, costs, or expenses arising out of use of the data consistent with the license granted above. The same applies to third‑party claims related to permitted use of the data, except for claims resulting from gross negligence or willful misconduct on our part.",
            ]}
          />
        </div>

        <SectionTitle icon={<Users className="w-6 h-6" />}>How to participate</SectionTitle>
        <h4 className="text-lg font-bold text-brand-text mb-3">Documentation and reproducibility</h4>
        <Par>Since the GENEA Leaderboard seeks to advance scientific knowledge, we place substantial emphasis on reproducibility. To submit to the leaderboard, you must complete a form with accurate information about the general technical specification of your system and various meta-information, to facilitate easy cross-system comparisons. We also require a future-proof email address so that we can obtain complementary information about your submission if necessary.</Par>
        <Par>Each submission must be also associated with a system description – a published paper, preprint, or technical report that describes the system and contains enough detail to allow replication. This must include a clear specification of which resources and datasets were used, as well as architecture and training hyperparameters.</Par>
        <Par>If your paper or preprint is not sufficiently detailed to permit replication, you may not be able to participate in the leaderboard without providing complementary information, either by updating your paper, or through a brief supplementary pdf that simply lists the necessary information missing from the paper.</Par>

        <h4 className="text-lg font-bold text-brand-text mt-8 mb-3">Limits on participation</h4>
        <Par>We want the leaderboard to provide as good a service to the community as possible, but we have limited resources, and being evaluated on the leaderboard is a privilege, not a right. In addition to not evaluating submissions that do not fulfill the above documentation requirements, we reserve the right to filter out submissions that are clearly below the state-of-the-art, as well as duplicates or excessively frequent submissions from the same group.</Par>
        <Par>We typically only evaluate and place on the leaderboard the final proposed system (i.e., no ablations or other system variants) from either an existing publication or an intended publication (work of yours that is yet to be accepted). If you have good reasons why the leaderboard should make an exception in your case, please reach out to us.</Par>

        <h4 className="text-lg font-bold text-brand-text mt-8 mb-3">Anonymity and identification</h4>
        <Par>Leaderboard submissions and associated system descriptions are generally not anonymous. Team names, members, and affiliations will be publicly visible through the leaderboard together with the motion you submitted, your system description, and subjective and objective evaluation results. You agree that once we have evaluated your submission, the results are ours to share and you cannot make us hide, change, or anonymise them.</Par>
        <Par>We encourage using the leaderboard to benchmark new and proposed systems in manuscripts you submit for publication. If obligations due to a peer-review anonymity period require that your identity not be disclosed on the leaderboard, you can apply for time-limited anonymity on the leaderboard. In that case, your submission will temporarily only be identified by an alphanumeric code (later to be de-anonymised). In this case, you must submit both an anonymised and a non-anonymous version of your system description document(s), and we will make the former one available during your period of anonymity. Please contact the organisers if you wish to make an anonymous submission.</Par>

        <SectionTitle icon={<HelpCircle className="w-6 h-6" />}>Final words</SectionTitle>
        <h4 className="text-lg font-bold text-brand-text mb-3">How are these rules enforced?</h4>
        <Par>The leaderboard is designed to advance scientific knowledge, and is not a competition. The point is not to find who does best, but what works best. Therefore, we depend on your honesty in preparing your entry.</Par>
        <Par>If issues with rules compliance are uncovered with submissions to the leaderboard, a publicly visible note describing the issues may be added to your submission. Blatant rules violations and behaviour that goes against the spirit of the leaderboard – for example training on the test data, deliberately misleading system descriptions, or scientific fraud – may result in team members being blacklisted from submitting to the leaderboard.</Par>

        <h4 className="text-lg font-bold text-brand-text mt-8 mb-3">Contact information</h4>
        <Par>Please contact the organisers at <a href="mailto:genea-leaderboard@googlegroups.com" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors">genea-leaderboard@googlegroups.com</a> if you have any questions about these rules.</Par>
      </div>

      {/* Submission Form Section */}
      <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-brand-text" />
          <h2 className="text-3xl font-bold text-brand-text">Submit your system</h2>
        </div>
        <Par>Please fill out the embedded Google Form below to start the submission process. If you cannot see the form, please contact us.</Par>

        <div className="rounded-xl border border-gray-200 shadow-inner overflow-hidden mt-6">
          <iframe
            title="GENEA Leaderboard submission form"
            src={GOOGLE_FORM_EMBED_URL}
            className="w-full"
            height="1200"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
