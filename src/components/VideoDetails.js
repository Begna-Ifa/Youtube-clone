import React, { useState } from "react";
import { Paper, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SubscribeIcon from "@mui/icons-material/Subscriptions";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Icon for vertical menu

const VideoDetails = ({ video }) => {
    const [anchorEl, setAnchorEl] = useState(null); // State for menu anchor
    const [liked, setLiked] = useState(false); // State for like button
    const [subscribed, setSubscribed] = useState(false); // State for subscribe button

    if (!video) return <div>Loading...</div>;

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Set anchor for menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Close the menu
    };

    const handleDownload = async () => {
        try {
            // Replace with your logic to retrieve the download URL
            const downloadUrl = await getDownloadUrl(video.id.videoId); // Assume this function fetches the valid download URL
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `${video.snippet.title}.mp4`); // Set the download attribute with the video title
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            handleClose(); // Close menu after action
        }
    };

    const handleReport = () => {
        console.log("Report button clicked"); // Logic for reporting the video
        handleClose(); // Close menu after action
    };

    const toggleLike = () => {
        setLiked(!liked); // Toggle liked state
    };

    const toggleSubscribe = () => {
        setSubscribed(!subscribed); // Toggle subscribed state
    };

    // Mock function to simulate fetching download URL
    const getDownloadUrl = async (videoId) => {
        // Here you would typically make an API call to fetch the downloadable URL
        // For example purposes, we'll return a hardcoded URL. Replace this with your API call.
        return `https://path-to-your-video/${videoId}.mp4`; // Replace with the actual video URL
    };

    return (
        <React.Fragment>
            <Paper elevation={6} style={{ height: '70%' }}>
                <iframe
                    frameBorder="0"
                    height="100%"
                    width="100%"
                    title="Video player"
                    src={videoSrc}
                />
            </Paper>
            <Paper elevation={6} style={{ padding: '15px' }}>
                <Typography variant="h4">
                    {video.snippet.title} - {video.snippet.channelTitle}
                </Typography>
                <Typography variant="subtitle1">{video.snippet.channelTitle}</Typography>
                <Typography variant="subtitle2">{video.snippet.description}</Typography>
                <div style={{ marginTop: '10px' }}>
                    <Button
                        variant="contained"
                        color={liked ? "success" : "primary"} // Change color based on liked state
                        startIcon={<ThumbUpIcon />}
                        onClick={toggleLike} // Handle like button
                    >
                        Like
                    </Button>
                    <Button
                        variant="contained"
                        color={subscribed ? "error" : "secondary"} // Change color based on subscribed state
                        startIcon={<SubscribeIcon />}
                        style={{ marginLeft: '10px' }}
                        onClick={toggleSubscribe} // Handle subscribe button
                    >
                        Subscribe
                    </Button>
                    <IconButton onClick={handleMenuClick} style={{ marginLeft: '10px' }}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleDownload}>Download</MenuItem>
                        <MenuItem onClick={handleReport}>Report</MenuItem>
                    </Menu>
                </div>
            </Paper>
        </React.Fragment>
    );
};

export default VideoDetails;
