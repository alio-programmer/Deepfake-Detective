import React from "react";

const Public = () => {
    return (
        <div className="bg-gradient-to-b from-black to-violet-950 text-white w-screen h-[95vh] flex flex-col justify-center items-center p-6">
            <div className="max-w-3xl text-center">
                {/* Title */}
                <h1 className="text-7xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text animate-pulse">
                    Deepfake Detective
                </h1>
                <p className="text-3xl font-semibold mb-6">
                    AI-Powered Deepfake Detection for Secure Digital Trust
                </p>

                {/* What is Deepfake Detective */}
                <p className="text-2xl font-semibold mb-2">🔍 What is Deepfake Detective?</p>
                <p className="text-lg leading-relaxed opacity-90 mb-6">
                    Deepfake Detective is an advanced AI-powered tool that detects manipulated
                    images and videos using cutting-edge GAN-based technology. In a world filled
                    with misinformation, our platform ensures authenticity and protects digital integrity.
                </p>

                {/* Why Choose Deepfake Detective */}
                <div className="mt-6 p-6 border border-gray-500 rounded-lg bg-black/20 shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4">🚀 Why Choose Deepfake Detective?</h2>
                    <ul className="text-lg space-y-3 text-left">
                        <li>✅ <span className="font-bold text-purple-300">AI-Powered Accuracy:</span> Uses state-of-the-art GAN-based deepfake detection models.</li>
                        <li>✅ <span className="font-bold text-purple-300">Instant Results:</span> Upload an image, and our AI analyzes it within seconds.</li>
                        <li>✅ <span className="font-bold text-purple-300">Secure & Private:</span> Your uploaded media stays confidential and is not stored.</li>
                        <li>✅ <span className="font-bold text-purple-300">User-Friendly Interface:</span> Easy-to-use platform for individuals, businesses, and media professionals.</li>
                        <li>✅ <span className="font-bold text-purple-300">Continuous Updates:</span> Always improving with the latest deepfake detection advancements.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Public;
