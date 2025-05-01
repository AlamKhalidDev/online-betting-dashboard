import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Event, TabPanelProps } from "../types/event";
import { useEvents } from "../hooks/useEvents";
import EventStatusMessage from "./EventStatusMessage";
import EventsGrid from "./EventsGrid";
import PlaceBetModal from "./PlaceBetModal";
import Header from "./Header";

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

const BettingDashboard = () => {
  const { events, loading, error } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueSports = Array.from(
    new Set(events.map((event) => event.sport).filter(Boolean))
  ) as string[];

  const handlePlaceBet = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Container
        maxWidth="lg"
        sx={{ py: 4, width: "100%", overflow: "hidden" }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Available Events
        </Typography>

        {/* Tabs bar */}
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Paper
            sx={{
              bgcolor: "background.paper",
              borderRadius: 1,
              maxWidth: { xs: "100%", sm: "fit-content" },
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_e, newValue) => setTabValue(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ py: 1, px: 1, width: "100%" }}
            >
              <Tab label="All Events" />
              {uniqueSports.map((sport) => (
                <Tab
                  key={sport}
                  label={sport.charAt(0).toUpperCase() + sport.slice(1)}
                />
              ))}
            </Tabs>
          </Paper>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <EventStatusMessage
            title="Error loading events"
            description="Please try again later"
          />
        ) : filteredEvents.length === 0 ? (
          <EventStatusMessage
            title="No events found"
            description="Try adjusting your search or filters"
          />
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <EventsGrid
                events={filteredEvents}
                handlePlaceBet={handlePlaceBet}
              />
            </TabPanel>

            {uniqueSports.map((sport, index) => (
              <TabPanel key={sport} value={tabValue} index={index + 1}>
                <EventsGrid
                  events={filteredEvents.filter(
                    (event) => event.sport === sport
                  )}
                  handlePlaceBet={handlePlaceBet}
                />
              </TabPanel>
            ))}
          </>
        )}
      </Container>

      {selectedEvent && (
        <PlaceBetModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
};

export default BettingDashboard;
