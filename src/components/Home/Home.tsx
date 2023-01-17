import useNews from "../../hooks/news";
import Loading from "./Loading";
import Error from "./Error";
import { Article } from "./Article";
import { useState } from "react";
import { IArticleCard } from "../../models";
import {
  TextField,
  Container,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

export const Home: React.FC = () => {
  const { error, news, loading } = useNews();
  const [query, setQuery] = useState<any>();
  const [newData, setNewData] = useState<IArticleCard[]>([]);
  const [queryArray, setQueryArray] = useState<string[]>([]);

  function searchNews() {
    setQueryArray(query?.toLowerCase().match(/\S+/g));

    let newArray: IArticleCard[] | any = [];

    if (queryArray !== undefined) {
      queryArray.forEach((element) => {
        news?.articles.forEach((item) => {
          if (
            element.includes(" ") === false &&
            item.title.toLowerCase().includes(element) &&
            newArray.indexOf(item) === -1
          ) {
            newArray.push(item);
          }
        });
      });
    }

    if (queryArray !== undefined) {
      queryArray.forEach((element) => {
        news?.articles.forEach((item) => {
          if (
            element.includes(" ") === false &&
            item.description.toLowerCase().includes(element) &&
            newArray.indexOf(item) === -1
          ) {
            newArray.push(item);
          }
        });
      });
    }
    setNewData(newArray);
  }

  return (
    <>
      <Container sx={{ mt: "2rem" }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            Filter by keywords
          </Typography>
          <TextField
            type="search"
            placeholder="I'm searching for..."
            onChange={(e) => {
              setQuery(e.target.value);
              searchNews();
            }}
            variant="outlined"
            sx={{
              my: "1rem",
              maxWidth: "30rem",
            }}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading && <Loading />}
        {error && <Error error={error} />}

        <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
          Results:{" "}
          {query === undefined ? news?.articles.length : newData.length}
        </Typography>
        
        <Grid container spacing={3} my={1}>
          {query === undefined
            ? news?.articles.map((item, index) => (
                <Article key={index} data={item} index={index} />
              ))
            : newData.map((item, index) => (
                <Article key={index} data={item} index={index} />
              ))}
        </Grid>
      </Container>
    </>
  );
};
