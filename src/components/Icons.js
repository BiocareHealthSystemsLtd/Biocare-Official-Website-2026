import React from 'react';

// Lively hover animation classes
const livelyHover = "transition-all duration-300 hover:scale-125 hover:-rotate-6 hover:-translate-y-1 cursor-pointer";
const uiHover = "transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer";

export function HematologyIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/drop-of-blood.png" alt="Hematology" className={`${className} ${livelyHover}`} {...props} />;
}

export function BiochemistryIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/test-tube.png" alt="Biochemistry" className={`${className} ${livelyHover}`} {...props} />;
}

export function ImagingIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/x-ray.png" alt="Imaging" className={`${className} ${livelyHover}`} {...props} />;
}

export function FurnitureIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/hospital-bed.png" alt="Furniture" className={`${className} ${livelyHover}`} {...props} />;
}

export function DentalIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/tooth.png" alt="Dental" className={`${className} ${livelyHover}`} {...props} />;
}

export function LaboratoryIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/microscope.png" alt="Laboratory" className={`${className} ${livelyHover}`} {...props} />;
}

export function SurgicalIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/scalpel.png" alt="Surgical" className={`${className} ${livelyHover}`} {...props} />;
}

export function EmergencyIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/ambulance.png" alt="Emergency" className={`${className} ${livelyHover}`} {...props} />;
}

export function IcuIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/heart-with-pulse.png" alt="ICU" className={`${className} ${livelyHover}`} {...props} />;
}

export function ConsumablesIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/syringe.png" alt="Consumables" className={`${className} ${livelyHover}`} {...props} />;
}

export function SearchIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="Search" className={`${className} ${uiHover}`} {...props} />;
}

export function MenuIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/ios-filled/50/menu--v1.png" alt="Menu" className={`${className} ${uiHover}`} {...props} />;
}

export function CloseIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="Close" className={`${className} ${uiHover}`} {...props} />;
}

export function PhoneIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/phone.png" alt="Phone" className={`${className} ${livelyHover}`} {...props} />;
}

export function EmailIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/new-post.png" alt="Email" className={`${className} ${livelyHover}`} {...props} />;
}

export function MapIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/map-marker.png" alt="Map" className={`${className} ${livelyHover}`} {...props} />;
}

export function ChevronLeftIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/ios-filled/50/chevron-left.png" alt="Left" className={`${className} ${uiHover}`} {...props} />;
}

export function ChevronRightIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/ios-filled/50/chevron-right.png" alt="Right" className={`${className} ${uiHover}`} {...props} />;
}

export function StarIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/star--v1.png" alt="Star" className={`${className} ${livelyHover}`} {...props} />;
}

export function CheckIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/checkmark--v1.png" alt="Check" className={`${className} ${uiHover}`} {...props} />;
}

export function InfoIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/info--v1.png" alt="Info" className={`${className} ${uiHover}`} {...props} />;
}

export function DoubleCheckIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/double-tick.png" alt="Double Check" className={`${className} ${uiHover}`} {...props} />;
}

export function WhatsAppIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/whatsapp--v1.png" alt="WhatsApp" className={`${className} ${livelyHover}`} {...props} />;
}

export function SendIcon({ className = '', ...props }) {
  return <img src="https://img.icons8.com/color/96/paper-plane.png" alt="Send" className={`${className} ${livelyHover}`} {...props} />;
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
  // Retaining the original logo for branding unless the user explicitly wants it replaced
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
