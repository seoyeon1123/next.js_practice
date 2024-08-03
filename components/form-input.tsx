interface IFormProps {
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  errors: string[];
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export default function FormInput({
  type,
  placeholder,
  name,
  required,
  errors,
  showPassword = false,
  onTogglePassword,
}: IFormProps) {
  return (
    <div className="relative w-full">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full h-8 ring-2 ring-gray-300 px-2 bg-slate-100 placeholder:text-xs rounded-sm"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute inset-y-0 right-0 flex items-center px-2"
        >
          <span className="material-icons">
            {showPassword ? '숨기기' : '비밀번호'}
          </span>
        </button>
      )}
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
