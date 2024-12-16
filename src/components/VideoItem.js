import React from "react";
import { Grid, Paper, Typography } from "@mui/material"; // Updated import for Material-UI v5

const VideoItem = ({ video, onVideoSelect }) => {
    return (
        <Grid item xs={12}>
            <Paper style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onVideoSelect(video)}>
                <img src={video.snippet.thumbnails.medium.url} alt="thumbnail" /> {/* Corrected image source */}
                <Typography variant="subtitle1"><b>{video.snippet.title}</b></Typography>
            </Paper>
        </Grid>
    );
};

export default VideoItem;
