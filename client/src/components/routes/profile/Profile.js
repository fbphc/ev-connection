import { useEffect, useState } from "react";

import useAuth from "../../../context/authContext/useAuth.js";
import noPhoto from "../../../img/noPhoto.png";
import NotAuthorized from "../../error/NotAuthorized.js";
import EditProfile from "../profile/EditProfile.js";
import MyReviews from "./MyReviews.js";

import {ProfileQueryStyled} from "../../../components.styled/styledComponents.js"
import { MainButton, ImageStyled, ProfileImgDivStyled, ImgStyled } from "../../../components.styled/styledComponents.js";
import Conversations from "../../directMessages/Conversations.js";

function Profile() {
  const { isAuthenticated, getProfileInfo, userInfo } = useAuth();
  const [editToggle, setEditToggle] = useState(false);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [msgToggle, setMsgToggle] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      getProfileInfo(user.id);
    }
  }, [editToggle]);
  function mainToggle(e) {
    e.preventDefault();
    const value = e.target.value;

    if (value === "messages") {
      setReviewToggle(false);
      setMsgToggle(true);
    }
    if (value === "reviews") {
      setReviewToggle(true);
      setMsgToggle(false);

    }
  }
  return (
    <div className="darkText">
      {isAuthenticated ? (
        userInfo && (
          <>
            <div className="mx-auto mb-3 px-2 w-75">
              {userInfo.imgProfile === "no_photo" ? (
                <ProfileImgDivStyled className="mx-auto mb-3">
                  <ImgStyled src={noPhoto} alt="user" />
                </ProfileImgDivStyled>
              ) : (
                <ProfileImgDivStyled className="mx-auto mb-3">
                  <ImageStyled
                    cloudName="schoolgroupfinal"
                    publicId={userInfo.imgProfile}
                  />
                </ProfileImgDivStyled>
              )}
              <div>
                <ProfileQueryStyled>
                  <p>User Name</p>
                  <p>{userInfo.username}</p>
                </ProfileQueryStyled>
                <ProfileQueryStyled >
                  <p>First Name</p>
                  <p>{userInfo.fname}</p>
                </ProfileQueryStyled>
                <ProfileQueryStyled >
                  <p>Last Name</p>
                  <p>{userInfo.lname}</p>
                </ProfileQueryStyled>
                <ProfileQueryStyled >
                  <p>Email</p>
                  <p>{userInfo.email}</p>
                </ProfileQueryStyled>
                {userInfo.isOwner && (
                <ProfileQueryStyled >
                <p>Availability:</p>
                <p>
                  {userInfo.availability}
                </p>
              </ProfileQueryStyled>
              )}
                {userInfo.isOwner && (
                  <ProfileQueryStyled >
                    <p>Address:</p>
                    <p>
                      {userInfo.address.street}
                      {userInfo.address.houseNr}, {userInfo.address.postalcode}{" "}
                      {userInfo.address.city}
                    </p>
                  </ProfileQueryStyled>
                )}
              </div>
              {userInfo.telNumber && (
                <ProfileQueryStyled >
                  <p>Phone Number</p>
                  <p>{userInfo.telNumber}</p>
                </ProfileQueryStyled>
              )}
            </div>
            <div className="mx-auto w-50 d-flex justify-content-around gap-1 px-5 pt-2">
              <MainButton
                onClick={() =>
                  editToggle ? setEditToggle(false) : setEditToggle(true)
                }
              >
                Edit Profile
              </MainButton>
              {reviewToggle ? <MainButton onClick={() => setReviewToggle(false)} value="reviews">
                Hide Reviews
              </MainButton> : <MainButton onClick={mainToggle} value="reviews">
                Show Reviews
              </MainButton>}
              {msgToggle ? <MainButton onClick={() => setMsgToggle(false)} value="messages">
                Hide Messages
              </ MainButton> : <MainButton onClick={mainToggle} value="messages">
               Show Messages
              </MainButton>}
            </div>
          </>
        )
      ) : (
        <NotAuthorized />
      )}
      {editToggle && (
        <EditProfile editToggle={editToggle} setEditToggle={setEditToggle} />
      )}
      {reviewToggle && <MyReviews userInfo={userInfo} />}
      {msgToggle && <Conversations />}
    </div>
  );
}
export default Profile;
