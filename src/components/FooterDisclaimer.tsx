import React from 'react';

const FooterDisclaimer: React.FC = () => {
  return (
    <footer style={{
      padding: '24px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#6B7280',
      backgroundColor: '#F9FAFB',
      borderTop: '1px solid #E5E7EB',
      marginTop: '40px'
    }}>
      <p>
        <strong>Disclaimer:</strong> This is a demo project for educational purposes. 
        Please do not enter real personal information or financial data.
      </p>
    </footer>
  );
};

export default FooterDisclaimer;