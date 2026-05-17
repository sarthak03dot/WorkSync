import { Card, CardContent, CardHeader, Skeleton, Box, Grid, Paper } from "@mui/material";

export const PostSkeleton = () => (
    <Card sx={{ mb: 2, borderRadius: 3, p: 1, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
        <CardHeader
            avatar={<Skeleton animation="wave" variant="circular" width={48} height={48} />}
            title={<Skeleton animation="wave" height={15} width="40%" style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation="wave" height={12} width="20%" />}
        />
        <CardContent sx={{ pt: 0 }}>
            <Skeleton animation="wave" height={24} width="80%" style={{ marginBottom: 12 }} />
            <Skeleton animation="wave" height={16} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={16} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={16} width="60%" style={{ marginBottom: 16 }} />
            <Skeleton animation="wave" variant="rectangular" height={240} sx={{ borderRadius: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
                <Skeleton animation="wave" variant="circular" width={32} height={32} />
            </Box>
        </CardContent>
    </Card>
);

export const BoardSkeleton = () => (
    <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, overflowX: 'auto', pb: 2, width: '100%' }}>
        {[1, 2, 3].map((col) => (
            <Box key={col} sx={{ width: { xs: 280, sm: 320, md: 350 }, flexShrink: 0 }}>
                {/* Column Header */}
                <Skeleton animation="wave" variant="rectangular" height={50} sx={{ mb: 2, borderRadius: 2 }} />
                {/* Cards */}
                <Skeleton animation="wave" variant="rectangular" height={140} sx={{ mb: 2, borderRadius: 3 }} />
                <Skeleton animation="wave" variant="rectangular" height={100} sx={{ mb: 2, borderRadius: 3 }} />
                <Skeleton animation="wave" variant="rectangular" height={160} sx={{ mb: 2, borderRadius: 3 }} />
                <Skeleton animation="wave" variant="rectangular" height={120} sx={{ mb: 2, borderRadius: 3 }} />
            </Box>
        ))}
    </Box>
);

export const ProfileSkeleton = () => (
    <Grid container spacing={3.5}>
        <Grid item xs={12} lg={8}>
            <Grid container spacing={3.5}>
                <Grid item xs={12}>
                    {/* Profile Header */}
                    <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { xs: 'center', md: 'flex-start' } }}>
                            <Skeleton animation="wave" variant="circular" width={150} height={150} sx={{ flexShrink: 0 }} />
                            <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                                <Skeleton animation="wave" height={40} width="60%" sx={{ mb: 1 }} />
                                <Skeleton animation="wave" height={24} width="80%" sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                    <Skeleton animation="wave" variant="rectangular" width={140} height={44} sx={{ borderRadius: 1.5 }} />
                                    <Skeleton animation="wave" variant="rectangular" width={140} height={44} sx={{ borderRadius: 1.5 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {/* Profile Completion */}
                    <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                         <Skeleton animation="wave" height={24} width="30%" sx={{ mb: 2 }} />
                         <Skeleton animation="wave" variant="rectangular" height={10} sx={{ borderRadius: 5, mb: 1 }} />
                         <Skeleton animation="wave" height={16} width="40%" />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    {/* Heatmap / Activity */}
                    <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', height: 300 }}>
                         <Skeleton animation="wave" height={32} width="30%" sx={{ mb: 4 }} />
                         <Skeleton animation="wave" variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
            {/* Stats Block */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', height: '100%' }}>
                <Skeleton animation="wave" height={32} width="60%" sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                    {[1, 2, 3, 4].map((stat) => (
                        <Grid item xs={6} key={stat}>
                            <Skeleton animation="wave" variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                        </Grid>
                    ))}
                </Grid>
                <Skeleton animation="wave" height={32} width="50%" sx={{ mt: 5, mb: 3 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[1, 2, 3].map((item) => (
                        <Skeleton key={item} animation="wave" variant="rectangular" height={60} sx={{ borderRadius: 2 }} />
                    ))}
                </Box>
            </Paper>
        </Grid>
    </Grid>
);
