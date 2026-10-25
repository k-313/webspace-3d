export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'Planetary Science' | 'Orbital Mechanics' | 'Exploration' | 'Astrophysics';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which planet in our Solar System has the hottest surface temperature, and why?',
    options: [
      'Mercury, because it is closest to the Sun',
      'Venus, due to an extreme runaway greenhouse effect in its dense CO₂ atmosphere',
      'Mars, because its thin atmosphere cannot radiate daytime heat away',
      'Jupiter, because of its internal thermonuclear gravitational contraction',
    ],
    correctIndex: 1,
    explanation: 'Although Mercury is closest to the Sun, Venus is the hottest planet at ~464 °C (867 °F). Its dense carbon dioxide atmosphere (92 times Earth’s surface pressure) traps solar radiation in an extreme runaway greenhouse effect.',
    source: 'NASA Planetary Fact Sheet - Venus',
    difficulty: 'beginner',
    category: 'Planetary Science',
  },
  {
    id: 'q2',
    question: 'Which planet has an average density so low that it would theoretically float in water?',
    options: [
      'Uranus',
      'Mars',
      'Saturn',
      'Neptune',
    ],
    correctIndex: 2,
    explanation: 'Saturn has a mean density of only 0.687 g/cm³, which is lower than the density of pure water (1.00 g/cm³). All other planets in the Solar System have densities greater than water.',
    source: 'NASA Planetary Fact Sheet - Saturn',
    difficulty: 'beginner',
    category: 'Planetary Science',
  },
  {
    id: 'q3',
    question: 'How long does it take for sunlight emitted from the Sun’s photosphere to reach Earth?',
    options: [
      'Instantaneous (0 seconds)',
      'Approximately 8 minutes and 20 seconds',
      'Roughly 1 hour and 15 minutes',
      'Exactly 24 hours',
    ],
    correctIndex: 1,
    explanation: 'At an average distance of 1 Astronomical Unit (~149.6 million km) and the speed of light (299,792 km/s), light takes approximately 499 seconds, or ~8 minutes and 19-20 seconds to reach Earth.',
    source: 'NASA Sun Fact Sheet',
    difficulty: 'beginner',
    category: 'Astrophysics',
  },
  {
    id: 'q4',
    question: 'Which celestial body in the Solar System boasts the highest known planetary volcano and shield mountain?',
    options: [
      'Venus (Maat Mons)',
      'Earth (Mauna Kea)',
      'Mars (Olympus Mons)',
      'Jupiter’s moon Io (Loki Patera)',
    ],
    correctIndex: 2,
    explanation: 'Olympus Mons on Mars is a colossal shield volcano standing ~21.9 km (72,000 ft) high—nearly three times the height of Mount Everest above sea level and spanning the size of the state of Arizona.',
    source: 'NASA Mars Fact Sheet & USGS Astrogeology',
    difficulty: 'intermediate',
    category: 'Planetary Science',
  },
  {
    id: 'q5',
    question: 'According to Kepler’s Third Law of Planetary Motion ($T^2 \\propto a^3$), how does orbital velocity change with distance from the Sun?',
    options: [
      'Planets farther from the Sun travel faster to maintain orbital balance',
      'Orbital speed is constant for all planets regardless of distance',
      'Planets farther from the Sun have lower orbital velocities ($v \\propto 1/\\sqrt{r}$)',
      'Orbital velocity depends solely on planetary mass, not orbital distance',
    ],
    correctIndex: 2,
    explanation: 'Orbital velocity decreases as distance from the Sun increases ($v = \\sqrt{GM/r}$). Mercury moves at ~47.4 km/s, Earth moves at ~29.8 km/s, while distant Neptune travels at only ~5.4 km/s.',
    source: 'JPL Solar System Dynamics / Kepler’s Laws',
    difficulty: 'intermediate',
    category: 'Orbital Mechanics',
  },
  {
    id: 'q6',
    question: 'Why did the International Astronomical Union (IAU) reclassify Pluto as a "Dwarf Planet" in 2006?',
    options: [
      'Pluto lost more than 50% of its mass due to solar wind sublimation',
      'Pluto’s orbit decayed and crossed behind the Kuiper Cliff',
      'Pluto has not cleared the neighborhood around its orbit within the Kuiper Belt',
      'Pluto is smaller than Earth’s Moon and lacks spherical hydrostatic equilibrium',
    ],
    correctIndex: 2,
    explanation: 'Under IAU Resolution 5A, a full planet must orbit the Sun, be in hydrostatic equilibrium (nearly round), and have cleared the neighborhood around its orbit. Pluto shares its orbital zone with thousands of Kuiper Belt objects.',
    source: 'IAU 2006 General Assembly Resolution 5A & 6A',
    difficulty: 'intermediate',
    category: 'Exploration',
  },
  {
    id: 'q7',
    question: 'Which planet exhibits an extreme axial tilt of ~97.8°, essentially orbiting the Sun on its side?',
    options: [
      'Uranus',
      'Neptune',
      'Mercury',
      'Jupiter',
    ],
    correctIndex: 0,
    explanation: 'Uranus has an axial tilt of 97.77°, likely caused by one or more massive protoplanetary collisions during the early Solar System. Its poles point almost directly toward the Sun during solstices.',
    source: 'NASA Planetary Fact Sheet - Uranus',
    difficulty: 'intermediate',
    category: 'Planetary Science',
  },
  {
    id: 'q8',
    question: 'Which planet was the first to be discovered via mathematical prediction before it was ever observed through a telescope?',
    options: [
      'Uranus',
      'Neptune',
      'Pluto',
      'Saturn',
    ],
    correctIndex: 1,
    explanation: 'Unexplained gravitational perturbations in Uranus’s orbit led French mathematician Urbain Le Verrier to calculate the position of an unseen planet. In September 1846, Johann Galle observed Neptune within 1 degree of Le Verrier’s predicted coordinate!',
    source: 'Royal Astronomical Society / NASA Neptune History',
    difficulty: 'advanced',
    category: 'Exploration',
  },
  {
    id: 'q9',
    question: 'What is the physical nature and average thickness of Saturn’s main ring system?',
    options: [
      'A solid metallic disc of nickel-iron, approximately 5 kilometers thick',
      'Dense gaseous hydrogen rings, approximately 1,000 kilometers thick',
      'Billions of water ice particles and boulders, typically only 10 to 30 meters thick',
      'Plasma sheets trapped in Saturn’s magnetic field, 500 meters thick',
    ],
    correctIndex: 2,
    explanation: 'Saturn’s rings are over 99% pure water ice particles ranging in size from micrometers to several meters across. Despite spanning ~282,000 km across, their vertical thickness averages only 10 to 30 meters!',
    source: 'NASA Cassini-Huygens Mission Archive',
    difficulty: 'advanced',
    category: 'Planetary Science',
  },
  {
    id: 'q10',
    question: 'What percentage of the entire Solar System’s total known mass is contained within the Sun alone?',
    options: [
      'About 50.0%',
      'About 75.5%',
      'About 90.2%',
      'About 99.86%',
    ],
    correctIndex: 3,
    explanation: 'The Sun contains ~1.989 × 10³⁰ kg of matter, comprising approximately 99.86% of the entire Solar System’s mass. Jupiter accounts for most of the remaining 0.14%.',
    source: 'NASA Sun Fact Sheet',
    difficulty: 'advanced',
    category: 'Astrophysics',
  },
];
