import React, { useState, useEffect } from "react";
import styles from "./Preference.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Img1 from "./images/Img1.png";
import Img2 from "./images/Img2.png";
import Img3 from "./images/Img3.png";

const Profile = () => {
  const [cardClass1, setCardClass1] = useState(styles.card1_active);
  const [card1, setCard1] = useState(styles.card1_select_inactive);
  const [cardClass2, setCardClass2] = useState(styles.card2_active);
  const [card2, setCard2] = useState(styles.card2_select_inactive);
  const [cardClass3, setCardClass3] = useState(styles.card3_active);
  const [card3, setCard3] = useState(styles.card3_select_inactive);
  const [finishBtn, setFinishBtn] = useState(styles.finish_btn_inactive);
  const [visible, setVisible] = useState(styles.invisible);
  const handleBackBtn = () => {
    navigate(-1);
    localStorage.setItem("back", true);
  };

  useEffect(() => {
    updateFinishBtn();
  }, [cardClass1, cardClass2, cardClass3]);

  const toggleUnselect1 = () => {
    if (cardClass1 === styles.card1_active) {
      setCardClass1(styles.card1_inactive);
      setCard1(styles.card1_select_active);
    }
  };

  const toggleSelect1 = () => {
    if (cardClass1 === styles.card1_inactive) {
      setCardClass1(styles.card1_active);
      setCard1(styles.card1_select_inactive);
    }
  };

  const toggleUnselect2 = () => {
    if (cardClass2 === styles.card2_active) {
      setCardClass2(styles.card2_inactive);
      setCard2(styles.card2_select_active);
    }
  };

  const toggleSelect2 = () => {
    if (cardClass2 === styles.card2_inactive) {
      setCardClass2(styles.card2_active);
      setCard2(styles.card2_select_inactive);
    }
  };

  const toggleUnselect3 = () => {
    if (cardClass3 === styles.card3_active) {
      setCardClass3(styles.card3_inactive);
      setCard3(styles.card3_select_active);
    }
  };

  const toggleSelect3 = () => {
    if (cardClass3 === styles.card3_inactive) {
      setCardClass3(styles.card3_active);
      setCard3(styles.card3_select_inactive);
    }
  };

  const updateFinishBtn = () => {
    if (
      cardClass1 === styles.card1_inactive ||
      cardClass2 === styles.card2_inactive ||
      cardClass3 === styles.card3_inactive
    ) {
      setFinishBtn(styles.finish_btn_active);
      setVisible(styles.visible);
    } else {
      setFinishBtn(styles.finish_btn_inactive);
      setVisible(styles.invisible);
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  const handleFinish = () => {
    // Navigate to the next page
    navigate(`/emailconfirmation/${userInfo._id}`); // Replace "/next-page" with the desired URL
  };
  return (
    <>
      <div className={styles.preference}>
        <div className={styles.preference_container}>
          <p className={styles.dribbble}>dribbble</p>
          <button className={styles.back_btn} onClick={handleBackBtn}>
            {"<"}
          </button>
        </div>
        <div className={styles.pref_body}>
          <h1 className={styles.top_head}>What brings you to Dribbble?</h1>
          <p className={styles.top_p}>
            Select the option that describes you. Don't worry, you can explore
            other options later.
          </p>
          <br />
          <br />
          <br />
          <div className={styles.card_container}>
            <div className={cardClass1} onClick={toggleUnselect1}>
              <img
                className={styles.card_img}
                src={Img1}
                alt="img1"
                height="150px"
              />
              <h2 className={styles.card_head}>I'm a designer looking to</h2>
              <h2 className={styles.card_head}>share my work</h2>
              <FontAwesomeIcon
                icon={faCheck}
                size="lg"
                className={styles.check_inactive}
              />
            </div>
            <div className={card1} onClick={toggleSelect1}>
              <img
                className={styles.cards_img}
                src={Img1}
                alt="img1"
                height="150px"
              />
              <br />
              <br />
              <br />
              <h2 className={styles.card_head}>I'm a designer looking to</h2>
              <h2 className={styles.card_head}>share my work</h2>
              <br />
              <p>With over 7 million shots from a vast</p>
              <p>community of designers, Dribbble is </p>
              <p>the leading source for design</p>
              <p>inspiration.</p>
              <FontAwesomeIcon
                icon={faCheck}
                size="lg"
                className={styles.check_icon_active}
              />
            </div>
            <div className={cardClass2} onClick={toggleUnselect2}>
              <img
                className={styles.card_img}
                src={Img2}
                alt="img2"
                height="150px"
              />
              <h2 className={styles.card_head}>I'm a looking to hire a</h2>
              <h2 className={styles.card_head}>designer</h2>
              <FontAwesomeIcon
                icon={faCheck}
                size="lg"
                className={styles.check_inactive}
              />
            </div>
            <div className={card2} onClick={toggleSelect2}>
              <img
                className={styles.cards_img}
                src={Img2}
                alt="img2"
                height="150px"
              />
              <br />
              <br />
              <br />
              <h2 className={styles.card_head}>I'm a looking to hire a</h2>
              <h2 className={styles.card_head}>designer</h2>
              <br />
              <p>With over 7 million shots from a vast</p>
              <p>community of designers, Dribbble is </p>
              <p>the leading source for design</p>
              <p>inspiration.</p>
              <FontAwesomeIcon
                icon={faCheck}
                size="lg"
                className={styles.check_icon_active}
              />
            </div>
            <div className={cardClass3} onClick={toggleUnselect3}>
              <img
                className={styles.card_img}
                src={Img3}
                alt="img1"
                height="150px"
              />
              <h2 className={styles.card_head}>I'm looking for design</h2>
              <h2 className={styles.card_head}>inspiration</h2>
              <FontAwesomeIcon
                icon={faCheck}
                size="lg"
                className={styles.check_inactive}
              />
            </div>
            <div className={card3} onClick={toggleSelect3}>
              <img
                className={styles.cards_img}
                src={Img3}
                alt="img1"
                height="150px"
              />
              <br />
              <br />
              <br />
              <h2 className={styles.card_head}>I'm looking for design</h2>
              <h2 className={styles.card_head}>inspiration</h2>
              <br />
              <p>With over 7 million shots from a vast</p>
              <p>community of designers, Dribbble is </p>
              <p>the leading source for design</p>
              <p>inspiration.</p>
              <FontAwesomeIcon
                icon={faCheck}
                size="lg"
                className={styles.check_icon_active}
              />
            </div>
          </div>
          <br />
          <br />
          <br />
          <h4 className={`${styles.head3} ${visible}`}>
            Anything else? You can select multiple
          </h4>
          <br />
          <button className={finishBtn} type="submit" onClick={handleFinish}>
            Finish
          </button>
          <br />
          <p className={`${styles.return_p} ${visible}`}>
            Or Press{" "}
            <a
              onClick={handleBackBtn}
              className={`${styles.return_p_a} ${visible}`}
            >
              RETURN
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
