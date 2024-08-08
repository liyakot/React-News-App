import { IArticle } from "../../models";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import EventIcon from "@mui/icons-material/Event";

export const Article = ({ data, index }: any & IArticle) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 500, height: 365, m: "0 auto" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={data.image_url}
          title={data.title}
        />
        <CardContent sx={{ paddingTop: "0.5rem" }}>
          <Typography
            variant="overline"
            sx={{ display: "flex", alignItems: "center", color: "grey" }}
          >
            <EventIcon sx={{ fontSize: "medium", mr: ".5rem" }} />
            {data.publishedAt && data.publishedAt}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: "1.2rem",
              mb: ".5rem",
              mt: ".5rem",
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ overflow: "hidden", height: "2.5rem" }}
          >
            {data.summary}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to={`/article/${index}`}>
            <Button
              variant="text"
              size="small"
              endIcon={<EastIcon />}
              sx={{ fontWeight: "600" }}
            >
              Read more
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};
