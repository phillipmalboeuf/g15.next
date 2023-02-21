import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Spacer from './Spacer';
import { FiArrowRight } from "react-icons/fi";
import Image from 'next/image';

type TitleCardProps = {
    label: string;
    color?: string;
  }

  const TitleCard: React.FC<TitleCardProps> = ({
    label,
    color,
  }) => {
  return (
    <div
        style={{
            display: 'flex',
        }}
    >
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
        <svg width="262" height="76" viewBox="0 0 262 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M156.537 2.43132L261 11.8079V64.7415L155.288 73.7888C138.125 75.2577 120.867 75.2406 103.707 73.7378L1 64.7433V11.806L102.459 2.4873C120.446 0.835242 138.546 0.816505 156.537 2.43132Z" stroke={color || "#1A1A1A"} strokeWidth="2"/>
        </svg>
        <h2 style={{color: color || '#333', position: 'absolute'}}>{label}</h2>
        </div>
    </div>
  );
};

export default TitleCard;