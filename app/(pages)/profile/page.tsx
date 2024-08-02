'use client'
import FileManager from '@/components/FileManager';
// import { getDirectoryContents } from '@/utils/fileUtils';
import { useSession,signOut } from 'next-auth/react';
import { useEffect } from 'react';


const UserProfile = () => {
  const { data: session, status } = useSession();

  const username = (session?.user?.email)?.split('@')[0];

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in</p>;
  }

  const getDirectoryContent = async () =>{
    try {
      const res = await fetch('api/getDirectoryContents',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const {directory,files} = await res.json();
    } catch (error) {
      return error;
    }
  }

  // useEffect({
  //   // getDirectoryContent();
  // },[])

  return (
    <div className='flex flex-col justify-center items-center m-5 p-3'>
      <h1>Welcome, {username}</h1>
      <FileManager/>
    </div>
  );
};

export default UserProfile;
