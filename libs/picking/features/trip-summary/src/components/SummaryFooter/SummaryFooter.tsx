import React from 'react';
import { Button, BottomActions } from '@rf2/ui';

interface SummaryFooterPropTypes {
  onStartTrip: () => void;
  onReprintLabels: () => void;
  isExpressTrip: boolean;
}

const SummaryFooter: React.FC<SummaryFooterPropTypes> = ({ onStartTrip, onReprintLabels, isExpressTrip }) => (
  <BottomActions>
    <Button onClick={onStartTrip}>Start trip</Button>
    {!isExpressTrip && (
      <Button variant={'outlined'} onClick={onReprintLabels}>
        Reprint labels
      </Button>
    )}
  </BottomActions>
);

export { SummaryFooter };
