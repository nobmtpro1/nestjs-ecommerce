import React, { useEffect } from "react";
import axios from "../../../ultils/axios";
import { API_OAUTH_GOOGLE_CALLBACK } from "constants/api";
import { useDispatch } from "react-redux";
import { setAccount } from "redux/account";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTE_HOME, ROUTE_LOGIN } from "constants/routes";

const OauthGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_OAUTH_GOOGLE_CALLBACK}${window.location.search}`)
      .then((res) => {
        dispatch(setAccount({ account: res?.data }));
        console.log(res);
        window.location.href = ROUTE_HOME;
      })
      .catch((err) => {
        console.log(err);
        toast.error("Can not login with your google account");
        navigate(ROUTE_LOGIN);
      });
  }, []);

  return <div>OauthGoogle</div>;
};

export default OauthGoogle;
