import React, { useState } from "react";
import { BsPlus, BsDash, BsFillMicFill } from "react-icons/bs";
import "../css/expandableContainer.css";

const ExpandableContainer = ({ buttonText, paragraphText }) => {
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const [isSpeakButtonVisible, setIsSpeakButtonVisible] = useState(true);

  const handleButtonClick = () => {
    setIsParagraphVisible(!isParagraphVisible);
  };

  const handleSpeakButtonClick = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(paragraphText);
    synth.speak(utterance);
  };

  return (
    <div className="expandable-container">
      <div className="expandable-button" onClick={handleButtonClick}>
        <span>
          {isParagraphVisible ? <BsDash /> : <BsPlus />}
        </span>
        <span className="expandable-button-text">{buttonText}</span>
        <span></span>
      </div>
      {isParagraphVisible && (
        <div className="expandable-paragraph-container">
            {isSpeakButtonVisible && (
            <button className="speak-button" onClick={handleSpeakButtonClick}>
              <BsFillMicFill />
            </button>
          )}
          <p
            className={`expandable-paragraph ${
              isParagraphVisible ? "activePara" : ""
            }`}
          >
            {paragraphText}
          </p>
          
        </div>
      )}
    </div>
  );
};

export default ExpandableContainer;
