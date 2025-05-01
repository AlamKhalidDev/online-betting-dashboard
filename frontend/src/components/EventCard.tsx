import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Event } from "../types/event";

interface EventCardProps {
  event: Event;
  onPlaceBet: () => void;
}

const EventCard = ({ event, onPlaceBet }: EventCardProps) => {
  const eventParts = event.event_name.split(": ");
  const sportName = eventParts[0];
  const matchup = eventParts[1] || event.event_name;

  return (
    <Card
      sx={{
        border: 1,
        borderColor: "divider",
        transition: "box-shadow 0.2s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <CardContent
        sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500, mb: 1 }}
        >
          {sportName}
        </Typography>

        <Typography variant="h3" sx={{ mb: "auto", pb: 2 }}>
          {matchup}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Box>
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ mr: 0.5 }}
            >
              Odds:
            </Typography>
            <Typography
              component="span"
              variant="body1"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              {event.odds}
            </Typography>
          </Box>

          <Button variant="contained" size="small" onClick={onPlaceBet}>
            Place Bet
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
