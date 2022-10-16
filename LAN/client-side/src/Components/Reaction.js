import React from "react";
import { useEffect } from "react";
import { fetchCreateReaction } from "../utils/api";
import "../utils/reaction.css";
export default function Reaction(props) {
  const [reaction, setReaction] = React.useState("");
  useEffect(() => {
    setReaction(props.reaction);
  }, []);

  const handleReaction = (e) => {
    setReaction(e);
    fetchCreateReaction(props.postId, e)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="container">
        <div class="content">
          <div class="reaction" onClick={(e) => handleReaction("happy")}>
            <div
              style={{ fontSize: reaction === "happy" && "30px" }}
              class="emoji"
            >
              😃
            </div>
            <div class="text">happy</div>
          </div>

          <div
            style={{ fontSize: reaction === "laugh" && "30px" }}
            class="reaction"
            onClick={(e) => handleReaction("laugh")}
          >
            <div class="emoji">😂</div>
            <div class="text">laugh</div>
          </div>

          <div
            style={{ fontSize: reaction === "love" && "30px" }}
            class="reaction"
            onClick={(e) => handleReaction("love")}
          >
            <div class="emoji">😍</div>
            <div class="text">love</div>
          </div>

          <div
            style={{ fontSize: reaction === "wow" && "30px" }}
            class="reaction"
            onClick={(e) => handleReaction("wow")}
          >
            <div class="emoji">😮</div>
            <div class="text">wow</div>
          </div>

          <div
            style={{ fontSize: reaction === "angry" && "30px" }}
            class="reaction"
            onClick={(e) => handleReaction("angry")}
          >
            <div class="emoji">😠</div>
            <div class="text">angry</div>
          </div>

          <div
            style={{ fontSize: reaction === "sad" && "30px" }}
            class="reaction"
            onClick={(e) => handleReaction("sad")}
          >
            <div class="emoji">😢</div>
            <div class="text">sad</div>
          </div>
        </div>
      </div>
    </>
  );
}
