import React from 'react';
import { LEADERBOARD_DATA, AUTOMATED_EVALUATION_DATA, BASE_PATH, modelCodeRepos } from '../constants';
import ScatterPlot from './ScatterPlot';
import { LeaderboardEntry } from '../types';
import EvaluationCriteria from './EvaluationCriteria';
import AutomatedLeaderboardTable, { AutomatedSortableKeys, AutomatedSortConfig } from './AutomatedLeaderboardTable';
import { Page } from '../App';

type SortableKeys = 'motionRealismElo' | 'speechGestureAlignmentPercentage' | 'combinedRank';

interface SortConfig {
  key: SortableKeys;
  direction: 'ascending' | 'descending';
}

const LeaderboardTable: React.FC<{
  data: LeaderboardEntry[];
  requestSort: (key: SortableKeys) => void;
  sortConfig: SortConfig;
}> = ({ data, requestSort, sortConfig }) => {
  const getSortIndicator = (columnKey: SortableKeys) => {
    const isSorted = sortConfig.key === columnKey;
    const colorClass = isSorted ? 'text-brand-primary' : 'text-gray-300 group-hover:text-gray-500';

    // Higher is always better for human evaluation metrics, so use an up arrow.
    return <svg className={`w-4 h-4 ml-1.5 transition-colors ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" /></svg>;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold transition-colors ${sortConfig.key === 'combinedRank' ? 'bg-blue-50' : ''} sm:pl-6`}>
              <button
                type="button"
                onClick={() => requestSort('combinedRank')}
                className={`flex items-center group font-semibold focus:outline-none ${sortConfig.key === 'combinedRank' ? 'text-brand-primary' : 'text-brand-text'}`}
                title="Sorted by average ranking across the two evaluations. Ties split by speech-gesture alignment rank."
              >
                Rank
                {getSortIndicator('combinedRank')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-text">Model</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-text">Training Dataset</th>
            <th scope="col" className={`px-3 py-3.5 text-left text-sm transition-colors ${sortConfig.key === 'motionRealismElo' ? 'bg-blue-50' : ''}`}>
              <button
                type="button"
                onClick={() => requestSort('motionRealismElo')}
                className={`flex items-center group font-semibold focus:outline-none ${sortConfig.key === 'motionRealismElo' ? 'text-brand-primary' : 'text-brand-text'}`}
              >
                Motion Realism (Elo)
                {getSortIndicator('motionRealismElo')}
              </button>
            </th>
            <th scope="col" className={`px-3 py-3.5 text-left text-sm transition-colors ${sortConfig.key === 'speechGestureAlignmentPercentage' ? 'bg-blue-50' : ''}`}>
              <button
                type="button"
                onClick={() => requestSort('speechGestureAlignmentPercentage')}
                className={`flex items-center group font-semibold focus:outline-none ${sortConfig.key === 'speechGestureAlignmentPercentage' ? 'text-brand-primary' : 'text-brand-text'}`}
              >
                Speech-Gesture Alignment (%)
                {getSortIndicator('speechGestureAlignmentPercentage')}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-brand-surface">
          {data.map((entry, index) => {
            const isMotionCapture = entry.modelName === 'Motion capture';
            const eloRank = data.filter(e => e.modelName !== 'Motion capture' && e.motionRealismElo > entry.motionRealismElo).length + 1;
            const alignmentRank = data.filter(e => e.modelName !== 'Motion capture' && e.speechGestureAlignmentPercentage > entry.speechGestureAlignmentPercentage).length + 1;
            const combinedScoreAvg = (eloRank + alignmentRank) / 2;

            // Calculate combined rank position (1st, 2nd, 3rd, etc.)
            let combinedRankPosition = 1;
            for (const other of data) {
              if (other.modelName === 'Motion capture') continue;

              const otherEloRank = data.filter(e => e.modelName !== 'Motion capture' && e.motionRealismElo > other.motionRealismElo).length + 1;
              const otherAlignmentRank = data.filter(e => e.modelName !== 'Motion capture' && e.speechGestureAlignmentPercentage > other.speechGestureAlignmentPercentage).length + 1;
              const otherCombinedScoreAvg = (otherEloRank + otherAlignmentRank) / 2;

              if (otherCombinedScoreAvg < combinedScoreAvg ||
                (otherCombinedScoreAvg === combinedScoreAvg && other.speechGestureAlignmentPercentage > entry.speechGestureAlignmentPercentage)) {
                combinedRankPosition++;
              }
            }

            return (
              <tr
                key={entry.modelName}
                className={isMotionCapture ? "bg-amber-50/60" : "hover:bg-gray-50 transition-colors duration-200"}
              >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-lg font-bold text-black sm:pl-6 text-center">
                  {isMotionCapture
                    ? <svg aria-label="Reference performance" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mx-auto" viewBox="0 0 20 20" fill="currentColor"><title>Reference</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    : <span className={`${isMotionCapture ? 'text-amber-900' : 'text-black'} font-bold`}>{combinedRankPosition}</span>
                  }
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text">
                  <div>
                    <span className="font-bold">{entry.modelName}</span>
                    {entry.venue && entry.year && <span className="ml-2 text-xs text-brand-text-muted">[{entry.venue} {entry.year}]</span>}
                    {isMotionCapture && <span className="ml-2 text-xs font-medium text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full align-middle">REFERENCE</span>}
                  </div>
                  {modelCodeRepos[entry.modelName] && (
                    <a
                      href={modelCodeRepos[entry.modelName]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-black hover:text-white bg-white hover:bg-black border border-black rounded-md px-2 py-1 inline-flex items-center mt-1 mr-2 transition-colors"
                      aria-label={`Code repository for ${entry.modelName}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.25-.6-.86-1.23-.85-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.39.55 1.04 1.73 1.04 1.48 0 2.14-.91 2.24-1.41.22-1.18 1.63-1.12 1.63-1.12 0 .27.01 1.65.01 1.9 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                      </svg>
                      <span>Code</span>
                    </a>
                  )}
                  {entry.websiteUrl && (
                    <a
                      href={entry.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-black hover:text-white bg-white hover:bg-black border border-black rounded-md px-2 py-1 inline-flex items-center mt-1 mr-2 transition-colors"
                      aria-label={`Project page for ${entry.modelName}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      <span>Project</span>
                    </a>
                  )}
                  {entry.modelName === 'Seamless' && entry.systemDetailsUrl && (
                    <a
                      href={entry.systemDetailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-black hover:text-white bg-white hover:bg-black border border-black rounded-md px-2 py-1 inline-flex items-center mt-1 transition-colors"
                      aria-label={`System details for ${entry.modelName}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      <span>System Details</span>
                    </a>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">
                  <div>
                    {entry.modelName === 'Seamless' ? (
                      <div className="flex items-center gap-1">
                        <a
                          href="https://github.com/facebookresearch/seamless_interaction"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-brand-primary hover:underline inline-flex items-center"
                          aria-label="Seamless Interaction dataset"
                        >
                          <span>Seamless Interaction</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <title>Model evaluated on the BEAT2 dataset in a zero-shot generalisation setting.</title>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ) : (
                      <span>BEAT2</span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">
                  <span className={`${isMotionCapture ? 'text-amber-900' : 'text-brand-text-muted'} font-medium`}>{entry.motionRealismElo}</span>
                  <span className="ml-2 text-xs text-gray-400">[{entry.motionRealismEloCI[0]} - {entry.motionRealismEloCI[1]}]</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">
                  <span className={`${isMotionCapture ? 'text-amber-900' : 'text-brand-text-muted'} font-medium`}>{entry.speechGestureAlignmentPercentage.toFixed(1)}%</span>
                  <span className="ml-2 text-xs text-gray-400">[{entry.speechGestureAlignmentPercentageCI[0].toFixed(1)}% - {entry.speechGestureAlignmentPercentageCI[1].toFixed(1)}%]</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ToggleButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary ${active
      ? 'bg-brand-primary text-white shadow'
      : 'bg-gray-200 text-brand-text-muted hover:bg-gray-300'
      }`}
    aria-pressed={active}
  >
    {children}
  </button>
);

interface LeaderboardProps {
  onNavigate: (page: Page) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onNavigate }) => {
  const [evaluationType, setEvaluationType] = React.useState<'human' | 'automated'>('human');
  const [humanSortConfig, setHumanSortConfig] = React.useState<SortConfig>({ key: 'combinedRank', direction: 'descending' });
  const [automatedSortConfig, setAutomatedSortConfig] = React.useState<AutomatedSortConfig>({ key: 'fgd', direction: 'ascending' });
  const [showCI, setShowCI] = React.useState(true);

  const motionCaptureEntryAutomated = React.useMemo(
    () => AUTOMATED_EVALUATION_DATA.find(e => e.modelName === 'Motion capture'),
    []
  );

  const displayHumanData = React.useMemo(() => {
    let sortableItems = LEADERBOARD_DATA;
    if (humanSortConfig) {
      sortableItems.sort((a, b) => {
        // Always keep Motion Capture at the top
        if (a.modelName === 'Motion capture' && b.modelName !== 'Motion capture') return -1;
        if (a.modelName !== 'Motion capture' && b.modelName === 'Motion capture') return 1;
        
        if (humanSortConfig.key === 'combinedRank') {
          const eloRankA = LEADERBOARD_DATA.filter(e => e.modelName !== 'Motion capture' && e.motionRealismElo > a.motionRealismElo).length + 1;
          const alignmentRankA = LEADERBOARD_DATA.filter(e => e.modelName !== 'Motion capture' && e.speechGestureAlignmentPercentage > a.speechGestureAlignmentPercentage).length + 1;
          const combinedScoreAvgA = (eloRankA + alignmentRankA) / 2;

          const eloRankB = LEADERBOARD_DATA.filter(e => e.modelName !== 'Motion capture' && e.motionRealismElo > b.motionRealismElo).length + 1;
          const alignmentRankB = LEADERBOARD_DATA.filter(e => e.modelName !== 'Motion capture' && e.speechGestureAlignmentPercentage > b.speechGestureAlignmentPercentage).length + 1;
          const combinedScoreAvgB = (eloRankB + alignmentRankB) / 2;

          // Sort by combined score average, with speech-gesture alignment as tiebreaker
          if (combinedScoreAvgA !== combinedScoreAvgB) {
            return humanSortConfig.direction === 'ascending' ? combinedScoreAvgB - combinedScoreAvgA : combinedScoreAvgA - combinedScoreAvgB;
          }
          // Tiebreaker: higher speech-gesture alignment is better
          return b.speechGestureAlignmentPercentage - a.speechGestureAlignmentPercentage;
        }

        if (a[humanSortConfig.key] < b[humanSortConfig.key]) {
          return humanSortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[humanSortConfig.key] > b[humanSortConfig.key]) {
          return humanSortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [humanSortConfig]);

  const displayAutomatedData = React.useMemo(() => {
    let sortableItems = AUTOMATED_EVALUATION_DATA;

    if (automatedSortConfig) {
      sortableItems.sort((a, b) => {
        // Always keep Motion Capture at the top
        if (a.modelName === 'Motion capture' && b.modelName !== 'Motion capture') return -1;
        if (a.modelName !== 'Motion capture' && b.modelName === 'Motion capture') return 1;
        
        if (automatedSortConfig.key === 'ba') {
          return a.ba - b.ba;
        }

        if (automatedSortConfig.key === 'divPose') {
          return a.divPose - b.divPose;
        }

        const valA = a[automatedSortConfig.key];
        const valB = b[automatedSortConfig.key];
        if (valA === null) return 1;
        if (valB === null) return -1;
        if (valA < valB) return automatedSortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return automatedSortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return sortableItems;
  }, [automatedSortConfig]);


  const requestHumanSort = (key: SortableKeys) => {
    setHumanSortConfig({ key, direction: 'descending' });
  };

  const requestAutomatedSort = (key: AutomatedSortableKeys) => {
    const directionMap: Record<AutomatedSortableKeys, 'ascending' | 'descending'> = {
      fgd: 'ascending',
      ba: 'ascending',
      srgr: 'descending',
      divPose: 'ascending',
      divSample: 'descending',
    };
    setAutomatedSortConfig({ key, direction: directionMap[key] });
  };

  const aboutUsPath = `${BASE_PATH || '/'}about-us`;

  return (
    <>
      <div className="mb-12">
        <p className="text-lg text-brand-text-muted max-w-4xl mx-auto text-justify">
          <span className="font-bold text-brand-text">Overview:</span> This community-driven leaderboard ranks recently published 3D gesture-generation models on the BEAT2 dataset using crowdsourced human evaluation. The leaderboard is maintained by the{' '}
          <a
            href={aboutUsPath}
            onClick={(e) => { e.preventDefault(); onNavigate('AboutUs'); }}
            className="font-semibold text-brand-primary hover:underline"
            aria-label="Navigate to about us page"
          >
            GENEA research collaboration
          </a>
          , with recurring evaluations for new submissions every month. We use a disentangled methodology, rooted in previous{' '}
          <a
            href="https://svito-zar.github.io/GENEAchallenge2023/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-primary hover:underline"
          >
            GENEA challenges
          </a>
          , to evaluate generative AI models across two dimensions:
        </p>
      </div>
      <div className="space-y-12">
        <EvaluationCriteria />

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 text-blue-900 px-6 py-4 rounded-lg text-base">
            <p>
              For more details on our methodology and on the importance of standardised evaluation, please read our new preprint: <a href="https://arxiv.org/abs/2511.01233" className="font-semibold text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">"Towards Reliable Human Evaluations in Gesture Generation: Insights from a Community-Driven State-of-the-Art Benchmark"</a>.
            </p>
          </div>
        </div>

        <div className="bg-brand-surface rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-2xl font-bold text-brand-text mb-4 sm:mb-0">Model Rankings on the BEAT2 Dataset</h2>
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <ToggleButton active={evaluationType === 'human'} onClick={() => setEvaluationType('human')}>
                Human Evaluation
              </ToggleButton>
              <ToggleButton active={evaluationType === 'automated'} onClick={() => setEvaluationType('automated')}>
                Automated Evaluation
              </ToggleButton>
            </div>
          </div>
          {evaluationType === 'human' ? (
            <LeaderboardTable data={displayHumanData} requestSort={requestHumanSort} sortConfig={humanSortConfig} />
          ) : (
            <>
              <div className="px-6 pb-4 bg-brand-surface border-b border-gray-200">
                <div className="flex items-start p-3 rounded-md bg-amber-50 border border-amber-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Disclaimer:</span> Automated evaluation metrics are known to be problematic and may not correlate well with human perception. These results are shared for reference purposes only. Please refer to the preprint above for further information on the automated evaluation metrics used.
                  </p>
                </div>
              </div>
              <AutomatedLeaderboardTable
                data={displayAutomatedData}
                requestSort={requestAutomatedSort}
                sortConfig={automatedSortConfig}
                motionCaptureBA={motionCaptureEntryAutomated?.ba}
                motionCaptureDivPose={motionCaptureEntryAutomated?.divPose}
              />
            </>
          )}
        </div>

        {evaluationType === 'human' && (
          <div className="bg-brand-surface p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-brand-text">Overview of Evaluation Results</h2>
              <button
                onClick={() => setShowCI(!showCI)}
                className="ml-4 flex-shrink-0 px-3 py-1.5 text-sm font-medium text-brand-primary bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary"
                aria-pressed={showCI}
              >
                {showCI ? 'Hide' : 'Show'} CI Bars
              </button>
            </div>
            <p className="text-brand-text-muted mb-6">
              A visualisation of our evaluation results, with 95% confidence intervals acquired from bootstrapping. State-of-the-art models are nearing motion-capture quality in terms of visual fidelity, but there remains a large gap in terms of speech-gesture alignment.
            </p>
            <ScatterPlot data={LEADERBOARD_DATA} showCI={showCI} />
          </div>
        )}
      </div>
    </>
  );
};

export default Leaderboard;