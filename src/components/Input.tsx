interface InputProps {
  label: string
  value: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  type?: string
}

const Input = ({
  label,
  value,
  onChange,
  placeholder = "Enter your text",
  type = "text",
}: InputProps) => {
  return (
    <div className="flex-1 min-w-[200px] relative">
      <label className="block text-gray-700 font-semibold mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 text-gray-400 border-2 border-gray-300 rounded-lg focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
