import "./App.css";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import InputAdornment from "@material-ui/core/InputAdornment";
// import CircularProgress from "@material/core/CircularProgress";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    width: "100%",
  },
  key: {
    width: "100%",
  },
  copy: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});
function App() {
  const classes = useStyles();
  const [key, setkey] = useState("");
  const [generating, setGenerating] = useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const generate = () => {
    setGenerating(true);
    axios.get("https://5b9hd1.deta.dev/generate").then((res) => {
      setkey(res.data["secret_key"]);
      setGenerating(false);
    });
  };

  const copy_to_clipboard = () => navigator.clipboard.writeText(key);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography
            variant={matches ? "h5" : "h6"}
            edge="start"
            aria-label="Secret Key Generator"
          >
            Secret Key Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant={matches ? "h4" : "h6"} gutterBottom>
            Get A Secret Key For Your Application
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={10}>
              <TextField
                variant="outlined"
                label="Secret Key"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton disabled={!key}>
                        <AssignmentIcon onClick={copy_to_clipboard} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={classes.key}
                value={key}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                color="primary"
                variant="contained"
                onClick={generate}
                disabled={generating}
                disableElevation={generating}
              >
                Generate
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default App;
