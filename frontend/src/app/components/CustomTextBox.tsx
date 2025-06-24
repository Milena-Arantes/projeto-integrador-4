import React from 'react';

interface CustomTextBoxProps {
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  step?: string;
  min?: string;
  pattern?: string;
}

export default function CustomTextBox({
  name,
  placeholder,
  value,
  onChange,
  required = false,
  type = "text",
  step,
  min,
  pattern,
}: CustomTextBoxProps) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      step={step}
      min={min}
      pattern={pattern}
      className="w-full border border-gray-300 text-gray-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}