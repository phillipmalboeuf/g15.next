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
  color,
  onClick
}) => {
  return (
    <motion.div 
      style={{
        display: 'flex',
        padding: '6px 12px 6px 20px',
        borderRadius: 99,
        backgroundColor: color || '#625BF6',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <p style={{fontSize:18, color: '#FEFEFE'}}>{label}</p>
      <Spacer />
      <FiArrowRight size={18} color='#FEFEFE' />
    </motion.div>
  );
};

export default Button;