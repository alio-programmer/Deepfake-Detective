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
    };
    reader.readAsDataURL(file);
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
    <div className="bg-gray-800 text-black w-screen h-[95vh] flex flex-col justify-center items-center">
      <div className="w-full h-20 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-white">See Our AI-Powered GAN based Deepfake Detection Tool in Action</h1>
      </div>
      <div className="w-full grid grid-cols-2 h-[80%] p-2">
        <div className="flex flex-col justify-center items-center border-solid border-white border-r-2">
          <div className="border-solid border-white border-4 w-[40%] h-[60%] m-2 bg-blue-500 p-5 rounded-2xl">
            {isImageLoaded ? (
              <img
                src={selectedImage}
                className="rounded-2xl border-white border-solid border-4"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectedImageChange}
                className="text-black file:cursor-pointer file:flex file:flex-col justify-center items-center bg-white border-black border-dashed border-2 w-[100%] h-[100%] file:w-[100%] file:h-[100%]"
              />
            )}
          </div>
          <button
            onClick={handleCheckResult}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:scale-105 hover:cursor-pointer hover:bg-blue-600"
          >
            Check Result
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white">The provide image is a</h2>
          <h1 className="text-4xl font-bold text-white">{result}</h1>
        </div>
      </div>
    </div>
  );
}
