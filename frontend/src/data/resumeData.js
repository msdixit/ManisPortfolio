// ─── Single source of truth — update here to reflect everywhere ───

export const profile = {
  name: 'Manisankar Dixit',
  titles: ['Senior .NET Engineer', 'GIS & Microservices Expert', 'React & ArcGIS Developer'],
  tagline: 'Open to Opportunities · Singapore',
  summary: [
    'Senior .NET Software Engineer with 9+ years of experience building scalable, data-intensive web, GIS-based, and microservices applications. Specialising in .NET Core, React, ArcGIS, and enterprise-grade RESTful architectures.',
    'Experienced in managing SDLC artifacts, CI/CD pipelines, automated workflows integrating multiple APIs and databases, and scalable schema design using MS SQL Server and Oracle.',
    'Proven track record of converting business requirements into technical user stories, leading UAT cycles, mentoring junior engineers, and delivering high-impact features on schedule.',
  ],
  location: 'Singapore',
  email: 'manisankardixit@gmail.com',
  phones: ['+65 87130407', '+91 8455955050'],
  social: {
    linkedin: 'https://linkedin.com/in/manisankar-dixit-b2b849193',
    github:   'https://github.com/msdixit',
    hackerrank: 'https://hackerrank.com/manisankardixit',
    medium:   'https://medium.com/@manisankardixit',
  },
  resume: '/Manisankar_Dixit_Resume.pdf',
};

export const stats = [
  { value: '9+',   label: 'Years Experience' },
  { value: '5+',   label: 'Enterprise Projects' },
  { value: '95%+', label: 'UAT Pass Rate' },
  { value: '27+',  label: 'Production Bugs Resolved' },
];

export const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Maventree Pte Ltd',
    period: 'Jul 2025 – Present',
    location: 'Singapore',
    projects: [
      {
        name: '🗺 INPAC — GIS & Workflow Management Platform',
        bullets: [
          'Designed Checklist & Template modules using .NET Core and React, improving workflow efficiency via automated API-driven processing.',
          'Created scalable MS SQL Server schemas, stored procedures, and T-SQL functions for complex spatial data lifecycles.',
          'Resolved 27+ critical production bugs within SLA, improving system stability and user experience.',
          'Collaborated with stakeholders to convert requirements into user stories; maintained GitHub branching hygiene and SDLC artifacts.',
        ],
      },
    ],
  },
  {
    role: 'Consultant',
    company: 'Deloitte',
    period: 'Mar 2021 – Apr 2025',
    location: '4 Years',
    projects: [
      {
        name: '🏛 One Oregon Portal & Mobile',
        bullets: [
          'Built Nudge framework surfacing asset info via a map-driven UI using ArcGIS JS, C#, MVC, .NET Core Web API, React Native & SQL Server.',
          'Led 5 of 15 major Change Requests as SME; automated permit-processing workflows integrating multiple REST APIs and databases.',
          'Managed SDLC artifacts across CI/CD pipelines in Harness & GitHub; achieved >95% Selenium regression pass rate across SIT/UAT.',
        ],
      },
      {
        name: '💳 Digital Wallet & AIM Compliance',
        bullets: [
          'Built microservices backend & Bootstrap frontend for a React JS + .NET Core digital wallet; presented PoC to senior management.',
          'Delivered 4 work items across 4 web apps; achieved 98% SIT/UAT pass rate; deployed one solution on AWS with CI/CD configuration.',
        ],
      },
    ],
  },
  {
    role: 'Senior Engineer',
    company: 'Tata Elxsi',
    period: 'Jul 2020 – Feb 2021',
    location: '',
    projects: [
      {
        name: '🚗 NXT 9100 Indigo Connectivity',
        bullets: [
          'Led team developing C# & C++ solutions for Win CE device communication across varying hardware dashboards.',
          'Developed a software installer and offline map utility; created scalable data processing modules for device configuration variants.',
          'Managed GitHub repo hygiene, PR reviews, SDLC artifacts, and mentored junior team members.',
        ],
      },
    ],
  },
  {
    role: 'Software Developer',
    company: 'SPARC Pvt Ltd',
    period: 'Jan 2017 – Jun 2020',
    location: '3.5 Years',
    projects: [
      {
        name: '🌳 Web GIS — Forest Land Geo-referencing, Odisha',
        bullets: [
          'Built Govt of Odisha Forest Dept web app for mapping & managing forest data; designed Enterprise SQL geodatabase schemas.',
          'Developed RESTful Web APIs with .NET MVC and a mobile data-collection app; deployed on-site with client support.',
        ],
      },
      {
        name: '🚌 Odisha Permit Management System',
        bullets: [
          'Delivered permit platform for 35 RTAs, 1 STA & 8,000+ bus operators; built 5 permit modules with .NET MVC & MS SQL Server.',
          'Automated permit routing workflows integrating multiple backend APIs; built and deployed a public-facing mobile application.',
        ],
      },
    ],
  },
];

