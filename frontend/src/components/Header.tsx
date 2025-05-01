import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => (
  <Paper
    elevation={1}
    sx={{
      bgcolor: "background.paper",
      borderBottom: 1,
      borderColor: "divider",
      position: "sticky",
      top: 0,
      zIndex: 10,
      width: "100%",
    }}
  >
    <Box
      sx={{
        py: 2,
        px: { xs: 2, sm: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            height: 40,
            width: 40,
            borderRadius: 1,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            B
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, display: { xs: "none", md: "block" } }}
        >
          Betting Dashboard
        </Typography>
      </Box>

      <TextField
        variant="outlined"
        placeholder="Search events..."
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ width: 400, mx: 4 }}
      />

      <Typography
        variant="body2"
        sx={{ width: { xs: 100, sm: 200 }, textAlign: "center" }}
      ></Typography>
    </Box>
  </Paper>
);

export default Header;
