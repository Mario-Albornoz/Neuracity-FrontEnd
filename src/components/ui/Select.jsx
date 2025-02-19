const Select = ({ children, value, onChange }) => {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
      >
        {children}
      </select>
    );
  };
  
  export default Select;
  