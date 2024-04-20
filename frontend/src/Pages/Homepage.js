import React, { useState, useEffect } from "react";
import "./Homepage.css";
import axios from "axios";
import configfile from "../configfile";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    pic: "",
    location: "",
    checkbox: false,
  });

  const [submitBtn, setSubmitBtn] = useState("submit_btn_inactive");
  const { BASE_URL } = configfile;

  // useEffect(() => {
  //   const userInfoString = localStorage.getItem("userInfo");
  //   if (userInfoString) {
  //     const userInfo = JSON.parse(userInfoString);
  //     if (userInfo && userInfo.token) {
  //       // User is already logged in, navigate to the appropriate page
  //       navigate("/setprofile");
  //     }
  //   }
  // }, [navigate]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // if (userInfo) {
    // const userInfo = JSON.parse(userInfoString);
    if (userInfo) {
      //       // User is already logged in, navigate to the appropriate page
      navigate(`/setprofile/${userInfo._id}`);
    }
    // else{}
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkboxes, use the checked property to determine the new value
    const newValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/api/user`, // Update the URL
        { ...formData },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      console.log("response.data: ", response.data);
      console.log("response: ", response);
      if (response.data) {
        // User successfully registered
        navigate(`/setprofile/${response.data.userId}`);
      } else {
        // Handle registration failure
        console.error("Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const toggleSubmitBtn = () => {
    const { name, username, email, password, checkbox } = formData;
    const isFilled = name && username && email && password && checkbox;
    setSubmitBtn(isFilled ? "submit_btn_active" : "submit_btn_inactive");
  };

  useEffect(() => {
    toggleSubmitBtn();
  }, [formData]);

  return (
    <div className="homepage">
      <div className="image">
        <p className="dribbble">dribbble</p>
        <h1 className="heading manrope-900">
          Discover the world's top
          <br />
          Designers & Creatives
        </h1>
      </div>
      <div className="form-container">
        <p className="top-para manrope">
          Already a member?{" "}
          <a className="links" href="">
            Sign In
          </a>
        </p>
        <br />
        <br />
        <div className="form">
          <div className="main-form">
            <h2 className="manrope-900" style={{ padding: "10px" }}>
              Sign up to Dribbble
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="name-component">
                <div className="row">
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label className="label" htmlFor="username">
                    <span style={{ display: "none" }}>
                      ⚠ Username already exists
                    </span>
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="row">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  placeholder="6+ characters"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  autoComplete=""
                />
              </div>
              <div className="row1">
                <input
                  id="checkbox"
                  name="checkbox"
                  type="checkbox"
                  checked={formData.checkbox}
                  onChange={handleChange}
                  aria-label="I agree to the terms and conditions"
                />
                <p className="manrope row1-para">
                  Creating an account means you're okay with our
                  <a className="links" href="">
                    {" "}
                    Terms of <br />
                    Service, Privacy Policy,
                  </a>
                  and our default
                  <a className="links" href="">
                    {" "}
                    Notification <br /> Settings
                  </a>
                  .
                </p>
              </div>
              <input
                id="submit"
                name="submit"
                // className="manrope-700 submit-btn"
                className={submitBtn}
                type="submit"
                value="Create Account"
              />
            </form>
            <p className="manrope color">
              This site is protected by reCAPTCHA and the Google <br />{" "}
              <a className="links" href="">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a className="links" href="">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
