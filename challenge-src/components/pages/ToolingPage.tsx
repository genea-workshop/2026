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
                <h2 className="text-3xl font-bold text-brand-text mb-8">Visualization Tooling</h2>
                <div className="space-y-8">
                    <ToolCard
                        title="Blender rendering script"
                        link="https://github.com/TeoNikolov/genea_visualizer/tree/dev-2025"
                        imageUrl="/leaderboard/assets/blender.png"
                        description={[
                            "This is an easy-to-use blender rendering script used to create our user-study videos."
                        ]}
                    />
                    <ToolCard
                        title="BVHView GENEA fork"
                        link="https://genea-workshop.github.io/leaderboard/BVHView/bvhview.html"
                        imageUrl="/leaderboard/assets/bvhview.png"
                        description={[
                            "BVHView is an open-source WebGL-based motion visualization tool designed to display motion capture data stored in BVH (Biovision Hierarchy) format. It allows users to load, inspect, and analyze skeletal animations directly in the browser, making it useful for researchers, animators, and developers working with motion data, gesture generation, or character animation systems."
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ToolingPage;