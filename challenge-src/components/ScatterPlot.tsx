import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
  LabelList,
  ErrorBar,
} from 'recharts';
import { LeaderboardEntry } from '../types';

interface ScatterPlotProps {
  data: LeaderboardEntry[];
  showCI: boolean;
}

const CustomizedLabel: React.FC<any> = (props) => {
  const { x, y, value: modelName } = props;

  if (modelName === undefined || modelName === null) {
    return null;
  }

  const textAnchor: 'start' = 'start';
  let dx = 24;
  let dy = 24;

  switch (modelName) {
    case 'RAG-Gesture':
      dy = 28;
      dx = -81;
      break;
    case 'Semantic Gesticulator':
      dy = 28;
      dx = -130;
      break;
    case 'HoloGest':
      dy = -10;
      break;
    case 'ConvoFusion':
      dy = -10;
      break;
    case 'Seamless':
      dy = -10;
      break;
    case 'Motion capture':
      dy = 30;
      break;
  }

  return (
    <g style={{ pointerEvents: 'none' }}>
      <text x={x} y={y} dx={dx} dy={dy} fill="#4B5563" fontSize={12} textAnchor={textAnchor} fontWeight="bold">
        {modelName}
      </text>
    </g>
  );
};

const CustomizedDot: React.FC<any> = (props) => {
  const { cx, cy, payload } = props;

  if (cx === null || cy === null || !payload) {
    return null;
  }

  const isMotionCapture = payload.modelName === 'Motion capture';
  const dotFillColor = isMotionCapture ? '#f59e0b' : '#2563EB';

  return (
    <circle cx={cx} cy={cy} r={4} fill={dotFillColor} stroke="#fff" strokeWidth={1.5} />
  );
};


const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, showCI }) => {
  const eloDomain = [635, 1200];
  const alignmentDomain = [35, 80];

  // Pre-process data to provide asymmetric error values, which is more robust.
  const processedData = data.map(entry => ({
    ...entry,
    motionRealismEloError: [
      entry.motionRealismElo - entry.motionRealismEloCI[0],
      entry.motionRealismEloCI[1] - entry.motionRealismElo,
    ],
    speechGestureAlignmentPercentageError: [
      entry.speechGestureAlignmentPercentage - entry.speechGestureAlignmentPercentageCI[0],
      entry.speechGestureAlignmentPercentageCI[1] - entry.speechGestureAlignmentPercentage,
    ],
  }));

  return (
    <div style={{ width: '100%', height: 450 }}>
      <ResponsiveContainer>
        <ScatterChart
          margin={{
            top: 40,
            right: 20,
            bottom: 40,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            type="number"
            dataKey="motionRealismElo"
            name="Motion Realism (Elo)"
            domain={eloDomain}
            tick={{ fill: '#6B7280' }}
            stroke="#6B7280"
            xAxisId="motionRealismAxis"
            allowDataOverflow={true}
          >
            <Label value="Motion Realism (Elo)" offset={-30} position="insideBottom" fill="#111827" />
          </XAxis>
          <YAxis
            type="number"
            dataKey="speechGestureAlignmentPercentage"
            name="Speech-Gesture Alignment"
            domain={alignmentDomain}
            tickFormatter={(tick) => `${(tick).toFixed(0)}%`}
            tick={{ fill: '#6B7280' }}
            stroke="#6B7280"
            yAxisId="alignmentAxis"
            allowDataOverflow={true}
          >
            <Label value="Speech-Gesture Alignment (%)" angle={-90} offset={-10} position="insideLeft" style={{ textAnchor: 'middle', fill: '#111827' }} />
          </YAxis>

          <Scatter
            name="Models"
            data={processedData}
            shape={<CustomizedDot />}
            isAnimationActive={false}
            xAxisId="motionRealismAxis"
            yAxisId="alignmentAxis"
          >
            <LabelList dataKey="modelName" content={<CustomizedLabel />} />
            {showCI && (
              <>
                <ErrorBar
                  dataKey="motionRealismEloError"
                  direction="x"
                  strokeWidth={1.5}
                  stroke="#9CA3AF"
                  width={4}
                />
                <ErrorBar
                  dataKey="speechGestureAlignmentPercentageError"
                  direction="y"
                  strokeWidth={1.5}
                  stroke="#9CA3AF"
                  width={4}
                />
              </>
            )}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterPlot;