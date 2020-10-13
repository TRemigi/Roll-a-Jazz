import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });

  const user = data?.user || {};
  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h2>Viewing Placeholder's profile.</h2>
      </div>
    </div>
  );
};

export default Profile;
