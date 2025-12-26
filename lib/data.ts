
export type Exercise = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

export type Unit = {
  id: string;
  title: string;
  coreConcept: string;
  vocabulary?: string[];
  grammar?: string;
  useCase?: string;
  challenge?: string;
  skills?: string[];
  project?: string;
  exercises?: Exercise[];
};

export type Phase = {
  id: string;
  title: string;
  level: string;
  units: Unit[];
};

export const curriculum: Phase[] = [
  // --- BLOQUE A: ELEMENTAL (A1 - A2) ---
  {
    id: "phase-1",
    title: "Fase 1: The Spark",
    level: "Nivel A1.1",
    units: [
      {
        id: "unit-1",
        title: "The Spark",
        coreConcept: "Introducción al idioma: saludos, identificación personal y objetos básicos.",
        vocabulary: ["Apple", "Book", "Pen", "Student", "Teacher", "One", "Two", "Ten", "Red", "Blue"],
        grammar: "Verbo To Be (Am, Is, Are) + Pronombres personales",
        useCase: "\"I am a student.\"",
        challenge: "Preséntate a ti mismo en inglés.",
        exercises: [
          {
            id: "ex-1-1",
            question: "I ___ a student.",
            options: ["is", "am"],
            correctAnswer: 1,
            explanation: "Use 'am' with the pronoun 'I'."
          },
          {
            id: "ex-1-2",
            question: "The apple ___ red.",
            options: ["is", "are"],
            correctAnswer: 0,
            explanation: "Use 'is' for singular subjects."
          },
          {
            id: "ex-1-3",
            question: "Are you a teacher?",
            options: ["No, I is not", "No, I am not"],
            correctAnswer: 1,
            explanation: "The correct negative short answer is 'No, I am not'."
          }
        ]
      }
    ]
  },
  {
    id: "phase-2",
    title: "Fase 2: My World",
    level: "Nivel A1.2",
    units: [
      {
        id: "unit-2",
        title: "My World",
        coreConcept: "Hablar de la familia, profesiones y pertenencia.",
        vocabulary: ["Mother", "Father", "Brother", "Doctor", "Engineer", "Name", "Surname"],
        grammar: "Adjetivos posesivos (My, Your, His, Her)",
        useCase: "\"This is my brother.\"",
        challenge: "Describe a un miembro de tu familia.",
        exercises: [
          {
            id: "ex-2-1",
            question: "___ name is Angelo.",
            options: ["My", "I"],
            correctAnswer: 0,
            explanation: "Use 'My' to indicate possession."
          },
          {
            id: "ex-2-2",
            question: "He is a doctor. ___ car is white.",
            options: ["Her", "His"],
            correctAnswer: 1,
            explanation: "Use 'His' for male possession."
          },
          {
            id: "ex-2-3",
            question: "This is my brother. ___ name is Carlos.",
            options: ["His", "He"],
            correctAnswer: 0,
            explanation: "Use 'His' before the noun 'name'."
          }
        ]
      }
    ]
  },
  {
    id: "phase-3",
    title: "Fase 3: Daily Routine",
    level: "Nivel A1.3",
    units: [
      {
        id: "unit-3",
        title: "Daily Routine",
        coreConcept: "Expresar acciones diarias y manejo del tiempo.",
        vocabulary: ["Wake up", "Eat", "Sleep", "Work", "Study", "Morning", "Night", "O'clock"],
        grammar: "Presente Simple (I work vs He works)",
        useCase: "\"I wake up at 7:00 AM.\"",
        challenge: "Escribe tu horario de lunes a viernes.",
        exercises: [
          {
            id: "ex-3-1",
            question: "She ___ English every day.",
            options: ["study", "studies"],
            correctAnswer: 1,
            explanation: "Third person singular adds -es (studies)."
          },
          {
            id: "ex-3-2",
            question: "I ___ at 7:00 AM.",
            options: ["wake up", "wakes up"],
            correctAnswer: 0,
            explanation: "First person singular uses the base form."
          },
          {
            id: "ex-3-3",
            question: "___ you work on Saturdays?",
            options: ["Do", "Does"],
            correctAnswer: 0,
            explanation: "Use 'Do' for 'you'."
          }
        ]
      }
    ]
  },
  {
    id: "phase-4",
    title: "Fase 4: My Space",
    level: "Nivel A1.4",
    units: [
      {
        id: "unit-4",
        title: "My Space",
        coreConcept: "Descripción del hogar y ubicación de objetos.",
        vocabulary: ["House", "Kitchen", "Bed", "Table", "In", "On", "Under", "Next to"],
        grammar: "There is / There are",
        useCase: "\"There is a book on the table.\"",
        challenge: "Describe tu habitación favorita.",
        exercises: [
          {
            id: "ex-4-1",
            question: "___ a book on the table.",
            options: ["There is", "There are"],
            correctAnswer: 0,
            explanation: "Use 'There is' for singular objects."
          },
          {
            id: "ex-4-2",
            question: "___ two computers in the room.",
            options: ["There is", "There are"],
            correctAnswer: 1,
            explanation: "Use 'There are' for plural objects."
          },
          {
            id: "ex-4-3",
            question: "The pen is ___ the box.",
            options: ["in", "under"],
            correctAnswer: 0,
            explanation: "Preposition of place."
          }
        ]
      }
    ]
  },
  {
    id: "phase-5",
    title: "Fase 5: Food & Money",
    level: "Nivel A2.1",
    units: [
      {
        id: "unit-5",
        title: "Food & Money",
        coreConcept: "Compras, precios y comida.",
        vocabulary: ["Milk", "Bread", "Water", "Dollar", "Buy", "Expensive", "Cheap"],
        grammar: "Contables e Incontables (Much / Many)",
        useCase: "\"How much is this?\"",
        challenge: "Haz una lista de compras con precios estimados.",
        exercises: [
          {
            id: "ex-5-1",
            question: "How ___ is this phone?",
            options: ["much", "many"],
            correctAnswer: 0,
            explanation: "Use 'much' for price/money (uncountable)."
          },
          {
            id: "ex-5-2",
            question: "I want ___ water.",
            options: ["some", "a"],
            correctAnswer: 0,
            explanation: "Water is uncountable, use 'some'."
          },
          {
            id: "ex-5-3",
            question: "There aren't ___ apples.",
            options: ["much", "many"],
            correctAnswer: 1,
            explanation: "Apples are countable, use 'many'."
          }
        ]
      }
    ]
  },
  {
    id: "phase-6",
    title: "Fase 6: Past Memories",
    level: "Nivel A2.2",
    units: [
      {
        id: "unit-6",
        title: "Past Memories",
        coreConcept: "Narrar eventos que ya terminaron (verbos regulares).",
        vocabulary: ["Yesterday", "Last night", "Played", "Studied", "Watched", "Cleaned"],
        grammar: "Pasado Simple Regular (-ed)",
        useCase: "\"I played soccer yesterday.\"",
        challenge: "Escribe qué hiciste el fin de semana pasado.",
        exercises: [
          {
            id: "ex-6-1",
            question: "Yesterday, I ___ soccer.",
            options: ["played", "play"],
            correctAnswer: 0,
            explanation: "Past simple regular verbs end in -ed."
          },
          {
            id: "ex-6-2",
            question: "She ___ the window last night.",
            options: ["cleaned", "cleans"],
            correctAnswer: 0,
            explanation: "Use past tense for 'last night'."
          },
          {
            id: "ex-6-3",
            question: "Did you ___ the movie?",
            options: ["watch", "watched"],
            correctAnswer: 0,
            explanation: "After 'Did', use the base form of the verb."
          }
        ]
      }
    ]
  },
  {
    id: "phase-7",
    title: "Fase 7: Life Stories",
    level: "Nivel A2.3",
    units: [
      {
        id: "unit-7",
        title: "Life Stories",
        coreConcept: "Narrar historias usando verbos irregulares.",
        vocabulary: ["Went", "Ate", "Saw", "Bought", "Had", "Slept", "Drank"],
        grammar: "Pasado Simple Irregular",
        useCase: "\"I went to the park.\"",
        challenge: "Cuenta una historia corta usando 5 verbos irregulares.",
        exercises: [
          {
            id: "ex-7-1",
            question: "I ___ to the park yesterday.",
            options: ["went", "go"],
            correctAnswer: 0,
            explanation: "'Went' is the past of 'go'."
          },
          {
            id: "ex-7-2",
            question: "We ___ pizza for dinner.",
            options: ["ate", "eat"],
            correctAnswer: 0,
            explanation: "'Ate' is the past of 'eat'."
          },
          {
            id: "ex-7-3",
            question: "He ___ a new car.",
            options: ["bought", "buys"],
            correctAnswer: 0,
            explanation: "'Bought' is the past of 'buy'."
          }
        ]
      }
    ]
  },
  {
    id: "phase-8",
    title: "Fase 8: Health & Rules",
    level: "Nivel A2.4",
    units: [
      {
        id: "unit-8",
        title: "Health & Rules",
        coreConcept: "Dar consejos médicos y hablar de obligaciones.",
        vocabulary: ["Headache", "Flu", "Doctor", "Medicine", "Should", "Must"],
        grammar: "Verbos modales (Should / Must)",
        useCase: "\"You should see a doctor.\"",
        challenge: "Da 3 consejos para una vida saludable.",
        exercises: [
          {
            id: "ex-8-1",
            question: "You have a flu. You ___ see a doctor.",
            options: ["should", "shouldn't"],
            correctAnswer: 0,
            explanation: "Use 'should' for advice."
          },
          {
            id: "ex-8-2",
            question: "You ___ smoke in the hospital.",
            options: ["must", "mustn't"],
            correctAnswer: 1,
            explanation: "Use 'mustn't' for prohibition."
          },
          {
            id: "ex-8-3",
            question: "I have a ___. My head hurts.",
            options: ["headache", "cough"],
            correctAnswer: 0,
            explanation: "Headache means pain in the head."
          }
        ]
      }
    ]
  },
  {
    id: "phase-9",
    title: "Fase 9: Future Plans",
    level: "Nivel A2.5",
    units: [
      {
        id: "unit-9",
        title: "Future Plans",
        coreConcept: "Planes futuros y predicciones.",
        vocabulary: ["Tomorrow", "Next week", "Travel", "Will", "Going to"],
        grammar: "Future Going to (Planes) vs Will (Predicciones)",
        useCase: "\"I am going to travel.\"",
        challenge: "Escribe tus planes para las próximas vacaciones.",
        exercises: [
          {
            id: "ex-9-1",
            question: "I am ___ travel to USA.",
            options: ["going to", "will"],
            correctAnswer: 0,
            explanation: "Use 'going to' for plans."
          },
          {
            id: "ex-9-2",
            question: "I think it ___ rain tomorrow.",
            options: ["will", "going to"],
            correctAnswer: 0,
            explanation: "Use 'will' for predictions."
          },
          {
            id: "ex-9-3",
            question: "Are you ___ study tonight?",
            options: ["going to", "will"],
            correctAnswer: 0,
            explanation: "Structure: Be + going to + verb."
          }
        ]
      }
    ]
  },
  {
    id: "phase-10",
    title: "Fase 10: Comparisons",
    level: "Nivel A2.6",
    units: [
      {
        id: "unit-10",
        title: "Comparisons",
        coreConcept: "Comparar objetos, personas y lugares.",
        vocabulary: ["Big", "Small", "Fast", "Slow", "Better", "Worse", "Tall"],
        grammar: "Comparativos y Superlativos",
        useCase: "\"My house is bigger than yours.\"",
        challenge: "Compara dos medios de transporte.",
        exercises: [
          {
            id: "ex-10-1",
            question: "A car is ___ than a bike.",
            options: ["faster", "fast"],
            correctAnswer: 0,
            explanation: "Use comparative (-er) with 'than'."
          },
          {
            id: "ex-10-2",
            question: "He is the ___ student in class.",
            options: ["tallest", "taller"],
            correctAnswer: 0,
            explanation: "Use superlative (-est) with 'the'."
          },
          {
            id: "ex-10-3",
            question: "My house is ___ than yours.",
            options: ["bigger", "big"],
            correctAnswer: 0,
            explanation: "Comparative form of big is bigger."
          }
        ]
      }
    ]
  },

  // --- BLOQUE B: INTERMEDIO (B1 - B2) ---
  {
    id: "phase-11",
    title: "Fase 11: Living Small",
    level: "Nivel B1.1",
    units: [
      {
        id: "unit-11",
        title: "Living Small",
        coreConcept: "Minimalismo y finanzas del hogar.",
        vocabulary: ["Tiny", "Space", "Rent", "Save", "Spend", "Unusual"],
        grammar: "Presente Perfecto (I have lived)",
        useCase: "\"I have lived here for years.\"",
        challenge: "Debate sobre las ventajas de vivir en espacios pequeños.",
        exercises: [
          {
            id: "ex-11-1",
            question: "A very small house is ___.",
            options: ["tiny", "huge"],
            correctAnswer: 0,
            explanation: "Tiny means very small."
          },
          {
            id: "ex-11-2",
            question: "I have ___ in this city for years.",
            options: ["lived", "live"],
            correctAnswer: 0,
            explanation: "Present perfect uses past participle."
          },
          {
            id: "ex-11-3",
            question: "How much do you ___ on rent?",
            options: ["spend", "save"],
            correctAnswer: 0,
            explanation: "You 'spend' money on rent."
          }
        ]
      }
    ]
  },
  {
    id: "phase-12",
    title: "Fase 12: Unusual Art",
    level: "Nivel B1.2",
    units: [
      {
        id: "unit-12",
        title: "Unusual Art",
        coreConcept: "Creatividad y materiales no convencionales.",
        vocabulary: ["Sculpture", "Material", "Creative", "Gallery", "Exhibition"],
        grammar: "Adjetivos -ed vs -ing (Interested / Interesting)",
        useCase: "\"This art is interesting.\"",
        challenge: "Describe una obra de arte moderna.",
        exercises: [
          {
            id: "ex-12-1",
            question: "This art is very ___.",
            options: ["interesting", "interested"],
            correctAnswer: 0,
            explanation: "-ing describes the characteristic of the object."
          },
          {
            id: "ex-12-2",
            question: "The artist used ___ materials.",
            options: ["unusual", "normal"],
            correctAnswer: 0,
            explanation: "Unusual fits the context of 'Unusual Art'."
          },
          {
            id: "ex-12-3",
            question: "I am ___ in this painting.",
            options: ["interested", "interesting"],
            correctAnswer: 0,
            explanation: "-ed describes feelings."
          }
        ]
      }
    ]
  },
  {
    id: "phase-13",
    title: "Fase 13: Special Possessions",
    level: "Nivel B1.3",
    units: [
      {
        id: "unit-13",
        title: "Special Possessions",
        coreConcept: "El valor de las pertenencias y recuerdos.",
        vocabulary: ["Belongings", "Gift", "Memory", "Inherit", "Value"],
        grammar: "Used to (Hábitos pasados)",
        useCase: "\"I used to have a lot of toys.\"",
        challenge: "Habla de un objeto que heredaste.",
        exercises: [
          {
            id: "ex-13-1",
            question: "I ___ to have a lot of toys.",
            options: ["used", "use"],
            correctAnswer: 0,
            explanation: "Structure: used to + verb."
          },
          {
            id: "ex-13-2",
            question: "This ring has a lot of sentimental ___.",
            options: ["value", "rent"],
            correctAnswer: 0,
            explanation: "Sentimental value is a common collocation."
          },
          {
            id: "ex-13-3",
            question: "Did you ___ to live here?",
            options: ["use", "used"],
            correctAnswer: 0,
            explanation: "With 'Did', use 'use to'."
          }
        ]
      }
    ]
  },
  {
    id: "phase-14",
    title: "Fase 14: Business Creativity",
    level: "Nivel B1.4",
    units: [
      {
        id: "unit-14",
        title: "Business Creativity",
        coreConcept: "Innovación en el mundo empresarial.",
        vocabulary: ["Entrepreneur", "Idea", "Profit", "Market", "Product"],
        grammar: "Primer Condicional (If I work, I will win)",
        useCase: "\"If I have a good idea, I will start a business.\"",
        challenge: "Presenta una idea de negocio en 1 minuto.",
        exercises: [
          {
            id: "ex-14-1",
            question: "If I have a good idea, I ___ a business.",
            options: ["will start", "started"],
            correctAnswer: 0,
            explanation: "First conditional: If + present, will + verb."
          },
          {
            id: "ex-14-2",
            question: "A person who starts a business is an ___.",
            options: ["entrepreneur", "employee"],
            correctAnswer: 0,
            explanation: "Definition of entrepreneur."
          },
          {
            id: "ex-14-3",
            question: "We will make a ___ if we sell this.",
            options: ["profit", "rent"],
            correctAnswer: 0,
            explanation: "Profit is money made from business."
          }
        ]
      }
    ]
  },
  {
    id: "phase-15",
    title: "Fase 15: Fears & Phobias",
    level: "Nivel B2.1",
    units: [
      {
        id: "unit-15",
        title: "Fears & Phobias",
        coreConcept: "Psicología del miedo y cómo superarlo.",
        vocabulary: ["Fear", "Phobia", "Anxiety", "Overcome", "Brain"],
        grammar: "Presente Perfecto Continuo (I have been working)",
        useCase: "\"She has been studying phobias.\"",
        challenge: "Explica cómo superar el miedo a hablar en público.",
        exercises: [
          {
            id: "ex-15-1",
            question: "She has ___ studying phobias lately.",
            options: ["been", "be"],
            correctAnswer: 0,
            explanation: "Structure: has been + -ing."
          },
          {
            id: "ex-15-2",
            question: "To ___ a fear is to defeat it.",
            options: ["overcome", "save"],
            correctAnswer: 0,
            explanation: "Overcome means to succeed in dealing with a problem."
          },
          {
            id: "ex-15-3",
            question: "An irrational fear is a ___.",
            options: ["phobia", "dream"],
            correctAnswer: 0,
            explanation: "Definition of phobia."
          }
        ]
      }
    ]
  },
  {
    id: "phase-16",
    title: "Fase 16: Risk & Challenges",
    level: "Nivel B2.2",
    units: [
      {
        id: "unit-16",
        title: "Risk & Challenges",
        coreConcept: "Toma de riesgos y deportes extremos.",
        vocabulary: ["Danger", "Risk", "Challenge", "Adrenaline", "Safety"],
        grammar: "Segundo Condicional (If I were... I would...)",
        useCase: "\"If I were rich, I would travel.\"",
        challenge: "¿Qué deporte extremo te gustaría probar?",
        exercises: [
          {
            id: "ex-16-1",
            question: "If I ___ rich, I would travel the world.",
            options: ["were", "am"],
            correctAnswer: 0,
            explanation: "Second conditional uses 'were' for all subjects."
          },
          {
            id: "ex-16-2",
            question: "Skydiving is a dangerous ___.",
            options: ["challenge", "rent"],
            correctAnswer: 0,
            explanation: "Challenge fits the context."
          },
          {
            id: "ex-16-3",
            question: "I ___ jump if I had a parachute.",
            options: ["would", "will"],
            correctAnswer: 0,
            explanation: "Second conditional uses 'would' in the result clause."
          }
        ]
      }
    ]
  },
  {
    id: "phase-17",
    title: "Fase 17: Only Child",
    level: "Nivel B2.3",
    units: [
      {
        id: "unit-17",
        title: "Only Child",
        coreConcept: "Estructura familiar y personalidad.",
        vocabulary: ["Siblings", "Lonely", "Independent", "Only child", "Society"],
        grammar: "Voz Pasiva (The house was built)",
        useCase: "\"This study was conducted in 2020.\"",
        challenge: "Escribe sobre las ventajas de tener hermanos.",
        exercises: [
          {
            id: "ex-17-1",
            question: "This study ___ conducted in 2020.",
            options: ["was", "is"],
            correctAnswer: 0,
            explanation: "Past passive uses 'was'."
          },
          {
            id: "ex-17-2",
            question: "An ___ child has no brothers.",
            options: ["only", "alone"],
            correctAnswer: 0,
            explanation: "Only child is the correct term."
          },
          {
            id: "ex-17-3",
            question: "Children ___ influenced by parents.",
            options: ["are", "is"],
            correctAnswer: 0,
            explanation: "Children is plural, use 'are'."
          }
        ]
      }
    ]
  },
  {
    id: "phase-18",
    title: "Fase 18: The Beautiful Game",
    level: "Nivel B2.4",
    units: [
      {
        id: "unit-18",
        title: "The Beautiful Game",
        coreConcept: "Impacto global del deporte y fútbol.",
        vocabulary: ["Soccer", "Teamwork", "Fan", "Global", "Win"],
        grammar: "Tercer Condicional (If I had known...)",
        useCase: "\"If they had played better, they would have won.\"",
        challenge: "Analiza un partido de fútbol reciente.",
        exercises: [
          {
            id: "ex-18-1",
            question: "If they had played better, they ___.",
            options: ["would have won", "will win"],
            correctAnswer: 0,
            explanation: "Third conditional structure."
          },
          {
            id: "ex-18-2",
            question: "Soccer is a ___ sport.",
            options: ["global", "tiny"],
            correctAnswer: 0,
            explanation: "Global fits the context."
          },
          {
            id: "ex-18-3",
            question: "___ is important in sports.",
            options: ["Teamwork", "Rent"],
            correctAnswer: 0,
            explanation: "Teamwork is essential in sports."
          }
        ]
      }
    ]
  },
  {
    id: "phase-19",
    title: "Fase 19: Tech & Work",
    level: "Nivel B2.5",
    units: [
      {
        id: "unit-19",
        title: "Tech & Work",
        coreConcept: "Inglés técnico para entornos de ingeniería y software.",
        vocabulary: ["Software", "Debug", "Framework", "Database", "Meeting"],
        grammar: "Phrasal Verbs (Log in, Set up, Carry out)",
        useCase: "\"Please log in to your account.\"",
        challenge: "Explica cómo funciona una base de datos.",
        exercises: [
          {
            id: "ex-19-1",
            question: "Please ___ to your account.",
            options: ["log in", "log on"],
            correctAnswer: 0,
            explanation: "Log in is standard for accessing accounts."
          },
          {
            id: "ex-19-2",
            question: "We need to ___ the new server.",
            options: ["set up", "set down"],
            correctAnswer: 0,
            explanation: "Set up means to install or configure."
          },
          {
            id: "ex-19-3",
            question: "The ___ is where data is stored.",
            options: ["database", "keyboard"],
            correctAnswer: 0,
            explanation: "Database stores data."
          }
        ]
      }
    ]
  },
  {
    id: "phase-20",
    title: "Fase 20: Academic Mastery",
    level: "Nivel B2.6",
    units: [
      {
        id: "unit-20",
        title: "Academic Mastery",
        coreConcept: "Escritura formal, debates y síntesis de información.",
        vocabulary: ["However", "Therefore", "Conclusion", "Analysis", "Evidence"],
        grammar: "Relative Clauses (The man who...)",
        useCase: "\"The student who won the prize is him.\"",
        challenge: "Escribe un ensayo corto sobre tecnología.",
        exercises: [
          {
            id: "ex-20-1",
            question: "The student ___ won the prize is him.",
            options: ["who", "which"],
            correctAnswer: 0,
            explanation: "Who refers to people."
          },
          {
            id: "ex-20-2",
            question: "It's raining; ___, we stay home.",
            options: ["therefore", "but"],
            correctAnswer: 0,
            explanation: "Therefore shows consequence."
          },
          {
            id: "ex-20-3",
            question: "Based on the ___, the theory is true.",
            options: ["evidence", "guess"],
            correctAnswer: 0,
            explanation: "Evidence supports theories."
          }
        ]
      }
    ]
  }
];

