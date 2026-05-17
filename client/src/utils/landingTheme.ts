import { Theme } from '@mui/material';

/**
 * Get theme-aware colors for landing page components
 * Returns appropriate colors based on current theme mode
 */
export const getLandingColors = (theme: Theme) => {
    const isDark = theme.palette.mode === 'dark';

    return {
        // Backgrounds
        bg: theme.palette.background.default,
        bgAlt: theme.palette.mode === 'light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.02)',
        bgCard: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
        bgCardHover: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
        bgDark: theme.palette.mode === 'light' ? '#e2e8f0' : 'rgba(0, 0, 0, 0.4)',
        bgDarker: theme.palette.mode === 'light' ? '#cbd5e1' : 'rgba(0, 0, 0, 0.6)',

        // Text colors
        text: theme.palette.text.primary,
        textSecondary: theme.palette.text.secondary,
        textMuted: theme.palette.mode === 'light' ? '#94a3b8' : '#64748b',
        textLight: theme.palette.mode === 'light' ? '#cbd5e1' : '#475569',

        // Brand colors (consistent across themes)
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        accent: theme.palette.primary.light || '#818cf8',
        accentAlt: theme.palette.secondary.light || '#f472b6',

        // Border colors
        border: theme.palette.divider,
        borderHover: theme.palette.mode === 'light' ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.3)',

        // Shadows
        shadow: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)',
        shadowHeavy: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.15)'
    };
};
