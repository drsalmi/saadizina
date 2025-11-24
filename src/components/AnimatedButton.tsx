import React, { useState } from 'react';
import { ReactNode } from 'react';

export type ButtonTheme = 'purple' | 'blue' | 'rose' | 'amber' | 'emerald' | 'slate';

export interface AnimatedButtonProps {
    text: string;
    actionText?: string;
    icon?: ReactNode;
    theme?: ButtonTheme;
    orientation?: 'horizontal' | 'inclined';
    className?: string;
    onClick?: () => void;
}

export interface ThemeColors {
    wrapperGradient: string;
    contentGradient: string;
    glow: string;
    shadow: string;
    text: string;
    outline: string;
    bgBlur: string;
}

const themeMap: Record<ButtonTheme, ThemeColors> = {
    purple: {
        wrapperGradient: 'from-[#f4b1fd] to-[#8e26e2]',
        contentGradient: 'from-[#c389f2] to-[#8e26e2]',
        glow: 'from-transparent to-[#8e26e2]',
        shadow: 'shadow-purple-900/40',
        text: 'text-[#ffe7ff]',
        outline: 'from-transparent via-white to-transparent',
        bgBlur: 'bg-[#5e2b83]'
    },
    blue: {
        wrapperGradient: 'from-cyan-300 to-blue-600',
        contentGradient: 'from-cyan-400 to-blue-600',
        glow: 'from-transparent to-blue-700',
        shadow: 'shadow-blue-900/40',
        text: 'text-cyan-50',
        outline: 'from-transparent via-cyan-100 to-transparent',
        bgBlur: 'bg-blue-800'
    },
    rose: {
        wrapperGradient: 'from-rose-300 to-pink-600',
        contentGradient: 'from-rose-400 to-pink-600',
        glow: 'from-transparent to-pink-700',
        shadow: 'shadow-pink-900/40',
        text: 'text-rose-50',
        outline: 'from-transparent via-rose-100 to-transparent',
        bgBlur: 'bg-rose-900'
    },
    amber: {
        wrapperGradient: 'from-amber-200 to-orange-600',
        contentGradient: 'from-amber-300 to-orange-500',
        glow: 'from-transparent to-orange-700',
        shadow: 'shadow-orange-900/40',
        text: 'text-amber-50',
        outline: 'from-transparent via-amber-100 to-transparent',
        bgBlur: 'bg-orange-700'
    },
    emerald: {
        wrapperGradient: 'from-emerald-300 to-green-700',
        contentGradient: 'from-emerald-400 to-green-700',
        glow: 'from-transparent to-green-700',
        shadow: 'shadow-emerald-900/40',
        text: 'text-emerald-50',
        outline: 'from-transparent via-emerald-100 to-transparent',
        bgBlur: 'bg-emerald-900'
    },
    slate: {
        wrapperGradient: 'from-gray-300 to-slate-700',
        contentGradient: 'from-gray-400 to-slate-800',
        glow: 'from-transparent to-slate-800',
        shadow: 'shadow-slate-900/40',
        text: 'text-slate-50',
        outline: 'from-transparent via-white to-transparent',
        bgBlur: 'bg-slate-800'
    }
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    text,
    actionText = "Success!",
    icon,
    theme = 'purple',
    orientation = 'inclined',
    className = '',
    onClick
}) => {
    const colors = themeMap[theme];
    const isInclined = orientation === 'inclined';

    // Helper to generate delay style for character animations
    const getDelayStyle = (index: number) => ({
        animationDelay: `${(index + 1) * 0.03}s`
    });

    return (
        <button
            onClick={onClick}
            className={`
                relative group border-0 bg-transparent cursor-pointer w-[220px] h-[60px] sm:h-[80px] outline-none
                ${isInclined ? 'rotate-[353deg] skew-x-[4deg]' : ''}
                ${className}
            `}
        >
            {/* Background Blur Layer */}
            <div className={`
                absolute inset-0 rounded-[18px] blur-[1px] transition-all duration-300
                group-active:blur-[5px] group-active:opacity-70
                before:content-[''] before:absolute before:inset-0 before:rounded-[20px] before:blur-[5px] before:transition-all before:duration-300
                before:shadow-[-7px_6px_0_0_rgba(0,0,0,0.2)]
                group-active:before:shadow-[-7px_6px_0_0_rgba(0,0,0,0.2)]
                ${colors.bgBlur}
            `} />

            {/* Main Wrapper */}
            <div className={`
                relative h-full rounded-[18px] overflow-hidden p-[3px] transition-transform duration-300
                translate-x-[6px] -translate-y-[6px]
                group-hover:translate-x-[8px] group-hover:-translate-y-[8px]
                group-active:translate-x-[3px] group-active:-translate-y-[3px]
                bg-gradient-to-b ${colors.wrapperGradient}
            `}>

                {/* Rotating Outline */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 overflow-hidden rounded-[18px]">
                    <div className={`
                        absolute inset-[2px] w-[120px] h-[300px] m-auto bg-gradient-to-r ${colors.outline}
                        animate-spin-slow opacity-70
                        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        paused group-hover:running
                    `}></div>
                </div>

                {/* Inner Content */}
                <div className={`
                    relative h-full z-10 flex items-center justify-center gap-4 rounded-[15px]
                    font-semibold text-[23px] tracking-tight transition-all duration-300
                    bg-gradient-to-b ${colors.contentGradient}
                    shadow-[inset_-2px_12px_11px_-5px_rgba(255,255,255,0.2),inset_1px_-3px_11px_0px_rgba(0,0,0,0.35)]
                    group-active:shadow-[inset_-1px_12px_8px_-5px_rgba(0,0,0,0.4),inset_0px_-3px_8px_0px_rgba(0,0,0,0.2)]
                    ${colors.text}
                `}>

                    {/* Inner Glow */}
                    <div className={`
                        absolute inset-0 w-[80%] top-[45%] bottom-[35%] m-auto opacity-70 blur-[5px] brightness-125 pointer-events-none
                        bg-gradient-to-b ${colors.glow}
                    `} />

                    {/* Icon Container */}
                    <div className="inline-flex items-center gap-6 relative mx-auto w-full">

                        {/* Default Text (State 1) */}
                        <div className="flex items-center justify-center transition-all duration-300 group-focus:opacity-0 absolute px-4 left-1/2 -translate-x-1/2">
                            <div className="relative animate-swing paused group-hover:running drop-shadow-md pe-3">
                                {icon}
                            </div>
                            {text.split('').map((char, i) => (
                                // The outer span handles the "On Load" entrance animation (slow)
                                <span
                                    key={i}
                                    className="block relative animate-char-appear"
                                    style={getDelayStyle(i)}
                                >
                                    {/* Normal State - Disappears on Hover (fast) */}
                                    <span
                                        className="block group-hover:animate-char-disappear"
                                        style={getDelayStyle(i)}
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                    {/* Hover State - Appears on Hover (fast) */}
                                    <span
                                        className="absolute inset-0 text-white/90 opacity-0 group-hover:animate-char-appear-fast"
                                        style={getDelayStyle(i)}
                                        aria-hidden="true"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>



                    {/* Action Text (State 2 - Appears on Focus/Click) */}
                    <span className="flex items-center justify-center absolute left-[80px] opacity-0 group-focus:opacity-100 transition-opacity duration-300">
                        {actionText.split('').map((char, i) => (
                            <span
                                key={i}
                                className="block group-focus:animate-char-appear"
                                style={{
                                    animationDelay: `${(i + 1) * 0.05}s`,
                                    animationFillMode: 'backwards'
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </span>

                </div>
            </div>
        </button>
    );
};

export default AnimatedButton;