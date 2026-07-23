"use client";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({
  currentStep,
  steps,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`step-indicator ${
                  isCompleted
                    ? "bg-primary-500 text-white"
                    : isActive
                      ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-110"
                      : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`hidden sm:block text-xs font-medium ${
                  isActive
                    ? "text-primary-600"
                    : isCompleted
                      ? "text-primary-500"
                      : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  stepNum < currentStep ? "bg-primary-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
