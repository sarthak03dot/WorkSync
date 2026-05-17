import React from 'react';
import {
    Dialog,
    DialogContent,
    Button,
    Box,
    IconButton,
    Typography,
    Stack
} from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import { toJpeg } from 'html-to-image';
import DevCard from './DevCard';
import { User } from '../../context/AuthContext';

interface DevCardModalProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
    totalRating: number;
}

const DevCardModal: React.FC<DevCardModalProps> = ({ open, onClose, user, totalRating }) => {

    const handleDownload = async () => {
        const element = document.getElementById('dev-card-element');
        if (!element) return;

        try {
            const dataUrl = await toJpeg(element, {
                quality: 1,
                backgroundColor: '#050505',
                pixelRatio: 2 // High quality for retina
            });
            const link = document.createElement('a');
            link.download = `dev-card-${user?.name?.toLowerCase().replace(/\s+/g, '-') || 'profile'}.jpg`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image', err);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg" // Use lg for landscape
            fullWidth={false}
            PaperProps={{
                sx: {
                    borderRadius: 6,
                    overflow: 'hidden',
                    bgcolor: '#050505',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.9)',
                    margin: { xs: 1, sm: 2 },
                    maxWidth: '100vw',
                    border: '1px solid rgba(255,255,255,0.08)'
                }
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'auto'
            }}>
                {/* Header Actions - Inside dialog to avoid vertical clipping */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 3,
                    py: 2,
                    bgcolor: '#050505',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    zIndex: 10
                }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, fontSize: '1rem' }}>
                        Preview Dev Card
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            sx={{
                                borderRadius: 3,
                                px: { xs: 2, sm: 4 },
                                py: { xs: 0.8, sm: 1.2 },
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.75rem', sm: '0.9rem' },
                                background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
                                boxShadow: '0 8px 20px rgba(99,102,241,0.4)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 28px rgba(99,102,241,0.6)',
                                }
                            }}
                        >
                            Download Card
                        </Button>
                        <IconButton
                            onClick={onClose}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                color: 'white',
                                '&:hover': { bgcolor: 'error.light' }
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                </Box>

                <DialogContent sx={{
                    p: 0,
                    overflowX: 'auto',
                    maxWidth: '100vw',
                    bgcolor: '#050505',
                    '&::-webkit-scrollbar': {
                        height: '6px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '3px'
                    }
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', minWidth: 900, p: { xs: 1, sm: 0 } }}>
                        <DevCard user={user} totalRating={totalRating} />
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default DevCardModal;
