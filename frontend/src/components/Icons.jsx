import React from 'react';

export const IconChevronLeft = ({ size = 14, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

export const IconChevronRight = ({ size = 14, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export const IconChevronDown = ({ size = 14, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const IconArrowLeft = ({ size = 14, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

export const IconArrowRight = ({ size = 14, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const IconHeart = ({ size = 16, color = 'currentColor', fill = 'none', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill={fill} stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

export const IconStar = ({ size = 12, fill = 'currentColor', className, style }) => (
  <svg width={size} height={size} fill={fill} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export const IconCheck = ({ size = 14, color = '#16a34a', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export const IconShare = ({ size = 16, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
)

export const IconSearch = ({ size = 18, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)

export const IconEye = ({ size = 16, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
  </svg>
)

export const IconPackage = ({ size = 24, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
)

export const IconLock = ({ size = 20, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

export const IconMapPin = ({ size = 20, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
)

export const IconCreditCard = ({ size = 20, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <rect x="1" y="4" width="22" height="16" rx="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
)

export const IconBell = ({ size = 20, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
)

export const IconTrash = ({ size = 13, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

export const IconCart = ({ size = 18, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

export const IconUser = ({ size = 18, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

export const IconShield = ({ size = 11, color = 'currentColor', strokeWidth = 2, className, style }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" className={className} style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export const IconPayPal = ({ size = 20, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} className={className} style={style}>
    <path d="M7 11l2 9h2l.5-3H14a5 5 0 0 0 0-10H9L7 11z" />
  </svg>
)

export const IconApple = ({ size = 20, color = 'currentColor', strokeWidth = 1.5, className, style }) => (
  <svg width={size} height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} className={className} style={style}>
    <circle cx="12" cy="12" r="9" />
  </svg>
)
