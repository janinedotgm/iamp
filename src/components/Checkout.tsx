'use client';
import  { useState, useEffect } from 'react';
import inputData from './../data/packages_with_path.json';
const Checkout = () => {
  const [test, setTest] = useState<Function | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      // Import both init and create_git_command
      const wasm = await import('@/../pkg/git_commands_wasm');
      // Initialize the WASM module
      await wasm.default();
      
      try {
        // Bind the function to test
        setTest(() => (input: string, repo: string) => 
          wasm.create_git_command(input, repo)
        );
      } catch (error) {
        console.error("Error generating command:", error);
      }
    }
    
    loadWasm();
  }, []);

  return (
    <div>
      {test && <button onClick={() => console.log(test(JSON.stringify(inputData), 'solana-core'))} className="px-4 py-2 bg-white font-medium text-gray-800 border border-gray-300 rounded-lg shadow-sm transition-colors duration-200 ease-in-out hover:bg-gray-100 m-12">
        Generate Command
      </button>}
      {/* {test ? <button onClick={() => test?.()}>Test</button> : 'Loading...'} */}
    </div>
  )
}

// const Checkout = dynamic(() => Promise.resolve(CheckoutComponent), {
//   // Ensure only client-side execution:
//   ssr: false
// })

export default Checkout;
