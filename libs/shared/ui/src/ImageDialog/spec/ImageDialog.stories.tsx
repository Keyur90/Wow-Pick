import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import { ImageDialog } from '../ImageDialog';

export default {
  title: 'Components/ImageDialog',
  component: ImageDialog,
};

export const ImageDialogComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color="primary" variant="contained" onClick={() => setIsOpen(!isOpen)} size={'large'}>
        Open image dialog
      </Button>
      <ImageDialog
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        imageUrl={'https://cdn0.woolworths.media/content/wowproductimages/medium/266869.jpg'}
      />
    </>
  );
};
