import React, { useEffect } from 'react';
import '@crossmint/client-sdk-vanilla-ui';

const CrossmintPayButton: React.FC = () => {
  useEffect(() => {
    const getRecipient = () => {
      const recipientInput = document.getElementById('recipient') as HTMLInputElement;
      return recipientInput?.value;
    };

    const buttonContainer = document.getElementById('crossmint-button-container');
    if (buttonContainer) {
      const button = document.createElement('crossmint-pay-button');
      button.setAttribute('projectId', import.meta.env.PUBLIC_CROSSMINT_PROJECT_ID);
      button.setAttribute('collectionId', '4d715ae9-06e1-4c2f-a49a-2ecd2cf31551');
      button.setAttribute('environment', import.meta.env.MODE === 'production' ? 'production' : 'staging');
      button.setAttribute('recipient', getRecipient());
      button.setAttribute('mintConfig', JSON.stringify({
        name: 'HackReality 2024 Participation NFT',
        description: 'This NFT certifies participation in HackReality 2024',
        image: '/Test NFT img/ilustracion.png'
      }));
      button.className = 'w-full';
      buttonContainer.appendChild(button);

      return () => {
        buttonContainer.removeChild(button);
      };
    }
  }, []);

  return <button id="crossmint-button-container" className='mt-4'></button>;
};

export default CrossmintPayButton;