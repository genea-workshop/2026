import React from 'react';

const organizers = [
  {
    name: 'Youngwoo Yoon',
    imageUrl: '/leaderboard/assets/youngwoo.jpg',
    role: 'Principal Researcher',
    affiliation: 'ETRI, South Korea',
    link: 'https://youngwoo-yoon.github.io/',
  },
  {
    name: 'Taras Kucherenko',
    imageUrl: '/leaderboard/assets/taras.jpg',
    role: 'Research Scientist',
    affiliation: 'Electronic Arts - SEED, Sweden',
    link: 'https://svito-zar.github.io/',
  },
  {
    name: 'Gustav Eje Henter',
    imageUrl: '/leaderboard/assets/gustav.jpeg',
    role: 'Assistant Professor',
    affiliation: 'KTH Royal Institute of Technology\nHead of Research motorica.ai, Sweden',
    link: 'https://people.kth.se/~ghe/',
  },
  {
    name: 'Rajmund Nagy',
    imageUrl: '/leaderboard/assets/rajmund.png',
    role: 'Doctoral Student',
    affiliation: 'KTH Royal Institute of Technology\nSweden',
    link: 'https://nagyrajmund.github.io/',
  },
  {
    name: 'Hendric Voß',
    imageUrl: '/leaderboard/assets/hendric.jpg',
    role: 'Doctoral Student',
    affiliation: 'Bielefeld University, Germany',
    link: 'https://techfak.uni-bielefeld.de/~hvoss/',
  },
  {
    name: 'Thanh Hoang-Minh',
    imageUrl: '/leaderboard/assets/thanh.png',
    role: 'MSc Student',
    affiliation: 'VNUHCM - University of Science, Vietnam',
    link: 'https://hmthanh.github.io/',
  },
  {
    name: 'Teodor Nikolov',
    imageUrl: '/leaderboard/assets/teodor.jpeg',
    role: 'Research Engineer',
    affiliation: 'motorica.ai, Sweden',
    link: 'https://www.teonikolov.com/',
  },
  {
    name: 'Mihail Tsakov',
    imageUrl: '/leaderboard/assets/mihail.png',
    role: 'Unreal Engine Developer',
    affiliation: 'Liahim, Netherlands',
    link: 'https://www.linkedin.com/in/mihailtsakov/',
  },
];

const advisors = [
  {
    name: 'Rachel McDonnell',
    imageUrl: '/leaderboard/assets/rachel.jpg',
    role: 'Professor in Creative Technologies',
    affiliation: 'Trinity College Dublin, Ireland',
    link: 'https://www.scss.tcd.ie/rachel.mcdonnell/',
  },
  {
    name: 'Michael Neff',
    imageUrl: '/leaderboard/assets/michael.jpg',
    role: 'Professor of Computer Science and Cinema & Digital Media',
    affiliation: 'University of California, Davis, USA',
    link: 'https://www.cs.ucdavis.edu/~neff/',
  },
  {
    name: 'Stefan Kopp',
    imageUrl: '/leaderboard/assets/stefan.jpeg',
    role: 'Professor of Cognitive and Socially Interactive Systems',
    affiliation: 'Bielefeld University, Germany',
    link: 'https://www.techfak.uni-bielefeld.de/~skopp/',
  },
]

const OrganizerCard: React.FC<typeof organizers[0]> = ({ name, imageUrl, role, affiliation, link }) => (
  <div className="text-center bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
    <div className="p-4">
      <img className="w-48 h-48 mx-auto rounded-lg object-cover" src={imageUrl} alt={`Photo of ${name}`} />
    </div>
    <div className="px-6 pb-6">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block text-lg font-semibold text-brand-primary hover:underline">{name}</a>
      <p className="text-brand-text-muted mt-1 text-sm whitespace-pre-line">{role}</p>
      <p className="text-gray-500 mt-1 text-sm whitespace-pre-line">{affiliation}</p>
    </div>
  </div>
);

const AboutUsPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-brand-text mb-6">Who are we?</h2>
        <div className="space-y-4 text-brand-text-muted leading-relaxed">
          <p>
           The GENEA team includes <span className="font-semibold text-brand-text">leading experts on the evaluation of gesture-generation models</span>, as well as <span className="font-semibold text-brand-text">experienced model developers</span> and <span className="font-semibold text-brand-text">research engineers</span> with experience in deploying gesture-generation models. Together, we are developing the leaderboard and its associated tooling, and we will be responsible for managing and funding year-round crowdsourced human evaluations.
          </p>
          <p>
            Our cumulative experience covers <span className="font-semibold text-brand-text">all major aspects of gesture-generation research</span>, including:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <span className="font-semibold text-brand-text">crowdsourced evaluation:</span> e.g., organising the GENEA Challenges in 2020-2024 (the leading large-scale human evaluation efforts in gesture generation to date!)
            </li>
            <li>
              <span className="font-semibold text-brand-text">data collection:</span> e.g., TED Gesture dataset
            </li>
            <li>
              <span className="font-semibold text-brand-text">model development:</span> e.g., Gesticulator (ICMI 2020 Best paper), Gesture Generation from Trimodal Context (SIGGRAPH Asia 2020), StyleGestures (EUROGRAPHICS 2020 Honourable mention), Listen, Denoise, Action! (SIGGRAPH 2023), AQ-GT (ICMI 2023 Best paper)
            </li>
            <li>
              <span className="font-semibold text-brand-text">visualisation tooling:</span> e.g., Blender, Maya, and Unreal Engine development
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-brand-text mb-8 text-center">Organisers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {organizers.map((organizer) => (
            <OrganizerCard key={organizer.name} {...organizer} />
          ))}
        </div>
      </div>

      <div className="bg-brand-surface p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-brand-text mb-8 text-center">Scientific Advisors</h2>
        <p>While the organising team handles day-to-day operations, we are fortunate to be advised in key strategic decisions and the leaderboard methodology by three leading experts of nonverbal communication, visual perception, human-agent interaction, and motion capture:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {advisors.map((advisor) => (
            <OrganizerCard key={advisor.name} {...advisor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;