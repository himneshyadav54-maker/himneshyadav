import React from 'react';

interface SecretAdminNameProps {
  className?: string;
  isLowercase?: boolean;
  onSecretTrigger: () => void;
}

/**
 * Renders "Himnesh Yadav" or "HIMNESH YADAV" where clicking the second 'a' in "Yadav"
 * secretly triggers the admin PIN modal.
 */
export const SecretAdminName: React.FC<SecretAdminNameProps> = ({
  className = '',
  isLowercase = false,
  onSecretTrigger,
}) => {
  if (isLowercase) {
    return (
      <span className={className}>
        Himnesh Y-a-d-
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSecretTrigger();
          }}
          className="cursor-default select-none"
          title=""
          aria-hidden="true"
        >
          a
        </span>
        v
      </span>
    );
  }

  // Uppercase: Y A D A V
  return (
    <span className={`inline-block select-none ${className}`}>
      <span>HIMNESH YAD</span>
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSecretTrigger();
        }}
        className="cursor-default inline-block hover:text-[#FF8C42] transition-colors"
        title=""
        aria-label="Admin Access"
      >
        A
      </span>
      <span>V</span>
    </span>
  );
};
