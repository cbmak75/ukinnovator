import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackHomeButtonProps {
  onClick?: () => void;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
}

const BackHomeButton: React.FC<BackHomeButtonProps> = ({
  onClick,
  className,
  size = "lg",
  variant = "default",
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) return onClick();
    navigate("/");
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      variant={variant}
      className={`inline-flex items-center ${className ?? ""}`}
      aria-label="Back to Home"
    >
      <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
      Back to Home
    </Button>
  );
};

export default BackHomeButton;
