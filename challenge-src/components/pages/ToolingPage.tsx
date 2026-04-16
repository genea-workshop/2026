import React from 'react';

const ToolCard: React.FC<{
    title: string;
    description: string[];
    imageUrl: string;
    link: string;
}> = ({ title, description, imageUrl, link }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <div className="prose max-w-none">
                    <h3 className="text-2xl font-bold mb-4">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline transition-colors">
                            {title}
                        </a>
                    </h3>
                    {description.map((p, i) => <p key={i} className="text-brand-text-muted">{p}</p>)}
                </div>
                {/* Image */}
                <div className="flex justify-center items-center">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        <img src={imageUrl} alt={`${title} screenshot`} className="rounded-lg shadow-lg border border-gray-200 object-contain w-full h-auto" />
                    </a>
                </div>
            </div>
        </div>
    );
}


const ToolingPage: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-brand-text mb-8">Dataset Tooling</h2>
                <div className="space-y-8">
                    <ToolCard
                        title="Feature filtering for dataset download"
                        link="https://github.com/nagyrajmund/seamless_interaction/commit/c03679063d3bd52733a2d6cf84b96a146a36eae8"
                        imageUrl="/2026/challenge/assets/banner.gif"
                        description={[
                            "The Seamless Interaction dataset is large and contains many features that may not be necessary for all participants. This commit introduces a feature filtering mechanism for storing only certain features of the dataset."
                        ]}
                    />
                </div>
            </div>
            <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-brand-text mb-8">Visualization Tooling</h2>
                <div className="space-y-8">
                    <ToolCard
                        title="Python visualiser for video rendering"
                        link="https://github.com/genea-workshop/seamless_visualizer"
                        imageUrl="/2026/challenge/assets/silvia_visualiser.png"
                        description={[
                            "This is an easy-to-use python rendering script using pyrender."
                        ]}
                    />
                    <ToolCard
                        title="Online real-time visualiser"
                        link="https://huggingface.co/spaces/nagyrajmund/genea-visualizer"
                        imageUrl="/2026/challenge/assets/hf_visualizer.png"
                        description={[
                            "A drag-and-drop online visualiser hosted on Huggingface spaces."
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ToolingPage;