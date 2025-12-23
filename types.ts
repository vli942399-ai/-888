
import { ThreeElements } from '@react-three/fiber';

// Fix: Augment both the global and React-specific JSX namespaces.
// This ensures that React Three Fiber elements (like <mesh />, <group />, <points />, etc.) 
// are correctly recognized as valid intrinsic elements in different TS/React environments,
// particularly resolving issues in React 18+ where JSX types are scoped under the React namespace.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

// Fix: Explicitly augment the 'react' module's internal JSX namespace for legacy or strict environments.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export enum TreeState {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED'
}

export interface HandData {
  isOpen: boolean;
  position: { x: number; y: number }; // Normalized -1 to 1
  isActive: boolean;
}

export interface OrnamentData {
  chaosPosition: [number, number, number];
  targetPosition: [number, number, number];
  color: string;
  type: 'sphere' | 'box' | 'light';
  weight: number;
}
