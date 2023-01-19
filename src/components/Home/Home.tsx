import useNews from "../../hooks/news";
import Loading from "./Loading";
import Error from "./Error";
import { Article } from "./Article";
import { useState } from "react";
import { IArticle } from "../../models";
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
  const [newData, setNewData] = useState<IArticle[]>([]);
  const [queryArray, setQueryArray] = useState<string[]>([]);

  function searchNews() {
    setQueryArray(query?.toLowerCase().match(/\S+/g));

    let newArray: IArticle[] | any = [];

    if (queryArray !== undefined) {
      queryArray.forEach((element) => {
        news?.forEach((item) => {
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
        news?.forEach((item) => {
          if (
            element.includes(" ") === false &&
            item.summary.toLowerCase().includes(element) &&
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
          {query === undefined ? news?.length : newData.length}
        </Typography>
        
        <Grid container spacing={3} my={1}>
          {query === undefined
            ? news?.map((item) => (
                <Article key={item.id} data={item} index={item.id} />
              ))
            : newData.map((item, index) => (
                <Article key={item.id} data={item} index={item.id} />
              ))}
        </Grid>
      </Container>
    </>
  );
};
