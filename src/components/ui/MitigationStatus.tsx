import React from 'react';

interface MitigationStatusProps {
  status: 'NOT STARTED' | 'IN PROGRESS' | 'STALLED' | 'EFFECTIVE';
}

export default function MitigationStatus({ status }: MitigationStatusProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'STALLED':
        return 'text-danger font-medium';
      case 'EFFECTIVE':
        return 'text-success font-medium';
      default:
        return 'text-muted';
    }
  };

  return (
    <span className={`text-sm ${getStatusStyle()}`}>
      {status}
    </span>
  );
}
