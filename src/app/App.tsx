import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  ChevronDown,
  ChevronUp,
  Search,
  Settings,
  Share2,
  Bell,
  Menu,
  Award,
  Users,
  X,
  RefreshCw,
  LayoutDashboard,
  Shield,
  User,
} from "lucide-react";

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#0D1117",
  card: "#161B22",
  cardHover: "#1C2128",
  border: "#30363D",
  orange: "#FF6B35",
  orangeDim: "rgba(255,107,53,0.15)",
  teal: "#00C49F",
  tealDim: "rgba(0,196,159,0.15)",
  red: "#FF4444",
  redDim: "rgba(255,68,68,0.15)",
  text: "#E6EDF3",
  muted: "#8B949E",
  MI: "#004BA0",
  CSK: "#E8B736",
  RCB: "#EC1C24",
  KKR: "#5A3E95",
  DC: "#17479E",
  PBKS: "#ED1B24",
  RR: "#254AA5",
  SRH: "#F7A721",
  GT: "#1C4E80",
  LSG: "#A72056",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
type Team = {
  id: string; name: string; color: string; titles: number;
  wins: number; matches: number; nrr: string; winPct: number;
};

const TEAMS: Team[] = [
  { id: "MI",   name: "Mumbai Indians",           color: C.MI,   titles: 5, wins: 122, matches: 246, nrr: "+0.42", winPct: 66 },
  { id: "CSK",  name: "Chennai Super Kings",      color: C.CSK,  titles: 5, wins: 111, matches: 218, nrr: "+0.19", winPct: 64 },
  { id: "KKR",  name: "Kolkata Knight Riders",    color: C.KKR,  titles: 3, wins: 106, matches: 243, nrr: "+0.08", winPct: 57 },
  { id: "RCB",  name: "Royal Challengers B'lore", color: C.RCB,  titles: 0, wins: 97,  matches: 242, nrr: "-0.11", winPct: 52 },
  { id: "DC",   name: "Delhi Capitals",           color: C.DC,   titles: 0, wins: 87,  matches: 222, nrr: "+0.02", winPct: 50 },
  { id: "SRH",  name: "Sunrisers Hyderabad",      color: C.SRH,  titles: 1, wins: 82,  matches: 182, nrr: "+0.07", winPct: 55 },
  { id: "RR",   name: "Rajasthan Royals",         color: C.RR,   titles: 1, wins: 74,  matches: 213, nrr: "-0.14", winPct: 47 },
  { id: "PBKS", name: "Punjab Kings",             color: C.PBKS, titles: 0, wins: 68,  matches: 224, nrr: "-0.22", winPct: 44 },
  { id: "GT",   name: "Gujarat Titans",           color: C.GT,   titles: 1, wins: 35,  matches:  67, nrr: "+0.17", winPct: 62 },
  { id: "LSG",  name: "Lucknow Super Giants",     color: C.LSG,  titles: 0, wins: 28,  matches:  62, nrr: "+0.04", winPct: 53 },
];

const WIN_RATE_DATA = [
  { season: "2020", MI: 72, CSK: 55, RCB: 58, KKR: 50, DC: 71 },
  { season: "2021", MI: 50, CSK: 75, RCB: 62, KKR: 55, DC: 52 },
  { season: "2022", MI: 35, CSK: 65, RCB: 65, KKR: 52, DC: 48 },
  { season: "2023", MI: 55, CSK: 62, RCB: 58, KKR: 60, DC: 55 },
  { season: "2024", MI: 58, CSK: 64, RCB: 72, KKR: 79, DC: 50 },
];

const ALL_TIME_WINS = [
  { team: "Mumbai Indians",           wins: 122, color: C.MI,   highlight: true },
  { team: "Chennai Super Kings",      wins: 111, color: C.CSK,  highlight: false },
  { team: "Kolkata Knight Riders",    wins: 106, color: C.KKR,  highlight: false },
  { team: "Royal Challengers B'lore", wins: 97,  color: C.RCB,  highlight: false },
  { team: "Delhi Capitals",           wins: 87,  color: C.DC,   highlight: false },
  { team: "Sunrisers Hyderabad",      wins: 82,  color: C.SRH,  highlight: false },
  { team: "Rajasthan Royals",         wins: 74,  color: C.RR,   highlight: false },
  { team: "Punjab Kings",             wins: 68,  color: C.PBKS, highlight: false },
  { team: "Gujarat Titans",           wins: 35,  color: C.GT,   highlight: false },
  { team: "Lucknow Super Giants",     wins: 28,  color: C.LSG,  highlight: false },
];

const RECENT_MATCHES = [
  { match: "MI vs RCB",   winnerFull: "Mumbai Indians",        wid: "MI",   margin: "8 wickets", venue: "Wankhede Stadium",          date: "May 15, 2024" },
  { match: "CSK vs KKR",  winnerFull: "Kolkata Knight Riders", wid: "KKR",  margin: "23 runs",    venue: "MA Chidambaram Stadium",    date: "May 14, 2024" },
  { match: "RR vs DC",    winnerFull: "Rajasthan Royals",      wid: "RR",   margin: "6 wickets",  venue: "Sawai Mansingh Stadium",    date: "May 13, 2024" },
  { match: "SRH vs GT",   winnerFull: "Sunrisers Hyderabad",   wid: "SRH",  margin: "3 wickets",  venue: "Rajiv Gandhi Intl. Stad.",  date: "May 12, 2024" },
  { match: "PBKS vs LSG", winnerFull: "Punjab Kings",          wid: "PBKS", margin: "5 runs",     venue: "IS Bindra Stadium",         date: "May 11, 2024" },
];

const TOP_BATSMEN = [
  { name: "V Kohli",      full: "Virat Kohli",       runs: 741, sr: 154.8, avg: 61.7, fours: 64, sixes: 42, hs: 113 },
  { name: "T Head",       full: "Travis Head",       runs: 567, sr: 191.2, avg: 47.3, fours: 57, sixes: 43, hs:  89 },
  { name: "KL Rahul",     full: "KL Rahul",          runs: 520, sr: 139.5, avg: 43.3, fours: 55, sixes: 18, hs:  82 },
  { name: "R Gaikwad",    full: "Ruturaj Gaikwad",   runs: 583, sr: 136.4, avg: 48.6, fours: 72, sixes: 14, hs: 108 },
  { name: "H Klaasen",    full: "Heinrich Klaasen",  runs: 479, sr: 174.1, avg: 43.5, fours: 39, sixes: 38, hs:  80 },
  { name: "Ab Sharma",    full: "Abhishek Sharma",   runs: 484, sr: 183.3, avg: 40.3, fours: 45, sixes: 37, hs:  75 },
  { name: "S Sudarshan",  full: "Sai Sudarshan",     runs: 478, sr: 141.0, avg: 39.8, fours: 58, sixes: 18, hs:  96 },
  { name: "S Gill",       full: "Shubman Gill",      runs: 426, sr: 147.2, avg: 35.5, fours: 44, sixes: 16, hs:  72 },
  { name: "R Patidar",    full: "Rajat Patidar",     runs: 373, sr: 160.1, avg: 31.1, fours: 36, sixes: 20, hs:  97 },
  { name: "Rinku Singh",  full: "Rinku Singh",       runs: 312, sr: 161.9, avg: 34.7, fours: 28, sixes: 22, hs:  74 },
];

