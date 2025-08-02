'use client';

import { useState, useEffect } from 'react';

interface LeadModalData {
  categoria?: string;
  dataChegada?: string;
  dataSaida?: string;
  passageiros?: number;
  origem?: string;
}

export function useLeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<LeadModalData>({});

  const openModal = (data?: LeadModalData) => {
    setModalData(data || {});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData({});
  };

  // Listen for custom events to open modal
  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      openModal(event.detail);
    };

    window.addEventListener('openLeadModal', handleOpenModal as EventListener);

    return () => {
      window.removeEventListener('openLeadModal', handleOpenModal as EventListener);
    };
  }, []);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal
  };
}