interface Option {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  options: Option[];
  error?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
}) => {
  return (
    <div className="space-y-0.5 w-full">
      <label className="block font-semibold text-emerald-700">{label}</label>
      <div className="flex gap-4 w-full">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex-1 text-center py-2 rounded-xl cursor-pointer transition-all backdrop-blur-sm
                ${
                  value === option.value
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white/30 text-emerald-700 hover:bg-emerald-100/30"
                }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              onBlur={onBlur}
              className="hidden m-3"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default RadioButtonGroup;
