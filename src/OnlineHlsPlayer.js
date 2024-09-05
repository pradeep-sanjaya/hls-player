import React from 'react';
import HlsPlayer from './HlsPlayer'; // Assuming HlsPlayer.js is in the same directory

// Function to get the online status
const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : true;

// Custom hook to use the online status
const useNavigatorOnLine = () => {
    const [status, setStatus] = React.useState(getOnLineStatus());

    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    React.useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, []);

    return status;
};

// Component to show HLS player only when online
const OnlineHlsPlayer = ({ src, autoPlay = false, controls = true, width = "100%", height = "auto" }) => {
    const isOnline = useNavigatorOnLine();

    return (
        <div>
            {isOnline ? (
                <HlsPlayer
                    src={src}
                    autoPlay={autoPlay}
                    controls={controls}
                    width={width}
                    height={height}
                />
            ) : (
                <p>You are offline. Please check your internet connection.</p>
            )}
        </div>
    );
};

export default OnlineHlsPlayer;