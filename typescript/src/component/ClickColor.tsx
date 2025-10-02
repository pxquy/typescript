// component/Button.tsx
interface ButtonProps {
  label: string; // Text hiển thị
  color: string; // Class màu nền (Tailwind)
  onClick: () => void; // Hành động khi click
}

const Button = ({ label, color, onClick }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded ${color}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
