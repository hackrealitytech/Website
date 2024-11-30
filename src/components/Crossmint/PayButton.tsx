import React, { useEffect } from 'react';

const CrossmintPayButton: React.FC = () => {
  useEffect(() => {
    // Cargar el script de Crossmint dinámicamente
    const loadCrossmintScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@crossmint/client-sdk-vanilla-ui/dist/index.global.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = initializeCrossmintButton;
      script.onerror = (error) => {
        console.error('Error loading Crossmint script:', error);
      };
      document.body.appendChild(script);
    };

    const initializeCrossmintButton = () => {
      try {
        const buttonContainer = document.getElementById('crossmint-button-container');
        if (buttonContainer) {
          const button = document.createElement('crossmint-pay-button');
          
          // Asegurarse de que las variables de entorno estén definidas
          const projectId = import.meta.env.PUBLIC_CROSSMINT_PROJECT_ID;
          const environment = import.meta.env.MODE === 'production' ? 'production' : 'staging';
          
          if (!projectId) {
            console.error('Missing PUBLIC_CROSSMINT_PROJECT_ID environment variable');
            return;
          }

          button.setAttribute('projectId', projectId);
          button.setAttribute('collectionId', '4d715ae9-06e1-4c2f-a49a-2ecd2cf31551');
          button.setAttribute('environment', environment);
          
          const recipientInput = document.getElementById('recipient') as HTMLInputElement;
          if (recipientInput) {
            button.setAttribute('recipient', recipientInput.value || '');
            
            // Actualizar el receptor cuando cambie el input
            recipientInput.addEventListener('input', () => {
              button.setAttribute('recipient', recipientInput.value || '');
            });
          }

          button.setAttribute('mintConfig', JSON.stringify({
            name: 'HackReality 2024 Participation NFT',
            description: 'This NFT certifies participation in HackReality 2024',
            image: '/Test NFT img/ilustracion.png'
          }));
          
          // Limpiar el contenedor antes de agregar el nuevo botón
          buttonContainer.innerHTML = '';
          buttonContainer.appendChild(button);
        }
      } catch (error) {
        console.error('Error initializing Crossmint button:', error);
      }
    };

    // Intentar cargar el script
    loadCrossmintScript();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src*="crossmint"]');
      if (script) {
        document.body.removeChild(script);
      }
      
      const recipientInput = document.getElementById('recipient') as HTMLInputElement;
      if (recipientInput) {
        recipientInput.removeEventListener('input', () => {});
      }
    };
  }, []);

  return (
    <div 
      id="crossmint-button-container" 
      className="mt-4"
      style={{ minHeight: '40px' }}
    />
  );
};

export default CrossmintPayButton;