export const libraryTopics = [
  {
    id: "topic-1",
    title: "Business English",
    description: "Domina el vocabulario y las estructuras para el mundo corporativo.",
    lessonsCount: 12,
    icon: "Briefcase",
    color: "#00E0FF"
  },
  {
    id: "topic-2",
    title: "Travel & Culture",
    description: "Todo lo que necesitas saber para viajar por el mundo.",
    lessonsCount: 8,
    icon: "Plane",
    color: "#F59E0B"
  },
  {
    id: "topic-3",
    title: "Academic Writing",
    description: "Mejora tu escritura para ensayos y papers universitarios.",
    lessonsCount: 15,
    icon: "PenTool",
    color: "#7B61FF"
  },
  {
    id: "topic-4",
    title: "Daily Conversation",
    description: "Frases útiles para el día a día y charlas informales.",
    lessonsCount: 20,
    icon: "MessageCircle",
    color: "#10B981"
  },
  {
    id: "topic-5",
    title: "Grammar Deep Dive",
    description: "Profundiza en las reglas gramaticales más complejas.",
    lessonsCount: 10,
    icon: "BookOpen",
    color: "#F43F5E"
  },
  {
    id: "topic-6",
    title: "Idioms & Slang",
    description: "Habla como un nativo usando expresiones coloquiales.",
    lessonsCount: 18,
    icon: "Zap",
    color: "#FFC800"
  }
];

export const storeItems = [
  {
    id: "item-1",
    name: "Vida Extra",
    description: "Recupera una vida perdida inmediatamente.",
    price: 50,
    icon: "Heart",
    color: "#F43F5E"
  },
  {
    id: "item-2",
    name: "Congelar Racha",
    description: "Mantén tu racha de días incluso si no practicas hoy.",
    price: 200,
    icon: "Snowflake",
    color: "#00E0FF"
  },
  {
    id: "item-3",
    name: "Doble XP (1h)",
    description: "Gana el doble de experiencia por la próxima hora.",
    price: 150,
    icon: "Zap",
    color: "#FFC800"
  },
  {
    id: "item-4",
    name: "Traje Espacial",
    description: "Personaliza tu avatar con este traje exclusivo.",
    price: 1000,
    icon: "Shirt",
    color: "#7B61FF"
  }
];

export const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    password: "admin" 
  },
  {
    id: "2",
    name: "Student User",
    email: "student@example.com",
    role: "student",
    password: "user",
    progress: {
      "unit-1": 100,
      "unit-2": 60,
      "unit-3": 0
    }
  }
];
