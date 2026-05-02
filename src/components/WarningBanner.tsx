import React from 'react';

const WarningBanner: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#FFFBEB',
      color: '#B45309',
      padding: '12px 20px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '600',
      borderBottom: '1px solid #F59E0B',
      width: '100%',
      zIndex: 9999
    }}>
      ⚠️ This is a student project and is not affiliated with Coinbase in any way.
    </div>
  );
};

export default WarningBanner;