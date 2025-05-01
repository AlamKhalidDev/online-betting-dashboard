import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Slider,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Event as CustomEvent } from "../types/event";

interface PlaceBetModalProps {
  event: CustomEvent;
  isOpen: boolean;
  onClose: () => void;
}

const PlaceBetModal = ({ event, isOpen, onClose }: PlaceBetModalProps) => {
  const [amount, setAmount] = useState<string>("10");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    const betAmount = Number.parseFloat(amount);
    if (isNaN(betAmount) || betAmount <= 0) {
      setError("Please enter a valid bet amount");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setAmount("10");
          setError("");
          setIsSuccess(false);
        }, 500);
      }, 1500);
    }, 1000);
  };

  const handleSliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setAmount((value as number).toString());
    setError("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    setError("");
  };

  const odds = Number.parseFloat(event.odds);
  const betAmount = Number.parseFloat(amount) || 0;
  const potentialWinnings = betAmount * odds;

  const eventParts = event.event_name.split(": ");
  const sportName = eventParts[0];
  const matchup = eventParts[1] || event.event_name;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      {isSuccess ? (
        <Box sx={{ py: 6, px: 3, textAlign: "center" }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "success.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 32, color: "success.main" }} />
          </Box>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Bet Placed Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your bet of ${betAmount.toFixed(2)} on {matchup} has been placed.
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{ bgcolor: "#f8fafc", borderBottom: 1, borderColor: "divider" }}
          >
            <DialogTitle sx={{ pb: 1 }}>Place Your Bet</DialogTitle>
            <DialogContent sx={{ pb: 3, pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {sportName}
              </Typography>
              <Typography variant="h3" sx={{ mt: 0.5 }}>
                {matchup}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mr: 0.5 }}
                >
                  Odds:
                </Typography>
                <Typography
                  variant="body1"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  {event.odds}
                </Typography>
              </Box>
            </DialogContent>
          </Box>

          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Bet Amount
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Min: $5 | Max: $1000
                </Typography>
              </Box>
              <TextField
                fullWidth
                type="number"
                value={amount}
                onChange={handleInputChange}
                error={!!error}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 5,
                  max: 1000,
                  step: 5,
                }}
                size="small"
              />
              <Box sx={{ px: 1, mt: 2 }}>
                <Slider
                  value={Number.parseFloat(amount) || 10}
                  onChange={handleSliderChange}
                  min={5}
                  max={1000}
                  step={5}
                />
              </Box>
            </Box>

            <Card variant="outlined">
              <Box
                sx={{
                  bgcolor: "primary.light",
                  p: 1.5,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingUpIcon
                    sx={{ fontSize: 18, color: "primary.main" }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Potential Return
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      If you win
                    </Typography>
                    <Typography variant="h3" color="primary">
                      ${potentialWinnings.toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    ${betAmount.toFixed(2)} × {event.odds}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isSubmitting}
              sx={{ px: 3 }}
            >
              {isSubmitting ? "Processing..." : "Place Bet"}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default PlaceBetModal;
