import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import configfile from "../configfile";

const Profile = () => {
  const { BASE_URL } = configfile;
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [visible, setVisible] = useState(styles.invisible);
  const navigate = useNavigate();
  const [nextButtonClassName, setNextButtonClassName] = useState(
    styles.nxt_btn_inactive
  );

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo._id;
  useEffect(() => {
    if (!userInfo) {
      // User is not logged in, redirect to login page
      navigate("/");
    }
    fetchUserProfile(userInfo._id);
  }, [navigate]);

  const fetchUserProfile = async (userId) => {
    try {
      // Fetch user profile from the database
      const response = await axios.get(
        `${BASE_URL}/api/user/getprofile/${userId}`
      );
      const userProfile = response.data;
      if (userProfile.pic && userProfile.location) {
        setImage(userProfile.pic);
        setLocation(userProfile.location);
      } else {
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Log the file uploaded by the user

    const formData = new FormData();
    formData.append("file", file);
    const { UPLOAD_PRESET } = configfile;
    formData.append("upload_preset", UPLOAD_PRESET); // Replace with your `Clou`dinary upload preset
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/yug-chatapp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
      const data = await response.json();
      const imageUrl = data.secure_url; // Get the secure URL of the uploaded image
      // Log the image URL
      setImage(imageUrl); // Set the uploaded image as the background
    } catch (error) {
      console.error("Error handling file change:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Update the user's profile picture and location in the database
    await updateUserProfile();

    // Redirect the user to the preferences page
    localStorage.setItem("back", false);
    navigate(`/preference/${userId}`);
  };

  // Function to update user's profile picture and location in the database
  const updateUserProfile = async () => {
    try {
      // Retrieve user information from local storage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo._id) {
        console.error("User information not found in local storage");
        return;
      }

      // Construct the updated user profile data
      const updatedProfile = {
        pic: image, // Updated key from profilePic to pic
        location: location, // Updated key from userLocation to location
      };

      // Wrap the updatedProfile object inside another object
      const data = { updatedProfile };

      // Send a PUT request to update the user's profile in the database
      const response = await axios.put(
        `${BASE_URL}/api/user/setprofile/${userId}`,
        data // Send the updated profile data
      ); // Display the updated profile details
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDefaultImg = () => {
    setImage("https://icon-library.com/images/anonymous-avatar-icon-25.jpg");
  };

  const updateNextButtonClassName = () => {
    if (image && location) {
      setNextButtonClassName(styles.nxt_btn_active); // Class name when both image and location are filled
      setVisible(styles.visible);
    } else {
      setNextButtonClassName(styles.nxt_btn_inactive); // Class name when either image or location is not filled
      setVisible(styles.invisible);
    }
  };

  // Call the function to update the class name whenever image or location changes
  useEffect(() => {
    updateNextButtonClassName();
  }, [image, location]);

  const handleChange = (e) => {
    setLocation(e.target.value); // Update location state on input change
  };

  return (
    <>
      <div className={styles.profile_container}>
        <p className={styles.dribbble}>dribbble</p>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.int}>
              <h1 className={styles.manrope_900}>
                Welcome! Let's create your profile
              </h1>
              <br />
              <p className={styles.p}>
                Let others get to know you better! You can do these later
              </p>
              <br />
              <br />
              <h3 className={styles.manrope_900}>Add an avatar</h3>
              <div className={styles.insertImg}>
                <div
                  className={`${styles.img} ${image ? styles.uploaded : ""}`}
                  style={{
                    backgroundImage: `url(${image || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!image && ( // Display the camera icon if no image is uploaded
                    <FontAwesomeIcon
                      icon={faCamera}
                      style={{ color: "#9e9fa6" }}
                      size="lg"
                    />
                  )}
                </div>
                <div className={styles.inputBtn}>
                  <label
                    htmlFor="file-upload"
                    className={styles.custom_file_upload}
                  >
                    Custom Upload
                  </label>
                  <input
                    id="file-upload"
                    className={styles.file_upload}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <p className={styles.para_style} onClick={handleDefaultImg}>
                    {" "}
                    {">"} Or choose one of our defaults
                  </p>
                </div>
              </div>
              <br />
              <div className={styles.location_div}>
                <h2>Add your location</h2>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter a location"
                  value={location}
                  onChange={handleChange} // Update location state on input change
                />
              </div>
              <button
                type="submit"
                className={`${styles.nxt_btn} ${nextButtonClassName}`}
                onClick={handleSubmit}
              >
                Next
              </button>
              <p className={`${styles.end_para} ${visible}`}>
                Or press{" "}
                <a href="" className={`${styles.end_para_a} ${visible}`}>
                  RETURN
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