const TOP_BOWLERS = [
  { name: "Harshal",    full: "Harshal Patel",         wkts: 24, econ: 9.3, avg: 20.2, sr: 13.0 },
  { name: "V Chakra",  full: "Varun Chakaravarthy",   wkts: 21, econ: 7.8, avg: 18.4, sr: 14.1 },
  { name: "K Yadav",   full: "Kuldeep Yadav",         wkts: 19, econ: 8.1, avg: 21.3, sr: 15.8 },
  { name: "Arshdeep",  full: "Arshdeep Singh",        wkts: 19, econ: 9.1, avg: 23.4, sr: 15.4 },
  { name: "Natarajan", full: "T Natarajan",           wkts: 19, econ: 8.9, avg: 22.1, sr: 14.8 },
  { name: "Y Chahal",  full: "Yuzvendra Chahal",      wkts: 18, econ: 8.4, avg: 22.8, sr: 16.3 },
  { name: "R Ashwin",  full: "Ravichandran Ashwin",   wkts: 18, econ: 7.6, avg: 20.9, sr: 16.5 },
  { name: "M Starc",   full: "Mitchell Starc",        wkts: 17, econ: 9.8, avg: 24.5, sr: 14.9 },
  { name: "J Bumrah",  full: "Jasprit Bumrah",        wkts: 15, econ: 7.2, avg: 19.8, sr: 16.5 },
  { name: "P Cummins", full: "Pat Cummins",           wkts: 14, econ: 9.4, avg: 25.1, sr: 16.0 },
];

const PLAYER_SCATTER = [
  { name: "V Kohli",      avg: 61.7, sr: 154.8, matches: 16, type: "bat" },
  { name: "R Gaikwad",    avg: 48.6, sr: 136.4, matches: 14, type: "bat" },
  { name: "KL Rahul",     avg: 43.3, sr: 139.5, matches: 14, type: "bat" },
  { name: "T Head",       avg: 47.3, sr: 191.2, matches: 15, type: "bat" },
  { name: "H Klaasen",    avg: 43.5, sr: 174.1, matches: 13, type: "bat" },
  { name: "Ab Sharma",    avg: 40.3, sr: 183.3, matches: 14, type: "bat" },
  { name: "R Patidar",    avg: 31.1, sr: 160.1, matches: 13, type: "bat" },
  { name: "Rinku Singh",  avg: 34.7, sr: 161.9, matches: 14, type: "bat" },
  { name: "Shivam Dube",  avg: 42.8, sr: 156.7, matches: 16, type: "ar" },
  { name: "HH Pandya",    avg: 27.6, sr: 145.2, matches: 15, type: "ar" },
  { name: "Axar Patel",   avg: 36.2, sr: 148.8, matches: 16, type: "ar" },
  { name: "Sam Curran",   avg: 28.4, sr: 137.9, matches: 14, type: "ar" },
  { name: "J Bumrah",     avg: 8.2,  sr: 80.2,  matches: 13, type: "bwl" },
  { name: "Y Chahal",     avg: 6.4,  sr: 62.0,  matches: 14, type: "bwl" },
  { name: "K Yadav",      avg: 7.1,  sr: 68.3,  matches: 14, type: "bwl" },
  { name: "Harshal",      avg: 5.8,  sr: 55.0,  matches: 16, type: "bwl" },
  { name: "Arshdeep",     avg: 6.2,  sr: 60.0,  matches: 16, type: "bwl" },
];

const BEST_XI_PLAYERS = [
  { name: "Ruturaj Gaikwad",  role: "BAT", stat: "583 runs",  form: "up",   pos: [50, 10] as [number, number] },
  { name: "Virat Kohli",      role: "BAT", stat: "741 runs",  form: "up",   pos: [22, 20] as [number, number] },
  { name: "Travis Head",      role: "BAT", stat: "567 runs",  form: "up",   pos: [78, 20] as [number, number] },
  { name: "KL Rahul",         role: "WK",  stat: "520 runs",  form: "up",   pos: [50, 30] as [number, number] },
  { name: "Rinku Singh",      role: "BAT", stat: "312 runs",  form: "down", pos: [14, 38] as [number, number] },
  { name: "Shivam Dube",      role: "AR",  stat: "42.8 avg",  form: "up",   pos: [86, 38] as [number, number] },
  { name: "HH Pandya",        role: "AR",  stat: "27.6 avg",  form: "down", pos: [35, 52] as [number, number] },
  { name: "Axar Patel",       role: "AR",  stat: "18 wkts",   form: "up",   pos: [65, 52] as [number, number] },
  { name: "Jasprit Bumrah",   role: "BWL", stat: "15 wkts",   form: "up",   pos: [22, 68] as [number, number] },
  { name: "Kuldeep Yadav",    role: "BWL", stat: "19 wkts",   form: "up",   pos: [50, 76] as [number, number] },
  { name: "Yuzvendra Chahal", role: "BWL", stat: "18 wkts",   form: "down", pos: [78, 68] as [number, number] },
];

