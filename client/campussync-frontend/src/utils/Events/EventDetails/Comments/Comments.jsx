import React from "react";
import "./comment.css";
import { FaCircleUser } from "react-icons/fa6";

function Comment({ item1 }) {
  const profilePicUrl = "https://natty.pythonanywhere.com";
  const hasProfilePicUrl = item1.commentor.profile_pic.includes(profilePicUrl);
  return (
    <div className="comment-container">
      <div className="comment-topic">
        {item1.commentor.profile_pic ? (
          <img
            src={
              hasProfilePicUrl
                ? item1.commentor.profile_pic
                : profilePicUrl + item1.commentor.profile_pic
            }
            alt=""
          />
        ) : (
          <FaCircleUser size="2rem" />
        )}

        {/* <h1 className="1rem">John Cena</h1> */}
        <h1 className="1rem">{item1.commentor.name}</h1>
      </div>
      <div className="comment-content">
        <p>
          {item1.content}
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam
          enim, congue quis ex in, convallis mollis nulla. Pellentesque dui leo,
          tristique dignissim enim ac, rutrum pharetra nisl. Curabitur malesuada
          nunc nibh, eget vestibulum orci gravida quis. Aenean ligula ligula,
          cursus ultrices leo vitae, efficitur vulputate diam. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nulla diam enim, congue quis ex
          in, convallis mollis nulla. Pellentesque dui leo, tristique dignissim
          enim ac, rutrum pharetra nisl. Curabitur malesuada nunc nibh, eget
          vestibulum orci gravida quis. Aenean ligula ligula, cursus ultrices
          leo vitae, efficitur vulputate diam. */}
        </p>
      </div>
    </div>
  );
}

export default Comment;
