import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


function Auth() {
  const urlSearchParams = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
 

  (async function () {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: "1364798dc5ed2d92b8449b3afc8c6f10",
        redirect_uri: "http://localhost:5173/login/auth",
        code: urlSearchParams.get("code"),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    if (tokenResponse.status === 200) {
      const { access_token } = tokenResponse.data;
      const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      if (userResponse.status === 200) {
        console.log(userResponse.data);
        const kakaoData = userResponse.data;
        const email = kakaoData.kakao_account.email;
        const kakaoId = kakaoData.id;

        console.log(kakaoId);
        console.log(email);

        const response = await axios.post("http://localhost:8080/api/auth/kakao", {
            email: email,
            kakaoId:kakaoId,
        },  { withCredentials: true });
        // sessionStorage.setItem("token", JSON.stringify(response.data));
        // const saveToken = JSON.parse(localStorage.getItem('token'));
        // console.log(saveToken);
      }
    }

    navigate("/");

  })();

  return null;
}

export default Auth;
