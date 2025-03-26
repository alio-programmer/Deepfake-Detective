import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

export default function Home() {
  const [model, setModel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [result, setResult] = useState("");

  // Load the TensorFlow.js Model
  useEffect(() => {
    async function loadModel() {
      console.log("Loading Model...");
      const myModel = await tf.loadLayersModel("/model/model.json");
      setModel(myModel);
      console.log("Model Loaded!");
    }
    loadModel();
  }, []);

  // Handle Image Upload
  const handleSelectedImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setIsImageLoaded(true);
      setResult(""); // Reset result when new image is uploaded
    };
    reader.readAsDataURL(file);
  };

  // Reset Image
  const handleResetImage = () => {
    setSelectedImage(null);
    setIsImageLoaded(false);
    setResult(""); // Reset result
  };

  // Preprocess Image for Model
  const preprocessImage = async (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 128;
        canvas.height = 128;
        ctx.drawImage(img, 0, 0, 128, 128);

        // Convert to grayscale & Normalize
        const imageData = ctx.getImageData(0, 0, 128, 128);
        let grayImage = [];
        for (let i = 0; i < imageData.data.length; i += 4) {
          let gray =
              imageData.data[i] * 0.299 +
              imageData.data[i + 1] * 0.587 +
              imageData.data[i + 2] * 0.114;
          grayImage.push(gray / 255); // Normalize
        }
        resolve(tf.tensor4d(grayImage, [1, 128, 128, 1]));
      };
    });
  };

  // Run Prediction
  const handleCheckResult = async () => {
    if (!model || !selectedImage) return;

    const tensor = await preprocessImage(selectedImage);
    const prediction = model.predict(tensor);
    const output = await prediction.data();

    setResult(output[0] > 0.5 ? "Real Image" : "Fake Image");
  };

  return (
      <div className="bg-gradient-to-b from-black to-violet-950 text-white w-screen h-[95vh] flex flex-col justify-center items-center p-6">
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          AI-Powered Deepfake Detection
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl mb-8">
          Upload an image and let our advanced GAN-based AI model determine whether it's real or fake within seconds.
        </p>

        <div className="w-full grid grid-cols-2 h-[80%] gap-8 p-4">
          {/* Left Section - Upload & Preview */}
          <div className="flex flex-col justify-center items-center border-r border-white pr-8">
            <div className="border-4 border-white w-[60%] h-[60%] bg-gray-800 p-5 rounded-2xl flex justify-center items-center">
              {isImageLoaded ? (
                  <img
                      src={selectedImage}
                      className="rounded-2xl border-4 border-white"
                      alt="Uploaded Preview"
                  />
              ) : (
                  <label className="w-full h-full flex flex-col justify-center items-center text-white bg-gray-900 border-2 border-dashed border-gray-500 rounded-lg cursor-pointer hover:bg-gray-800 transition-all">
                    <span className="text-lg">Click to Upload</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleSelectedImageChange}
                        className="hidden"
                    />
                  </label>
              )}
            </div>

            {isImageLoaded && (
                <div className="flex gap-4 mt-4">
                  <button
                      onClick={handleCheckResult}
                      className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all hover:bg-blue-600"
                  >
                    Check Result
                  </button>
                  <button
                      onClick={handleResetImage}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all hover:bg-red-600"
                  >
                    Reset Image
                  </button>
                  <button
                      className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-all hover:bg-yellow-600"
                  >
                    Save Result
                  </button>
                </div>
            )}
          </div>

          {/* Right Section - Display Result */}
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-gray-300">The provided image is:</h2>
            <h1
                className={`text-4xl font-bold mt-4 ${
                    result === "Real Image" ? "text-green-400" : result === "Fake Image" ? "text-red-400" : "text-gray-500"
                }`}
            >
              {result || "Awaiting Analysis..."}
            </h1>
          </div>
        </div>
      </div>
  );
}
