import React, { useState } from "react";
import "./Details.css";
import cloud from "../../assets/cloud.svg";
import { Link, useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("uploadedImageUrl") || "");
  const [ticketType, setTicketType] = useState(localStorage.getItem("selectedTicketType") || "General");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "avatar_upload");
    formData.append("cloud_name", "dyfoakkgw");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyfoakkgw/image/upload",
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        localStorage.setItem("uploadedImageUrl", data.secure_url);
        setError("");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadToCloudinary(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      uploadToCloudinary(file);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!isValid) {
      setFormError("Please fill in all required fields correctly.");
    } else {
      setFormError("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setFormError("");

      localStorage.setItem("uploadedImageUrl", imageUrl);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRequest", additionalInfo);
      localStorage.setItem("selectedTicketType", ticketType);

      navigate("/ticket");
    }
  };

  return (
    <div className="ticket">
      <header>
        <div className="heading">
          <p className="ticket-paragraph-i">Attendee Details</p>
          <p className="ticket-paragraph-ii">Step 2/3</p>
        </div>
        <div className="line">
          <span className="line-i"></span>
        </div>
      </header>

      <section>
        <form onSubmit={handleSubmit}>
          <div className="section-title-i">
            <div className="label">Upload Profile Photo</div>
            <div
              className="frame-div"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div className="frame">
                {imageUrl ? (
                  <p className="uploaded-url">{imageUrl}</p>
                ) : (
                  <>
                    <img src={cloud} alt="Upload Icon" />
                    <p className="frame-p">Click or Drag & Drop to Upload</p>
                  </>
                )}
              </div>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </div>
            {error && <p className="error-text">{error}</p>}
          </div>

          <div className="label-i">
            <p className="number">Enter your name</p>
            <input
              type="text"
              className="name-span"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="error-text">{nameError}</p>}
          </div>

          <div className="label-i">
            <p className="number">Enter your email *</p>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z" fill="white" />
              </svg>
              <input
                type="email"
                className="name-span-i"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            {emailError && <p className="error-text">{emailError}</p>}
          </div>

          <div className="label-i">
            <p className="number">Special request?</p>
            <textarea
              className="name-span-ii"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value.slice(0, 20))}
              maxLength={20}
            />
            <p className="char-limit">Characters left: {20 - additionalInfo.length}</p>
          </div>

          {formError && <p className="error-text form-error">{formError}</p>}

          <div className="attendee-btn-div">
            <Link to="/" className="btn-link">
              <button type="button" className="attenddee-btn-i">Back</button>
            </Link>

            <button
              type="submit"
              className="attenddee-btn-ii"
              disabled={!name || !email || nameError || emailError}
            >
              Get {ticketType}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Details;
