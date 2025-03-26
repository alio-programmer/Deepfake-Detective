import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 p-4 text-center text-white">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            <p className="mt-2">AI-Powered GAN-Based Deepfake Detection App</p>
            <p className="mt-1 text-gray-400">Detect deepfake images with cutting-edge AI technology for authenticity
                verification.</p>
        </footer>
    );
};

export default Footer;