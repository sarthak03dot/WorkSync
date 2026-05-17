import { Outlet, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Tooltip,
    useMediaQuery,
    useTheme as useMuiTheme,
    Fade,
    alpha
} from "@mui/material";
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Dashboard as DashboardIcon,
    Assignment as AssignmentIcon,
    Person as ProfileIcon,
    Forum as FeedIcon,
    Logout as LogoutIcon,
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
    Search as SearchIcon,
    Close as CloseIcon,
    Description as ResumeIcon,
    Home as HomeIcon,
    MenuBook as DocumentationIcon,
    Chat as ChatIcon,
    Settings as SettingsIcon,
    AllInclusive as AllInclusiveIcon,
    Add as AddIcon
} from "@mui/icons-material";
import UserSearch from "../components/UserSearch";
import UserMenu from "../components/UserMenu";
import Logo from "../components/common/Logo";
import React from 'react';

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 88;

const PrivateLayout = () => {
    const { isAuthenticated, loading, logout, user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const muiTheme = useMuiTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
    const isTablet = useMediaQuery(muiTheme.breakpoints.down('lg'));

    const [open, setOpen] = useState(!isTablet);
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        setOpen(!isTablet);
    }, [isTablet]);

    if (loading) return null; // Or a sleek loader
    if (!isAuthenticated) return <Navigate to="/" replace />;

    const toggleDrawer = () => setOpen(!open);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleGlobalCreatePost = () => navigate('/feed?create=true');

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Documentation', icon: <DocumentationIcon />, path: '/documentation' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Task Board', icon: <AssignmentIcon />, path: '/board' },
        { text: 'Posts', icon: <FeedIcon />, path: '/feed' },
        { text: 'Post Infinitive', icon: <AllInclusiveIcon />, path: '/infinite' },
        { text: 'Messages', icon: <ChatIcon />, path: '/messages' },
        { text: 'Profile', icon: <ProfileIcon />, path: '/profile' },
        { text: 'Resume', icon: <ResumeIcon />, path: '/resume' },
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    const currentTitle = menuItems.find(i => i.path === location.pathname)?.text || 'D. Connect';

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Sidebar */}
            <Box
                component="nav"
                sx={{
                    width: { xs: 0, md: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH },
                    flexShrink: 0,
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: { xs: 'fixed', md: 'sticky' },
                    top: 0,
                    height: '100vh',
                    zIndex: 1200,
                    ...(isMobile && open && { width: '100%', bgcolor: 'background.default' })
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: theme === 'dark' ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        borderRight: '1px solid',
                        borderColor: alpha(theme === 'dark' ? '#fff' : '#000', 0.1),
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    {/* Sidebar Header */}
                    <Box sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: open ? 'space-between' : 'center',
                        height: 80
                    }}>
                        {open ? (
                            <Logo fontSize="1.3rem" />
                        ) : (
                            <Logo withText={false} />
                        )}
                        {open && !isMobile && (
                            <IconButton onClick={toggleDrawer} size="small" sx={{ color: 'text.secondary' }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        )}
                        {isMobile && (
                            <IconButton onClick={toggleDrawer}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>

                    {/* Navigation Items */}
                    <List sx={{ px: 2, flexGrow: 1, overflowY: 'auto' }}>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <ListItem key={item.text} disablePadding sx={{ mb: 1, display: 'block' }}>
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        onClick={() => isMobile && setOpen(false)}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                            mx: 1,
                                            borderRadius: '16px',
                                            bgcolor: 'transparent',
                                            color: isActive ? 'primary.main' : 'text.secondary',
                                            position: 'relative',
                                            '&::before': isActive ? {
                                                content: '""',
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: '16px',
                                                padding: '2px',
                                                background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
                                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                WebkitMaskComposite: 'xor',
                                                maskComposite: 'exclude',
                                                opacity: 0.5
                                            } : {},
                                            '&::after': isActive ? {
                                                content: '""',
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: '16px',
                                                background: `linear-gradient(135deg, ${alpha(muiTheme.palette.primary.main, 0.08)}, ${alpha(muiTheme.palette.secondary.main, 0.08)})`,
                                                zIndex: -1
                                            } : {},
                                            '&:hover': {
                                                bgcolor: isActive ? 'transparent' : alpha(muiTheme.palette.primary.main, 0.04),
                                                color: isActive ? 'primary.main' : 'text.primary',
                                                transform: 'translateX(4px)',
                                                '& .MuiListItemIcon-root': {
                                                    color: 'primary.main',
                                                    transform: 'scale(1.1)'
                                                }
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: isActive ? 'primary.main' : 'text.secondary',
                                                transition: 'all 0.2s ease'
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: isActive ? `0 10px 20px -10px ${alpha(muiTheme.palette.primary.main, 0.3)}` : 'none'
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 2 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                opacity: open ? 1 : 0,
                                                display: open ? 'block' : 'none',
                                                '& .MuiTypography-root': { fontWeight: isActive ? 700 : 500 }
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>

                    {/* Footer Actions */}
                    <Box sx={{ p: 2 }}>
                        <ListItemButton
                            onClick={logout}
                            sx={{
                                justifyContent: open ? 'flex-start' : 'center',
                                borderRadius: '16px',
                                color: 'error.main',
                                '&:hover': {
                                    bgcolor: alpha(muiTheme.palette.error.main, 0.08),
                                    '& .MuiListItemIcon-root': { transform: 'translateX(-4px)' }
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 0, color: 'inherit' }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            {open && <ListItemText primary="Logout" />}
                        </ListItemButton>
                    </Box>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { xs: '100%', md: `calc(100% - ${open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH}px)` } }}>
                {/* Topbar */}
                <AppBar
                    className="global-app-bar"
                    position="sticky"
                    color="transparent"
                    elevation={0}
                    sx={{
                        backdropFilter: 'blur(20px)',
                        bgcolor: theme === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(17,24,39,0.8)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        top: 0
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between', height: 80 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {!open && !isMobile && (
                                <IconButton onClick={toggleDrawer} edge="start" color="inherit">
                                    <MenuIcon />
                                </IconButton>
                            )}
                            {isMobile && (
                               <>
                                <IconButton onClick={toggleDrawer} edge="start" color="inherit">
                                    <MenuIcon />     

                                </IconButton>
                                <Box sx={{ width: 16 }} >
                                                 
                                    <Logo withText={true} />
                                    </Box></>
                            )}
                            <Box>
                                <Typography variant="h4" color="text.primary" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    {currentTitle}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Search and Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {isMobile ? (
                                searchOpen ? (
                                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'background.paper', zIndex: 10, display: 'flex', alignItems: 'center', px: 2 }}>
                                        <Box sx={{ flexGrow: 1 }}><UserSearch /></Box>
                                        <IconButton onClick={() => setSearchOpen(false)}><CloseIcon /></IconButton>
                                    </Box>
                                ) : (
                                    <IconButton onClick={() => setSearchOpen(true)}><SearchIcon /></IconButton>
                                )
                            ) : (
                                <UserSearch />
                            )}

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Tooltip title="Toggle Theme">
                                    <IconButton onClick={toggleTheme} color="inherit">
                                        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Account">
                                    <IconButton onClick={handleMenu} size="small" sx={{ ml: 1 }}>
                                        <Avatar
                                            src={user?.avatar}
                                            alt={user?.name}
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                border: '2px solid',
                                                borderColor: 'primary.main',
                                                bgcolor: 'primary.light'
                                            }}
                                        >
                                            {user?.name?.[0]?.toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <UserMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} />
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Content */}
                <Box
                    className="global-main-content"
                    component="main"
                    sx={{
                        flexGrow: 1,
                        px: { xs: 2, md: 4 },
                        pt: { xs: 2, md: 8 },
                        pb: { xs: 12, md: 8 },
                        overflowX: 'hidden',
                        position: 'relative'
                    }}
                >
                    <Fade in timeout={500}>
                        <Box>
                            <Outlet />
                        </Box>
                    </Fade>
                </Box>
            </Box>

            {/* Custom Floating Bottom Bar for mobile devices */}
            {isMobile && (
                <Box
                    className="mobile-bottom-nav"
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        left: 16,
                        right: 16,
                        height: 72,
                        bgcolor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: alpha(theme === 'dark' ? '#fff' : '#000', 0.1),
                        borderRadius: '24px',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 2,
                        zIndex: 1100
                    }}
                >
                    {/* Left 2 Items */}
                    <Box sx={{ display: 'flex', width: '40%', justifyContent: 'space-around', alignItems: 'center' }}>
                        <IconButton
                            component={Link}
                            to="/dashboard"
                            sx={{
                                color: location.pathname === '/dashboard' ? 'primary.main' : 'text.secondary',
                                flexDirection: 'column',
                                gap: 0.5,
                                p: 1
                            }}
                        >
                            <DashboardIcon sx={{ fontSize: '1.4rem' }} />
                            <Typography sx={{ fontSize: '0.62rem', fontWeight: 800, whiteSpace: 'nowrap' }}>Dash</Typography>
                        </IconButton>
                        <IconButton
                            component={Link}
                            to="/messages"
                            sx={{
                                color: location.pathname === '/messages' ? 'primary.main' : 'text.secondary',
                                flexDirection: 'column',
                                gap: 0.5,
                                p: 1
                            }}
                        >
                            <ChatIcon sx={{ fontSize: '1.4rem' }} />
                            <Typography sx={{ fontSize: '0.62rem', fontWeight: 800, whiteSpace: 'nowrap' }}>Chat</Typography>
                        </IconButton>
                    </Box>

                    {/* Middle Plus FAB */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', top: -20, width: '20%' }}>
                        <IconButton
                            onClick={handleGlobalCreatePost}
                            sx={{
                                width: 54,
                                height: 54,
                                background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
                                color: 'white',
                                boxShadow: `0 4px 20px 0 ${alpha(muiTheme.palette.primary.main, 0.5)}`,
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: `0 6px 24px 0 ${alpha(muiTheme.palette.primary.main, 0.6)}`
                                },
                                transition: 'all 0.2s ease-out'
                            }}
                        >
                            <AddIcon sx={{ fontSize: '1.8rem' }} />
                        </IconButton>
                    </Box>

                    {/* Right 2 Items */}
                    <Box sx={{ display: 'flex', width: '40%', justifyContent: 'space-around', alignItems: 'center' }}>
                        <IconButton
                            component={Link}
                            to="/feed"
                            sx={{
                                color: (location.pathname === '/feed' || location.pathname === '/infinite') ? 'primary.main' : 'text.secondary',
                                flexDirection: 'column',
                                gap: 0.5,
                                p: 1
                            }}
                        >
                            <FeedIcon sx={{ fontSize: '1.4rem' }} />
                            <Typography sx={{ fontSize: '0.62rem', fontWeight: 800, whiteSpace: 'nowrap' }}>Feed</Typography>
                        </IconButton>
                        <IconButton
                            component={Link}
                            to="/profile"
                            sx={{
                                color: location.pathname === '/profile' ? 'primary.main' : 'text.secondary',
                                flexDirection: 'column',
                                gap: 0.5,
                                p: 1
                            }}
                        >
                            <ProfileIcon sx={{ fontSize: '1.4rem' }} />
                            <Typography sx={{ fontSize: '0.62rem', fontWeight: 800, whiteSpace: 'nowrap' }}>Me</Typography>
                        </IconButton>
                    </Box>
                </Box>
            )}

        </Box >
    );
};

export default PrivateLayout;
