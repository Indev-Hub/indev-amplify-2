import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import debounce from 'lodash/debounce';
import { Box, Dialog, Divider, Grid, TextField, Typography } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label';
import ArchiveIcon from '../../../icons/Archive';
import ArrowRightIcon from '../../../icons/ArrowRight';
import CheckIcon from '../../../icons/Check';
import DocumentTextIcon from '../../../icons/DocumentText';
import DuplicateIcon from '../../../icons/Duplicate';
import EyeIcon from '../../../icons/Eye';
import EyeOffIcon from '../../../icons/EyeOff';
import TemplateIcon from '../../../icons/Template';
import UsersIcon from '../../../icons/Users';
import { addChecklist, deleteCard, updateCard } from '../../../slices/kanban';
import { useDispatch } from '../../../store';
import VideoLibraryCardAction from './VideoLibraryCardAction';
import VideoLibraryChecklist from './VideoLibraryChecklist';
import VideoLibraryComment from './VideoLibraryComment';
import VideoLibraryCommentAdd from './VideoLibraryCommentAdd';

const VideoLibraryCardModal = (props) => {
  const { card, column, onClose, open, ...other } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleDetailsUpdate = debounce(async (update) => {
    try {
      await dispatch(updateCard(card.id, update));
      enqueueSnackbar('Card updated', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  }, 1000);

  const handleSubscribe = async () => {
    try {
      await dispatch(updateCard(card.id, { isSubscribed: true }));
      enqueueSnackbar('Unsubscribed', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await dispatch(updateCard(card.id, { isSubscribed: false }));
      enqueueSnackbar('Subscribed', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteCard(card.id));
      enqueueSnackbar('Card archived', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  const handleAddChecklist = async () => {
    try {
      await dispatch(addChecklist(card.id, 'Untitled Checklist'));
      enqueueSnackbar('Checklist added', {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'success'
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, {
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        variant: 'error'
      });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Grid
          container
          spacing={5}
        >
          <Grid
            item
            sm={8}
            xs={12}
          >
            <TextField
              defaultValue={card.name}
              fullWidth
              label="Title"
              onChange={(event) => handleDetailsUpdate({ name: event.target.value })}
              variant="outlined"
            />
            <Box sx={{ mt: 3 }}>
              <TextField
                defaultValue={card.description}
                fullWidth
                multiline
                onChange={(event) => handleDetailsUpdate({ description: event.target.value })}
                placeholder="Leave a message"
                label="Description"
                rows={6}
                variant="outlined"
              />
            </Box>
            {card.checklists.length > 0 && (
              <Box sx={{ mt: 5 }}>
                {card.checklists.map((checklist) => (
                  <VideoLibraryChecklist
                    card={card}
                    checklist={checklist}
                    key={checklist.id}
                    sx={{ mb: 3 }}
                  />
                ))}
              </Box>
            )}
            <Box sx={{ mt: 3 }}>
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Activity
              </Typography>
              <Box sx={{ mt: 2 }}>
                <VideoLibraryCommentAdd cardId={card.id} />
                {card.comments.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    {card.comments.map((comment) => (
                      <VideoLibraryComment
                        createdAt={comment.createdAt}
                        key={comment.id}
                        memberId={comment.memberId}
                        message={comment.message}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <Typography
              color="textPrimary"
              component="h4"
              sx={{
                fontWeight: 600,
                mb: 2
              }}
              variant="overline"
            >
              Add to card
            </Typography>
            <VideoLibraryCardAction
              icon={<CheckIcon fontSize="small" />}
              onClick={handleAddChecklist}
            >
              Checklist
            </VideoLibraryCardAction>
            <VideoLibraryCardAction
              disabled
              icon={<UsersIcon fontSize="small" />}
            >
              Members
            </VideoLibraryCardAction>
            <VideoLibraryCardAction
              disabled
              icon={<LabelIcon fontSize="small" />}
            >
              Labels
            </VideoLibraryCardAction>
            <VideoLibraryCardAction
              disabled
              icon={<DocumentTextIcon fontSize="small" />}
            >
              Attachments
            </VideoLibraryCardAction>
            <Box sx={{ mt: 3 }}>
              <Typography
                color="textPrimary"
                component="h4"
                sx={{
                  fontWeight: 600,
                  mb: 2
                }}
                variant="overline"
              >
                Actions
              </Typography>
              <VideoLibraryCardAction
                disabled
                icon={<ArrowRightIcon fontSize="small" />}
              >
                Move
              </VideoLibraryCardAction>
              <VideoLibraryCardAction
                disabled
                icon={<DuplicateIcon fontSize="small" />}
              >
                Copy
              </VideoLibraryCardAction>
              <VideoLibraryCardAction
                disabled
                icon={<TemplateIcon fontSize="small" />}
              >
                Make Template
              </VideoLibraryCardAction>
              <Divider sx={{ my: 2 }} />
              {card.isSubscribed
                ? (
                  <VideoLibraryCardAction
                    icon={<EyeOffIcon fontSize="small" />}
                    onClick={handleUnsubscribe}
                  >
                    Unwatch
                  </VideoLibraryCardAction>
                )
                : (
                  <VideoLibraryCardAction
                    icon={<EyeIcon fontSize="small" />}
                    onClick={handleSubscribe}
                  >
                    Watch
                  </VideoLibraryCardAction>
                )}
              <VideoLibraryCardAction
                icon={<ArchiveIcon fontSize="small" />}
                onClick={handleDelete}
              >
                Archive
              </VideoLibraryCardAction>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

VideoLibraryCardModal.propTypes = {
  // @ts-ignore
  card: PropTypes.object.isRequired,
  // @ts-ignore
  column: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

VideoLibraryCardModal.defaultProps = {
  open: false
};

export default VideoLibraryCardModal;
