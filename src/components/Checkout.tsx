'use client';
import { useState, useEffect } from 'react';
import inputData from './../data/packages_with_path.json';
import CommandModal, { Step } from './CommandModal';

type GitCommandFunction = (input: string, repo: string) => string;
type CargoUpdateFunction = () => string;

const Checkout = () => {
  const [test, setTest] = useState<GitCommandFunction | null>(null);
  const [updateCargoToml, setUpdateCargoToml] = useState<CargoUpdateFunction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadWasm = async () => {
      const wasm = await import('@/../pkg/git_commands_wasm');
      await wasm.default();
      
      try {
        setTest(() => (input: string, repo: string) => 
          wasm.create_git_command(input, repo)
        );
        setUpdateCargoToml(() => () => {
          console.log("Updating Cargo.toml");
          return "echo 'Cargo.toml update command will go here'";
        });
      } catch (error) {
        console.error("Error loading WASM functions:", error);
      }
    }
    
    loadWasm();
  }, []);

  const steps: Step[] = [
    {
      title: "Clone Empty Repository",
      description: "First, clone the empty Agave repository",
      command: "git clone --filter=blob:none --sparse https://github.com/anza-xyz/agave.git agave-fetch-stage && cd agave-fetch-stage",
    },
    {
      title: "Checkout Necessary Files",
      description: "Next, checkout the required files from the Solana repository",
      command: async () => {
        if (!test) throw new Error("WASM not loaded");
        return test(JSON.stringify(inputData), 'solana-core');
      },
      isAsync: true
    },
    {
      title: "Update Cargo.toml",
      description: "Finally, update the Cargo.toml file with the necessary dependencies",
      command: async () => {
        if (!updateCargoToml) throw new Error("WASM not loaded");
        return updateCargoToml();
      },
      isAsync: true
    }
  ];

  return (
    <div>
      {test && updateCargoToml && (
        <>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white font-medium text-gray-800 border border-gray-300 rounded-lg shadow-sm transition-colors duration-200 ease-in-out hover:bg-gray-100 m-12"
          >
            Generate Commands
          </button>
          <CommandModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            steps={steps}
          />
        </>
      )}
    </div>
  );
}

// const Checkout = dynamic(() => Promise.resolve(CheckoutComponent), {
//   // Ensure only client-side execution:
//   ssr: false
// })

export default Checkout;
