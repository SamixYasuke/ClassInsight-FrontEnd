import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Not Authenticated</h1>
      </div>
    );
  }

  if (isAuthenticated) {
    console.log(user);
    return (
      isAuthenticated && (
        <div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.nickname}</p>
          {user?.email_verified && <p>Email Is Verified</p>}
          {user?.sub && <p>{user?.sub}</p>}
        </div>
      )
    );
  }
};

export default Profile;
