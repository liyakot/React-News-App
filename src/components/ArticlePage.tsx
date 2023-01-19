import { useParams, useNavigate } from "react-router";
import useNews from "../hooks/news";
import Error from "./Home/Error";
import Loading from "./Home/Loading";
import { Button, Box, Typography, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type ArticlePageParams = {
  id: string;
};

const ArticlePage: React.FC = () => {
  const { error, news, loading } = useNews();
  const { id } = useParams<ArticlePageParams>();
  const index = Number(id);
  const articleData = news.find((item) => item.id === index);
  const navigate = useNavigate();

  return (
    <>
      {loading && <Loading />}
      {error && <Error error={error} />}
      <Box
        component="img"
        sx={{
          height: 500,
          width: "100%",
          maxHeight: { xs: 250, sm: 350, md: 500 },
        }}
        alt={articleData?.title}
        src={articleData?.imageUrl}
      />
      <Box
        sx={{
          margin: "2rem",
          position: "absolute",
          top: { xs: 180, sm: 250, md: 400 },
          backgroundColor: "white",
          p: "3rem",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: "3rem", fontSize: { xs: "1.5rem" } }}
        >
          {articleData?.title}{" "}
        </Typography>
        <Typography variant="body1">{articleData?.summary}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginTop: "1rem", fontWeight: "600" }}
        >
          Learn more:{" "}
          <Link href={articleData?.url} underline="hover" color="inherit">
            {articleData?.title}
          </Link>
        </Typography>

        <Button
          onClick={() => navigate("/")}
          startIcon={<ArrowBackIcon />}
          sx={{ marginTop: "3rem" }}
        >
          Back to homepage
        </Button>
      </Box>
    </>
  );
};

export default ArticlePage;
