import { makeStyles } from '@mui/styles';

export const toolbarStyles = makeStyles({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  horizontalGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  },
  verticalGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  nodeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
  },
  node: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "200px",
  },
  button: {
    marginTop: "8px",
  },
});

export const graphVisualizerStyles = makeStyles(() => ({

}));

export const playAreaStyles = makeStyles(() => ({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    border: "1px solid black",
    backgroundColor: "#f0f0f0",
  },
}));