interface InputAreaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const InputArea = ({
  label,
  value,
  onChange,
  placeholder = "Enter your text",
}: InputAreaProps) => {
  return (
    <div className="w-full h-full min-w-[200px]">
      <label className="block text-gray-700 font-semibold mb-1">
        {label} <span className="text-red-500">*</span>
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[276px] p-3 text-gray-400 border-2 border-gray-300 rounded-lg focus:outline-none resize-none"
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputArea
