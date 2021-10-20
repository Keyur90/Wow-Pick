import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { Container } from '@rf2/ui';
import { PersonalShopperNotesDialog } from '../PersonalShopperNotesDialog';

interface PersonalShopperNotesPropTypes {
  message: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2.5, 0, 0),
    display: 'flex',
    flexDirection: 'row',
  },
  messageWrapper: {
    overflow: 'hidden',
  },
  message: {
    fontSize: '1rem',
    fontWeight: 'normal',
    lineHeight: '1.5rem',
    color: '#494949',
  },
  icon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1.75),
  },
}));

const PersonalShopperNotes: React.FC<PersonalShopperNotesPropTypes> = ({ message }) => {
  const classes = useStyles();
  const [isPersonalShopperNotes, setIsPersonalShopperNotes] = useState(false);

  const handlePersonalShopperNotes = (force?: boolean) => {
    setIsPersonalShopperNotes(force ? force : !isPersonalShopperNotes);
  };

  return (
    <Container>
      <div className={classes.root} onClick={() => handlePersonalShopperNotes(true)}>
        <div className={classes.icon}>
          <SpeakerNotesIcon />
        </div>
        <div className={classes.messageWrapper}>
          <Typography noWrap className={classes.message}>
            {message}
          </Typography>
        </div>
      </div>
      <PersonalShopperNotesDialog
        isOpen={isPersonalShopperNotes}
        onToggle={handlePersonalShopperNotes}
        message={message}
      />
    </Container>
  );
};

export { PersonalShopperNotes };
