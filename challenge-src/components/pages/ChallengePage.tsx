import React, { useEffect, useState } from 'react';
import { BASE_PATH } from '../../constants';

const dates = [
  { date: 'April 16, 2026', event: 'Challenge launch' },
  { date: 'June 21, 2026', event: 'Test sequences released' },
  { date: 'June 28, 2026', event: 'Model output submission deadline' },
  { date: 'July 10, 2026', event: 'Evaluation results released' },
  { date: 'July 15, 2026', event: 'Paper submission deadline' },
  { date: 'August 3, 2026', event: 'Author notifications' },
  { date: 'August 8, 2026', event: 'Camera-ready version deadline' },
  { date: 'September 8-9, 2026', event: 'ECCV Workshop in Malmö, Sweden' },
];

const organizers = [
  {
    name: 'Rajmund Nagy',
    imageUrl: `${BASE_PATH}assets/rajmund.png`,
    affiliation: 'KTH Royal Institute of Technology, Sweden',
    link: 'https://nagyrajmund.github.io/',
  },
  {
    name: 'Silvia Arellano García',
    imageUrl: `${BASE_PATH}assets/SilviaArellanoGarcia.png`,
    affiliation: 'KTH Royal Institute of Technology, Sweden',
    link: 'https://silviaarellanogarcia.github.io/',
  },
  {
    name: 'Hendric Voss',
    imageUrl: `${BASE_PATH}assets/hvoss.png`,
    affiliation: 'Bielefeld University, Germany',
    link: 'https://techfak.uni-bielefeld.de/~hvoss/'
  },
  {
    name: 'Mihail Tsakov',
    imageUrl: `${BASE_PATH}assets/mihail.png`,
    affiliation: 'Research Engineer, Netherlands',
    link: 'https://www.liahim.net/',
  },
  {
    name: 'Teodor Nikolov',
    imageUrl: `${BASE_PATH}assets/teodor.jpeg`,
    affiliation: 'motorica.ai, Sweden',
    link: 'https://teonikolov.com',
  },
  {
    name: 'Taras Kucherenko',
    imageUrl: `${BASE_PATH}assets/taras.jpg`,
    affiliation: 'Electronic Arts (EA), Sweden',
    link: 'https://svito-zar.github.io/',
  },
  {
    name: 'Youngwoo Yoon',
    imageUrl: `${BASE_PATH}assets/youngwoo.jpg`,
    affiliation: 'ETRI, South Korea',
    link: 'https://sites.google.com/view/youngwoo-yoon/',
  },
  {
    name: 'Gustav Eje Henter',
    imageUrl: `${BASE_PATH}assets/gustav.jpeg`,
    affiliation: 'KTH Royal Institute of Technology, Sweden',
    link: 'https://people.kth.se/~ghe/',
  },
];

const SectionHeading: React.FC<{
  id?: string;
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  children: React.ReactNode;
}> = ({ id, onNavigate, children }) => (
  <div className="mb-6 group">
    <h2 className="text-2xl font-bold text-brand-text">
      {id ? (
        <a
          href={`#${id}`}
          onClick={onNavigate ? (e) => onNavigate(e, `#${id}`) : undefined}
          className="hover:text-brand-primary transition-colors"
        >
          {children}
          <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-brand-primary">#</span>
        </a>
      ) : children}
    </h2>
    <div className="mt-2 h-0.5 w-12 bg-brand-primary rounded-full" />
  </div>
);

const OrganizerCard: React.FC<typeof organizers[0]> = ({ name, imageUrl, affiliation, link }) => (
  <div className="group text-center bg-white rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-100">
    <div className="p-4">
      <img className="w-28 h-28 sm:w-48 sm:h-48 mx-auto rounded-full object-cover bg-gray-50" src={imageUrl} alt={`Photo of ${name}`} />
    </div>
    <div className="px-5 pb-5">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block text-base font-semibold text-brand-text group-hover:text-brand-primary transition-colors">{name}</a>
      <p className="text-brand-text-muted mt-1 text-xs whitespace-pre-line">{affiliation}</p>
    </div>
  </div>
);

const sectionIds = ['introduction', 'dataset', 'important-dates', 'submission-tracks', 'organising-committee'];