const TEAM_DATA: Record<string, {
  wins: number; matches: number; titles: number; nrr: string;
  winBySeasonData: { season: string; winPct: number }[];
  battingData: { season: string; avgScore: number; ppScore: number }[];
  bowlingData: { season: string; economy: number }[];
  tossData: { name: string; value: number }[];
  h2h: { opp: string; oppColor: string; wins: number; losses: number }[];
}> = {
  MI: {
    wins: 61, matches: 92, titles: 5, nrr: "+0.42",
    winBySeasonData: [
      { season: "2020", winPct: 72 }, { season: "2021", winPct: 50 },
      { season: "2022", winPct: 35 }, { season: "2023", winPct: 55 }, { season: "2024", winPct: 58 },
    ],
    battingData: [
      { season: "2020", avgScore: 182, ppScore: 52 }, { season: "2021", avgScore: 175, ppScore: 49 },
      { season: "2022", avgScore: 162, ppScore: 44 }, { season: "2023", avgScore: 174, ppScore: 50 },
      { season: "2024", avgScore: 179, ppScore: 53 },
    ],
    bowlingData: [
      { season: "2020", economy: 7.8 }, { season: "2021", economy: 8.1 },
      { season: "2022", economy: 8.4 }, { season: "2023", economy: 7.9 }, { season: "2024", economy: 8.2 },
    ],
    tossData: [{ name: "Won toss, won match", value: 58 }, { name: "Won toss, lost match", value: 42 }],
    h2h: [
      { opp: "CSK", oppColor: C.CSK, wins: 14, losses: 9 }, { opp: "RCB", oppColor: C.RCB, wins: 18, losses: 7 },
      { opp: "KKR", oppColor: C.KKR, wins: 15, losses: 8 }, { opp: "DC",  oppColor: C.DC,  wins: 16, losses: 6 },
      { opp: "SRH", oppColor: C.SRH, wins: 12, losses: 8 }, { opp: "RR",  oppColor: C.RR,  wins: 14, losses: 6 },
      { opp: "PBKS",oppColor: C.PBKS,wins: 17, losses: 5 }, { opp: "GT",  oppColor: C.GT,  wins: 3,  losses: 1 },
      { opp: "LSG", oppColor: C.LSG, wins: 4,  losses: 2 },
    ],
  },
  CSK: {
    wins: 111, matches: 218, titles: 5, nrr: "+0.19",
    winBySeasonData: [
      { season: "2020", winPct: 55 }, { season: "2021", winPct: 75 },
      { season: "2022", winPct: 65 }, { season: "2023", winPct: 79 }, { season: "2024", winPct: 64 },
    ],
    battingData: [
      { season: "2020", avgScore: 168, ppScore: 48 }, { season: "2021", avgScore: 177, ppScore: 51 },
      { season: "2022", avgScore: 173, ppScore: 49 }, { season: "2023", avgScore: 185, ppScore: 54 },
      { season: "2024", avgScore: 179, ppScore: 52 },
    ],
    bowlingData: [
      { season: "2020", economy: 8.2 }, { season: "2021", economy: 7.9 },
      { season: "2022", economy: 8.0 }, { season: "2023", economy: 7.7 }, { season: "2024", economy: 8.3 },
    ],
    tossData: [{ name: "Won toss, won match", value: 55 }, { name: "Won toss, lost match", value: 45 }],
    h2h: [
      { opp: "MI",   oppColor: C.MI,   wins: 9,  losses: 14 }, { opp: "RCB",  oppColor: C.RCB,  wins: 20, losses: 9  },
      { opp: "KKR",  oppColor: C.KKR,  wins: 14, losses: 10 }, { opp: "DC",   oppColor: C.DC,   wins: 18, losses: 7  },
      { opp: "SRH",  oppColor: C.SRH,  wins: 13, losses: 8  }, { opp: "RR",   oppColor: C.RR,   wins: 16, losses: 8  },
      { opp: "PBKS", oppColor: C.PBKS, wins: 15, losses: 7  }, { opp: "GT",   oppColor: C.GT,   wins: 3,  losses: 2  },
      { opp: "LSG",  oppColor: C.LSG,  wins: 4,  losses: 1  },
    ],
  },
  KKR: {
    wins: 106, matches: 243, titles: 3, nrr: "+0.08",
    winBySeasonData: [
      { season: "2020", winPct: 50 }, { season: "2021", winPct: 55 },
      { season: "2022", winPct: 52 }, { season: "2023", winPct: 60 }, { season: "2024", winPct: 79 },
    ],
    battingData: [
      { season: "2020", avgScore: 165, ppScore: 46 }, { season: "2021", avgScore: 170, ppScore: 48 },
      { season: "2022", avgScore: 163, ppScore: 45 }, { season: "2023", avgScore: 172, ppScore: 50 },
      { season: "2024", avgScore: 193, ppScore: 58 },
    ],
    bowlingData: [
      { season: "2020", economy: 8.5 }, { season: "2021", economy: 8.3 },
      { season: "2022", economy: 8.6 }, { season: "2023", economy: 8.1 }, { season: "2024", economy: 7.7 },
    ],
    tossData: [{ name: "Won toss, won match", value: 52 }, { name: "Won toss, lost match", value: 48 }],
    h2h: [
      { opp: "MI",  oppColor: C.MI,  wins: 8,  losses: 15 }, { opp: "CSK", oppColor: C.CSK, wins: 10, losses: 14 },
      { opp: "RCB", oppColor: C.RCB, wins: 16, losses: 10 }, { opp: "DC",  oppColor: C.DC,  wins: 14, losses: 8  },
      { opp: "SRH", oppColor: C.SRH, wins: 12, losses: 9  }, { opp: "RR",  oppColor: C.RR,  wins: 13, losses: 8  },
      { opp: "PBKS",oppColor: C.PBKS,wins: 15, losses: 7  }, { opp: "GT",  oppColor: C.GT,  wins: 4,  losses: 2  },
      { opp: "LSG", oppColor: C.LSG, wins: 5,  losses: 1  },
    ],
  },
  RCB: {
    wins: 97, matches: 242, titles: 0, nrr: "-0.11",
    winBySeasonData: [
      { season: "2020", winPct: 58 }, { season: "2021", winPct: 62 },
      { season: "2022", winPct: 65 }, { season: "2023", winPct: 58 }, { season: "2024", winPct: 72 },
    ],
    battingData: [
      { season: "2020", avgScore: 175, ppScore: 50 }, { season: "2021", avgScore: 178, ppScore: 52 },
      { season: "2022", avgScore: 173, ppScore: 49 }, { season: "2023", avgScore: 171, ppScore: 48 },
      { season: "2024", avgScore: 184, ppScore: 55 },
    ],
    bowlingData: [
      { season: "2020", economy: 9.0 }, { season: "2021", economy: 8.8 },
      { season: "2022", economy: 8.6 }, { season: "2023", economy: 8.9 }, { season: "2024", economy: 8.2 },
    ],
    tossData: [{ name: "Won toss, won match", value: 49 }, { name: "Won toss, lost match", value: 51 }],
    h2h: [
      { opp: "MI",   oppColor: C.MI,   wins: 7,  losses: 18 }, { opp: "CSK",  oppColor: C.CSK,  wins: 9,  losses: 20 },
      { opp: "KKR",  oppColor: C.KKR,  wins: 10, losses: 16 }, { opp: "DC",   oppColor: C.DC,   wins: 14, losses: 10 },
      { opp: "SRH",  oppColor: C.SRH,  wins: 11, losses: 9  }, { opp: "RR",   oppColor: C.RR,   wins: 13, losses: 9  },
      { opp: "PBKS", oppColor: C.PBKS, wins: 14, losses: 8  }, { opp: "GT",   oppColor: C.GT,   wins: 3,  losses: 2  },
      { opp: "LSG",  oppColor: C.LSG,  wins: 4,  losses: 2  },
    ],
  },
  DC: {
    wins: 87, matches: 222, titles: 0, nrr: "+0.02",
    winBySeasonData: [
      { season: "2020", winPct: 71 }, { season: "2021", winPct: 52 },
      { season: "2022", winPct: 48 }, { season: "2023", winPct: 55 }, { season: "2024", winPct: 50 },
    ],
    battingData: [
      { season: "2020", avgScore: 178, ppScore: 51 }, { season: "2021", avgScore: 169, ppScore: 47 },
      { season: "2022", avgScore: 164, ppScore: 45 }, { season: "2023", avgScore: 172, ppScore: 49 },
      { season: "2024", avgScore: 175, ppScore: 51 },
    ],
    bowlingData: [
      { season: "2020", economy: 7.9 }, { season: "2021", economy: 8.3 },
      { season: "2022", economy: 8.7 }, { season: "2023", economy: 8.1 }, { season: "2024", economy: 8.4 },
    ],
    tossData: [{ name: "Won toss, won match", value: 51 }, { name: "Won toss, lost match", value: 49 }],
    h2h: [
      { opp: "MI",  oppColor: C.MI,  wins: 6,  losses: 16 }, { opp: "CSK", oppColor: C.CSK, wins: 7,  losses: 18 },
      { opp: "KKR", oppColor: C.KKR, wins: 8,  losses: 14 }, { opp: "RCB", oppColor: C.RCB, wins: 10, losses: 14 },
      { opp: "SRH", oppColor: C.SRH, wins: 10, losses: 9  }, { opp: "RR",  oppColor: C.RR,  wins: 12, losses: 8  },
      { opp: "PBKS",oppColor: C.PBKS,wins: 13, losses: 8  }, { opp: "GT",  oppColor: C.GT,  wins: 3,  losses: 2  },
      { opp: "LSG", oppColor: C.LSG, wins: 3,  losses: 2  },
    ],
  },
  SRH: {
    wins: 82, matches: 182, titles: 1, nrr: "+0.07",
    winBySeasonData: [
      { season: "2020", winPct: 44 }, { season: "2021", winPct: 35 },
      { season: "2022", winPct: 50 }, { season: "2023", winPct: 57 }, { season: "2024", winPct: 64 },
    ],
    battingData: [
      { season: "2020", avgScore: 160, ppScore: 44 }, { season: "2021", avgScore: 158, ppScore: 43 },
      { season: "2022", avgScore: 169, ppScore: 48 }, { season: "2023", avgScore: 175, ppScore: 51 },
      { season: "2024", avgScore: 198, ppScore: 60 },
    ],
    bowlingData: [
      { season: "2020", economy: 8.1 }, { season: "2021", economy: 8.9 },
      { season: "2022", economy: 8.3 }, { season: "2023", economy: 8.0 }, { season: "2024", economy: 8.5 },
    ],
    tossData: [{ name: "Won toss, won match", value: 54 }, { name: "Won toss, lost match", value: 46 }],
    h2h: [
      { opp: "MI",  oppColor: C.MI,  wins: 8,  losses: 12 }, { opp: "CSK", oppColor: C.CSK, wins: 8,  losses: 13 },
      { opp: "KKR", oppColor: C.KKR, wins: 9,  losses: 12 }, { opp: "RCB", oppColor: C.RCB, wins: 9,  losses: 11 },
      { opp: "DC",  oppColor: C.DC,  wins: 9,  losses: 10 }, { opp: "RR",  oppColor: C.RR,  wins: 10, losses: 8  },
      { opp: "PBKS",oppColor: C.PBKS,wins: 12, losses: 7  }, { opp: "GT",  oppColor: C.GT,  wins: 3,  losses: 2  },
      { opp: "LSG", oppColor: C.LSG, wins: 3,  losses: 2  },
    ],
  },
  RR: {
    wins: 74, matches: 213, titles: 1, nrr: "-0.14",
    winBySeasonData: [
      { season: "2020", winPct: 50 }, { season: "2021", winPct: 45 },
      { season: "2022", winPct: 64 }, { season: "2023", winPct: 57 }, { season: "2024", winPct: 64 },
    ],
    battingData: [
      { season: "2020", avgScore: 164, ppScore: 46 }, { season: "2021", avgScore: 160, ppScore: 44 },
      { season: "2022", avgScore: 174, ppScore: 50 }, { season: "2023", avgScore: 171, ppScore: 49 },
      { season: "2024", avgScore: 178, ppScore: 53 },
    ],
    bowlingData: [
      { season: "2020", economy: 8.4 }, { season: "2021", economy: 8.7 },
      { season: "2022", economy: 7.9 }, { season: "2023", economy: 8.1 }, { season: "2024", economy: 8.0 },
    ],
    tossData: [{ name: "Won toss, won match", value: 50 }, { name: "Won toss, lost match", value: 50 }],
    h2h: [
      { opp: "MI",  oppColor: C.MI,  wins: 6,  losses: 14 }, { opp: "CSK", oppColor: C.CSK, wins: 8,  losses: 16 },
      { opp: "KKR", oppColor: C.KKR, wins: 8,  losses: 13 }, { opp: "RCB", oppColor: C.RCB, wins: 9,  losses: 13 },
      { opp: "DC",  oppColor: C.DC,  wins: 8,  losses: 12 }, { opp: "SRH", oppColor: C.SRH, wins: 8,  losses: 10 },
      { opp: "PBKS",oppColor: C.PBKS,wins: 10, losses: 8  }, { opp: "GT",  oppColor: C.GT,  wins: 3,  losses: 2  },
      { opp: "LSG", oppColor: C.LSG, wins: 3,  losses: 2  },
    ],
  },
  PBKS: {
    wins: 68, matches: 224, titles: 0, nrr: "-0.22",
    winBySeasonData: [
      { season: "2020", winPct: 44 }, { season: "2021", winPct: 50 },
      { season: "2022", winPct: 43 }, { season: "2023", winPct: 43 }, { season: "2024", winPct: 57 },
    ],
    battingData: [
      { season: "2020", avgScore: 163, ppScore: 46 }, { season: "2021", avgScore: 167, ppScore: 47 },
      { season: "2022", avgScore: 160, ppScore: 44 }, { season: "2023", avgScore: 162, ppScore: 45 },
      { season: "2024", avgScore: 172, ppScore: 50 },
    ],
    bowlingData: [
      { season: "2020", economy: 8.6 }, { season: "2021", economy: 8.8 },
      { season: "2022", economy: 9.0 }, { season: "2023", economy: 8.9 }, { season: "2024", economy: 8.4 },
    ],
    tossData: [{ name: "Won toss, won match", value: 48 }, { name: "Won toss, lost match", value: 52 }],
    h2h: [
      { opp: "MI",  oppColor: C.MI,  wins: 5,  losses: 17 }, { opp: "CSK", oppColor: C.CSK, wins: 7,  losses: 15 },
      { opp: "KKR", oppColor: C.KKR, wins: 7,  losses: 15 }, { opp: "RCB", oppColor: C.RCB, wins: 8,  losses: 14 },
      { opp: "DC",  oppColor: C.DC,  wins: 8,  losses: 13 }, { opp: "SRH", oppColor: C.SRH, wins: 7,  losses: 12 },
      { opp: "RR",  oppColor: C.RR,  wins: 8,  losses: 10 }, { opp: "GT",  oppColor: C.GT,  wins: 2,  losses: 2  },
      { opp: "LSG", oppColor: C.LSG, wins: 3,  losses: 3  },
    ],
  },
  GT: {
    wins: 35, matches: 67, titles: 1, nrr: "+0.17",
    winBySeasonData: [
      { season: "2022", winPct: 64 }, { season: "2023", winPct: 64 }, { season: "2024", winPct: 50 },
    ],
    battingData: [
      { season: "2022", avgScore: 170, ppScore: 49 }, { season: "2023", avgScore: 172, ppScore: 50 }, { season: "2024", avgScore: 175, ppScore: 52 },
    ],
    bowlingData: [
      { season: "2022", economy: 7.8 }, { season: "2023", economy: 7.9 }, { season: "2024", economy: 8.3 },
    ],
    tossData: [{ name: "Won toss, won match", value: 56 }, { name: "Won toss, lost match", value: 44 }],
    h2h: [
      { opp: "MI",   oppColor: C.MI,   wins: 1, losses: 3 }, { opp: "CSK",  oppColor: C.CSK,  wins: 2, losses: 3 },
      { opp: "KKR",  oppColor: C.KKR,  wins: 2, losses: 4 }, { opp: "RCB",  oppColor: C.RCB,  wins: 2, losses: 3 },
      { opp: "DC",   oppColor: C.DC,   wins: 2, losses: 3 }, { opp: "SRH",  oppColor: C.SRH,  wins: 2, losses: 3 },
      { opp: "RR",   oppColor: C.RR,   wins: 2, losses: 3 }, { opp: "PBKS", oppColor: C.PBKS, wins: 2, losses: 2 },
      { opp: "LSG",  oppColor: C.LSG,  wins: 3, losses: 3 },
    ],
  },
  LSG: {
    wins: 28, matches: 62, titles: 0, nrr: "+0.04",
    winBySeasonData: [
      { season: "2022", winPct: 57 }, { season: "2023", winPct: 57 }, { season: "2024", winPct: 50 },
    ],
    battingData: [
      { season: "2022", avgScore: 166, ppScore: 47 }, { season: "2023", avgScore: 171, ppScore: 49 }, { season: "2024", avgScore: 174, ppScore: 51 },
    ],
    bowlingData: [
      { season: "2022", economy: 8.2 }, { season: "2023", economy: 8.1 }, { season: "2024", economy: 8.5 },
    ],
    tossData: [{ name: "Won toss, won match", value: 52 }, { name: "Won toss, lost match", value: 48 }],
    h2h: [
      { opp: "MI",   oppColor: C.MI,   wins: 2, losses: 4 }, { opp: "CSK",  oppColor: C.CSK,  wins: 1, losses: 4 },
      { opp: "KKR",  oppColor: C.KKR,  wins: 1, losses: 5 }, { opp: "RCB",  oppColor: C.RCB,  wins: 2, losses: 4 },
      { opp: "DC",   oppColor: C.DC,   wins: 2, losses: 3 }, { opp: "SRH",  oppColor: C.SRH,  wins: 2, losses: 3 },
      { opp: "RR",   oppColor: C.RR,   wins: 2, losses: 3 }, { opp: "PBKS", oppColor: C.PBKS, wins: 3, losses: 3 },
      { opp: "GT",   oppColor: C.GT,   wins: 3, losses: 3 },
    ],
  },
};

