import React, { ReactNode } from "react";

export interface PaymentMethod {
  value: string;
  label: string;
  description: string;
  icon: ReactNode;
}

export interface PaymentRadioSelectorProps {
  method: PaymentMethod;
  selectedMethod: string | null;
  onMethodChange: (method: string) => void;
  disabled?: boolean;
  className?: string;
}

const PaymentRadioSelector: React.FC<PaymentRadioSelectorProps> = ({
  method,
  selectedMethod,
  onMethodChange,
  disabled = false,
}) => {
  return (
    <>
        <div
          key={method.value}
          className={`${
            selectedMethod === method.value ? "bg-[#F0F1FD] border-[#007AFF]" : "bg-[#FAFAFB] border-transparent"
          } rounded-lg p-4 cursor-pointer transition-all border-2 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => !disabled && onMethodChange(method.value)}
        >
          <div className="flex items-start space-x-3">
            <input
              type="radio"
              name="payment-method"
              value={method.value}
              className="w-4 h-4 text-blue-600 border-[#CDCFD3] focus:ring-blue-500 cursor-pointer mt-1"
              checked={selectedMethod === method.value}
              disabled={disabled}
              onChange={(e) => onMethodChange(e.target.value)}
            />
            <label className={`${
              selectedMethod === method.value ? "text-[#007AFF]" : "text-[#808791]"
            } text-sm font-semibold cursor-pointer space-x-5 flex items-start w-full ${disabled ? "cursor-not-allowed" : ""}`}>
              {method.icon}
              <div className="flex-1">
                <span>{method.label}</span>
                <p className="font-normal text-xs !text-[#808791] mt-1">
                  {method.description}
                </p>
              </div>
            </label>
          </div>
        </div>
    </>
  );
};

export default PaymentRadioSelector;