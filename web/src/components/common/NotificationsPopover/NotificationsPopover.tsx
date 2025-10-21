import React from 'react';
import {
  Box,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';
import {
  NotificationsNone as NotificationIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  notifications?: Notification[];
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Account Update',
    message: 'Your account balance has been updated',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    title: 'New Feature',
    message: 'Check out our new investment tracking feature',
    timestamp: '1 day ago',
    read: false,
  },
  {
    id: '3',
    title: 'Security Alert',
    message: 'New login detected from your account',
    timestamp: '2 days ago',
    read: true,
  },
];

const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  anchorEl,
  onClose,
  notifications = mockNotifications,
}) => {
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <Popover
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        zIndex: 9999,
        mt: 1,
        '& .MuiPopover-paper': {
          width: 320,
          maxHeight: 400,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          Notifications
          {unreadCount > 0 && (
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{ ml: 1 }}
            >
              <Box component="span" sx={{ width: 16, height: 16 }} />
            </Badge>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
          Mark all as read
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 0 }}>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem sx={{ px: 2, py: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
                {!notification.read && (
                  <CircleIcon
                    sx={{
                      fontSize: 8,
                      color: 'primary.main',
                    }}
                  />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      {notification.timestamp}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      {notifications.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <NotificationIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography color="text.secondary">No notifications</Typography>
        </Box>
      )}
    </Popover>
  );
};

export default NotificationsPopover;
