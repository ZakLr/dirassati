"use client";

import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import SignupRight from "./SignupRight";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [kidsCount, setKidsCount] = useState(1);

  // New states for collected data:
  const [parentInfo, setParentInfo] = useState({});
  const [kidsInfo, setKidsInfo] = useState([]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Called at end of Step4 to submit payload
  const submitKidsInfo = (kidsData) => {
    setKidsInfo(kidsData);
    // Now call handleSubmit after the state has been updated
    handleSubmit(kidsData);
  };

  // Modified handleSubmit to accept kidsData parameter
  const handleSubmit = (kidsDataParam) => {
    const payload = {
      parent: parentInfo,
      kidsCount,
      kids: kidsDataParam || kidsInfo, // Use passed data or current state
    };
    console.log("Submitting payload to backend:", payload);
    nextStep(); // proceed to Step5
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      {/* Left side: dynamic step content */}
      <div
        className={`${
          step === 5 ? "w-full" : "w-1/2"
        } p-8 flex items-center justify-center`}
      >
        <div className="w-full max-w-lg">
          {step === 1 && (
            <Step1 nextStep={() => setStep(2)} setParentInfo={setParentInfo} />
          )}
          {step === 2 && (
            <Step2 nextStep={() => setStep(5)} parentInfo={parentInfo} />
          )}
          {step === 3 && (
            <Step3 nextStep={() => setStep(4)} setKidsCount={setKidsCount} />
          )}
          {step === 4 && (
            <Step4
              nextStep={() => {}}
              kidsCount={kidsCount}
              setKidsInfo={submitKidsInfo}
            />
          )}
          {step === 5 && <Step5 />}
        </div>
      </div>

      {/* Right side: rendered only when step !== 5 */}
      {step !== 5 && <SignupRight />}
    </div>
  );
}
