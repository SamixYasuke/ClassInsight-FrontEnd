import baseUrl from "./baseUrl";
import axios from "axios";

const checkStudentAuth = async (
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
          `${baseUrl}/student/check-auth-id/${authId}`
        );
        const data = response.data;
        if (data.exists) {
          console.log("User is authenticated:", isAuthenticated);
        } else {
          toast("redirecting you to complete student registration");
          navigate("/student/register");
        }
      } catch (error) {
        console.error("Error checking authId:", error);
      }
    } else {
      await loginWithRedirect();
    }
  }
};

export default checkStudentAuth;
