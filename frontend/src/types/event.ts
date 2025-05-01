export interface Event {
  event_id: string;
  event_name: string;
  odds: string;
  sport?: string;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}