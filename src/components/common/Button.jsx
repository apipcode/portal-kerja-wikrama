import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light focus:ring-primary shadow-soft",
    secondary: "bg-secondary text-primary-dark hover:bg-secondary-light focus:ring-secondary shadow-soft",
    outline: "border-2 border-primary text-primary hover:bg-slate-50 focus:ring-primary",
    ghost: "text-slate-600 hover:text-primary hover:bg-slate-100 focus:ring-slate-500",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
