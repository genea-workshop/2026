import React from 'react';
import { useState } from 'react';
import { BASE_PATH } from '../../constants';
import { Clock, Film, PersonStanding, ThumbsUp, Code, BarChart3 } from 'lucide-react';

const dataReleases = [
  {
    title: 'Evaluation segment timestamps',
    icon: Clock,
    description: 'Timestamps for the 108 evaluation segments used in our evaluation, manually selected to be free of major motion-capture artifacts. Each segment is a full phrase with durations ranging between 7.7 and 12 seconds.',
    uses: 'Independent evaluations that benefit from a standardised evaluation set.',
    isReleased: true,
  },
  {
    title: 'Rendered evaluation videos',
    icon: Film,
    description: 'All user-study videos used to in the leaderboard evaluation.',
    uses: 'Independent evaluation of new gesture-generation models, without having to reproduce baselines. Testing the effects of isolated evaluation design choices, or perhaps a completely new methodology.',
    isReleased: true,
  },
  {
    title: 'SMPL-X motion files',
    icon: PersonStanding,
    description: 'Test-set motion for the BEAT-2 dataset, as well as 5 hours of generated motion for all evaluated models, in the standardised SMPL-X format.',
    uses: 'Acquiring new visualisations (e.g., on a different character model), or training motion representations with synthetic data. Comparison to the state of the art without having to reproduce baselines.',
    isReleased: true,
  },
  {
    title: 'Human preference votes',
    icon: ThumbsUp,
    description: '20 000 crowdsourced human preference votes collected in our evaluation thus far.',
    uses: 'Developing a new automated metric, or fine-tuning a generative model using, e.g., reinforcement learning from human feedback (RLHF).',
    isReleased: true,
  },
  {
    title: 'Code for objective evaluations',
    icon: Code,
    description: 'Python scripts for calculating objective metrics for model outputs.',
    uses: 'Calculate objective metrics on the results that your model outputs on the test data we provide. Reproduce what has been computed for the leaderboard.',
    isReleased: true,
  },
  // {
  //   title: 'Code for conducting a user study',
  //   description: 'We will release the code for conducting your own user studies on Prolific.',
  //   uses: 'If you wish to fund your own user study to meet an internal deadline versus the evaluation deadlines imposed by the leaderboard.',
  //   isReleased: false,
  // },
  {
    title: 'Code for statistical analysis',
    icon: BarChart3,
    description: 'Code that lets you perform statistical analysis on the subjective results from user studies in order to obtain Elo and mismatching scores.',
    uses: 'Reproduce the subjective analysis that has been performed for the leaderboard evaluations, or conduct a subjective analysis of your own user study results.',
    isReleased: true,
  },
];


const DataReleasePage: React.FC = () => {
  const bibtex = `@misc{nagy2025gesture,
      title={Towards Reliable Human Evaluations in Gesture Generation: Insights from a Community-Driven State-of-the-Art Benchmark}, 
      author={Rajmund Nagy and Hendric Voss and Thanh Hoang-Minh and Mihail Tsakov and Teodor Nikolov and Zeyi Zhang and Tenglong Ao and Sicheng Yang and Shaoli Huang and Yongkang Cheng and M. Hamza Mughal and Rishabh Dabral and Kiran Chhatre and Christian Theobalt and Libin Liu and Stefan Kopp and Rachel McDonnell and Michael Neff and Taras Kucherenko and Youngwoo Yoon and Gustav Eje Henter},
      year={2025},
      eprint={2511.01233},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2511.01233}, 
}`;

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy BibTeX:', e);
    }
  };
  return (
    <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-brand-text mb-4">Data Release</h2>
      <div className="space-y-4 text-brand-text-muted mb-8">
        <p>
          We believe in transparent and reproducible research. Full details on the metrics, user study design, and data processing are described in our preprint.
        </p>
        <p>
          To support open research on gesture generation, we release the following data from the GENEA Leaderboard:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataReleases.map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-brand-bg rounded-lg mr-3">
                  <item.icon className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-lg font-bold text-brand-text">{item.title}</h3>
              </div>

              {/* Action/Status Area */}
              <div>
                {!item.isReleased ? (
                  <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ml-2">
                    {item.releaseDateText || 'Coming in December'}
                  </span>
                ) : (
                  <>
                    {item.title === 'Evaluation segment timestamps' && (
                      <a
                        href={`${BASE_PATH}assets/evaluation_segment_timestamps.csv`}
                        download="evaluation_segment_timestamps.csv"
                        className="inline-flex items-center text-sm font-semibold text-brand-primary hover:underline whitespace-nowrap ml-2"
                        aria-label="Download CSV file"
                      >
                        <span>Download CSV</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {item.title === 'Rendered evaluation videos' && (
                      <a
                        href="https://drive.google.com/drive/folders/1fnCOaUyvpfId6UfF8gVafwoB_fCH_AxK"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-brand-primary hover:underline whitespace-nowrap ml-2"
                        aria-label="View rendered evaluation videos on Google Drive"
                      >
                        <span>View on Drive</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    )}
                    {item.title === 'SMPL-X motion files' && (
                      <a
                        href="https://drive.google.com/drive/folders/1VWdsbYTGt2CsDp6Wg1aJ6gowby6s60Dw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-brand-primary hover:underline whitespace-nowrap ml-2"
                        aria-label="View SMPL-X motion files on Google Drive"
                      >
                        <span>View on Drive</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    )}
                    {item.title === 'Human preference votes' && (
                      <a
                        href="https://drive.google.com/drive/folders/1OEnzlQIQo-5HHw6w5WYcDLT96Td2GYQx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-brand-primary hover:underline whitespace-nowrap ml-2"
                        aria-label="View human preference votes on Google Drive"
                      >
                        <span>View on Drive</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    )}
                    {item.title === 'Code for objective evaluations' && (
                      <a
                        href="https://github.com/GENEALeaderboard/objective_metric"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-brand-primary hover:underline whitespace-nowrap ml-2"
                        aria-label="View objective metric code on GitHub"
                      >
                        <span>View on GitHub</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    {item.title === 'Code for statistical analysis' && (
                      <a
                        href="https://github.com/genea-workshop/leaderboard-statistical-analysis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-brand-primary hover:underline whitespace-nowrap ml-2"
                        aria-label="View objective metric code on GitHub"
                      >
                        <span>View on GitHub</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>

            <p className="text-brand-text-muted mb-4 flex-grow">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Citation section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-brand-text mb-4">Citation</h3>
        <p className="mb-4">
          If you use our data, evaluation protocol, or results, please cite <a href="https://arxiv.org/abs/2511.01233" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-primary hover:underline">our arXiv preprint</a>:
        </p>
        <div className="relative">
          <pre className="whitespace-pre-wrap break-words bg-white text-xs md:text-sm text-gray-800 p-4 rounded-md border border-gray-300 overflow-x-auto">
            {bibtex}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 text-xs font-semibold rounded-md bg-brand-primary text-white hover:bg-blue-700 transition-colors focus:outline-none"
            aria-label="Copy BibTeX to clipboard"
            title="Copy BibTeX"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataReleasePage;
