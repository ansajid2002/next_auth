import React, { useState } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react"
const Signout = () => {
    const router = useRouter()
    const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    // Perform sign out action her
    await signOut({ redirect: false }); // sign out without redirecting
    router.push('/');

    // location.reload()
      setVisible(false) // redirect to the login page
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
    <button onClick={showModal}>Sign Out</button>
    <Modal
      title="Confirm Sign Out"
      open={visible}
      onOk={handleOk}
      okButtonProps={{className:"bg-red-600"}}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to sign out?</p>
    </Modal>
  </div>
  )
}

export default Signout