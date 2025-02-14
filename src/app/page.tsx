import { RustFlowDiagram, ProgramStep } from '../components/RustFlowDiagram';
import Checkout from "../components/Checkout";
// Define your custom program steps
const myProgramSteps: ProgramStep[] = [
  {
    id: '1',
    label: 'main()',
    type: 'input',
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    label: 'fn test1()',
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    label: 'fn test2()',
    position: { x: 250, y: 200 },
  },
  {
    id: '4',
    label: 'fn test3()',
    position: { x: 250, y: 300 },
  },
  {
    id: '5',
    label: 'fn test4()',
    type: 'output',
    position: { x: 250, y: 400 },
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mt-24 mb-2 text-gray-500 dark:text-gray-100">
        I-MAP / AgaveMap / IBRF
      </h1>
      <h2 className="text-xl font-bold mb-8 text-gray-800 dark:text-gray-300">We should choose a name ;)</h2>
      <Checkout />
      <div className="w-full max-w-4xl">
        <RustFlowDiagram 
          steps={myProgramSteps} 
          className="border border-gray-200 dark:border-gray-700"
        />
      </div>
    </main>
  );
}
