const Button = ({ children, variant = "default", className = "", ...props }) => {
    const baseStyles = "px-4 py-2 rounded-md transition";
    const variants = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      ghost: "text-gray-600 hover:text-gray-900"
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  };
  
  export default Button;
  