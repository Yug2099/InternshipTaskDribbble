import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import configfile from "../configfile";
import {
  faBasketball,
  faBriefcase,
  faCircleCheck,
  faCircleXmark,
  faEnvelope,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faPinterest,
  faSquareFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState } from "react";
import styles from "./Emailconfirmation.module.css";
import { useNavigate } from "react-router-dom";
const EmailConfirmation = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo._id;
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear userInfo from localStorage
    navigate("/");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("back");
    // Redirect user to logout page or any other page as needed
    // window.location.href = "/logout"; // Example: Redirect to logout page
  };

  const sendEmail = async () => {
    setIsLoading(true);
    console.log(isLoading);
    setError(null);
    console.log(error);

    try {
      const { BASE_URL } = configfile;
      // Send request to backend to send email
      await axios.post(`${BASE_URL}/api/user/sendemail/${userId}`);
      setEmailSent(true);
      console.log(emailSent);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { BASE_URL } = configfile;
      // Fetch user profile from the database
      const response = await axios.get(
        `${BASE_URL}/api/user/getprofile/${userId}`
      );
      const userProfile = response.data;
      // Update the state with the user's image URL
      setUserImage(userProfile.pic);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      sendEmail();
      fetchUserProfile(); // Fetch user profile when component mounts
    }
  }, []);

  return (
    <>
      <div className={styles.email_container}>
        <div className={styles.navbar}>
          <div className={styles.list1}>
            <ul className={styles.ulist1}>
              <li className={styles.list_items}>
                <a href="" className={styles.list_head}>
                  dribbble
                </a>
              </li>
              <li className={styles.list_items}>
                <a href="" className={styles.list_link}>
                  Inspiration
                </a>
              </li>
              <li className={styles.list_items}>
                <a href="" className={styles.list_link}>
                  Find Work
                </a>
              </li>
              <li className={styles.list_items}>
                <a href="" className={styles.list_link}>
                  Learn Design
                </a>
              </li>
              <li className={styles.list_items}>
                <a href="" className={styles.list_link}>
                  Go Pro
                </a>
              </li>
              <li className={styles.list_items}>
                <a href="" className={styles.list_link}>
                  Hire Designers
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.list2}>
            <ul className={styles.ulist2}>
              <li className={styles.list_items}>
                <div className={styles.search}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    size="sm"
                    style={{ color: "#9d9ea4" }}
                    className={styles.check_inactive}
                  />
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className={styles.search_input}
                    placeholder="Search"
                  />
                </div>
                <div className={styles.cart}>
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className={styles.faBriefcase}
                    size="2xl"
                    style={{ color: "#9d9ea8" }}
                  />
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className={styles.faCircleXmark}
                    size="sm"
                    style={{ color: "#6a6773" }}
                  />
                </div>
                <div
                  className={styles.profile}
                  onClick={() => setShowMenu(!showMenu)}
                  style={{ cursor: "pointer" }}
                >
                  {userImage ? (
                    <img
                      src={userImage}
                      alt="Profile"
                      className={styles.profile_image}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUserCircle} size="2xl" />
                  )}
                  {showMenu && (
                    <ul className={styles.menu}>
                      <li className={styles.menu_item} onClick={handleLogout}>
                        <button
                          className={styles.logout_button}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
                <button
                  className={styles.upload_btn}
                  // onClick={}
                >
                  Upload
                </button>
              </li>
            </ul>
          </div>
        </div>

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {emailSent && (
          <div className={styles.body}>
            <h2 className={styles.body_h2}>Please verify your email...</h2>
            <br />
            <div className={styles.email_icon}>
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ color: "#bbbbbb" }}
                size="5x"
                className={styles.faEnvelope}
              />
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#ea4b8a" }}
                size="xl"
                className={styles.faCircleCheck}
              />
            </div>
            <br />
            <p className={styles.body_p}>
              Please verify your email address. We've sent a confirmation email
              to:
            </p>
            <br />
            <p className={styles.email}>{userInfo.email}</p>
            <br />
            <p className={styles.body_p}>
              Click the confirmation link in that email to begin using Dribbble.
            </p>
            <br />
            <p className={styles.body_p}>
              Didn't receive the email? Check your Spam folder, it may have been
              caught by a filter. If
            </p>
            <p className={styles.body_p}>
              you still don't see it, you can{" "}
              <a onClick={sendEmail} className={styles.body_link}>
                resend the confirmation email.
              </a>
            </p>
            <br />
            <p className={styles.body_p}>
              Wrong email address?{" "}
              <a href="" className={styles.body_link}>
                Change it.
              </a>
            </p>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.footer_divide}>
            <div className={styles.col1}>
              <div className={styles.col1_row1}>
                <h1 className={styles.row1_heading}>dribbble</h1>
                <p className={styles.p_footer}>
                  Dribbble is the world's leading
                </p>
                <p className={styles.p_footer}>
                  community for creatives to share, grow,
                </p>
                <p className={styles.p_footer}>and get hired.</p>
              </div>
              <div className={styles.col1_row2}>
                <FontAwesomeIcon
                  icon={faBasketball}
                  style={{
                    color: "#ffffff",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    margin: "10px",
                  }}
                />
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "#3b3c50", padding: "10px" }}
                />
                <FontAwesomeIcon
                  icon={faSquareFacebook}
                  style={{ color: "#3d3f4d", padding: "10px" }}
                />
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ color: "#3b3b47", padding: "10px" }}
                />
                <FontAwesomeIcon
                  icon={faPinterest}
                  style={{ color: "#434552", padding: "10px" }}
                />
              </div>
            </div>
            <div className={styles.col2}>
              <h4 className={styles.footer_h4}>For Designers</h4>
              <a href="" className={styles.foot_links}>
                Go Pro!
              </a>
              <a href="" className={styles.foot_links}>
                Explore Design Work
              </a>
              <a href="" className={styles.foot_links}>
                Design Blogs
              </a>
              <a href="" className={styles.foot_links}>
                Overtime Podcast
              </a>
              <a href="" className={styles.foot_links}>
                Playoffs
              </a>
              <a href="" className={styles.foot_links}>
                Weekly Warm-Up
              </a>
              <a href="" className={styles.foot_links}>
                Refer a Friend
              </a>
              <a href="" className={styles.foot_links}>
                Code of conduct
              </a>
            </div>
            <div className={styles.col3}>
              <h4 className={styles.footer_h4}>Hire Designers</h4>
              <a href="" className={styles.foot_links}>
                Post a job opening
              </a>
              <a href="" className={styles.foot_links}>
                Post a freelance project
              </a>
              <a href="" className={styles.foot_links}>
                Search for designers
              </a>
              <br />
              <h4 className={styles.footer_h4}>Brands</h4>
              <a href="" className={styles.foot_links}>
                Advertise with us
              </a>
            </div>
            <div className={styles.col4}>
              <h4 className={styles.footer_h4}>Company</h4>
              <a href="" className={styles.foot_links}>
                About
              </a>
              <a href="" className={styles.foot_links}>
                Careers
              </a>
              <a href="" className={styles.foot_links}>
                Support
              </a>
              <a href="" className={styles.foot_links}>
                Media kit
              </a>
              <a href="" className={styles.foot_links}>
                Testimonials
              </a>
              <a href="" className={styles.foot_links}>
                API
              </a>
              <a href="" className={styles.foot_links}>
                Terms of service
              </a>
              <a href="" className={styles.foot_links}>
                Privacy Policy
              </a>
              <a href="" className={styles.foot_links}>
                Cookie policy
              </a>
            </div>
            <div className={styles.col5}>
              <h4 className={styles.footer_h4}>Directories</h4>
              <a href="" className={styles.foot_links}>
                Design jobs
              </a>
              <a href="" className={styles.foot_links}>
                Designers for hire
              </a>
              <a href="" className={styles.foot_links}>
                Freelance designers for hire
              </a>
              <a href="" className={styles.foot_links}>
                Tags
              </a>
              <a href="" className={styles.foot_links}>
                Places
              </a>
              <br />
              <h4 className={styles.footer_h4}>Design assets</h4>
              <a href="" className={styles.foot_links}>
                Dribble Marketplace
              </a>
              <a href="" className={styles.foot_links}>
                Creative Market
              </a>
              <a href="" className={styles.foot_links}>
                Fontspring
              </a>
              <a href="" className={styles.foot_links}>
                Font Squirrel
              </a>
            </div>
            <div className={styles.col6}>
              <h4 className={styles.footer_h4}>Design Resources</h4>
              <a href="" className={styles.foot_links}>
                Freelancing
              </a>
              <a href="" className={styles.foot_links}>
                Design Hiring
              </a>
              <a href="" className={styles.foot_links}>
                Design Portfolio
              </a>
              <a href="" className={styles.foot_links}>
                Design Education
              </a>
              <a href="" className={styles.foot_links}>
                Creative Process
              </a>
              <a href="" className={styles.foot_links}>
                Design Industry Trends
              </a>
            </div>
          </div>
          <br />
          <hr style={{borderTop: "1px solid black", width: "90%", padding: "20px", alignSelf: "center"}} />
          <br />
          <div className={styles.copyright}>
            <p>©2023 Drbbble. All rights reserved.</p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p>
                <strong>20,501,853 </strong>shots dribbbled
              </p>
              <FontAwesomeIcon
                icon={faBasketball}
                style={{
                  color: "#ffffff",
                  borderRadius: "50%",
                  backgroundColor: "pink",
                  margin: "0 10px",
                }}
              />
              {/* <br /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailConfirmation;
