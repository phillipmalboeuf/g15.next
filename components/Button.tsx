import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Spacer from './Spacer';
import { FiArrowRight } from "react-icons/fi";

type ButtonProps = {
  label?: string;
  color?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
    >
      <span>{label}</span>
      <Spacer />
      <FiArrowRight size={18} />
    </motion.button>
  );
};

export default Button;