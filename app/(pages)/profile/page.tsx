'use client'
// import { useSession } from 'next-auth/react'
// import React from 'react'

// const Profile = () => {
//   return (
//     <div>
//       Profile
//     </div>
//   )
// }

// export default Profile
import { useSession, signOut } from 'next-auth/react';

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.email}</h1>
    </div>
  );
};

export default UserProfile;
