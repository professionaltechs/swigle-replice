import React from "react";

// STYLING
import "../styles/attribute.css";

// IMAGES
import fileTransfer from "../images/fileTransfer.jpg";
import record from "../images/record.jpg";
import impression from "../images/impression.jpg";
import promote from "../images/promote.jpg";
import peace from "../images/peace.jpg";

const Attributes = () => {
  return (
    <div className="attributeMain">
      <h5 className="attributeMainHeading">
        Simplify the process of securely sending large files or folders,
        ensuring delivery confirmation and seamless downloads with its powerful
        file transfer functionality
      </h5>
      <div className="attributesContainer">
        <div className="attributeCard">
          <img
            src={fileTransfer}
            className="attributeCardImage fileTransferImage"
            alt=""
          />
          <div className="attributeCardContent">
            <h3 className="attributeCardContentHeading">
              Dispatch your files with unrestricted size capacity
            </h3>
            <p className="attributeCardContentPara">
              Sending files has never been easier with Smash. It only takes a
              few clicks, or a drag and drop, to send large files of any size
              and type. Neither you nor your recipients need to have a Smash
              account. Smash is also available on Outlook, macOS, iOS, Android
              and through an API/SDK for developers.
            </p>
          </div>
        </div>
        <div className="attributeCard attributeCardReverse">
          <img
            src={record}
            className="attributeCardImage fileTransferImage"
            alt=""
          />
          <div className="attributeCardContent">
            <h3 className="attributeCardContentHeading">
              Keep an eye on your transfer activity
            </h3>
            <p className="attributeCardContentPara">
              Experience the ease of file sharing. With just a few clicks or a
              simple drag-and-drop, you can send files of any size and format
              effortlessly.
            </p>
          </div>
        </div>
        <div className="attributeCard">
          <img
            src={impression}
            className="attributeCardImage fileTransferImage"
            alt=""
          />
          <div className="attributeCardContent">
            <h3 className="attributeCardContentHeading">
              Leave an indelible mark.
            </h3>
            <p className="attributeCardContentPara">
              Leverage every transfer to elevate and amplify your brand
              presence. Through personalized transfers, you infuse them with
              your unique identity, from inception to recipient reception. The
              journey into your brand universe commences upon access, with a
              bespoke URL featuring your name and a customized link title.
            </p>
          </div>
        </div>
        <div className="attributeCard attributeCardReverse">
          <img
            src={promote}
            className="attributeCardImage fileTransferImage"
            alt=""
          />
          <div className="attributeCardContent">
            <h3 className="attributeCardContentHeading">
              Drive visibility and engagement for your business.
            </h3>
            <p className="attributeCardContentPara">
              Not only can you customize the design of your transfers and
              follow-up emails but you also have the chance to share promotional
              content during the file download process. Your transfers evolve
              into powerful communication tools. For instance, you can showcase
              a promotional video of your business, unlocking limitless
              possibilities for engagement and outreach!
            </p>
          </div>
        </div>
        <div className="attributeCard">
          <img
            src={peace}
            className="attributeCardImage fileTransferImage"
            alt=""
          />
          <div className="attributeCardContent">
            <h3 className="attributeCardContentHeading">
              Attain peace of mind with enhanced security measures.
            </h3>
            <p className="attributeCardContentPara">
              In addition to being securely encrypted both in transit and at
              rest, and stored in close proximity to you, your
              transfers are ephemeral by default. You have full control over
              their availability period, after which they are automatically
              deleted. By setting access limits, you're not only ensuring
              security but also reducing environmental impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
