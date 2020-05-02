import React from 'react';
import { Button, Typography, Spin } from 'antd';
import Page from './Page';
import { useAuth } from "./authUtils";

const { Text } = Typography;

const App = () => {
  const { isAuthenticated, isSigning, signIn, error, user } = useAuth();

  if (isAuthenticated) { 
    return <Page user={user} />;
  } else {
    return (
      <div style={{ 
        width: '100%',
        height: '100vh',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        {isSigning ? (
          <Spin />
        ) : (
          <>
            <Button onClick={signIn}>Sign In to continue</Button>
            {error && <Text type="danger">{error}</Text>}
          </>
        )}
      </div>
    )
  }
}

export default App;