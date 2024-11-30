import React, { useEffect, useRef } from 'react';
import '@crossmint/client-sdk-vanilla-ui';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'crossmint-pay-button': any;
    }
  }
}

export const CrossmintPayButton: React.FC = () => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const updateButton = () => {
      // Limpiar el contenedor
      if (buttonRef.current) {
        buttonRef.current.innerHTML = '';
      }

      // Obtener el valor del recipient
      const recipientInput = document.getElementById('recipient') as HTMLInputElement;
      const recipientValue = recipientInput?.value || '';

      // Crear el nuevo botón
      const button = document.createElement('crossmint-pay-button');
      
      // Configurar atributos
      button.setAttribute('projectId', import.meta.env.PUBLIC_CROSSMINT_PROJECT_ID);
      button.setAttribute('collectionId', '4d715ae9-06e1-4c2f-a49a-2ecd2cf31551');
      button.setAttribute('environment', import.meta.env.MODE === 'production' ? 'production' : 'staging');
      button.setAttribute('recipient', recipientValue);
      button.setAttribute('mintConfig', JSON.stringify({
        name: 'HackReality 2024 Participation NFT',
        description: 'This NFT certifies participation in HackReality 2024',
        image: '/Test NFT img/ilustracion.png'
      }));
      
      button.className = 'w-full';
      
      // Agregar el botón al contenedor
      if (buttonRef.current) {
        buttonRef.current.appendChild(button);
      }
    };

    // Configuración inicial del botón
    updateButton();

    // Agregar listener para actualizar el botón cuando cambie el recipient
    const recipientInput = document.getElementById('recipient');
    recipientInput?.addEventListener('change', updateButton);
    recipientInput?.addEventListener('input', updateButton);

    // Cleanup
    return () => {
      recipientInput?.removeEventListener('change', updateButton);
      recipientInput?.removeEventListener('input', updateButton);
    };
  }, []);

  return <div ref={buttonRef} className="mt-4 w-full"></div>;
};

export default CrossmintPayButton;