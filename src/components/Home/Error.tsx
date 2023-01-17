import { Typography } from "@mui/material";

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "red" }}>
      {error}
    </Typography>
  );
};

export default Error;
