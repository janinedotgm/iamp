'use client';

import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define types for program steps
export interface ProgramStep {
  id: string;
  label: string;
  type?: 'input' | 'default' | 'output';
  position: { x: number; y: number };
}

// Node styles using Tailwind classes
const nodeStyles = {
  input: {
    className: 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md w-[180px]',
  },
  default: {
    className: 'bg-blue-50 dark:bg-blue-900/30 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md w-[180px]',
  },
  output: {
    className: 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md w-[180px]',
  },
};

// Helper function to create nodes from program steps
const createNodes = (steps: ProgramStep[]): Node[] => {
  return steps.map((step) => ({
    id: step.id,
    type: step.type || 'default',
    data: { 
      label: (
        <div className="text-sm font-medium text-gray-800 dark:text-gray-600 text-center">
          {step.label}
        </div>
      )
    },
    position: step.position,
    className: nodeStyles[step.type || 'default'].className,
  }));
};

// Helper function to create edges between nodes
const createEdges = (steps: ProgramStep[]): Edge[] => {
  return steps.slice(0, -1).map((step, index) => ({
    id: `e${step.id}-${steps[index + 1].id}`,
    source: step.id,
    target: steps[index + 1].id,
    animated: true,
    className: 'stroke-gray-400 dark:stroke-gray-500',
    style: { strokeWidth: 2 },
  }));
};

interface RustFlowDiagramProps {
  steps?: ProgramStep[];
  className?: string;
}

export function RustFlowDiagram({ 
  steps = defaultProgramSteps,
  className = '',
}: RustFlowDiagramProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, _setNodes, onNodesChange] = useNodesState(createNodes(steps));
  const [edges, setEdges, onEdgesChange] = useEdgesState(createEdges(steps));

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  return (
    <div className={`w-full h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-lg ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="rounded-xl"
      >
        <Background 
          className="bg-gray-50 dark:bg-gray-900" 
          color="#ccc"
          variant={BackgroundVariant.Dots}
        />
        <Controls className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg" />
      </ReactFlow>
    </div>
  );
}

// Default program steps (can be overridden via props)
const defaultProgramSteps: ProgramStep[] = [
  {
    id: '1',
    label: 'Program Start\n(main function)',
    type: 'input',
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    label: 'Variable Declaration\n(let mut input_string = String::new())',
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    label: 'Read User Input\n(stdin().read_line(&mut input_string))',
    position: { x: 250, y: 200 },
  },
  {
    id: '4',
    label: 'Process Input\n(input_string.trim().parse())',
    position: { x: 250, y: 300 },
  },
  {
    id: '5',
    label: 'Print Result\n(println!())',
    type: 'output',
    position: { x: 250, y: 400 },
  },
]; 