const ChallengePage: React.FC<{ pageNavHeight?: number }> = ({ pageNavHeight = 0 }) => {
  const [isFloating, setIsFloating] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.querySelector('header')?.offsetHeight || 0;
      setIsFloating(window.scrollY > bannerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    const nav = document.querySelector('nav');
    const navHeight = nav?.offsetHeight || 0;

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    if (isFloating) {
      // Both bars are fixed — offset by their combined height
      window.scrollTo({ top: Math.max(0, targetTop - pageNavHeight - navHeight), behavior: 'smooth' });
    } else {
      // Section nav is inline; scrolling past the banner makes it go fixed.
      // Subtract navHeight twice (shift + clearance) plus the always-fixed pageNavHeight.
      window.scrollTo({ top: Math.max(0, targetTop - pageNavHeight - navHeight * 2), behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 text-brand-text-muted leading-relaxed">
      {/* Section Navigation Buttons — only visible when floating */}
      {isFloating && (
        <nav
          className="fixed inset-x-0 z-40 flex w-full justify-start sm:justify-center gap-2 bg-white/80 backdrop-blur-md border-b border-gray-200/60 px-4 py-2 overflow-x-auto scrollbar-hide"
          style={{ top: pageNavHeight }}
        >
          {[
            ['#introduction', 'Introduction'],
            ['#dataset', 'Dataset'],
            ['#important-dates', 'Dates'],
            ['#submission-tracks', 'Submission tracks'],
            ['#organising-committee', 'Organisers'],
          ].map(([href, label]) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full border whitespace-nowrap shrink-0 transition-all duration-200 ${isActive
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'text-brand-text-muted border-gray-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary'
                  }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      )}

      {/* Introduction */}
      <section className="space-y-4 text-justify" id="introduction">
        <SectionHeading id="introduction" onNavigate={handleSmoothScroll}>Introduction</SectionHeading>

        <p>
          Speech-driven 3D gesture generation is a rapidly growing area of research that focuses on animating talking characters in a realistic and engaging manner. This field has significant applications in virtual reality, gaming, human-computer interaction, and social robotics. However, evaluation remains a major bottleneck in research on interactive social avatars: automated metrics do not reliably align with human perception, and human evaluation is both costly and lacks standardisation.
        </p>

        <a
          href="https://arxiv.org/abs/2511.01233"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-5 py-4 hover:border-brand-primary/40 hover:bg-brand-primary/10 transition-all duration-200"
        >
          <p className="text-sm font-semibold text-brand-primary mb-1">Background: GENEA Leaderboard</p>
          <p className="text-sm text-brand-text-muted">Read our CVPR Findings paper on the challenges of evaluating speech-driven 3D gesture generation.</p>
          <p className="text-xs text-brand-text-muted/60 mt-1">arxiv.org/abs/2511.01233</p>
        </a>

        <p>
          The GENEA Challenge 2026 aims to advance the state of the art in this domain by providing standardised, large-scale human evaluation on the recently released Seamless Interaction dataset. By hosting a public challenge, we hope to foster collaboration and innovation in the research community.
        </p>

        <p>
          The challenge is organized as part of the Interactive Social Agents Workshop at ECCV 2026. Authors of accepted submissions will have hte opportunity to present their work at the workshop, and all collected data – including submissions, evaluation results, and human ratings – will be made publicly available after the challenge to support future research in this area.
        </p>
      </section>

      {/* Important Dates */}
      <section id="important-dates">
        <SectionHeading id="important-dates" onNavigate={handleSmoothScroll}>Important Dates</SectionHeading>
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex items-start min-w-max">
            {dates.map(({ date, event }, index) => {
              const lastComma = date.lastIndexOf(',');
              const line1 = lastComma !== -1 ? date.slice(0, lastComma) : date;
              const line2 = lastComma !== -1 ? date.slice(lastComma + 1).trim() : '';
              return (
                <div key={date} className="flex flex-col items-center relative flex-1" style={{ minWidth: 120 }}>
                  {/* Connector line */}
                  {index < dates.length - 1 && (
                    <div className="absolute top-3 left-1/2 w-full h-px bg-gray-200" />
                  )}
                  {/* Circle */}
                  <div className="relative z-10 w-7 h-7 bg-brand-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    {index + 1}
                  </div>
                  {/* Date — fixed height so event text aligns */}
                  <div className="h-9 flex flex-col justify-start items-center mt-2">
                    <p className="text-xs font-semibold text-brand-text text-center leading-tight">{line1}</p>
                    <p className="text-xs text-gray-400 text-center">{line2 || '\u00A0'}</p>
                  </div>
                  {/* Event */}
                  <p className="text-brand-text-muted text-xs text-center leading-tight max-w-[110px]">{event}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dataset */}
      <section id="dataset" className="text-justify">
        <SectionHeading id="dataset" onNavigate={handleSmoothScroll}>Dataset</SectionHeading>
        <p className="mb-6">
          This year's challenge uses the recently released Seamless Interaction dataset, which includes a wide range of features to support research in gesture generation:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[
            ['🎞️', <>Over <span className="font-semibold">4000 hours</span> of dyadic interactions between <span className="font-semibold">4000+ actors</span>.</>],
            ['🦴', <>3D upper body motion in the <span className="font-semibold">SMPL-H format</span>.</>],
            ['🎙️', <><span className="font-semibold">Source-separated audio</span> and time-aligned speech transcripts.</>],
            ['📋', <>Rich metadata about the actors and 1300+ interaction prompts.</>],
          ].map(([emoji, text], i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-white border border-gray-100 px-4 py-3 hover:shadow-md transition-all duration-200">
              <span className="text-lg mt-0.5">{emoji}</span>
              <p className="text-sm text-brand-text-muted">{text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm mb-3">The dataset contains four subsets:</p>
        <div className="space-y-3 mb-6">
          {[
            {
              type: 'Dyadic conversations',
              desc: <>Free-form (natural) and improvised (acted) conversations between two people on diverse topics.</>,
              hours: '3.4k hrs', participants: '4k participants', interactions: '53k interactions',
            },
            {
              type: 'Grounded gestures',
              desc: <>One participant acts out a scripted sentence, emphasising a selected keyword, and the other person improvises a natural response.
                <span className="block mt-1.5 text-xs text-gray-400 italic">
                  <span className="font-semibold not-italic text-gray-500">A:</span> The athlete is <em className="font-semibold not-italic">strong</em> and muscular.{' '}
                  <span className="font-semibold not-italic text-gray-500">B:</span> They must work out a lot!
                </span>
              </>,
              hours: '379 hrs', participants: '3.7k participants', interactions: '6.4k interactions',
            },
            {
              type: 'Collaborative story-telling',
              desc: <>Pairs take turns weaving an improvised, fictional story, saying one or two sentences at a time.</>,
              hours: '147 hrs', participants: '3.1k participants', interactions: '2.8k interactions',
            },
            {
              type: 'Silent Charades',
              desc: <>One participant acts out an expression silently, using only gestures, and the other participant improvises a silent response, also using only gestures.
                <span className="block mt-1.5 text-xs text-gray-400 italic">
                  <span className="font-semibold not-italic text-gray-500">A</span> <span className="text-gray-400">(expression: &quot;shake fists&quot;)</span>: Shakes fists in anger.{' '}
                  <span className="font-semibold not-italic text-gray-500">B:</span> Raises hands up in defence, as if saying &quot;stop&quot;.
                </span>
              </>,
              hours: '75 hrs', participants: '1.9k participants', interactions: '1.6k interactions',
            },
          ].map(({ type, desc, hours, participants, interactions }, index) => (
            <div key={type} className="grid grid-cols-[180px_1fr] sm:grid-cols-[400px_1fr] gap-x-4 items-start rounded-xl bg-white border border-gray-100 px-4 py-3 hover:shadow-md transition-all duration-200">
              <div>
                <span className="block text-sm font-semibold text-brand-text">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-primary text-white text-xs font-bold mr-1.5 align-text-bottom">{index + 1}</span>
                  {type}
                </span>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  <span className="inline-block text-xs font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">{hours}</span>
                  <span className="inline-block text-xs font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">{participants}</span>
                  <span className="inline-block text-xs font-medium text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">{interactions}</span>
                </div>
              </div>
              <span className="text-sm text-brand-text-muted pt-0.5">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold">
          To download the dataset and learn more, visit the official <a href="https://github.com/facebookresearch/seamless_interaction" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Seamless Interaction repository</a>.
        </p>
      </section>

      {/* Tasks */}
      <section id="tasks" className="text-justify">
        <SectionHeading id="tasks" onNavigate={handleSmoothScroll}>Challenge task</SectionHeading>
        <p className="mb-6">
          Your goal is to develop a 3D gesture-generation model that can produce sequences of 3D upper-body gestures using any of the inputs available in the Seamless Interaction dataset. You can choose to use any combination of the following input modalities:
        </p>

        <div className="py-4 sm:py-6 mb-5">
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-5 sm:gap-6 md:gap-8">

            {/* --- INPUTS --- */}
            <div className="w-full md:w-80 flex flex-col gap-3">
              <p className="text-sm font-bold text-brand-primary uppercase tracking-wider text-center">Inputs</p>

              {/* Character A */}
              <div className="rounded-xl border-2 border-brand-primary/20 bg-brand-primary/5 p-4">
                <p className="font-bold text-brand-text mb-2.5">Character A</p>
                <ul className="space-y-2 text-sm text-brand-text">
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                    Speech audio sequence <span className="text-brand-primary/60 text-[11px] ml-auto font-mono font-semibold">.wav</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                    Speech transcript with word-level timestamps <span className="text-brand-primary/60 text-[11px] ml-auto font-mono font-semibold">.jsonl</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                    Voice activity sequence <span className="text-brand-primary/60 text-[11px] ml-auto font-mono font-semibold">.json</span>
                  </li>
                </ul>
              </div>

              {/* Character B */}
              <div className="rounded-xl border-2 border-brand-secondary/20 bg-brand-secondary/5 p-4">
                <p className="font-bold text-brand-text mb-2.5">Character B</p>
                <ul className="space-y-2 text-sm text-brand-text">
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary shrink-0" />
                    Speech audio sequence <span className="text-brand-secondary/60 text-[11px] ml-auto font-mono font-semibold">.wav</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary shrink-0" />
                    Speech transcript with word-level timestamps <span className="text-brand-secondary/60 text-[11px] ml-auto font-mono font-semibold">.jsonl</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary shrink-0" />
                    3D motion sequence <span className="text-brand-secondary/60 text-[11px] ml-auto font-mono font-semibold">.npz</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary shrink-0" />
                    Voice activity sequence <span className="text-brand-secondary/60 text-[11px] ml-auto font-mono font-semibold">.json</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* --- ARROW 1 --- */}
            <div className="flex items-center justify-center py-1 md:py-0">
              <svg className="w-8 h-8 text-brand-primary/40 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* --- SYSTEM MODEL --- */}
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border-[3px] border-dashed border-gray-300 px-8 py-12 sm:px-10 sm:py-16 text-center">
                <p className="text-base font-bold text-gray-400 uppercase tracking-wider">Your<br />system</p>
              </div>
            </div>

            {/* --- ARROW 2 --- */}
            <div className="flex items-center justify-center py-1 md:py-0">
              <svg className="w-8 h-8 text-brand-success/50 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* --- OUTPUT --- */}
            <div className="w-full md:w-64 flex flex-col gap-3 justify-center">
              <p className="text-sm font-bold text-brand-success uppercase tracking-wider text-center">Output</p>

              <div className="rounded-xl border-2 border-brand-primary/20 bg-brand-primary/5 p-4">
                <p className="font-bold text-brand-text mb-2.5">Character A</p>
                <ul className="text-sm text-brand-text">
                  <li className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                    3D upper-body motion sequence
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <p className="mb-4">
          You will be evaluated on your model's ability to generate natural and engaging gestures that align with the provided speech input. The evaluation will be based on a combination of automated metrics and human judgments, with a particular focus on how well the generated gestures match human perception.
        </p>
      </section>

      <section id="submission-tracks" className="text-justify">
        <SectionHeading id="submission-tracks" onNavigate={handleSmoothScroll}>Submission tracks</SectionHeading>
        <p className="mb-6">
          We will have three submission tracks:
        </p>
        <div className="flex flex-col gap-4 mb-6">
          {[
            { track: 'Track 1', color: 'text-brand-primary bg-brand-primary/10', title: 'ECCV Workshop Submission', format: '8-page submission, double-blind review, published in ECCV Workshop Proceedings.', desc: 'Intended for new systems or significant extensions of previously published systems.' },
            { track: 'Track 2', color: 'text-brand-secondary bg-brand-secondary/10', title: 'Extended Abstracts', format: '4-page submission, double-blind review, non-archival', desc: 'For systems not yet ready for a full paper, enabling rapid dissemination of preliminary results and broader participation.' },
            { track: 'Track 3', color: 'text-brand-text-muted bg-gray-100', title: 'Published Papers', format: 'System description form', desc: 'For systems already published in a peer-reviewed venue, submitted for evaluation and comparison with other methods.' },
          ].map(({ track, color, title, format, desc }) => (
            <div key={track} className="relative rounded-xl border border-gray-100 bg-white p-6 hover:shadow-md transition-all duration-200">
              <span className={`inline-block px-2.5 py-0.5 text-xs font-medium ${color} rounded-full mb-3`}>{track}</span>
              <h3 className="text-base font-bold text-brand-text mb-1.5">{title}</h3>
              <p className="text-xs text-brand-text-muted mb-2">{format}</p>
              <p className="text-sm text-brand-text-muted">{desc}</p>
            </div>
          ))}
        </div>
        <p>
          Participants can submit to one or more tracks, and will receive separate evaluations for each track. The different tracks allow us to evaluate the impact of different input modalities on gesture generation performance.
        </p>
      </section>

      {/* Organising Committee */}
      <section id="organising-committee">
        <SectionHeading id="organising-committee" onNavigate={handleSmoothScroll}>Organising committee</SectionHeading>
        <p className="mb-6">
          Questions about the challenge can be sent to{' '}
          <a href="mailto:genea-leaderboard@googlegroups.com" className="font-semibold text-brand-primary hover:underline">
            genea-leaderboard@googlegroups.com
          </a>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {organizers.map((organizer) => (
            <OrganizerCard key={organizer.name} {...organizer} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default ChallengePage;
