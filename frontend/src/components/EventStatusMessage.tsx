import { Typography, Paper } from "@mui/material";

interface EventStatusMessageProps {
  title: string;
  description: string;
}

const EventStatusMessage = ({
  title,
  description,
}: EventStatusMessageProps) => (
  <Paper
    sx={{
      textAlign: "center",
      py: 6,
      mt: 3,
      bgcolor: "background.paper",
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {description}
    </Typography>
  </Paper>
);

export default EventStatusMessage;