// ─── Shared Components ────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px" }}>
      <p style={{ color: C.muted, fontSize: 12, marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: <span style={{ color: C.text }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
};

const KPICard = ({ label, value, sub, subColor, icon: Icon }: { label: string; value: string; sub?: string; subColor?: string; icon?: React.ElementType }) => (
  <div className="flex-1 rounded-xl p-5 flex flex-col gap-2" style={{ background: C.card, border: `1px solid ${C.border}` }}>
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium" style={{ color: C.muted }}>{label}</span>
      {Icon && <Icon size={16} style={{ color: C.muted }} />}
    </div>
    <span className="text-3xl font-bold tracking-tight" style={{ color: C.text }}>{value}</span>
    {sub && <span className="text-xs font-medium px-2 py-0.5 rounded-full w-fit" style={{ background: subColor === "green" ? C.tealDim : C.orangeDim, color: subColor === "green" ? C.teal : C.orange }}>{sub}</span>}
  </div>
);

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ElementType }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon size={16} style={{ color: C.orange }} />}
    <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: C.muted }}>{children}</h3>
  </div>
);

const TeamPill = ({ teamId }: { teamId: string }) => {
  const team = TEAMS.find(t => t.id === teamId);
  if (!team) return null;
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${team.color}25`, color: team.color, border: `1px solid ${team.color}40` }}>
      {teamId}
    </span>
  );
};

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button onClick={onChange} className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors" style={{ background: checked ? C.orange : C.border }}>
    <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform" style={{ transform: `translateX(${checked ? "18px" : "2px"})` }} />
  </button>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview", label: "Overview",   icon: LayoutDashboard },
  { id: "teams",    label: "Teams",      icon: Shield },
  { id: "players",  label: "Players",    icon: User },
  { id: "venues",   label: "Venues",     icon: Target },
  { id: "bestxi",   label: "Best XI",    icon: Award },
];

const Navbar = ({ activePage, onNavigate, mobileOpen, setMobileOpen }: {
  activePage: string; onNavigate: (p: string) => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void;
}) => (
  <>
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14" style={{ background: `${C.bg}ee`, borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(12px)" }}>
      <div className="flex items-center gap-2">
        <button className="md:hidden mr-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: C.text }}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="text-lg font-bold tracking-tight" style={{ color: C.orange }}>🏏 IPL Dashboard</span>
      </div>
      <div className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: activePage === item.id ? C.orangeDim : "transparent", color: activePage === item.id ? C.orange : C.muted }}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
          2024 <ChevronDown size={14} style={{ color: C.muted }} />
        </div>
        <button className="hidden md:flex" style={{ color: C.muted }}><Bell size={18} /></button>
      </div>
    </nav>
    {mobileOpen && (
      <div className="md:hidden" style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
            className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium"
            style={{ color: activePage === item.id ? C.orange : C.text, background: activePage === item.id ? C.orangeDim : "transparent" }}>
            <item.icon size={16} /> {item.label}
          </button>
        ))}
      </div>
    )}
  </>
);

// ─── Overview Page ─────────────────────────────────────────────────────────────
const OverviewPage = () => {
  const teamColors: Record<string, string> = { MI: C.MI, CSK: C.CSK, RCB: C.RCB, KKR: C.KKR, DC: C.DC };
  const teamLabels = Object.keys(teamColors);

  return (
    <div className="p-6 space-y-6 max-w-[1440px] mx-auto">
      {/* KPI Row */}
      <div className="flex gap-4 flex-wrap">
        <KPICard label="Total Matches" value="74" sub="+6 vs last season" subColor="green" icon={Zap} />
        <KPICard label="Avg Score" value="178.4" sub="per innings" subColor="orange" icon={TrendingUp} />
        <KPICard label="Highest Score" value="287/2" sub="MI vs RCB" subColor="orange" icon={Award} />
        <KPICard label="Most Sixes" value="1,234" sub="IPL 2024 record" subColor="green" icon={Trophy} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Win Rate by Season */}
        <div className="lg:col-span-3 rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <SectionTitle icon={TrendingUp}>Win Rate by Season</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={WIN_RATE_DATA}>
              <defs>
                {teamLabels.map(t => (
                  <linearGradient key={t} id={`grad${t}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={teamColors[t]} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={teamColors[t]} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="season" tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 12 }} axisLine={false} tickLine={false} unit="%" domain={[20, 90]} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 16 }} formatter={(v) => <span style={{ color: C.muted, fontSize: 12 }}>{v}</span>} />
              {teamLabels.map(t => (
                <Area key={t} type="monotone" dataKey={t} stroke={teamColors[t]} strokeWidth={2} fill={`url(#grad${t})`} dot={{ fill: teamColors[t], r: 3 }} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* All-Time Wins Horizontal Bar */}
        <div className="lg:col-span-2 rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <SectionTitle icon={Trophy}>All-Time Wins</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ALL_TIME_WINS} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="team" width={130} tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="wins" radius={[0, 6, 6, 0]} label={{ position: "right", fill: C.muted, fontSize: 11 }}>
                {ALL_TIME_WINS.map((entry, i) => (
                  <Cell key={i} fill={entry.highlight ? C.orange : `${C.orange}70`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Matches Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: `1px solid ${C.border}` }}>
          <Zap size={15} style={{ color: C.orange }} />
          <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: C.muted }}>Recent Matches</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Match", "Winner", "Margin", "Venue", "Date"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: C.muted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_MATCHES.map((m, i) => (
                <tr key={i} className="transition-colors" style={{ background: i % 2 === 0 ? C.card : C.bg, borderBottom: `1px solid ${C.border}30` }}>
                  <td className="px-5 py-3.5 font-medium" style={{ color: C.text }}>{m.match}</td>
                  <td className="px-5 py-3.5"><TeamPill teamId={m.wid} /></td>
                  <td className="px-5 py-3.5" style={{ color: C.muted }}>{m.margin}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: C.muted }}>{m.venue}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: C.muted }}>{m.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Teams Page ────────────────────────────────────────────────────────────────
const TeamsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState("MI");
  const data = TEAM_DATA[selectedTeam];
  const team = TEAMS.find(t => t.id === selectedTeam)!;
  const tossTotal = data.tossData[0].value + data.tossData[1].value;
  const tossWinPct = Math.round((data.tossData[0].value / tossTotal) * 100);

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 overflow-y-auto p-4 gap-4" style={{ background: C.card, borderRight: `1px solid ${C.border}` }}>
        <p className="text-xs font-semibold uppercase tracking-widest px-2" style={{ color: C.muted }}>Select Team</p>
        <div className="space-y-1">
          {TEAMS.map(t => (
            <button key={t.id} onClick={() => setSelectedTeam(t.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all"
              style={{
                background: selectedTeam === t.id ? `${t.color}18` : "transparent",
                color: selectedTeam === t.id ? t.color : C.muted,
                borderLeft: selectedTeam === t.id ? `3px solid ${t.color}` : "3px solid transparent",
              }}>
              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${t.color}30`, color: t.color }}>
                {t.id.slice(0, 2)}
              </span>
              <span className="truncate font-medium">{t.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Team Header */}
        <div className="rounded-xl px-6 py-4 flex flex-wrap items-center justify-between gap-4" style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${team.color}` }}>
          <div>
            <h2 className="text-xl font-bold" style={{ color: team.color }}>{team.name}</h2>
            <p className="text-xs mt-0.5" style={{ color: C.muted }}>IPL 2024 Season</p>
          </div>
          <div className="flex gap-3 flex-wrap text-sm">
            {[
              { label: "Matches", val: data.matches },
              { label: "Wins",    val: data.wins },
              { label: "Win%",    val: `${team.winPct}%` },
              { label: "Titles",  val: data.titles },
              { label: "NRR",     val: data.nrr },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center px-4 py-2 rounded-lg" style={{ background: C.bg }}>
                <span className="text-lg font-bold" style={{ color: C.text }}>{item.val}</span>
                <span className="text-xs" style={{ color: C.muted }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 1: Win % + Toss Donut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <SectionTitle>Win % by Season</SectionTitle>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data.winBySeasonData}>
                <defs>
                  <linearGradient id="teamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={team.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={team.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="season" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="winPct" name="Win %" stroke={team.color} strokeWidth={2} fill="url(#teamGrad)" dot={{ fill: team.color, r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <SectionTitle>Toss Win → Match Win</SectionTitle>
            <div className="relative flex items-center justify-center" style={{ height: 200 }}>
              <PieChart width={200} height={200}>
                <Pie data={data.tossData} cx={100} cy={100} innerRadius={62} outerRadius={88} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                  <Cell fill={C.teal} />
                  <Cell fill={C.red} />
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }} />
              </PieChart>
              <div className="absolute flex flex-col items-center pointer-events-none">
                <span className="text-3xl font-bold" style={{ color: C.teal }}>{tossWinPct}%</span>
                <span className="text-xs" style={{ color: C.muted }}>win rate</span>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {[{ label: "Won & Won", color: C.teal }, { label: "Won & Lost", color: C.red }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                  <span className="text-xs" style={{ color: C.muted }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Batting + Bowling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <SectionTitle>Batting Performance</SectionTitle>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.battingData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="season" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[30, 210]} />
                <Tooltip content={<ChartTooltip />} />
                <Legend formatter={(v) => <span style={{ color: C.muted, fontSize: 11 }}>{v}</span>} />
                <Bar dataKey="avgScore" name="Avg Score" fill={C.orange} radius={[4, 4, 0, 0]} />
                <Bar dataKey="ppScore"  name="Powerplay" fill={C.teal}   radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <SectionTitle>Bowling Economy Rate</SectionTitle>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.bowlingData}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="season" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} tickLine={false} domain={[6, 11]} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="economy" name="Economy" radius={[4, 4, 0, 0]}>
                  {data.bowlingData.map((entry, i) => (
                    <Cell key={i} fill={entry.economy < 8.0 ? C.teal : entry.economy < 8.5 ? C.orange : C.red} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* H2H Grid */}
        <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <SectionTitle icon={Users}>Head to Head</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {data.h2h.slice(0, 9).map((h, i) => {
              const total = h.wins + h.losses;
              const pct = Math.round((h.wins / total) * 100);
              return (
                <div key={i} className="rounded-lg p-3 space-y-2" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: `${h.oppColor}25`, color: h.oppColor }}>{h.opp}</span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: C.text }}>W{h.wins} / L{h.losses}</p>
                      <p className="text-xs" style={{ color: C.muted }}>{pct}% wins</p>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: C.border }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 50 ? C.teal : C.red }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── Players Page ──────────────────────────────────────────────────────────────
const PlayersPage = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(1);

  const filters = ["All", "Batsmen", "Bowlers", "All-rounders", "WK"];

  const player1 = TOP_BATSMEN[p1];
  const player2 = TOP_BATSMEN[p2];

  const compareStats = [
    { label: "Runs",    p1: player1.runs,  p2: player2.runs,  max: 800 },
    { label: "Avg",     p1: player1.avg,   p2: player2.avg,   max: 70 },
    { label: "SR",      p1: player1.sr,    p2: player2.sr,    max: 210 },
    { label: "Fours",   p1: player1.fours, p2: player2.fours, max: 80 },
    { label: "Sixes",   p1: player1.sixes, p2: player2.sixes, max: 50 },
    { label: "HS",      p1: player1.hs,    p2: player2.hs,    max: 130 },
  ];

  return (
    <div className="p-5 space-y-4 max-w-[1440px] mx-auto">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-64" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
          <Search size={14} style={{ color: C.muted }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search player name..." className="bg-transparent text-sm outline-none w-full" style={{ color: C.text }} />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: filter === f ? C.orange : C.bg, color: filter === f ? "#fff" : C.muted, border: `1px solid ${filter === f ? C.orange : C.border}` }}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ml-auto" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.muted }}>
          Season: 2022, 2023, 2024 <ChevronDown size={12} />
        </div>
      </div>

      {/* 3-Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Run Scorers */}
        <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <SectionTitle icon={Trophy}>Top Run Scorers</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TOP_BATSMEN} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fill: C.muted, fontSize: 9, angle: -40, textAnchor: "end" }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }} />
              <Bar dataKey="runs" name="Runs" fill={C.orange} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Podium */}
          <div className="flex items-end justify-center gap-2 mt-4">
            {[TOP_BATSMEN[1], TOP_BATSMEN[0], TOP_BATSMEN[2]].map((p, i) => {
              const rank = [2, 1, 3][i];
              const h = [56, 72, 44][i];
              return (
                <div key={p.name} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold" style={{ color: rank === 1 ? C.orange : C.muted }}>#{rank}</span>
                  <div className="w-14 rounded-t-lg flex items-center justify-center" style={{ height: h, background: rank === 1 ? C.orangeDim : C.bg, border: `1px solid ${rank === 1 ? C.orange : C.border}` }}>
                    <span className="text-xs font-semibold" style={{ color: C.text }}>{p.runs}</span>
                  </div>
                  <span className="text-xs text-center leading-tight" style={{ color: C.muted, width: 56 }}>{p.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Wicket Takers */}
        <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <SectionTitle icon={Target}>Top Wicket Takers</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TOP_BOWLERS} margin={{ bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fill: C.muted, fontSize: 9, angle: -40, textAnchor: "end" }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }} />
              <Bar dataKey="wkts" name="Wickets" fill={C.teal} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-end justify-center gap-2 mt-4">
            {[TOP_BOWLERS[1], TOP_BOWLERS[0], TOP_BOWLERS[2]].map((p, i) => {
              const rank = [2, 1, 3][i];
              const h = [56, 72, 44][i];
              return (
                <div key={p.name} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold" style={{ color: rank === 1 ? C.teal : C.muted }}>#{rank}</span>
                  <div className="w-14 rounded-t-lg flex items-center justify-center" style={{ height: h, background: rank === 1 ? C.tealDim : C.bg, border: `1px solid ${rank === 1 ? C.teal : C.border}` }}>
                    <span className="text-xs font-semibold" style={{ color: C.text }}>{p.wkts}</span>
                  </div>
                  <span className="text-xs text-center leading-tight" style={{ color: C.muted, width: 56 }}>{p.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SR vs Avg Scatter */}
        <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <SectionTitle icon={TrendingUp}>Strike Rate vs Average</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis type="number" dataKey="avg" name="Average" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: "Avg", position: "insideBottomRight", fill: C.muted, fontSize: 10 }} />
              <YAxis type="number" dataKey="sr" name="Strike Rate" tick={{ fill: C.muted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <ZAxis type="number" dataKey="matches" range={[40, 160]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }}
                formatter={(v: number, n: string) => [v, n]} />
              <Scatter data={PLAYER_SCATTER.filter(p => p.type === "bat")} name="Batsman" fill={C.orange} fillOpacity={0.8} />
              <Scatter data={PLAYER_SCATTER.filter(p => p.type === "ar")}  name="All-rounder" fill={C.teal} fillOpacity={0.8} />
              <Scatter data={PLAYER_SCATTER.filter(p => p.type === "bwl")} name="Bowler" fill={C.MI} fillOpacity={0.8} />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {[{ label: "Aggressive", desc: "High SR + High Avg" }, { label: "Consistent", desc: "Low SR + High Avg" }].map(q => (
              <span key={q.label} className="text-xs px-2 py-1 rounded" style={{ background: C.bg, color: C.muted }}>{q.label}: {q.desc}</span>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            {[{ label: "Batsman", color: C.orange }, { label: "All-rounder", color: C.teal }, { label: "Bowler", color: C.MI }].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-xs" style={{ color: C.muted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player Comparison */}
      <div className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <SectionTitle icon={Users}>Player Comparison</SectionTitle>
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <select value={p1} onChange={e => setP1(Number(e.target.value))} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}>
            {TOP_BATSMEN.map((p, i) => <option key={i} value={i}>{p.full}</option>)}
          </select>
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold" style={{ background: C.orangeDim, color: C.orange }}>VS</div>
          <select value={p2} onChange={e => setP2(Number(e.target.value))} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}>
            {TOP_BATSMEN.map((p, i) => <option key={i} value={i}>{p.full}</option>)}
          </select>
        </div>
        <div className="space-y-3">
          {compareStats.map(stat => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex-1 flex justify-end">
                <div className="h-6 rounded-l-full flex items-center justify-end pr-2" style={{ width: `${(stat.p1 / stat.max) * 100}%`, background: `${C.orange}30`, minWidth: 24 }}>
                  <span className="text-xs font-semibold" style={{ color: C.orange }}>{stat.p1}</span>
                </div>
              </div>
              <span className="text-xs font-semibold w-12 text-center flex-shrink-0" style={{ color: C.muted }}>{stat.label}</span>
              <div className="flex-1">
                <div className="h-6 rounded-r-full flex items-center pl-2" style={{ width: `${(stat.p2 / stat.max) * 100}%`, background: `${C.MI}50`, minWidth: 24 }}>
                  <span className="text-xs font-semibold" style={{ color: C.MI }}>{stat.p2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-xs font-medium" style={{ color: C.orange }}>{player1.full}</span>
          <span className="text-xs font-medium" style={{ color: "#5B9BD5" }}>{player2.full}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Best XI Page ──────────────────────────────────────────────────────────────
const BestXIPage = () => {
  const [batWeight, setBatWeight] = useState(40);
  const [bwlWeight, setBwlWeight] = useState(35);
  const [arWeight, setArWeight] = useState(25);
  const [matchType, setMatchType] = useState("All");
  const [includeForm, setIncludeForm] = useState(true);
  const [weightVenue, setWeightVenue] = useState(false);
  const [powerplay, setPowerplay] = useState(true);
  const [generated, setGenerated] = useState(true);
  const [whyOpen, setWhyOpen] = useState(false);

  const roleColor: Record<string, string> = { BAT: C.orange, BWL: C.teal, AR: "#5B9BD5", WK: C.CSK };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-56px)]">
      {/* Config Panel */}
      <aside className="w-full md:w-80 flex-shrink-0 overflow-y-auto p-5 space-y-5" style={{ background: C.card, borderRight: `1px solid ${C.border}` }}>
        <div className="flex items-center gap-2">
          <Settings size={16} style={{ color: C.orange }} />
          <h2 className="font-semibold" style={{ color: C.text }}>Configure Your XI</h2>
        </div>

        {/* Season Range */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.muted }}>Season Range</p>
          <div className="flex gap-2">
            {["2020", "2021", "2022", "2023", "2024"].map(y => (
              <button key={y} className="flex-1 py-1.5 rounded-lg text-xs font-medium" style={{ background: C.bg, color: C.muted, border: `1px solid ${C.border}` }}>{y.slice(2)}</button>
            ))}
          </div>
        </div>

        {/* Match Type */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.muted }}>Match Type</p>
          <div className="flex gap-2">
            {["Home", "Away", "All"].map(mt => (
              <button key={mt} onClick={() => setMatchType(mt)} className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: matchType === mt ? C.orange : C.bg, color: matchType === mt ? "#fff" : C.muted, border: `1px solid ${matchType === mt ? C.orange : C.border}` }}>
                {mt}
              </button>
            ))}
          </div>
        </div>

        {/* Role Weights */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.muted }}>Role Weights</p>
          {[
            { label: "Batsmen",      val: batWeight, set: setBatWeight, color: C.orange },
            { label: "Bowlers",      val: bwlWeight, set: setBwlWeight, color: C.teal },
            { label: "All-rounders", val: arWeight,  set: setArWeight,  color: "#5B9BD5" },
          ].map(s => (
            <div key={s.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span style={{ color: C.muted }}>{s.label}</span>
                <span className="font-semibold" style={{ color: s.color }}>{s.val}%</span>
              </div>
              <input type="range" min={0} max={100} value={s.val} onChange={e => s.set(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: s.color }} />
            </div>
          ))}
          <p className="text-xs" style={{ color: C.muted }}>Total: <span style={{ color: batWeight + bwlWeight + arWeight === 100 ? C.teal : C.red }}>{batWeight + bwlWeight + arWeight}%</span> (must total 100%)</p>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.muted }}>Performance Metrics</p>
          {[
            { label: "Include Recent Form", val: includeForm, set: setIncludeForm },
            { label: "Weight by Venue",     val: weightVenue, set: setWeightVenue },
            { label: "Consider Powerplay",  val: powerplay,   set: setPowerplay },
          ].map(t => (
            <div key={t.label} className="flex items-center justify-between">
              <span className="text-sm" style={{ color: C.text }}>{t.label}</span>
              <Toggle checked={t.val} onChange={() => t.set(!t.val)} />
            </div>
          ))}
        </div>

        <button onClick={() => setGenerated(true)} className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: C.orange, color: "#fff" }}>
          <RefreshCw size={16} /> Generate XI →
        </button>
      </aside>

      {/* Right Panel */}
      <main className="flex-1 overflow-y-auto p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold" style={{ color: C.text }}>Your Best XI</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted }}>
            <Share2 size={13} /> Share
          </button>
        </div>

        {/* Cricket Field */}
        <div className="rounded-2xl overflow-hidden relative" style={{ height: 340, background: "#0f2d14", border: `1px solid ${C.border}` }}>
          {/* Field gradient */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 85% at 50% 50%, #1a4a1e 0%, #0d2410 100%)" }} />
          {/* Boundary rope */}
          <div className="absolute" style={{ inset: 12, borderRadius: "50%", border: "1.5px dashed #2d6a3a" }} />
          {/* 30-yard circle */}
          <div className="absolute" style={{
            left: "50%", top: "50%", transform: "translate(-50%, -50%)",
            width: "45%", height: "55%", borderRadius: "50%",
            border: "1px dashed #2d6a3a"
          }} />
          {/* Pitch strip */}
          <div className="absolute rounded" style={{
            left: "50%", top: "50%", transform: "translate(-50%, -50%)",
            width: 28, height: 120, background: "#c4a46b"
          }} />
          {/* Stumps */}
          <div className="absolute" style={{ left: "50%", top: "calc(50% - 65px)", transform: "translateX(-50%)", width: 16, height: 6, background: "#8B6914", borderRadius: 2 }} />
          <div className="absolute" style={{ left: "50%", top: "calc(50% + 59px)", transform: "translateX(-50%)", width: 16, height: 6, background: "#8B6914", borderRadius: 2 }} />

          {/* Player chips */}
          {generated && BEST_XI_PLAYERS.map((p) => (
            <div key={p.name} className="absolute flex flex-col items-center gap-0.5" style={{ left: `${p.pos[0]}%`, top: `${p.pos[1]}%`, transform: "translate(-50%, -50%)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                style={{ background: roleColor[p.role], boxShadow: `0 0 12px ${roleColor[p.role]}60` }}>
                {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="px-1.5 py-0.5 rounded text-center" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}>
                <p className="text-white font-semibold leading-tight" style={{ fontSize: 8 }}>{p.name.split(" ").slice(-1)[0]}</p>
                <p className="leading-tight" style={{ fontSize: 7, color: roleColor[p.role] }}>{p.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Player Detail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
          {generated && BEST_XI_PLAYERS.map((p, i) => (
            <div key={p.name} className="rounded-xl p-3 space-y-2" style={{ background: C.card, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: C.muted }}>#{i + 1}</span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${roleColor[p.role]}25`, color: roleColor[p.role] }}>
                  {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight" style={{ color: C.text }}>{p.name}</p>
                <span className="inline-block text-xs px-1.5 py-0.5 rounded mt-0.5 font-bold" style={{ background: `${roleColor[p.role]}20`, color: roleColor[p.role] }}>{p.role}</span>
              </div>
              <p className="text-xs" style={{ color: C.muted }}>{p.stat}</p>
              <div className="flex items-center gap-1">
                {p.form === "up"
                  ? <TrendingUp size={12} style={{ color: C.teal }} />
                  : <TrendingDown size={12} style={{ color: C.red }} />}
                <span className="text-xs" style={{ color: p.form === "up" ? C.teal : C.red }}>{p.form === "up" ? "Form ↑" : "Form ↓"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Why this XI? */}
        <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <button onClick={() => setWhyOpen(!whyOpen)} className="w-full flex items-center justify-between px-5 py-4">
            <span className="text-sm font-semibold" style={{ color: C.text }}>Why this XI?</span>
            {whyOpen ? <ChevronUp size={16} style={{ color: C.muted }} /> : <ChevronDown size={16} style={{ color: C.muted }} />}
          </button>
          {whyOpen && (
            <div className="px-5 pb-5 space-y-3 text-sm" style={{ color: C.muted }}>
              <p><span style={{ color: C.orange }}>Batting depth:</span> Kohli (741 runs, avg 61.7) anchors alongside Head's explosive SR of 191. Gaikwad provides stability at the top.</p>
              <p><span style={{ color: C.teal }}>Bowling attack:</span> Bumrah's economy of 7.2 is the lowest in the tournament. Chahal and Kuldeep form an elite spin duo, picking up 37 wickets combined.</p>
              <p><span style={{ color: "#5B9BD5" }}>All-round balance:</span> Pandya and Dube provide the lower-order firepower and bowling flexibility across conditions.</p>
              <p><span style={{ color: C.CSK }}>Wicketkeeper:</span> Rahul's glove work combined with 520 runs makes him the clear choice, offering consistent contributions at #4.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// ─── Venues Page (placeholder) ────────────────────────────────────────────────
const VenuesPage = () => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] gap-4">
    <Target size={48} style={{ color: C.border }} />
    <h2 className="text-xl font-semibold" style={{ color: C.muted }}>Venues Analytics</h2>
    <p className="text-sm" style={{ color: C.border }}>Venue-specific stats and pitch reports — coming soon</p>
  </div>
);

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────
const MobileNav = ({ activePage, onNavigate }: { activePage: string; onNavigate: (p: string) => void }) => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 flex z-50" style={{ background: C.card, borderTop: `1px solid ${C.border}` }}>
    {NAV_ITEMS.map(item => (
      <button key={item.id} onClick={() => onNavigate(item.id)} className="flex-1 flex flex-col items-center py-2 gap-0.5">
        <item.icon size={18} style={{ color: activePage === item.id ? C.orange : C.muted }} />
        <span className="text-xs" style={{ color: activePage === item.id ? C.orange : C.muted }}>{item.label}</span>
      </button>
    ))}
  </nav>
);

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif" }}>
      <Navbar activePage={activePage} onNavigate={setActivePage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="pb-16 md:pb-0">
        {activePage === "overview" && <OverviewPage />}
        {activePage === "teams"    && <TeamsPage />}
        {activePage === "players"  && <PlayersPage />}
        {activePage === "bestxi"   && <BestXIPage />}
        {activePage === "venues"   && <VenuesPage />}
      </div>
      <MobileNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}
