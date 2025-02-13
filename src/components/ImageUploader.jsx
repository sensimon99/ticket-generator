import { useState } from "react";

const ImageUploader = () => {
    const [imageUrl, setImageUrl] = useState("");

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "avatar_upload");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.secure_url) {
                setImageUrl(data.secure_url);
                localStorage.setItem("uploadedImageUrl", data.secure_url);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />}
        </div>
    );
};

export default ImageUploader;
