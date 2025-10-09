type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-12 w-40 items-center rounded-full bg-gray-200 p-1 shadow-inner transition-colors duration-300 focus:outline-none"
    >

      <span
        className={`absolute top-1 left-1 flex h-10 w-20 items-center justify-center rounded-full bg-purple-700 text-white font-semibold shadow-md transform transition-transform duration-300 ease-in-out ${
          checked ? "translate-x-20" : "translate-x-0"
        }`}
      >
        {checked ? "New" : "All"}
      </span>

    
      <span
        className={`absolute left-0 w-1/2 text-center text-sm font-semibold transition-colors duration-300 ${
          !checked ? "text-purple-700" : "text-gray-500"
        }`}
      >
        {checked ? "All" : " "}
      </span>
      <span
        className={`absolute right-0 w-1/2 text-center text-sm font-semibold transition-colors duration-300 ${
          checked ? "text-purple-700" : "text-gray-500"
        }`}
      >
        {checked ? " " : "New"}
      </span>
    </button>
  );
}
