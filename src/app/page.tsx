"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import Head from "next/head";

{/* Add all styles globally */ }
<style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

       @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
 

      @keyframes cloudDrift {
    0% {
      transform: scale(1) translateY(30px);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.05) translateY(0px);
      opacity: 0.9;
    }
    100% {
      transform: scale(1.1) translateY(-30px);
      opacity: 0.6;
    }
  }

  .mix-blend-screen {
    mix-blend-mode: screen;
  }

  .pink-scrollbar::-webkit-scrollbar {
    height: 8px;
  }

  .pink-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .pink-scrollbar::-webkit-scrollbar-thumb {
    background-color: #be185d;
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  .pink-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #9d174d;
  }

  .pink-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #be185d transparent;
  }

  .octagon-button {
    position: relative;
    padding: 1.5rem 3rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: #0D1127;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
    box-shadow: 0 0 0 5px #5978F3;
  }

  .octagon-button:hover {
    background-color: #0F1C53;
    transform: scale(1.05);
  }

  .octagon-button:active {
    transform: scale(0.95);
  }

  @keyframes borderAnimate1 {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes borderAnimate2 {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes borderAnimate3 {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes borderAnimate4 {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

    @keyframes borderAnimate1 {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes borderAnimate2 {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    @keyframes borderAnimate3 {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    @keyframes borderAnimate4 {
      0% { transform: translateY(100%); }
      100% { transform: translateY(-100%); }
    }
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

    /* Custom scrollbar styles - COMPLETELY hide scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .custom-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;     /* Firefox */
    }

    .modal-scrollbar {
      overflow-y: auto;
      overflow-x: hidden;

      /* Firefox */
      scrollbar-width: thin;
      scrollbar-color: #6d28d9 transparent;
    }

    /* Chrome, Safari */
    .modal-scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .modal-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .modal-scrollbar::-webkit-scrollbar-thumb {
      background-color: #6d28d9; /* Purple-700 */
      border-radius: 8px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }

    .modal-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #5b21b6; /* Purple-800 */
    }

    /* Pink scrollbar for goals */
    .pink-scrollbar::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }

    .pink-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .pink-scrollbar::-webkit-scrollbar-thumb {
      background-color: #be185d; /* Pink-700 */
      border-radius: 8px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }

    .pink-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #9d174d; /* Pink-800 */
    }

    .pink-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #be185d transparent;
    }
  `}</style>

// Type definitions
type BubbleColor = "purple" | "blue" | "indigo" | "pink" | "teal";
type Level = 0 | 1 | 2;
type TransitionState = "expanding" | "shrinking" | null;
type PhaseState = "active" | null;
type ScrollDirection = "up" | "down" | null;
type GoalType = 'personal' | 'team' | null;

interface Bubble {
  id: string;
  size: number;
  x: number;
  y: number;
  color: BubbleColor;
}

interface Dot {
  id: string;
  size: number;
  x: number;
  y: number;
  opacity: number;
  vx: number;
  vy: number;
}

interface ColorStyle {
  bg: string;
  glow: string;
}

interface Milestone {
  id: string;
  text: string;
  weightage: number;
  completed?: boolean;
  completionDetails?: CompletionDetails;
}

interface CompletionDetails {
  date: string;
  details: string;
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

interface Goal {
  id: string;
  type: 'personal' | 'team';
  name: string;
  description?: string;
  milestones: Milestone[];
  deadline: string;
  teamMembers?: TeamMember[];
  completed?: boolean;
  progress?: number;
}

interface FuturisticButtonProps {
  onClick: () => void;
}

// Mock team members data
const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Bob Smith', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '3', name: 'Carol Williams', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '4', name: 'David Brown', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '5', name: 'Emma Davis', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '6', name: 'Frank Miller', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '7', name: 'Grace Wilson', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '8', name: 'Henry Taylor', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }
];

const isMobile: boolean = typeof window !== 'undefined' && window.innerWidth <= 768;
const slideOffset: string = isMobile ? '100vw' : '800px';

// Mock data for initial goals (with corrected weightage calculation)
const MOCK_GOALS: Goal[] = [
  {
    id: 'mock-1',
    type: 'personal',
    name: 'Learn Web Development',
    description: 'Master HTML, CSS, JavaScript, and React to become a proficient web developer',
    milestones: [
      { id: 'm1', text: 'Complete HTML & CSS course', weightage: 20, completed: true },
      { id: 'm2', text: 'Build 3 JavaScript projects', weightage: 30, completed: true },
      { id: 'm3', text: 'Learn React fundamentals', weightage: 25, completed: false },
      { id: 'm4', text: 'Create a full-stack application', weightage: 25, completed: false }
    ],
    deadline: '2024-12-31'
  },
  {
    id: 'mock-2',
    type: 'personal',
    name: 'Fitness Challenge',
    description: 'Complete a 90-day fitness transformation program',
    milestones: [
      { id: 'm5', text: 'First 30 days - Foundation', weightage: 30, completed: true },
      { id: 'm6', text: 'Second 30 days - Strength training', weightage: 35, completed: true },
      { id: 'm7', text: 'Final 30 days - Advanced workouts', weightage: 35, completed: true }
    ],
    deadline: '2024-08-15'
  },
  {
    id: 'mock-3',
    type: 'team',
    name: 'Q2 Product Launch',
    description: 'Launch our new SaaS platform with all core features by the end of Q2',
    milestones: [
      { id: 'm8', text: 'Backend API development', weightage: 40, completed: true },
      { id: 'm9', text: 'Frontend UI implementation', weightage: 30, completed: true },
      { id: 'm10', text: 'Testing and quality assurance', weightage: 15, completed: true },
      { id: 'm11', text: 'Marketing and documentation', weightage: 15, completed: false }
    ],
    deadline: '2024-06-30',
    teamMembers: [
      { id: '1', name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: '2', name: 'Bob Smith', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '4', name: 'David Brown', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }
    ]
  },
  {
    id: 'mock-4',
    type: 'team',
    name: 'Office Redesign Project',
    description: 'Renovate the workspace to improve productivity and employee satisfaction',
    milestones: [
      { id: 'm12', text: 'Design consultation and planning', weightage: 25, completed: true },
      { id: 'm13', text: 'Procurement of furniture and equipment', weightage: 30, completed: true },
      { id: 'm14', text: 'Installation and setup', weightage: 30, completed: true },
      { id: 'm15', text: 'Employee feedback and adjustments', weightage: 15, completed: true }
    ],
    deadline: '2024-09-01',
    teamMembers: [
      { id: '3', name: 'Carol Williams', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: '5', name: 'Emma Davis', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { id: '6', name: 'Frank Miller', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ]
  }
];

// Configuration
const BUBBLES: Bubble[] = [
  { id: "1", size: 450, x: -15, y: -15, color: "purple" },
  { id: "8", size: 350, x: 25, y: -25, color: "purple" },
  { id: "2", size: 350, x: 90, y: -20, color: "blue" },
  { id: "9", size: 150, x: 70, y: 15, color: "blue" },
  { id: "3", size: 250, x: -10, y: 70, color: "indigo" },
  { id: "4", size: 290, x: 85, y: 45, color: "pink" },
  { id: "5", size: 180, x: 50, y: 40, color: "teal" },
  { id: "6", size: 210, x: 20, y: 60, color: "purple" },
  { id: "7", size: 190, x: 70, y: 85, color: "blue" }
];

// Enhanced color style map with stronger glow effects
const colorStyleMap: Record<BubbleColor, ColorStyle> = {
  purple: { bg: "#6b21a8", glow: "rgba(192,132,252,0.9)" },
  blue: { bg: "#1e40af", glow: "rgba(96,165,250,0.9)" },
  indigo: { bg: "#4338ca", glow: "rgba(129,140,248,0.9)" },
  pink: { bg: "#be185d", glow: "rgba(244,114,182,0.9)" },
  teal: { bg: "#0f766e", glow: "rgba(94,234,212,0.9)" },
};

// FuturisticButton with typed props
const FuturisticButton: React.FC<{ onClick: () => void; fadeOut?: boolean }> = ({ onClick, fadeOut = false }) => {
  return (
    <>
      <div className="relative mt-[300px]">
        {/* Rectangular button with slightly curved borders */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          animate={{
            opacity: fadeOut ? 0 : 1,
            y: fadeOut ? 30 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative inline-block px-16 py-8 text-2xl tracking-widest uppercase text-[#1670f0] font-semibold rounded-md shadow-lg shadow-black/80 overflow-hidden font-sans no-underline border-none bg-transparent cursor-pointer"
        >
          {/* Reflective overlay on left */}
          <span className="absolute top-0.5 left-0.5 bottom-0.5 w-1/2 bg-white/5"></span>

          {/* Top border animation */}
          <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0c002b] to-[#1779ff] animate-[borderAnimate1_2s_linear_infinite_1s]"></span>

          {/* Right border animation */}
          <span className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#0c002b] to-[#1779ff] animate-[borderAnimate2_2s_linear_infinite_2s]"></span>

          {/* Bottom border animation */}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-l from-[#0c002b] to-[#1779ff] animate-[borderAnimate3_2s_linear_infinite_1s]"></span>

          {/* Left border animation */}
          <span className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-t from-[#0c002b] to-[#1779ff] animate-[borderAnimate4_2s_linear_infinite_2s]"></span>

          Make a New Goal
        </motion.button>
      </div>


    </>
  );
};

// Create floating dots with typed return
const createDots = (): Dot[] =>
  Array.from({ length: 200 }).map((_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const speed = 0.1;
    return {
      id: `dot-${i}`,
      size: Math.random() * 5 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    };
  });

// Helper function to calculate progress from milestones with typed parameters and return
const calculateGoalProgress = (milestones: Milestone[]): number => {
  if (!milestones.length) return 0;

  const totalWeight = milestones.reduce((sum, m) => sum + m.weightage, 0);
  const completedWeight = milestones
    .filter(m => m.completed)
    .reduce((sum, m) => sum + m.weightage, 0);

  return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
};

// Process and update goals with typed parameters and return
const processGoals = (goals: Goal[]): Goal[] => {
  return goals.map(goal => {
    const progress = calculateGoalProgress(goal.milestones);
    return {
      ...goal,
      progress,
      completed: progress === 100
    };
  });
};

const GoalTracker: React.FC = () => {
  // State management with proper typing
  const [level, setLevel] = useState<Level>(0);
  const [transitioning, setTransitioning] = useState<TransitionState>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [dots, setDots] = useState<Dot[]>(createDots());
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);
  const [cloudPhase, setCloudPhase] = useState<PhaseState>(null);
  const [scrollPhase, setScrollPhase] = useState<PhaseState>(null);
  const [fadeLevel1, setFadeLevel1] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  // Goal management states with proper typing
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [goalType, setGoalType] = useState<GoalType>(null);
  const [goalName, setGoalName] = useState<string>('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState<string>('');
  const [currentWeightage, setCurrentWeightage] = useState<number>(0);
  const [deadline, setDeadline] = useState<string>('');
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [goalDescription, setGoalDescription] = useState<string>('');

  // Level 2 states with proper typing
  const [showGoalsModal, setShowGoalsModal] = useState<boolean>(false);
  const [activeGoalType, setActiveGoalType] = useState<GoalType>(null);
  const [modalTransition, setModalTransition] = useState<boolean>(false);

  // Goal details states with proper typing
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showGoalDetails, setShowGoalDetails] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedGoal, setEditedGoal] = useState<Goal | null>(null);
  const [showMilestoneCompletionForm, setShowMilestoneCompletionForm] = useState<boolean>(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [milestoneDate, setMilestoneDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [milestoneDetails, setMilestoneDetails] = useState<string>('');
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const touchThreshold: number = 50; // Minimum distance to trigger a swipe
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const [fadeLevel3, setFadeLevel3] = useState<boolean>(false);

  useEffect(() => {
    // Prevent manual scrolling on Level 3
    if (level === 2) {
      const handleManualWheel = (e: WheelEvent) => {
        // Only allow scrolling for level transitions
        if (!transitioning && Math.abs(e.deltaY) < 50) {
          e.preventDefault();
        }
      };

      window.addEventListener("wheel", handleManualWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleManualWheel);
      };
    }
  }, [level, transitioning]);
  // Load goals from localStorage or use mock data
  useEffect(() => {
    const savedGoals = localStorage.getItem('userGoals');
    const userGoals: Goal[] = savedGoals ? JSON.parse(savedGoals) : [];

    // Process mock goals and user goals to ensure consistent progress calculation
    const processedMockGoals = processGoals(MOCK_GOALS);
    const processedUserGoals = processGoals(userGoals);

    setGoals([...processedMockGoals, ...processedUserGoals]);
  }, []);



  // Set document body overflow based on modal state
  useEffect(() => {
    if (isModalOpen || showGoalsModal || showGoalDetails) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, showGoalsModal, showGoalDetails]);

  // Mouse tracking with typed event handler
  const handleMouseMove = (e: MouseEvent): void => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Add these handlers for touch events
  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStartY(e.touches[0].clientY);
    setTouchStartX(e.touches[0].clientX);
    setIsTouching(true);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    // Only prevent default if we're not in a scrollable area
    if (!isInScrollableArea(e.target as HTMLElement)) {
      e.preventDefault();
    }
  };


  const handleTouchEnd = (e: React.TouchEvent): void => {
    if (!touchStartY || !touchStartX || !isTouching) return;

    const touchEndY: number = e.changedTouches[0].clientY;
    const touchEndX: number = e.changedTouches[0].clientX;
    const deltaY: number = touchStartY - touchEndY;
    const deltaX: number = touchStartX - touchEndX;

    // Reset touch state
    setIsTouching(false);
    setTouchStartY(null);
    setTouchStartX(null);

    // If we're in a scrollable area, don't process swipe for level transitions
    if (isInScrollableArea(e.target as HTMLElement)) {
      return;
    }

    // Determine if this is mostly a horizontal or vertical swipe
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // Vertical swipe - use for level transitions if it's not in a modal
      if (Math.abs(deltaY) < touchThreshold) return;

      // Only process vertical swipes for level transitions if we're not in a modal
      if (!isModalOpen && !showGoalsModal && !showGoalDetails) {
        processDirectionalInput(deltaY);
      }
    } else {
      // Horizontal swipe - use for goal list navigation
      if (Math.abs(deltaX) < touchThreshold) return;

      // Process horizontal swipe only in goal lists
      if (showGoalsModal && horizontalScrollRef.current) {
        const scrollContainer = horizontalScrollRef.current;
        // Scroll left or right based on swipe direction
        scrollContainer.scrollBy({
          left: deltaX > 0 ? 400 : -400, // Scroll distance
          behavior: 'smooth'
        });
      }
    }
  };

  const isInScrollableArea = (element: HTMLElement): boolean => {
    // Check if we're inside a modal with scrollable content
    const isInModalScrollable = !!element.closest('.modal-scrollbar');
    const isInHideScrollbar = !!element.closest('.hide-scrollbar');
    const isInPinkScrollbar = !!element.closest('.pink-scrollbar');
    const isInCustomScrollbar = !!element.closest('.custom-scrollbar');

    return isInModalScrollable || isInHideScrollbar || isInPinkScrollbar || isInCustomScrollbar;
  };

  // Create a unified function to handle both wheel and touch events
  const processDirectionalInput = (deltaY: number): void => {
    // If a modal is open
    if (isModalOpen || showGoalsModal || showGoalDetails) {
      // Allow scroll inside modal content only
      return;
    }

    // Level transitions
    if (deltaY > 0 && level === 0 && !transitioning) {
      // Set fadeLevel1 FIRST before any transitions
      setFadeLevel1(true);

      // Add a small delay before starting the transition animations
      setTimeout(() => {
        // Level 0 to 1 (down) - starts fading earlier
        setTransitioning("expanding");
        setScrollDirection("down");
        setCloudPhase("active");

        setTimeout(() => {
          setScrollPhase("active");
        }, 300);

        setTimeout(() => {
          setTransitioning(null);
          setCloudPhase(null);
          setScrollPhase(null);
          setLevel(1);
          setFadeLevel1(false);
          setScrollDirection(null);
        }, 1200);
      }, 200); // Small delay to allow cards to fade first
    }
    else if (deltaY > 0 && level === 1 && !transitioning) {
      // Set fadeLevel1 FIRST before any transitions
      setFadeLevel1(true);

      // Add a small delay before starting the transition animations
      setTimeout(() => {
        // Level 1 to 2 (down) - starts fading earlier
        setTransitioning("expanding");
        setScrollDirection("down");
        setCloudPhase("active");

        setTimeout(() => {
          setScrollPhase("active");
        }, 300);

        setTimeout(() => {
          setTransitioning(null);
          setCloudPhase(null);
          setScrollPhase(null);
          setLevel(2);
          setFadeLevel1(false);
          setScrollDirection(null);
        }, 1200);
      }, 200); // Small delay to allow cards to fade first
    }
    else if (deltaY < 0 && level === 1 && !transitioning) {
      // Set fadeLevel1 FIRST before any transitions
      setFadeLevel1(true);

      // Add a small delay before starting the transition animations
      setTimeout(() => {
        // Level 1 to 0 (up) - starts transitioning earlier
        setScrollDirection("up");
        setTransitioning("shrinking");
        setCloudPhase("active");
        setScrollPhase("active");

        setTimeout(() => {
          setScrollPhase(null);
          setCloudPhase(null);
          setLevel(0);
          setTransitioning(null);
          setFadeLevel1(false);
          setScrollDirection(null);
        }, 1000);
      }, 200); // Small delay to allow cards to fade first
    }
    else if (deltaY < 0 && level === 2 && !transitioning) {
      // First set fadeLevel3 to true to fade out level 3 content
      setFadeLevel3(true);

      // Add a small delay before starting the transition animations
      setTimeout(() => {
        // Level 2 to 1 (up) - starts transitioning earlier
        setScrollDirection("up");
        setTransitioning("shrinking");
        setCloudPhase("active");
        setScrollPhase("active");

        setTimeout(() => {
          setScrollPhase(null);
          setCloudPhase(null);
          setLevel(1);
          setTransitioning(null);
          setFadeLevel3(false); // Reset the fade state
          setScrollDirection(null);
        }, 1000);
      }, 200); // Small delay to allow content to fade first
    }
  };

  // Wheel event handler with typed event
  const handleWheel = (e: WheelEvent): void => {
    // Check if the wheel event originated in a scrollable container
    const target = e.target as HTMLElement;
    const isInModalScrollable = !!target.closest('.modal-scrollbar');
    const isInHideScrollbar = !!target.closest('.hide-scrollbar');
    const isInPinkScrollbar = !!target.closest('.pink-scrollbar');
    const isInCustomScrollbar = !!target.closest('.custom-scrollbar');

    // If we're in a scrollable area, let the default scroll happen
    if (isInModalScrollable || isInHideScrollbar || isInPinkScrollbar || isInCustomScrollbar) {
      return;
    }

    // Prevent default scrolling for level transitions
    e.preventDefault();

    // Process the wheel event for level transitions
    processDirectionalInput(e.deltaY);
  };
  // Animate floating dots
  const animateDots = (): void => {
    setDots(prevDots =>
      prevDots.map(dot => {
        let newX = (dot.x + dot.vx + 100) % 100;
        let newY = (dot.y + dot.vy + 100) % 100;

        if (mousePos.x > 0 && mousePos.y > 0) {
          const dotX = (newX / 100) * window.innerWidth;
          const dotY = (newY / 100) * window.innerHeight;
          const dx = mousePos.x - dotX;
          const dy = mousePos.y - dotY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const force = 1000 / (distance * distance + 100);
            newX -= (dx / distance) * force;
            newY -= (dy / distance) * force;
          }
        }

        // Occasionally change direction
        let newVX = dot.vx;
        let newVY = dot.vy;
        if (Math.random() < 0.01) {
          const angle = Math.random() * 2 * Math.PI;
          const speed = 0.1;
          newVX = Math.cos(angle) * speed;
          newVY = Math.sin(angle) * speed;
        }

        return {
          ...dot,
          x: newX,
          y: newY,
          vx: newVX,
          vy: newVY
        };
      })
    );
    animationRef.current = requestAnimationFrame(animateDots);
  };

  // Update your useEffect to add touch event listeners
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateDots);

    const handleWheelEvent = (e: WheelEvent): void => handleWheel(e);
    const handleMouseMoveEvent = (e: MouseEvent): void => handleMouseMove(e);
    const handleTouchStartEvent = (e: TouchEvent): void => {
      // Convert DOM event to React event for processing
      handleTouchStart(e as unknown as React.TouchEvent);
    };
    const handleTouchMoveEvent = (e: TouchEvent): void => {
      // Convert DOM event to React event for processing
      handleTouchMove(e as unknown as React.TouchEvent);
    };
    const handleTouchEndEvent = (e: TouchEvent): void => {
      // Convert DOM event to React event for processing
      handleTouchEnd(e as unknown as React.TouchEvent);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("wheel", handleWheelEvent, { passive: false });
      window.addEventListener("mousemove", handleMouseMoveEvent);
      window.addEventListener("touchstart", handleTouchStartEvent, { passive: false });
      window.addEventListener("touchmove", handleTouchMoveEvent, { passive: false });
      window.addEventListener("touchend", handleTouchEndEvent, { passive: false });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener("wheel", handleWheelEvent);
        window.removeEventListener("mousemove", handleMouseMoveEvent);
        window.removeEventListener("touchstart", handleTouchStartEvent);
        window.removeEventListener("touchmove", handleTouchMoveEvent);
        window.removeEventListener("touchend", handleTouchEndEvent);
      }
    };
  }, [level, transitioning, mousePos.x, mousePos.y, isModalOpen, showGoalsModal, showGoalDetails, touchStartY, touchStartX, isTouching]);

  // Goal management handlers with typed parameters
  const handleGoalClick = (goal: Goal): void => {
    setSelectedGoal(goal);
    setShowGoalDetails(true);
  };

  const handleMarkMilestoneComplete = (
    goalId: string,
    milestoneId: string,
    completionDetails: CompletionDetails
  ): void => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return {
              ...milestone,
              completed: true,
              completionDetails
            };
          }
          return milestone;
        });

        // Calculate progress from milestone weightages
        const progress = calculateGoalProgress(updatedMilestones);

        return {
          ...goal,
          milestones: updatedMilestones,
          progress,
          completed: progress === 100
        };
      }
      return goal;
    });

    setGoals(updatedGoals);
    setSelectedGoal(updatedGoals.find(g => g.id === goalId) || null);

    // Update localStorage
    const savedGoals = localStorage.getItem('userGoals');
    if (savedGoals) {
      const userGoals: Goal[] = JSON.parse(savedGoals);
      const updatedUserGoals = userGoals.map((g) =>
        updatedGoals.find(ug => ug.id === g.id) || g
      );
      localStorage.setItem('userGoals', JSON.stringify(updatedUserGoals));
    }
  };

  // Modal management
  const openModal = (): void => {
    setIsModalOpen(true);
    setStep(0);
    setGoalType(null);
    setGoalName('');
    setMilestones([]);
    setDeadline('');
    setGoalDescription('');
    setSelectedMembers([]);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setStep(0);
  };

  const nextStep = (): void => {
    setStep(prev => prev + 1);
  };

  const prevStep = (): void => {
    setStep(prev => prev - 1);
  };

  const addMilestone = (): void => {
    if (currentMilestone.trim() && currentWeightage > 0) {
      const newMilestone: Milestone = {
        id: uuidv4(),
        text: currentMilestone.trim(),
        weightage: currentWeightage
      };
      setMilestones([...milestones, newMilestone]);
      setCurrentMilestone('');
      setCurrentWeightage(0);
    }
  };

  const deleteMilestone = (id: string): void => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const editMilestone = (id: string): void => {
    const milestone = milestones.find(m => m.id === id);
    if (milestone) {
      setCurrentMilestone(milestone.text);
      setCurrentWeightage(milestone.weightage);
      deleteMilestone(id);
    }
  };

  const moveMilestoneUp = (index: number): void => {
    if (index > 0) {
      const newMilestones = [...milestones];
      [newMilestones[index - 1], newMilestones[index]] = [newMilestones[index], newMilestones[index - 1]];
      setMilestones(newMilestones);
    }
  };

  const moveMilestoneDown = (index: number): void => {
    if (index < milestones.length - 1) {
      const newMilestones = [...milestones];
      [newMilestones[index], newMilestones[index + 1]] = [newMilestones[index + 1], newMilestones[index]];
      setMilestones(newMilestones);
    }
  };

  const toggleTeamMember = (member: TeamMember): void => {
    const isSelected = selectedMembers.some(m => m.id === member.id);
    if (isSelected) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const submitGoal = () => {
    setIsSubmitting(true);
    const newGoal: Goal = {
      id: uuidv4(),
      type: goalType!,
      name: goalName,
      description: goalDescription,
      milestones,
      deadline,
      progress: 0,
      completed: false,
      ...(goalType === 'team' && { teamMembers: selectedMembers })
    };

    // Update state
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);

    // Save to localStorage (only user-created goals)
    const savedGoals = localStorage.getItem('userGoals');
    const userGoals = savedGoals ? JSON.parse(savedGoals) : [];
    userGoals.push(newGoal);
    localStorage.setItem('userGoals', JSON.stringify(userGoals));

    console.log('New goal created:', newGoal);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        closeModal();
      }, 1500);
    }, 1000);
  };


  // UI state variables for conditional rendering
  const isExpanding = transitioning === "expanding";
  const isShrinking = transitioning === "shrinking";

  return (
    <>


      <div className="relative h-screen overflow-hidden bg-gradient-to-b from-black via-black to-purple-900" ref={containerRef}>
        {/* Floating Dots - Always present in all levels */}
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: fadeLevel1 ? 0.05 : dot.opacity,
              scale: fadeLevel1 ? 0.7 : 1
            }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: fadeLevel1 ? 0.05 : dot.opacity,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              zIndex: 5,
              transition: "opacity 0.3s ease-out"
            }}
          />
        ))}

        <AnimatePresence mode="wait">
          {/* Level 1 - Home Screen */}
          {(level === 0 || (transitioning === "shrinking" && !scrollPhase)) && (
            <motion.div
              key="level-1"
              className="relative h-screen w-full"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.nav
                className="absolute top-0 left-0 right-0 z-40 px-4 py-6"
                animate={{
                  opacity: (isExpanding || fadeLevel1) ? 0 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="max-w-screen-xl mx-auto flex justify-end">
                  <div className="flex space-x-6 sm:space-x-10">
                    <motion.button
                      onClick={() => {
                        setFadeLevel1(true);
                        setTimeout(() => {
                          setTransitioning("expanding");
                          setScrollDirection("down");
                          setCloudPhase("active");
                          setTimeout(() => {
                            setScrollPhase("active");
                          }, 300);
                          setTimeout(() => {
                            setTransitioning(null);
                            setCloudPhase(null);
                            setScrollPhase(null);
                            setLevel(1);
                            setFadeLevel1(false);
                            setScrollDirection(null);
                          }, 1200);
                        }, 200);
                      }}
                      whileHover={{
                        scale: 1.05,
                        textShadow: "0 0 15px rgba(96, 165, 250, 0.8), 0 0 10px rgba(37, 99, 235, 0.6)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-6 sm:px-8 py-2 text-sm sm:text-base tracking-wider uppercase text-blue-400 font-medium rounded-md overflow-hidden bg-transparent  transition-all duration-300 font-['Rajdhani'] font-semibold letter-spacing-wider"
                    >
                      <span className="relative z-10">GOALS</span>
                      <motion.div
                        className="absolute inset-0 rounded-md opacity-40"
                        animate={{
                          boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        setFadeLevel1(true);
                        setTimeout(() => {
                          setTransitioning("expanding");
                          setScrollDirection("down");
                          setCloudPhase("active");
                          setTimeout(() => {
                            setScrollPhase("active");
                          }, 300);
                          setTimeout(() => {
                            setTransitioning(null);
                            setCloudPhase(null);
                            setScrollPhase(null);
                            setLevel(2);
                            setFadeLevel1(false);
                            setScrollDirection(null);
                          }, 1200);
                        }, 200);
                      }}
                      whileHover={{
                        scale: 1.05,
                        textShadow: "0 0 15px rgba(192, 132, 252, 0.8), 0 0 10px rgba(126, 34, 206, 0.6)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-6 sm:px-8 py-2 text-sm sm:text-base tracking-wider uppercase text-purple-400  rounded-md overflow-hidden bg-transparent  transition-all duration-300 font-['Rajdhani'] font-semibold letter-spacing-wider"
                    >
                      <span className="relative z-10">ABOUT</span>
                      <motion.div
                        className="absolute inset-0 rounded-md opacity-40"
                        animate={{
                          boxShadow: ["0 0 0px rgba(168, 85, 247, 0)", "0 0 10px rgba(168, 85, 247, 0.5)", "0 0 0px rgba(168, 85, 247, 0)"]
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.nav>
              {/* Bubbles */}
              {BUBBLES.map((bubble) => {
                const isHovered = hoveredBubble === bubble.id;
                const styles = colorStyleMap[bubble.color];

                return (
                  <motion.div
                    key={bubble.id}
                    className="absolute rounded-full pointer-events-auto cursor-pointer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isExpanding ? 25 : 1,
                      opacity: isExpanding ? (isHovered ? 0.9 : 0.4) : (isHovered ? 0.9 : 0.4),
                    }}
                    transition={{
                      duration: 5,
                      ease: "easeOut",
                      delay: 0.1 + parseInt(bubble.id) * 0.03
                    }}
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                      backgroundColor: styles.bg,
                      opacity: isExpanding ? (isHovered ? 0.9 : 0.4) : (isHovered ? 0.9 : 0.4),
                      boxShadow: isHovered ? `0 0 80px 40px ${styles.glow}` : "none",
                      transition: "box-shadow 0.5s ease-in-out, opacity 0.5s ease-in-out",
                      willChange: "box-shadow, opacity, transform",
                      zIndex: isHovered ? 20 : 5,
                    }}
                    onMouseEnter={() => setHoveredBubble(bubble.id)}
                    onMouseLeave={() => setHoveredBubble(null)}
                  />
                );
              })}

              {/* Title text */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center z-30"> */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-between py-12 sm:py-16 px-4 z-30"
                animate={{
                  opacity: (isExpanding || fadeLevel1) ? 0 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Enhanced Top section - Title with animations */}
                {/* <motion.div
      className="absolute inset-0 flex flex-col items-center justify-between py-12 sm:py-16 px-4 z-30"
      animate={{
        opacity: (isExpanding || fadeLevel1) ? 0 : 1,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    > */}
                {/* Enhanced Top section - Title with animations */}
                <div className="mt-6 sm:mt-16 w-full flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="relative"
                  >
                    <motion.h1
                      className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 text-center font-['Orbitron'] tracking-wider"
                      animate={{
                        textShadow: [
                          "0 0 15px rgba(34, 211, 238, 0.5)",
                          "0 0 25px rgba(34, 211, 238, 0.8)",
                          "0 0 15px rgba(34, 211, 238, 0.5)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      GOAL TRACKER
                    </motion.h1>

                    {/* Animated underline */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-full mt-1"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />

                    {/* Animated tech dots under the title */}
                    <div className="flex justify-center mt-2 space-x-2">
                      {[0, 1, 2, 3, 4].map((dot) => (
                        <motion.div
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: dot * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Animated subtitle */}
                  <motion.p
                    className="mt-4 text-sm sm:text-base text-cyan-200/80 font-['Rajdhani'] tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    VISUALIZE • TRACK • ACHIEVE
                  </motion.p>
                </div>

                {/* Middle section - Button */}
                <div className="flex-grow flex items-center justify-self-auto mb-5 -mt-20 sm:-mt-40">
                  <FuturisticButton onClick={openModal} />
                </div>

                {/* Bottom section - Scroll indicator */}
                <div className="mb-4 mt-4 sm:mb-6 flex flex-col items-center justify-end">
                  <motion.p
                    className="text-sm sm:text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 font-semibold tracking-wider mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    SCROLL TO CHECK YOUR GOALS
                  </motion.p>

                  <motion.div
                    className="relative"
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {/* Glowing arrow */}
                    <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-400">
                      <motion.path
                        d="M12 4 L12 20 M5 13 L12 20 L19 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: 1,
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M12 4 L12 20 M5 13 L12 20 L19 13"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                      />
                    </svg>

                    {/* Enhanced glow effect */}
                    <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl z-0"></div>
                    <div className="absolute -inset-1 bg-blue-400/30 rounded-full blur-md z-0"></div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Cloud animation for transitions */}
          {cloudPhase === "active" && scrollDirection === "down" && (
            <motion.div
              key="cloud-scroll"
              className="absolute inset-0 z-50 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`cloud-${i}`}
                  className="absolute left-0 right-0"
                  style={{
                    backgroundImage: `url('/clouds.png')`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    height: "100vh",
                    width: "100%",
                    opacity: 0.6 + i * 0.1, // increasing opacity for depth effect
                    zIndex: 50 + i,
                  }}
                  initial={{ y: `${100 + i * 100}%` }}
                  animate={{ y: `${-100 + i * 50}%` }}
                  transition={{ duration: 1.5 + i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          )}

          {/* Cloud animation for scrolling up */}
          {cloudPhase === "active" && scrollDirection === "up" && (
            <motion.div
              key="cloud-reverse"
              className="absolute inset-0 z-50 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`reverse-cloud-${i}`}
                  className="absolute left-0 right-0"
                  style={{
                    backgroundImage: `url('/clouds.png')`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top center",
                    height: "100vh",
                    width: "100%",
                    opacity: 0.6 + i * 0.1,
                    zIndex: 50 + i,
                  }}
                  initial={{ y: `${-100 + i * 50}%` }}
                  animate={{ y: `${100 + i * 100}%` }}
                  transition={{ duration: 1.5 + i * 0.1, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
          )}

          {scrollPhase === "active" && (
            <motion.div
              key="scroll-effect"
              className="absolute inset-0 z-60"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}

          {/* Level 2 - Goals Dashboard */}
          {(level === 1) && (
            <motion.div
              key="level-2"
              className="absolute inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: level === 1 ? 1 : isExpanding ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: isExpanding ? 0.7 : 0 }}
            >
              <AnimatePresence mode="wait">
                {!showGoalsModal ? (
                  <motion.div
                    key="main-cards"
                    className="h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Personal Goal Card */}
                    <motion.div
                      initial={{ opacity: 1, x: 0, y: 0 }}
                      animate={
                        activeGoalType === 'team'
                          ? { x: `-${slideOffset}`, opacity: 0 }
                          : activeGoalType === 'personal'
                            ? { opacity: 0 }
                            : fadeLevel1
                              ? { opacity: 0, y: 10 } // Changed from 0.3 to 0 for complete fade
                              : { x: 0, y: 0, opacity: 1 }
                      }
                      exit={
                        activeGoalType === 'team'
                          ? { x: `-${slideOffset}`, opacity: 0 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.6, ease: 'easeInOut' }} // Faster transition (0.2s instead of 0.3s)
                      onClick={() => {
                        setActiveGoalType('personal');
                        setShowGoalsModal(true);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="relative w-[90vw] sm:w-[400px] h-[300px] sm:h-[500px] cursor-pointer group overflow-hidden rounded-md"
                    >
                      {/* Animated Glowing Borders */}
                      <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0c002b] to-[#1779ff] animate-[borderAnimate1_2s_linear_infinite_1s] z-10"></span>
                      <span className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#0c002b] to-[#1779ff] animate-[borderAnimate2_2s_linear_infinite_2s] z-10"></span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-l from-[#0c002b] to-[#1779ff] animate-[borderAnimate3_2s_linear_infinite_1s] z-10"></span>
                      <span className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-t from-[#0c002b] to-[#1779ff] animate-[borderAnimate4_2s_linear_infinite_2s] z-10"></span>

                      {/* Card background */}
                      <div className="absolute inset-0 rounded-md bg-gradient-to-br from-indigo-900/50 via-purple-900/50 to-black/70 backdrop-blur-sm border border-indigo-500/20 z-0" />

                      {/* Content */}
                      <div className="relative z-20 h-full flex flex-col items-center justify-center p-4 sm:p-8">
                        <svg className="w-16 sm:w-24 h-16 sm:h-24 text-indigo-400 mb-4 sm:mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Personal Goals</h2>
                        <p className="text-white/80 text-center text-sm sm:text-base">Manage your individual objectives and track personal progress</p>
                      </div>
                    </motion.div>

                    {/* Team Goal Card */}
                    <motion.div
                      initial={{ opacity: 1, x: 0, y: 0 }}
                      animate={
                        activeGoalType === 'personal'
                          ? { x: slideOffset, opacity: 0 }
                          : activeGoalType === 'team'
                            ? { opacity: 0 }
                            : fadeLevel1
                              ? { opacity: 0, y: 10 } // Changed from 0.3 to 0 for complete fade
                              : { x: 0, y: 0, opacity: 1 }
                      }
                      exit={
                        activeGoalType === 'personal'
                          ? { x: slideOffset, opacity: 0 }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 0.6, ease: 'easeInOut' }} // Faster transition (0.2s instead of 0.3s)
                      onClick={() => {
                        setActiveGoalType('team');
                        setShowGoalsModal(true);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="relative w-[90vw] sm:w-[400px] h-[300px] sm:h-[500px] cursor-pointer group overflow-hidden rounded-md"
                    >
                      {/* Animated Glowing Borders */}
                      <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0c002b] to-[#ff00cc] animate-[borderAnimate1_2s_linear_infinite_1s] z-10"></span>
                      <span className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-[#0c002b] to-[#ff00cc] animate-[borderAnimate2_2s_linear_infinite_2s] z-10"></span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-l from-[#0c002b] to-[#ff00cc] animate-[borderAnimate3_2s_linear_infinite_1s] z-10"></span>
                      <span className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-t from-[#0c002b] to-[#ff00cc] animate-[borderAnimate4_2s_linear_infinite_2s] z-10"></span>

                      {/* Background */}
                      <div className="absolute inset-0 rounded-md bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-black/70 backdrop-blur-sm border border-purple-500/20 z-0" />

                      {/* Content */}
                      <div className="relative z-20 h-full flex flex-col items-center justify-center p-4 sm:p-8">
                        <svg className="w-16 sm:w-24 h-16 sm:h-24 text-purple-400 mb-4 sm:mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Team Goals</h2>
                        <p className="text-white/80 text-center text-sm sm:text-base">Collaborate on shared objectives and monitor team progress</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="fixed bottom-8 left-0 right-0 z-50 flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: fadeLevel1 ? 0 : 1,
                        y: fadeLevel1 ? 10 : 0
                      }}
                      transition={{
                        opacity: { duration: 0.3 },
                        y: { duration: 0.2 }
                      }}
                    >
                      <motion.p
                        className="text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 font-semibold tracking-wider mb-2"
                      >
                        SCROLL TO SEE SITE DETAILS
                      </motion.p>

                      <motion.div
                        className="relative"
                        animate={{
                          y: [0, 10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {/* Glowing arrow */}
                        <svg width="32" height="32" viewBox="0 0 24 24" className="text-blue-400">
                          <motion.path
                            d="M12 4 L12 20 M5 13 L12 20 L19 13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                              pathLength: 1,
                              opacity: 1,
                            }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M12 4 L12 20 M5 13 L12 20 L19 13"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                          />
                        </svg>

                        {/* Enhanced glow effect */}
                        <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl z-0"></div>
                        <div className="absolute -inset-1 bg-blue-400/30 rounded-full blur-md z-0"></div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="goals-modal"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: activeGoalType === 'personal'
                        ? (isMobile ? '0%' : '-25%')
                        : (isMobile ? '0%' : '25%'),
                      y: isMobile ? '-10%' : '0%',
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: '0%',
                      y: '0%',
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="h-full flex items-center justify-center px-4"
                    style={{
                      transformOrigin: activeGoalType === 'personal' ? 'left center' : 'right center',
                    }}
                  >
                    <div className="relative w-full max-w-6xl h-[90vh] bg-gradient-to-b from-black/95 via-purple-900/80 to-indigo-900/95 rounded-lg p-4 sm:p-8 backdrop-blur-sm border border-indigo-500/20">
                      {/* Close button */}
                      <button
                        onClick={() => {
                          setShowGoalsModal(false);
                          setTimeout(() => {
                            setActiveGoalType(null);
                          }, 500);
                        }}
                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-50"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Header */}
                      <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                          {activeGoalType === 'personal' ? 'Personal Goals' : 'Team Goals'}
                        </h2>
                        <p className="text-white/80 text-sm sm:text-base">
                          {activeGoalType === 'personal'
                            ? 'Track your individual progress and achievements'
                            : 'Collaborate and achieve goals together'}
                        </p>
                      </div>

                      {/* Goals Grid */}
                      <div className="h-[calc(100%-6rem)] sm:h-[calc(100%-8rem)] overflow-hidden pr-2 sm:pr-4 flex flex-col">
                        <div ref={horizontalScrollRef} // Add this ref
                          className="w-full flex-1 overflow-x-auto overflow-y-hidden hide-scrollbar snap-x snap-mandatory scroll-smooth">
                          <div className="flex flex-row gap-4 sm:gap-6 h-full py-4">
                            {goals
                              .filter(goal => goal.type === activeGoalType)
                              .map((goal) => (
                                <motion.div
                                  key={goal.id}
                                  initial={{ opacity: 0, x: 100 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3 }}
                                  onClick={() => handleGoalClick(goal)}
                                  whileHover={{ scale: 1.02 }}
                                  className="flex-shrink-0 snap-start w-[90vw] sm:w-[400px] h-[520px] bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 relative overflow-hidden flex flex-col cursor-pointer"
                                >
                                  {/* Completed checkmark */}
                                  {goal.completed && (
                                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  )}

                                  {/* Title - Fixed height */}
                                  <div className="h-16 mb-3">
                                    <h3 className="text-xl font-bold text-white line-clamp-2 leading-8">
                                      {goal.name}
                                    </h3>
                                  </div>

                                  {/* Description - Fixed height */}
                                  <div className="h-12 mb-3">
                                    {goal.description && (
                                      <p className="text-sm text-white/80 line-clamp-2 leading-6">
                                        {goal.description}
                                      </p>
                                    )}
                                  </div>

                                  {/* Pie Chart - Fixed height */}
                                  <div className="h-40 flex justify-center items-center mb-3">
                                    <div className="w-32 h-32 relative">
                                      <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                          <Pie
                                            data={[
                                              { value: calculateGoalProgress(goal.milestones) },
                                              { value: 100 - calculateGoalProgress(goal.milestones) }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="65%"
                                            outerRadius="95%"
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                            strokeWidth={0}
                                          >
                                            <Cell fill="#6D28D9" />
                                            <Cell fill="#374151" />
                                          </Pie>
                                        </PieChart>
                                      </ResponsiveContainer>
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl font-bold text-white">
                                          {calculateGoalProgress(goal.milestones)}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Next Milestone - Fixed height */}
                                  <div className="h-14 mb-2">
                                    <h4 className="text-base font-semibold text-white mb-1">Next Milestone</h4>
                                    <p className="text-white/80 text-sm line-clamp-1">
                                      {goal.milestones.find(m => !m.completed)?.text || 'All milestones completed!'}
                                    </p>
                                  </div>

                                  {/* Deadline - Fixed height */}
                                  <div className="h-5 mb-3">
                                    <p className="text-xs text-white/60">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                                  </div>

                                  {/* Team Members - Fixed height */}
                                  {goal.type === 'team' && (
                                    <div className="h-18 mt-auto">
                                      <h4 className="text-sm font-medium text-white mb-2">Team Members</h4>
                                      <div className="flex gap-2">
                                        {goal.teamMembers && goal.teamMembers.length > 0 ? (
                                          goal.teamMembers.map((member) => (
                                            <span
                                              key={member.id}
                                              className="text-sm text-white/80"
                                            >
                                              {member.name}
                                            </span>
                                          ))
                                        ) : (
                                          <p className="text-white/60 text-sm">No team members assigned</p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Level 3 - About the Site */}
          {/* Level 3 - About the Site with Auto-Scrolling Content */}
          {/* Level 3 - About the Site with Auto-Scrolling Content */}

          {/* Level 3 - About the Site with Auto-Scrolling Content Inside Container */}
          <AnimatePresence>

            {(level === 2) && (
              <motion.div
                key="level-3"
                className="absolute inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: level === 2 ? 1 : isExpanding ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: isExpanding ? 0.7 : 0 }}
              >
                {/* Full page dark gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-purple-900/40 z-0"></div>

                <div className="h-full w-full overflow-y-auto relative z-10">
                  {/* Fixed Header - stays at the top */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: fadeLevel3 ? 0 : 1, y: fadeLevel3 ? 10 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }} // Faster fade for transitions
                    className="sticky top-0 z-30 pt-12 pb-8 text-center bg-gradient-to-b from-black via-black/90 to-transparent"
                  >
                    <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 mb-6">
                      About This Site
                    </h1>
                  </motion.div>

                  {/* Auto-scrolling container for content */}
                  <motion.div
                    className="relative h-[80vh] overflow-hidden mx-auto max-w-4xl px-4 md:px-8 mb-20"
                    animate={{ opacity: fadeLevel3 ? 0 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }} // Faster fade for transitions
                  >                {/* This div will scroll infinitely */}
                    <motion.div
                      className="w-full"
                      initial={{ y: 0 }}
                      animate={{ y: "-100%" }}
                      transition={{
                        duration: 60, // 1 minute to scroll through all content
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      {/* Content sections */}
                      <div className="space-y-12 mb-20">
                        {/* Technology Stack */}
                        <motion.section
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-black/50 p-8 rounded-xl border border-indigo-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">What's Powering This App</h2>
                          <div className="space-y-3 text-white/90">
                            <p>
                              I built this Goal Tracker with modern React and TypeScript to create an interactive
                              experience. Here's what's under the hood:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                              <li>
                                <span className="text-purple-400 font-semibold">React</span> - Handles all the interactive
                                elements and state management
                              </li>
                              <li>
                                <span className="text-blue-400 font-semibold">TypeScript</span> - Makes everything
                                more reliable with type checking
                              </li>
                              <li>
                                <span className="text-pink-400 font-semibold">Framer Motion</span> - Creates all those
                                smooth animations you see when moving around
                              </li>
                              <li>
                                <span className="text-green-400 font-semibold">Recharts</span> - Powers the progress
                                pie charts that show how you're doing
                              </li>
                              <li>
                                <span className="text-yellow-400 font-semibold">LocalStorage</span> - Saves your goals
                                right in your browser so they'll be there next time
                              </li>
                            </ul>
                          </div>
                        </motion.section>

                        {/* How the App Works - NEW SECTION */}
                        <motion.section
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="bg-gradient-to-br from-cyan-900/30 via-blue-900/30 to-black/50 p-8 rounded-xl border border-cyan-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">How This App Works</h2>
                          <div className="space-y-4 text-white/90">
                            <p>
                              The app has three main levels that you can move between by scrolling or using the navigation buttons:
                            </p>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Level 1: Home Screen</h3>
                              <p>
                                This is where you start - the cosmic bubbles welcome screen with the "Make a New Goal" button.
                                From here, you can scroll down or click the navigation buttons to explore.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Level 2: Goals Dashboard</h3>
                              <p>
                                The middle level lets you view and manage your Personal and Team goals. Click on any
                                goal card to see details and track progress on your milestones.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Level 3: About Page</h3>
                              <p>
                                That's where you are now! This level shares info about how the app was built
                                and its features. You can scroll back up to return to your goals anytime.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Key Features */}
                        <motion.section
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          className="bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-black/50 p-8 rounded-xl border border-purple-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">Cool Features</h2>
                          <div className="space-y-4 text-white/90">
                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Smooth Level Transitions</h3>
                              <p>
                                When you scroll between screens, you'll see those awesome cloud animations. They make
                                moving through the app feel like an experience, not just clicking around.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Personal & Team Goals</h3>
                              <p>
                                You can create goals just for yourself or for your whole team. Each goal has milestones
                                with different weights, so you can track what's most important.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Visual Progress Tracking</h3>
                              <p>
                                The pie charts and progress maps show exactly how far you've come. When you complete
                                a milestone, you'll see your progress update in real-time.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Everything Saves Automatically</h3>
                              <p>
                                Close the browser, come back later - your goals will still be there. Everything
                                saves right in your browser so you don't need to create an account.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Design Philosophy */}
                        <motion.section
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-black/50 p-8 rounded-xl border border-blue-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">The Vision Behind It</h2>
                          <div className="space-y-4 text-white/90">
                            <p>
                              I wanted to make goal tracking actually fun - something you'd want to use, not
                              just another boring to-do list app.
                            </p>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">It Reacts to You</h3>
                              <p>
                                Notice how the floating bubbles and dots respond to your mouse movements? That's
                                intentional - it makes the app feel alive and responsive to what you're doing.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Guided Experience</h3>
                              <p>
                                Creating goals walks you through clear steps, so you always know what to do next.
                                The UI gives you feedback as you go, making everything feel intuitive.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Easy on the Eyes</h3>
                              <p>
                                Even with all the visual effects, I made sure text is easy to read and buttons
                                are clear. You can use this app for hours without eye strain.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Technical Implementation */}
                        <motion.section
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                          className="bg-gradient-to-br from-teal-900/30 via-blue-900/30 to-black/50 p-8 rounded-xl border border-teal-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">Tech Highlights</h2>
                          <div className="space-y-4 text-white/90">
                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Smart Progress Calculation</h3>
                              <p>
                                The app doesn't just count completed tasks - it weighs each milestone based on
                                importance so your progress percentage actually makes sense.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Smooth Performance</h3>
                              <p>
                                All those fancy animations don't slow things down. I optimized everything to use
                                your GPU efficiently, so it runs well even on older devices.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Works on Any Device</h3>
                              <p>
                                Try resizing your browser or opening this on your phone - everything adapts
                                automatically. I built it mobile-first to ensure it works great everywhere.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Navigation hint */}
                        <div className="text-center my-12 text-white/70">
                          <p>Scroll up to go back to your goals</p>
                          <svg className="w-8 h-8 mx-auto mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        </div>
                      </div>
                      <div className="space-y-12 mb-20">
                        {/* Technology Stack */}
                        <motion.section
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-black/50 p-8 rounded-xl border border-indigo-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">What's Powering This App</h2>
                          <div className="space-y-3 text-white/90">
                            <p>
                              I built this Goal Tracker with modern React and TypeScript to create an interactive
                              experience. Here's what's under the hood:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                              <li>
                                <span className="text-purple-400 font-semibold">React</span> - Handles all the interactive
                                elements and state management
                              </li>
                              <li>
                                <span className="text-blue-400 font-semibold">TypeScript</span> - Makes everything
                                more reliable with type checking
                              </li>
                              <li>
                                <span className="text-pink-400 font-semibold">Framer Motion</span> - Creates all those
                                smooth animations you see when moving around
                              </li>
                              <li>
                                <span className="text-green-400 font-semibold">Recharts</span> - Powers the progress
                                pie charts that show how you're doing
                              </li>
                              <li>
                                <span className="text-yellow-400 font-semibold">LocalStorage</span> - Saves your goals
                                right in your browser so they'll be there next time
                              </li>
                            </ul>
                          </div>
                        </motion.section>

                        {/* How the App Works - NEW SECTION */}
                        <motion.section
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="bg-gradient-to-br from-cyan-900/30 via-blue-900/30 to-black/50 p-8 rounded-xl border border-cyan-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">How This App Works</h2>
                          <div className="space-y-4 text-white/90">
                            <p>
                              The app has three main levels that you can move between by scrolling or using the navigation buttons:
                            </p>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Level 1: Home Screen</h3>
                              <p>
                                This is where you start - the cosmic bubbles welcome screen with the "Make a New Goal" button.
                                From here, you can scroll down or click the navigation buttons to explore.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Level 2: Goals Dashboard</h3>
                              <p>
                                The middle level lets you view and manage your Personal and Team goals. Click on any
                                goal card to see details and track progress on your milestones.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Level 3: About Page</h3>
                              <p>
                                That's where you are now! This level shares info about how the app was built
                                and its features. You can scroll back up to return to your goals anytime.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Key Features */}
                        <motion.section
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          className="bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-black/50 p-8 rounded-xl border border-purple-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">Cool Features</h2>
                          <div className="space-y-4 text-white/90">
                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Smooth Level Transitions</h3>
                              <p>
                                When you scroll between screens, you'll see those awesome cloud animations. They make
                                moving through the app feel like an experience, not just clicking around.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Personal & Team Goals</h3>
                              <p>
                                You can create goals just for yourself or for your whole team. Each goal has milestones
                                with different weights, so you can track what's most important.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Visual Progress Tracking</h3>
                              <p>
                                The pie charts and progress maps show exactly how far you've come. When you complete
                                a milestone, you'll see your progress update in real-time.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Everything Saves Automatically</h3>
                              <p>
                                Close the browser, come back later - your goals will still be there. Everything
                                saves right in your browser so you don't need to create an account.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Design Philosophy */}
                        <motion.section
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-black/50 p-8 rounded-xl border border-blue-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">The Vision Behind It</h2>
                          <div className="space-y-4 text-white/90">
                            <p>
                              I wanted to make goal tracking actually fun - something you'd want to use, not
                              just another boring to-do list app.
                            </p>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">It Reacts to You</h3>
                              <p>
                                Notice how the floating bubbles and dots respond to your mouse movements? That's
                                intentional - it makes the app feel alive and responsive to what you're doing.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Guided Experience</h3>
                              <p>
                                Creating goals walks you through clear steps, so you always know what to do next.
                                The UI gives you feedback as you go, making everything feel intuitive.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Easy on the Eyes</h3>
                              <p>
                                Even with all the visual effects, I made sure text is easy to read and buttons
                                are clear. You can use this app for hours without eye strain.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Technical Implementation */}
                        <motion.section
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                          className="bg-gradient-to-br from-teal-900/30 via-blue-900/30 to-black/50 p-8 rounded-xl border border-teal-500/20"
                        >
                          <h2 className="text-3xl font-bold text-white mb-4">Tech Highlights</h2>
                          <div className="space-y-4 text-white/90">
                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Smart Progress Calculation</h3>
                              <p>
                                The app doesn't just count completed tasks - it weighs each milestone based on
                                importance so your progress percentage actually makes sense.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Smooth Performance</h3>
                              <p>
                                All those fancy animations don't slow things down. I optimized everything to use
                                your GPU efficiently, so it runs well even on older devices.
                              </p>
                            </div>

                            <div>
                              <h3 className="text-xl font-semibold text-white/90 mb-2">Works on Any Device</h3>
                              <p>
                                Try resizing your browser or opening this on your phone - everything adapts
                                automatically. I built it mobile-first to ensure it works great everywhere.
                              </p>
                            </div>
                          </div>
                        </motion.section>

                        {/* Navigation hint */}
                        <div className="text-center my-12 text-white/70">
                          <p>Scroll up to go back to your goals</p>
                          <svg className="w-8 h-8 mx-auto mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        </div>
                      </div>



                    </motion.div>

                    {/* Gradient overlays for top and bottom fade effects */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 "></div>
                  </motion.div>

                  {/* Footer navigation hint */}
                  <motion.div
                    className="text-center pb-12 text-white/70"
                    animate={{ opacity: fadeLevel3 ? 0 : 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }} // Faster fade for transitions
                  >
                    <p>Scroll up to return to the Goals Dashboard</p>
                    <svg className="w-8 h-8 mx-auto mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </AnimatePresence>

        {/* Goal Creation Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-gradient-to-b from-black/95 via-purple-900/80 to-indigo-900/95 rounded-lg p-4 sm:p-8 w-full max-w-[90vw] sm:max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto relative modal-scrollbar"
              >
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Progress indicator */}
                <div className="flex justify-center mb-8">
                  <div className="flex space-x-2">
                    {[0, 1, 2, goalType === 'team' ? 3 : 2.5, goalType === 'team' ? 4 : 3.5].filter(Number.isInteger).map((stepNum, index) => (
                      <div
                        key={index}
                        className={`h-2 w-8 rounded-full transition-colors ${step >= stepNum ? 'bg-blue-500' : 'bg-white/20'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Modal Steps */}
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{
                        type: "tween",
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                      className="text-center"
                    >
                      <h2 className="text-4xl font-bold text-white mb-12">What type of goal is this?</h2>
                      <div className="flex justify-center gap-12">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setGoalType('personal'); nextStep(); }}
                          className="cursor-pointer w-64 h-80 bg-gradient-to-b from-indigo-800/50 to-indigo-900/80 rounded-lg p-8 flex flex-col items-center justify-center border border-indigo-400/30 hover:border-indigo-400/80 transition-all duration-300"
                        >
                          <svg className="w-16 h-16 text-indigo-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <h3 className="text-2xl font-bold text-white mb-4">Personal Goal</h3>
                          <p className="text-white/80 text-center">Set personal milestones and track your individual progress</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setGoalType('team'); nextStep(); }}
                          className="cursor-pointer w-64 h-80 bg-gradient-to-b from-purple-800/50 to-purple-900/80 rounded-lg p-8 flex flex-col items-center justify-center border border-purple-400/30 hover:border-purple-400/80 transition-all duration-300"
                        >
                          <svg className="w-16 h-16 text-purple-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h3 className="text-2xl font-bold text-white mb-4">Team Goal</h3>
                          <p className="text-white/80 text-center">Collaborate with team members and achieve goals together</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-white mb-8">Basic Information</h2>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={goalName}
                          onChange={(e) => setGoalName(e.target.value)}
                          onKeyDown={(e) => {
                            // Only proceed if all required fields are filled
                            if (e.key === 'Enter' && goalName.trim() && deadline) {
                              nextStep();
                            }
                          }}
                          placeholder="Goal name"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                          value={goalDescription}
                          onChange={(e) => setGoalDescription(e.target.value)}
                          onKeyDown={(e) => {
                            // Only proceed if all required fields are filled (description is optional)
                            if (e.key === 'Enter' && e.ctrlKey && goalName.trim() && deadline) {
                              nextStep();
                            }
                          }}
                          placeholder="Description (optional)"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        />
                        <div>
                          <label className="text-white/80 text-sm mb-2 block">Deadline</label>
                          <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between mt-8">
                        <motion.button
                          onClick={prevStep}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                          className="bg-gray-900/80 hover:bg-gray-800 text-white px-8 py-3 rounded-md font-semibold"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={nextStep}
                          disabled={!goalName || !deadline}
                          whileHover={goalName && deadline ? { scale: 1.03 } : {}}
                          whileTap={goalName && deadline ? { scale: 0.98 } : {}}
                          transition={{ duration: 0.1 }}
                          className={`px-8 py-3 rounded-md font-semibold ${goalName && deadline ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          Next
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-white mb-8">Add Milestones</h2>

                      {/* Add Milestone Form */}
                      <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <input
                          type="text"
                          value={currentMilestone}
                          onChange={(e) => setCurrentMilestone(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && currentMilestone.trim() && currentWeightage > 0) {
                              addMilestone();
                            }
                          }}
                          placeholder="Milestone description"
                          className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50"
                        />
                        <div className="relative w-full sm:w-32">
                          <input
                            type="number"
                            value={currentWeightage || ''}
                            onChange={(e) => {
                              const value = Number(e.target.value);
                              if (value >= 0 && !isNaN(value)) {
                                setCurrentWeightage(value);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && currentMilestone.trim() && currentWeightage > 0) {
                                addMilestone();
                              }
                            }}
                            min="0"
                            placeholder="Weightage"
                            className="w-full px-4 py-2 pr-8 rounded-lg bg-white/10 text-white placeholder-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 h-full justify-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setCurrentWeightage(prev => prev + 1)}
                              className="text-white/70 hover:text-white"
                            >
                              <svg width="10" height="6" fill="currentColor">
                                <polygon points="0,6 5,0 10,6" />
                              </svg>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setCurrentWeightage(prev => Math.max(0, prev - 1))}
                              className="text-white/70 hover:text-white"
                            >
                              <svg width="10" height="6" fill="currentColor">
                                <polygon points="0,0 5,6 10,0" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                        <motion.button
                          onClick={addMilestone}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={!currentMilestone || currentWeightage <= 0}
                          className={`px-6 py-2 rounded-md ${currentMilestone && currentWeightage > 0
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          Add
                        </motion.button>
                      </div>

                      {/* Milestone List with Custom Scrollbar */}
                      <div
                        className="space-y-3 max-h-60 sm:max-h-80 overflow-y-auto mb-8 pr-2 custom-scrollbar"
                      >
                        {milestones.map((milestone, index) => (
                          <motion.div
                            key={milestone.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col sm:flex-row sm:items-center min-h-[4rem] bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 rounded-lg border border-white/10 gap-2"
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                              <span className="text-white text-lg break-words flex-1">{milestone.text}</span>
                            </div>
                            <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 justify-between sm:justify-end">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => editMilestone(milestone.id)}
                                  className="w-8 h-8 rounded-md bg-yellow-600/70 hover:bg-yellow-600 text-white flex items-center justify-center"
                                >
                                  ✎
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => deleteMilestone(milestone.id)}
                                  className="w-8 h-8 rounded-md bg-red-600/70 hover:bg-red-600 text-white flex items-center justify-center"
                                >
                                  ×
                                </motion.button>
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => moveMilestoneUp(index)}
                                  disabled={index === 0}
                                  className={`w-8 h-8 rounded-md flex items-center justify-center ${index === 0
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-purple-400 hover:text-purple-200'
                                    }`}
                                >
                                  <svg width="12" height="8" fill="currentColor">
                                    <polygon points="0,8 6,0 12,8" />
                                  </svg>
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => moveMilestoneDown(index)}
                                  disabled={index === milestones.length - 1}
                                  className={`w-8 h-8 rounded-md flex items-center justify-center ${index === milestones.length - 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-purple-400 hover:text-purple-200'
                                    }`}
                                >
                                  <svg width="12" height="8" fill="currentColor">
                                    <polygon points="0,0 6,8 12,0" />
                                  </svg>
                                </motion.button>
                              </div>
                              <span className="w-16 sm:w-12 text-center text-white font-bold text-lg">
                                W: <motion.span
                                  key={milestone.weightage}
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {milestone.weightage}
                                </motion.span>
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <motion.button
                          onClick={prevStep}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                          className="bg-gray-900/80 hover:bg-gray-800 text-white px-8 py-3 rounded-md font-semibold"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            // Only proceed if at least one milestone exists
                            if (milestones.length > 0) {
                              nextStep();
                            }
                          }}
                          disabled={milestones.length === 0}
                          whileHover={milestones.length > 0 ? { scale: 1.03 } : {}}
                          whileTap={milestones.length > 0 ? { scale: 0.98 } : {}}
                          transition={{ duration: 0.1 }}
                          className={`px-8 py-3 rounded-md font-semibold ${milestones.length > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          Next
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {goalType === 'team' && step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-white mb-8">Choose Team Members</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-h-60 sm:max-h-96 overflow-y-auto custom-scrollbar px-4 sm:pr-6 py-4">
                        {MOCK_TEAM_MEMBERS.map((member) => (
                          <motion.div
                            key={member.id}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => toggleTeamMember(member)}
                            className={`cursor-pointer rounded-lg p-4 sm:p-6 text-center transition-all duration-100 ${selectedMembers.some(m => m.id === member.id)
                              ? 'bg-blue-600/50 ring-2 ring-blue-400'
                              : 'bg-white/10 hover:bg-white/20'
                              }`}
                          >
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-2"
                            />
                            <p className="text-white text-xs sm:text-sm">{member.name}</p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-8">
                        <motion.button
                          onClick={prevStep}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                          className="bg-gray-900/80 hover:bg-gray-800 text-white px-8 py-3 rounded-md font-semibold"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            // Only proceed if at least one team member is selected
                            if (selectedMembers.length > 0) {
                              nextStep();
                            }
                          }}
                          disabled={selectedMembers.length === 0}
                          whileHover={selectedMembers.length > 0 ? { scale: 1.03 } : {}}
                          whileTap={selectedMembers.length > 0 ? { scale: 0.98 } : {}}
                          transition={{ duration: 0.1 }}
                          className={`px-8 py-3 rounded-md font-semibold ${selectedMembers.length > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          Next
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === (goalType === 'team' ? 4 : 3) && (
                    <motion.div
                      key="step-summary"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-3xl font-bold text-white mb-8">Goal Summary</h2>
                      <div className="modal-scrollbar overflow-y-auto overflow-x-hidden max-h-[50vh] space-y-6">
                        <div className="bg-white/10 rounded-lg p-6">
                          <h3 className="text-xl font-bold text-white mb-4">{goalName}</h3>
                          {goalDescription && (
                            <p className="text-white/80 mb-4">{goalDescription}</p>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-white/60 text-sm">Type</p>
                              <p className="text-white font-semibold capitalize">{goalType} Goal</p>
                            </div>
                            <div>
                              <p className="text-white/60 text-sm">Deadline</p>
                              <p className="text-white font-semibold">{new Date(deadline).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-6">
                          <h4 className="text-lg font-bold text-white mb-4">Milestones ({milestones.length})</h4>
                          <div className="space-y-3">
                            {milestones.map((milestone, index) => (
                              <div key={milestone.id} className="flex items-center gap-4 text-white">
                                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                                  {index + 1}
                                </span>
                                <span className="flex-1">{milestone.text}</span>
                                <span className="text-white/80 font-semibold">Weight: {milestone.weightage}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {goalType === 'team' && selectedMembers.length > 0 && (
                          <div className="bg-white/10 rounded-lg p-6">
                            <h4 className="text-lg font-bold text-white mb-4">Team Members ({selectedMembers.length})</h4>
                            <div className="flex flex-wrap gap-4">
                              {selectedMembers.map((member) => (
                                <div key={member.id} className="flex items-center gap-2">
                                  <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <span className="text-white">{member.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between mt-8 pr-4">
                        <motion.button
                          onClick={prevStep}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                          className="bg-gray-900/80 hover:bg-gray-800 text-white px-8 py-3 rounded-md font-semibold"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          onClick={submitGoal}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              submitGoal();
                            }
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                          className="px-8 py-3 rounded-md font-semibold bg-green-600 hover:bg-green-700 text-white"
                        >
                          Create Goal
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Loading/Success overlay */}
                {(isSubmitting || showSuccess) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 z-[150] flex items-center justify-center"
                  >
                    {isSubmitting && (
                      <div className="text-white text-xl">Creating your goal...</div>
                    )}
                    {showSuccess && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="text-center"
                      >
                        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-white">Goal Created Successfully!</h3>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>


          )}
        </AnimatePresence> {/* Close outermost AnimatePresence */}

        {/* Goal Details Page */}
        {/* Goal Details Page */}
        <AnimatePresence>
          {showGoalDetails && selectedGoal && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-b from-black/95 via-purple-900/80 to-indigo-900/95 z-50 overflow-y-auto hide-scrollbar"
            >
              <div className="max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={() => {
                      setShowGoalDetails(false);
                      setSelectedGoal(null);
                    }}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                </div>

                {/* Goal Title and Description */}
                <div className="mb-12">
                  <h1 className="text-5xl font-bold text-white mb-4 leading-tight break-words">{selectedGoal.name}</h1>
                  {selectedGoal.description && (
                    <p className="text-xl text-white/80 mb-4 leading-relaxed break-words">{selectedGoal.description}</p>
                  )}
                  <p className="text-white/60">Deadline: {new Date(selectedGoal.deadline).toLocaleDateString()}</p>
                </div>

                {/* Progress Overview with Improved Pie Charts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Animated Pie Chart */}
                  <motion.div
                    className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Overall Progress</h3>
                    <div className="w-48 h-48 mx-auto relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              // Calculate progress directly from milestones to avoid discrepancies
                              {
                                name: "Completed",
                                value: selectedGoal.milestones.filter(m => m.completed).reduce((sum, m) => sum + m.weightage, 0)
                              },
                              {
                                name: "Remaining",
                                value: selectedGoal.milestones.filter(m => !m.completed).reduce((sum, m) => sum + m.weightage, 0)
                              }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="95%"
                            startAngle={90}
                            endAngle={-270}
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={1200}
                            animationEasing="ease-out"
                          >
                            <Cell fill="#6D28D9" />
                            <Cell fill="#374151" />
                            <Tooltip content={({ payload }) => {
                              if (payload && payload.length) {
                                return (
                                  <div className="bg-black/80 px-3 py-1 rounded text-white text-sm">
                                    {payload[0].name}: {payload[0].value}%
                                  </div>
                                );
                              }
                              return null;
                            }} />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <span className="text-5xl font-bold text-white">
                          {(() => {
                            // Calculate correct percentage from milestone weights
                            const completedWeight = selectedGoal.milestones
                              .filter(m => m.completed)
                              .reduce((sum, m) => sum + m.weightage, 0);
                            const totalWeight = selectedGoal.milestones
                              .reduce((sum, m) => sum + m.weightage, 0);

                            // Calculate percentage (avoiding division by zero)
                            const percentage = totalWeight > 0
                              ? Math.round((completedWeight / totalWeight) * 100)
                              : 0;

                            return `${percentage}%`;
                          })()}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Next Milestone Card */}
                  <motion.div
                    className="bg-gradient-to-br from-blue-900/70 to-indigo-900/70 p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Next Milestone</h3>
                    {(() => {
                      const nextMilestone = selectedGoal.milestones.find(m => !m.completed);
                      return nextMilestone ? (
                        <>
                          <p className="text-lg text-white mb-4 break-words">{nextMilestone.text}</p>
                          <p className="text-white/60 mb-4">Weight: {nextMilestone.weightage}%</p>
                          <motion.button
                            onClick={() => {
                              setSelectedMilestone(nextMilestone);
                              setShowMilestoneCompletionForm(true);
                            }}
                            className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                            whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Mark as Complete
                          </motion.button>
                        </>
                      ) : (
                        <p className="text-white/60">All milestones completed! 🎉</p>
                      );
                    })()}
                  </motion.div>

                  {/* Completed Milestones Summary */}
                  <motion.div
                    className="bg-gradient-to-br from-green-900/70 to-teal-900/70 p-6 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Completed</h3>
                    <motion.p
                      className="text-4xl font-bold text-green-400 mb-2"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    >
                      {selectedGoal.milestones.filter(m => m.completed).length} / {selectedGoal.milestones.length}
                    </motion.p>
                    <p className="text-white/60">Milestones completed</p>
                  </motion.div>
                </div>

                {/* Progress Map (Improved SVG with opaque background) */}
                {/* Progress Map (Improved SVG with opaque background) */}
                {/* Progress Map (Improved SVG with opaque background) */}
                {/* Progress Map (Improved SVG with opaque background) */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">Progress Map</h2>
                  <div className="relative bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-indigo-900/80 rounded-lg p-8 shadow-lg">
                    {(() => {
                      // Calculate total weightage
                      const totalWeightage = selectedGoal.milestones.reduce((sum, m) => sum + m.weightage, 0);

                      // Normalize the weightage to ensure it never exceeds 100%
                      const normalizeWeightage = (weight: number) => {
                        return totalWeightage > 0 ? (weight / totalWeightage) * 100 : 0;
                      };

                      // Generate a smoother path with curves
                      const width = 800;
                      const height = 300;
                      const paddingX = 80;
                      const paddingY = 50;

                      // Minimum distance between nodes in pixels
                      const minNodeDistance = 60;

                      // Starting point (before first milestone)
                      const startX = paddingX;
                      const startY = paddingY + height / 2;

                      // Calculate positions based on weightage ratio
                      let accumulatedWeight = 0;

                      // First pass - calculate normalized positions
                      const normalizedPositions = selectedGoal.milestones.map((milestone, index) => {
                        // Calculate normalized weightage
                        const normalizedWeight = normalizeWeightage(milestone.weightage);
                        accumulatedWeight += normalizedWeight;

                        // Calculate x position with padding
                        const normalizedX = paddingX + (accumulatedWeight * (width - 2 * paddingX) / 100);

                        // Make a gentle wave for y positions
                        const normalizedY = paddingY + height / 2 + Math.sin(index * 0.8) * (height / 5);

                        return {
                          x: normalizedX,
                          y: normalizedY,
                          weight: normalizedWeight,
                          rawWeight: milestone.weightage,
                          completed: milestone.completed,
                          accumulatedPercent: Math.round(accumulatedWeight)
                        };
                      });

                      // Second pass - ensure minimum spacing between nodes
                      const positions = [...normalizedPositions];

                      for (let i = 1; i < positions.length; i++) {
                        const prev = positions[i - 1];
                        const curr = positions[i];

                        // If nodes are too close, push the current node further right
                        if (curr.x - prev.x < minNodeDistance) {
                          const shortfall = minNodeDistance - (curr.x - prev.x);
                          curr.x += shortfall;

                          // Also push all subsequent nodes by the same amount
                          for (let j = i + 1; j < positions.length; j++) {
                            positions[j].x += shortfall;
                          }
                        }
                      }

                      // Generate a smooth path with curves, starting from start point
                      let path = `M ${startX} ${startY}`;

                      // Add path from start to first milestone
                      if (positions.length > 0) {
                        const first = positions[0];
                        // Use a curve that respects the weight of the first milestone
                        const firstDistance = first.x - startX;
                        const cp1x = startX + firstDistance * 0.3;
                        const cp1y = startY;
                        const cp2x = first.x - firstDistance * 0.3;
                        const cp2y = first.y;

                        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${first.x} ${first.y}`;
                      }

                      // Add rest of the path between milestones
                      for (let i = 0; i < positions.length - 1; i++) {
                        const curr = positions[i];
                        const next = positions[i + 1];
                        const dx = next.x - curr.x;

                        // Calculate control points for smoother curve
                        const cp1x = curr.x + dx * 0.4;
                        const cp1y = curr.y;
                        const cp2x = next.x - dx * 0.4;
                        const cp2y = next.y;

                        // Add cubic bezier curve
                        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
                      }

                      // Find the current milestone index (first non-completed milestone)
                      const currentMilestoneIndex = selectedGoal.milestones.findIndex(m => !m.completed);

                      // Create the completed path segment
                      let completedPath = `M ${startX} ${startY}`;

                      // Only draw up to the completed milestones
                      if (currentMilestoneIndex > 0) {
                        // Add path from start to first milestone
                        const first = positions[0];
                        const firstDistance = first.x - startX;
                        const cp1x = startX + firstDistance * 0.3;
                        const cp1y = startY;
                        const cp2x = first.x - firstDistance * 0.3;
                        const cp2y = first.y;

                        completedPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${first.x} ${first.y}`;

                        // Add remaining completed segments
                        for (let i = 0; i < currentMilestoneIndex - 1; i++) {
                          const curr = positions[i];
                          const next = positions[i + 1];
                          const dx = next.x - curr.x;

                          // Calculate control points
                          const cp1x = curr.x + dx * 0.4;
                          const cp1y = curr.y;
                          const cp2x = next.x - dx * 0.4;
                          const cp2y = next.y;

                          // Add cubic bezier curve
                          completedPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
                        }
                      }

                      return (
                        <svg
                          viewBox="0 0 800 400"
                          className="w-full h-auto"
                        >
                          <defs>
                            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                              <feGaussianBlur stdDeviation="5" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>

                            <filter id="textFilter" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="2" dy="2" stdDeviation="1" floodColor="#000" floodOpacity="1" />
                            </filter>

                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#4338ca" />
                              <stop offset="100%" stopColor="#6d28d9" />
                            </linearGradient>

                            <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#059669" />
                              <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                          </defs>

                          {/* Start point */}
                          <motion.circle
                            cx={startX}
                            cy={startY}
                            r={14}
                            fill="#1e40af"
                            filter="url(#glow)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.circle
                            cx={startX}
                            cy={startY}
                            r={8}
                            fill="#3b82f6"
                            stroke="#000"
                            strokeWidth="1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          />
                          <motion.text
                            x={startX}
                            y={startY + 4}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#FFF"
                            fontSize="12"
                            fontWeight="bold"
                            filter="url(#textFilter)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            S
                          </motion.text>
                          <motion.text
                            x={startX}
                            y={startY - 24}
                            textAnchor="middle"
                            fill="#FFF"
                            fontSize="14"
                            fontWeight="bold"
                            filter="url(#textFilter)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            0%
                          </motion.text>

                          {/* Main Path */}
                          <motion.path
                            d={path}
                            stroke="url(#pathGradient)"
                            strokeWidth="6"
                            fill="none"
                            opacity="0.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />

                          {/* Completed path segment */}
                          {currentMilestoneIndex > 0 && (
                            <motion.path
                              d={completedPath}
                              stroke="url(#completedGradient)"
                              strokeWidth="8"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="url(#glow)"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                            />
                          )}

                          {/* Milestone nodes */}
                          {normalizedPositions.map((pos, index) => {
                            const milestone = selectedGoal.milestones[index];
                            const isCompleted = milestone.completed;
                            const isCurrent = !isCompleted && index === currentMilestoneIndex;

                            // Size based on normalized weightage (between 12-24px)
                            const nodeSize = 12 + Math.min((pos.weight / 5), 12);
                            const labelYOffset = Math.max(20, nodeSize * 1.5);

                            return (
                              <g key={index}>
                                {/* Node circle with glow */}
                                <motion.circle
                                  cx={pos.x}
                                  cy={pos.y}
                                  r={isCurrent ? nodeSize * 1.2 : nodeSize}
                                  fill={isCompleted ? '#059669' : isCurrent ? '#EAB308' : '#6B7280'}
                                  opacity={isCompleted ? 1 : isCurrent ? 0.9 : 0.6}
                                  filter="url(#glow)"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: isCompleted ? 1 : isCurrent ? 0.9 : 0.6 }}
                                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                />

                                {/* Inner circle */}
                                <motion.circle
                                  cx={pos.x}
                                  cy={pos.y}
                                  r={isCurrent ? nodeSize * 0.7 : nodeSize * 0.6}
                                  fill={isCompleted ? '#10b981' : isCurrent ? '#fcd34d' : '#9ca3af'}
                                  stroke="#000"
                                  strokeWidth="1"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                                />

                                {/* Node label */}
                                <motion.text
                                  x={pos.x}
                                  y={pos.y + 4}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fill="#FFF"
                                  fontSize="14"
                                  fontWeight="bold"
                                  filter="url(#textFilter)"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                >
                                  {index + 1}
                                </motion.text>

                                {/* Cumulative percentage above node */}
                                {typeof pos.accumulatedPercent === 'number' && (
                                  <motion.text
                                    x={pos.x}
                                    y={pos.y - labelYOffset}
                                    textAnchor="middle"
                                    fill="#FFFFFF"
                                    fontSize="16"
                                    fontWeight="bold"
                                    filter="url(#textFilter)"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                                  >
                                    {pos.accumulatedPercent}%
                                  </motion.text>
                                )}



                                {/* Tooltip on hover */}
                                <title>{milestone.text} (Weight: {milestone.weightage})</title>
                              </g>
                            );
                          })}
                        </svg>
                      );
                    })()}
                  </div>
                </div>

                {/* Milestones List with h-auto */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-6">Milestones</h2>

                  <div className="h-auto pink-scrollbar pr-4">
                    <div className="space-y-4">
                      {selectedGoal.milestones.map((milestone, index) => {
                        const currentMilestoneIndex = selectedGoal.milestones.findIndex(m => !m.completed);

                        return (
                          <motion.div
                            key={milestone.id}
                            className={`p-6 rounded-lg border-2 ${milestone.completed
                              ? 'border-green-500 bg-green-900/40'
                              : index === currentMilestoneIndex
                                ? 'border-yellow-500 bg-yellow-900/40'
                                : 'border-gray-600 bg-gray-900/40'
                              }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-semibold text-white mb-2 break-words">
                                  Milestone {index + 1}: {milestone.text}
                                </h3>
                                <p className="text-white/60 mb-2">Weight: {milestone.weightage}%</p>

                                {milestone.completed && milestone.completionDetails && (
                                  <div className="mt-4 p-4 bg-black/20 rounded">
                                    <p className="text-white/80">
                                      <strong>Completed on:</strong> {new Date(milestone.completionDetails.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-white/80 mt-2 break-words">
                                      <strong>Notes:</strong> {milestone.completionDetails.details}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {milestone.completed ? (
                                <div className="flex items-center gap-2">
                                  <motion.svg
                                    className="w-8 h-8 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 500 }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </motion.svg>
                                </div>
                              ) : index === currentMilestoneIndex && (
                                <motion.button
                                  onClick={() => {
                                    setSelectedMilestone(milestone);
                                    setShowMilestoneCompletionForm(true);
                                  }}
                                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm"
                                  whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Mark Complete
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone Completion Modal with Fixed Inputs */}
              <AnimatePresence>
                {showMilestoneCompletionForm && selectedMilestone && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-gradient-to-b from-black/95 via-purple-900/80 to-indigo-900/95 rounded-lg p-8 w-full max-w-md mx-4"
                    >
                      <h3 className="text-2xl font-bold text-white mb-4 break-words">
                        Complete Milestone: {selectedMilestone.text}
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="text-white/80 text-sm mb-2 block">Date Completed</label>
                          <input
                            type="date"
                            value={milestoneDate}
                            onChange={(e) => setMilestoneDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-white/80 text-sm mb-2 block">Details/Notes</label>
                          <textarea
                            value={milestoneDetails}
                            onChange={(e) => setMilestoneDetails(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white"
                            rows={3}
                            placeholder="Add any notes about completing this milestone..."
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-4 mt-6">
                        <motion.button
                          onClick={() => {
                            setShowMilestoneCompletionForm(false);
                            setSelectedMilestone(null);
                          }}
                          className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
                          whileHover={{ scale: 1.05, backgroundColor: "#4b5563" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            if (selectedGoal && selectedMilestone) {
                              handleMarkMilestoneComplete(
                                selectedGoal.id,
                                selectedMilestone.id,
                                {
                                  details: milestoneDetails,
                                  date: milestoneDate
                                }
                              );
                              setShowMilestoneCompletionForm(false);
                              setSelectedMilestone(null);
                            }
                          }}
                          className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
                          whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Mark Complete
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GoalTracker;