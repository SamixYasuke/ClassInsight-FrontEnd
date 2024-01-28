import baseUrl from "./baseUrl";
import axios from "axios";

const checkUniversityAuth = async (
  isLoading,
  user,
  loginWithRedirect,
  isAuthenticated,
  navigate,
  toast
) => {
  if (!isLoading) {
    if (isAuthenticated) {
      const authId = user?.sub;
      try {
        const response = await axios.get(
          `${baseUrl}/university/check-auth-id/${authId}`
        );
        const data = response.data;
        if (data.exists) {
          console.log("User is authenticated:", isAuthenticated);
        } else {
          toast("redirecting you to complete university registration");
          navigate("/university/register");
        }
      } catch (error) {
        console.error("Error checking authId:", error);
      }
    } else {
      await loginWithRedirect();
    }
  }
};

export default checkUniversityAuth;
