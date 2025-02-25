interface CustomButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const baseClasses =
    "font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50"
  const defaultClasses = "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400"

  return (
    <button
      type={type}
      className={`${baseClasses} ${defaultClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default CustomButton

