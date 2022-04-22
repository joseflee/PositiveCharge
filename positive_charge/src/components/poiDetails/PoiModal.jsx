import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  Divider,
  IconButton,
  Snackbar,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import AddExperience from './AddExperience.jsx'

export default function PoiModal({open, onClose, detail, name}) {

  const [isOpen, setIsOpen] = useState(false);
  const [showMore, showMoreExp] = useState(false);
  const [snackbarLoveOpen, setSnackbarLoveOpen] = useState(false);
  const [snackbarFlagOpen, setSnackbarFlagOpen] = useState(false);

  const love = (path, exp) => {
    axios.post(`/details/${path}/love`, {
      'name': name.props.id,
      'experience': exp,
      'email': name.userEmail
    })
      .then((response) => {
      })
  };

  const flag = (path, exp) => {
    axios.post(`/details/${path}/flag`, {
      'name': name.props.id,
      'experience': exp,
      'email': name.userEmail
    })
      .then((response) => {
      })
  };

  const sortExperiences = (details) => {
    details.sort((a, b) => {
      return b.exp_loves - a.exp_loves;
    })
    return details;
  }
  const sortedDetails = sortExperiences(detail);

  let minExp = Math.min(5, sortedDetails.length);

  const displayExperiences = () => {

    let exp = showMore ? minExp = sortedDetails.length : minExp;

    return sortedDetails.slice(0, exp).map((exp, index) => {
      return <ListItem key={index}>
         <DialogContentText>{exp.experience}</DialogContentText>

          <IconButton
            onClick={() => {
              love('experience', exp.experience)
              setSnackbarLoveOpen(true)
              }}>
            <FavoriteIcon/>{exp.exp_loves}
          </IconButton>
          <Snackbar
            open={snackbarLoveOpen}
            autoHideDuration={4000}
            onClose={() => {setSnackbarLoveOpen(false)}}
            message="Thanks for the love!"
          />
          <br/>
          <br/>
          <IconButton
            onClick={() => {
              flag('experience', exp.experience)
              setSnackbarFlagOpen(true)
              }}>
            <FlagIcon/>
          </IconButton>
          <Snackbar
            open={snackbarFlagOpen}
            autoHideDuration={4000}
            onClose={() => {setSnackbarFlagOpen(false)}}
            message="Thanks for informing us! We'll review your flag."
          />
       </ListItem>
     })

  }

  return (
    <Dialog
      className='experiences-modal'
      onClose={onClose}
      open={open}
      fullWidth={true}
    >
      <DialogTitle>{name?.props ? `Experiences at ${name.props.name}` : 'loading...'}</DialogTitle>

      <List>
        {detail[0]?.experience ? displayExperiences() : 'Be the first to add your experience!'}
      </List>

      {detail.length > 5 ?
        <IconButton variant='outlined' onClick={() => showMoreExp(!showMore)}>{showMore ? <ExpandLessIcon/> : <ExpandMoreIcon/>}</IconButton>
        : null}

      <Divider />

      <DialogActions>
        <FavoriteIcon/>{detail[0]?.loves ? detail[0].loves : null}
        <Snackbar
            open={snackbarLoveOpen}
            autoHideDuration={4000}
            onClose={() => {setSnackbarLoveOpen(false)}}
            message="Thanks for the love!"
          />
      </DialogActions>

      <BottomNavigation>
        <BottomNavigationAction
            label="Love"
            value="love"
            icon={<FavoriteIcon />}
            onClick={() => {
              love('poi')
              setSnackbarLoveOpen(true)
              }}
        />

        <BottomNavigationAction
            label="Share Experience"
            value="share"
            icon={<AddIcon />}
            onClick={() => setIsOpen(true)}
        />

        <BottomNavigationAction
            label="Flag"
            value="flag"
            icon={<FlagIcon />}
            onClick={() => {
              flag('poi')
              setSnackbarFlagOpen(true)
              }}
        />

        <BottomNavigationAction
            label="Close"
            value="close"
            icon={<CloseIcon />}
            onClick={onClose}
        />

      </BottomNavigation>

      <DialogActions>
        <AddExperience open={isOpen} onClose={() => setIsOpen(false)} name={name}></AddExperience>
      </DialogActions>

      <Snackbar
          open={snackbarFlagOpen}
          autoHideDuration={4000}
          onClose={() => {setSnackbarFlagOpen(false)}}
          message="Thanks for informing us! We'll review your flag."
        />

    </Dialog>
  );
}
