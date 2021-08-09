/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  actFetchUserNavigation,
  profile as GetProfile,
  updateProfile,
} from "../../redux/actions/profile";
import Avatar from "./Avatar";
import SummaryInfo from "./SummaryInfo";
import EmployeeInfo from "./EmployeeInfo";
import { getAuth } from "../../utilities/helper";
import { getHandledEmployeeDataRender } from "../../utilities/constants/DataRender/profile";
import { changePass } from "../../redux/actions/changePass";
import Alertness from "../../components/common/Alertness";
import * as ALERTMESSAGE from "../../utilities/constants/AlertMessage";
import * as APIALERTMESSAGE from "../../utilities/constants/APIAlertMessage";

const Profile = () => {
  const [profileState, setProfile] = useState(null);

  const [notification, setNotification] = useState({
    type: "",
    content: "",
  });

  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const onOpen = () => setOpen(true);

  const updateOrigin = (data) => {
    setProfile({
      ...profileState,
      profile: getHandledEmployeeDataRender(data),
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const GetProfileUser = () => {
      GetProfile((output) => {
        if (output) {
          setProfile({
            profile: getHandledEmployeeDataRender(output),
            username: output.username,
            position: output.profile?.position?.name,
            area: output.profile?.area?.name,
          });
        }
      });
    };
    GetProfileUser();
  }, []);

  const updateUserProfile = (data) => {
    updateProfile(data, (output) => {
      if (output) {
        switch (output.message) {
          case APIALERTMESSAGE.UPDATE_PROFILE_SUCCESSFULLY:
            const user = getAuth();
            user.first_name = data.first_name;
            user.last_name = data.last_name;

            dispatch(actFetchUserNavigation(user));

            setNotification({
              type: "type-success",
              content: ALERTMESSAGE.UPDATE_PROFILE_SUCCESSFULLY,
            });
            break;
          default:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.SYSTEM_ERROR,
            });
            break;
        }
      } else {
        setNotification({
          type: "type-error",
          content: ALERTMESSAGE.SYSTEM_ERROR,
        });
      }
      onOpen();
    });
  };

  const changeUserPassword = (data) => {
    changePass(data, (output) => {
      if (output) {
        switch (output.message) {
          case APIALERTMESSAGE.CHANGE_PASS_SUCCESSFULLY:
            setNotification({
              type: "type-success",
              content: ALERTMESSAGE.SUCCESSFULLY_RESET_PASSWORD,
            });
            break;
          case APIALERTMESSAGE.INCORRECT_PASSWORD:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.PASSWORD_DIFFERENT,
            });
            break;
          default:
            setNotification({
              type: "type-error",
              content: ALERTMESSAGE.SYSTEM_ERROR,
            });
            break;
        }
        onOpen();
      } else {
        setNotification({
          type: "type-error",
          content: ALERTMESSAGE.SYSTEM_ERROR,
        });
      }
    });
  };

  return (
    <div>
      {profileState && (
        <div className="pl-24 pr-24">
          <div className="col col-full">
            <div className="col col-third justify-content-ct">
              <Avatar />
            </div>
            <div className="col col-two-third">
              <SummaryInfo
                dataRender={profileState.profile}
                updateOrigin={updateOrigin}
                updateUserProfile={updateUserProfile}
                changeUserPassword={changeUserPassword}
              />
            </div>
          </div>
          <div className="col col-full mt-48">
            <EmployeeInfo
              position={profileState.position}
              username={profileState.username}
              area={profileState.area}
            />
          </div>
        </div>
      )}
      <div>
        <Alertness
          open={open}
          onClose={onClose}
          type={notification.type}
          content={notification.content}
        />
      </div>
    </div>
  );
};
export default React.memo(Profile);
