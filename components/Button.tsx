import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Spacer from './Spacer';
import { FiArrowRight, FiMenu } from "react-icons/fi";

type ButtonProps = {
  label?: string;
  icon?: string
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
    >
      <span>{label}</span>
      <Spacer />
      {{
        'menu': <FiMenu size={18} />
      }[icon] || <FiArrowRight size={18} />}
    </motion.button>
  );
};

export default Button;