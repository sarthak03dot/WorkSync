import { Box, Typography, Fade, Stack, Button, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { GridView as GridIcon, AllInclusive as SwipeIcon } from "@mui/icons-material";

const FeedHeader = () => {
    const theme = useTheme();
    const location = useLocation();
    const isSwipe = location.pathname === '/infinite';

    const styles = {
        header: {
            mb: { xs: 3, sm: 6 },
            mt: { xs: 1, sm: 0 },
            textAlign: { xs: 'center', md: 'left' } // Center on mobile
        },
        title: {
            fontWeight: 900,
            letterSpacing: -1.5,
            mb: 1,
            // Fluid typography scaling
            fontSize: { xs: 'clamp(1.5rem, 8vw, 2rem)', sm: '2.5rem', md: '3rem' },
            wordBreak: 'break-word',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            lineHeight: 1.1
        },
        subtitle: {
            fontWeight: 500,
            color: "text.secondary",
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            maxWidth: { xs: '100%', md: '600px' },
            mx: { xs: 'auto', md: 0 }
        }
    };

    return (
        <Fade in timeout={800}>
            <Box sx={{ ...styles.header, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', md: 'center' }, gap: 3 }}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h1" sx={styles.title}>
                        Social Feed
                    </Typography>
                    <Typography variant="body1" sx={styles.subtitle}>
                        Share your engineering journey, ask questions, and connect with the community.
                      </Typography>
                </Box>

                {/* Sleek Toggle between Grid and Swipe */}
                <Stack 
                    direction="row" 
                    spacing={0.5} 
                    sx={{ 
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                        p: 0.35, 
                        borderRadius: '24px',
                        border: '1px solid',
                        borderColor: 'divider',
                        width: 'fit-content',
                        height: 'fit-content',
                        boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                >
                    <Button
                        component={Link}
                        to="/feed"
                        variant={!isSwipe ? "contained" : "text"}
                        size="small"
                        startIcon={<GridIcon sx={{ fontSize: '1rem' }} />}
                        sx={{
                            borderRadius: '20px',
                            fontWeight: 900,
                            fontSize: '0.72rem',
                            textTransform: 'none',
                            background: !isSwipe ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : 'transparent',
                            color: !isSwipe ? '#fff' : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'text.secondary'),
                            boxShadow: 'none',
                            py: 0.5,
                            px: 2,
                            '&:hover': {
                                background: !isSwipe ? 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)' : 'rgba(0,0,0,0.04)',
                                color: !isSwipe ? '#fff' : undefined,
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Grid View
                    </Button>
                    <Button
                        component={Link}
                        to="/infinite"
                        variant={isSwipe ? "contained" : "text"}
                        size="small"
                        startIcon={<SwipeIcon sx={{ fontSize: '1rem' }} />}
                        sx={{
                            borderRadius: '20px',
                            fontWeight: 900,
                            fontSize: '0.72rem',
                            textTransform: 'none',
                            background: isSwipe ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : 'transparent',
                            color: isSwipe ? '#fff' : (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'text.secondary'),
                            boxShadow: 'none',
                            py: 0.5,
                            px: 2,
                            '&:hover': {
                                background: isSwipe ? 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)' : 'rgba(0,0,0,0.04)',
                                color: isSwipe ? '#fff' : undefined,
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Swipe View
                    </Button>
                </Stack>
            </Box>
        </Fade>
    );
};

export default FeedHeader;