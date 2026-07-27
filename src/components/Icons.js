import React from 'react';

// Lively hover animation classes
const livelyHover = "transition-all duration-300 hover:scale-125 hover:-rotate-6 hover:-translate-y-1 cursor-pointer";
const uiHover = "transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer";

export function HematologyIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-red-500 ${className} ${livelyHover}`} {...props}>
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  );
}

export function BiochemistryIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-purple-600 ${className} ${livelyHover}`} {...props}>
      <path d="M10 2v4.5L4.5 17A3 3 0 007.2 21h9.6a3 3 0 002.7-4L14 6.5V2" />
      <path d="M8.5 2h7M7 14.5h10" />
    </svg>
  );
}

export function ImagingIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-blue-600 ${className} ${livelyHover}`} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function FurnitureIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-teal-600 ${className} ${livelyHover}`} {...props}>
      <path d="M3 7v11M21 7v11M3 13h18M6 13V9a2 2 0 012-2h8a2 2 0 012 2v4" />
      <path d="M12 9v2M11 10h2" />
    </svg>
  );
}

export function DentalIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-sky-500 ${className} ${livelyHover}`} {...props}>
      <path d="M12 2C9 2 7 3.5 7 6c0 3 1.5 6 2 9.5.5 3.5.5 6.5 3 6.5s2.5-3 3-6.5C15.5 12 17 9 17 6c0-2.5-2-4-5-4z" />
    </svg>
  );
}

export function LaboratoryIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-indigo-600 ${className} ${livelyHover}`} {...props}>
      <path d="M6 18h12M10 18v-3a4 4 0 014-4h.5" />
      <circle cx="12" cy="6" r="3" />
      <path d="M12 9v2" />
    </svg>
  );
}

export function SurgicalIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-rose-600 ${className} ${livelyHover}`} {...props}>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function EmergencyIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-amber-500 ${className} ${livelyHover}`} {...props}>
      <path d="M10 2h4M12 2v3M4.93 4.93l2.12 2.12M19.07 4.93l-2.12 2.12M3 13h18M5 13a7 7 0 0114 0" />
      <path d="M12 17v4M9 21h6" />
    </svg>
  );
}

export function IcuIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-red-600 ${className} ${livelyHover}`} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      <path d="M3.5 12h4l2-4 3 8 2-5 1.5 3h4.5" strokeWidth="1.5" />
    </svg>
  );
}

export function ConsumablesIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-cyan-600 ${className} ${livelyHover}`} {...props}>
      <path d="M18 3l3 3M16.5 4.5l-9 9M9 12l3 3M5 16l-2 5 5-2M13.5 7.5l3 3" />
    </svg>
  );
}

export function SearchIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

export function MenuIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function CloseIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function PhoneIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${livelyHover}`} {...props}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

export function EmailIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${livelyHover}`} {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function MapIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${livelyHover}`} {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ChevronLeftIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function StarIcon({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-amber-400 ${className} ${livelyHover}`} {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function CheckIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function InfoIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function DoubleCheckIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${uiHover}`} {...props}>
      <path d="M18 6L7 17l-5-5M22 10l-7.5 7.5L13 16" />
    </svg>
  );
}

export function WhatsAppIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`text-emerald-500 ${className} ${livelyHover}`} {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.874 9.877-9.874 2.636 0 5.114 1.028 6.977 2.894a9.827 9.827 0 012.89 6.98c0 5.446-4.431 9.874-9.866 9.874m0-18C5.9 3.785 1 8.686 1 14.706c0 2.052.534 4.053 1.55 5.814L1 23l7.662-2.01a10.875 10.875 0 005.21 1.326c5.922 0 10.822-4.901 10.822-10.922A10.84 10.84 0 0021.536 3.5 10.82 10.82 0 0013.9 1.5" />
    </svg>
  );
}

export function SendIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${livelyHover}`} {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function CategoryIcon({ name, className = 'w-6 h-6' }) {
  const IconMap = {
    HematologyIcon,
    BiochemistryIcon,
    ImagingIcon,
    FurnitureIcon,
    DentalIcon,
    LaboratoryIcon,
    SurgicalIcon,
    EmergencyIcon,
    IcuIcon,
    ConsumablesIcon,
  };
  const IconComp = IconMap[name] || LaboratoryIcon;
  return <IconComp className={className} />;
}

export function BiocareLogoIcon({ className = 'w-10 h-10', ...props }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={`${className} ${livelyHover}`} {...props}>
      {/* Flask Beaker Outline */}
      <path d="M38 12h24v12H38V12z" stroke="#1C3B6F" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M38 24C26 38 18 53 18 70a32 32 0 0064 0c0-17-8-32-20-46" stroke="#1C3B6F" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Liquid inside Beaker */}
      <path d="M22 70c0-14 8-26 17-36 1.5 1.5 3 2 4.5 1.5s2.5-1.5 4.5-1 3.5 1.5 5 1 2.5-1 3.5-2c8 10 16 22 16 36.5a25.5 25.5 0 01-51 .5z" fill="#A54482" opacity="0.25" />
      {/* Microscope inside Beaker */}
      <path d="M45 74h10M50 74v-8M48 60h4M46 64h8M43 52a7 7 0 0114 0v14H43V52z" stroke="#2E3192" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* ECG Line (Red) */}
      <path d="M2 64h30l4-16 4 32 4-24 3 8h51" stroke="#ED1F27" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