export const skillGroups = [
  { label: 'Languages',             icon: 'Code',          skills: ['C#', 'Java', 'C++'] },
  { label: 'Frontend',              icon: 'DesktopMac',    skills: ['React JS', 'TypeScript', 'Angular', 'JavaScript', 'Bootstrap', 'HTML / CSS', '.NET MVC'] },
  { label: 'Services / Backend',    icon: 'Storage',       skills: ['.NET Core', 'ASP.NET Core Web API', 'Microservices', 'Entity Framework', 'RESTful API'] },
  { label: 'Database',              icon: 'DataObject',    skills: ['MS SQL Server', 'T-SQL', 'Oracle', 'SSMS', 'ArcGIS Geodatabase'] },
  { label: 'DevOps & CI/CD',        icon: 'Loop',          skills: ['GitHub', 'Harness', 'CI/CD Pipelines', 'Docker', 'OpenShift', 'AWS'] },
  { label: 'Testing & Automation',  icon: 'Science',       skills: ['Selenium', 'Unit Testing', 'SIT / UAT', 'Integration Testing'] },
  { label: 'GIS',                   icon: 'Map',           skills: ['ArcGIS Server', 'ArcGIS JS API', 'ArcGIS Portal', 'ArcPy'] },
  { label: 'Mobile',                icon: 'PhoneAndroid',  skills: ['React Native', 'Android'] },
  { label: 'AI & Prompt Engineering', icon: 'Psychology',  skills: ['Prompt Engineering', 'Generative AI', 'ChatGPT'] },
  { label: 'Tools',                 icon: 'Build',         skills: ['Git', 'Jira', 'Visual Studio', 'VS Code', 'SSMS'] },
];

export const certifications = [
  { icon: '🤖', name: 'Generative AI Fluency',       issuer: 'Deloitte AI Academy' },
  { icon: '💬', name: 'Prompt Engineering with ChatGPT', issuer: 'Online Certification' },
  { icon: '📈', name: 'AI for Business Leaders',     issuer: 'Online Certification' },
  { icon: '🧠', name: 'Introduction to Generative AI', issuer: 'Online Certification' },
  { icon: '⚡', name: 'Angular 11',                  issuer: 'Online Certification' },
];

export const accomplishments = [
  { icon: '👏', title: 'Applause Award',                 desc: 'Recognised for leading the mobile application delivery with exceptional impact at Deloitte.' },
  { icon: '⭐', title: 'Spot Award',                     desc: 'Awarded for successfully implementing multiple critical Change Requests ahead of schedule.' },
  { icon: '🏆', title: 'Two-time ISTE National Award',   desc: 'Dual winner of the Indian Society for Technical Education National Award for academic excellence.' },
  { icon: '🥇', title: 'National Award — Paper Presentation', desc: 'National level winner in Paper Presentation, demonstrating deep technical research acumen.' },
];

export const education = {
  degree: 'B.Tech in Computer Science & Engineering',
  institution: 'Ajay Binay Institute of Technology',
  year: '2016',
};
