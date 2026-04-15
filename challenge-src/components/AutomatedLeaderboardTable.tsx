import React from 'react';
import { AutomatedEvaluationEntry } from '../types';

export type AutomatedSortableKeys = 'fgd' | 'ba' | 'srgr' | 'divPose' | 'divSample';

export interface AutomatedSortConfig {
  key: AutomatedSortableKeys;
  direction: 'ascending' | 'descending';
}

interface AutomatedLeaderboardTableProps {
  data: AutomatedEvaluationEntry[];
  requestSort: (key: AutomatedSortableKeys) => void;
  sortConfig: AutomatedSortConfig;
  motionCaptureBA?: number;
  motionCaptureDivPose?: number;
}

const AutomatedLeaderboardTable: React.FC<AutomatedLeaderboardTableProps> = ({ data, requestSort, sortConfig, motionCaptureBA, motionCaptureDivPose }) => {
  const getSortIndicator = (columnKey: AutomatedSortableKeys) => {
    const isSorted = sortConfig.key === columnKey;
    const colorClass = isSorted ? 'text-brand-primary' : 'text-gray-300 group-hover:text-gray-500';

    const iconMap: Record<AutomatedSortableKeys, 'up' | 'down' | 'right'> = {
        fgd: 'down',
        ba: 'right',
        srgr: 'up',
        divPose: 'right',
        divSample: 'up',
    };
    const iconType = iconMap[columnKey];

    if (iconType === 'right') {
      // Proximity is better, so use a right arrow.
      return <svg className={`w-4 h-4 ml-1.5 transition-colors ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" /></svg>;
    }

    if (iconType === 'down') {
      // Lower is better, so use a down arrow.
      return <svg className={`w-4 h-4 ml-1.5 transition-colors ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7l-7 7-7-7" /></svg>;
    }

    // 'up', Higher is better, so use an up arrow.
    return <svg className={`w-4 h-4 ml-1.5 transition-colors ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" /></svg>;
  };

  const tableHeaders: { key: AutomatedSortableKeys; label: string; tooltip: string }[] = [
    { key: 'fgd', label: 'FGD', tooltip: 'Fréchet Gesture Distance (lower is better)' },
    { 
      key: 'ba', 
      label: 'BA', 
      tooltip: motionCaptureBA
        ? `Beat Alignment (closer to Motion capture value of ${motionCaptureBA.toFixed(3)} is better)`
        : 'Beat Alignment (closer to Motion capture is better)'
    },
    { key: 'srgr', label: 'SRGR', tooltip: 'Semantic-relevant Gesture Recall (higher is better)' },
    { 
      key: 'divPose', 
      label: 'Div-Pose', 
      tooltip: motionCaptureDivPose
        ? `Pose Diversity (closer to Motion capture value of ${motionCaptureDivPose.toFixed(3)} is better)`
        : 'Pose Diversity (closer to Motion capture is better)'
    },
    { key: 'divSample', label: 'Div-Sample', tooltip: 'Sample Diversity (higher is better)' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-brand-text sm:pl-6">Rank</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-brand-text">Model</th>
            {tableHeaders.map(({ key, label, tooltip }) => (
              <th key={key} scope="col" className={`px-3 py-3.5 text-left text-sm transition-colors ${sortConfig.key === key ? 'bg-blue-50' : ''}`}>
                <button
                  type="button"
                  onClick={() => requestSort(key)}
                  className={`flex items-center group font-semibold focus:outline-none ${sortConfig.key === key ? 'text-brand-primary' : 'text-brand-text'}`}
                  title={tooltip}
                >
                  {label}
                  {getSortIndicator(key)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-brand-surface">
          {data.map((entry, index) => {
            const isMotionCapture = entry.modelName === 'Motion capture';
            return (
              <tr 
                key={entry.modelName} 
                className={isMotionCapture ? "bg-amber-50/60" : "hover:bg-gray-50 transition-colors duration-200"}
              >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-brand-text sm:pl-6 text-center">
                   {isMotionCapture 
                    ? <svg aria-label="Reference performance" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mx-auto" viewBox="0 0 20 20" fill="currentColor"><title>Reference</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    : index
                  }
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text">
                  <div>
                    <span className="font-bold">{entry.modelName}</span>
                    {entry.venue && entry.year && <span className="ml-2 text-xs text-brand-text-muted">[{entry.venue} {entry.year}]</span>}
                    {isMotionCapture && <span className="ml-2 text-xs font-medium text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full align-middle">REFERENCE</span>}
                  </div>
                  {entry.websiteUrl && (
                    <a
                      href={entry.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-brand-primary hover:underline inline-flex items-center mt-1"
                      aria-label={`Project page for ${entry.modelName}`}
                    >
                      <span>Project Page</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">{entry.fgd.toFixed(3)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">{entry.ba.toFixed(3)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">{entry.srgr.toFixed(3)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">{entry.divPose.toFixed(3)}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-brand-text-muted">{entry.divSample !== null ? entry.divSample.toFixed(3) : 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AutomatedLeaderboardTable;