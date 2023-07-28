import { Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import Post from "../Post/Post";
import PostProvider from "../../contexts/PostContext";

const GridPostRender = ({ size = "400", children }) => {
  return (
    <>
      <Grid
        w="-webkit-fill-available"
        templateColumns={{
          base: `repeat(1,auto)`,
          md: "repeat(2, auto)",
          xl: `repeat(3, auto)`,
        }}
        templateRows="repeat(auto,auto)"
        gap="7"
        placeContent="center"
      >
        {children}
      </Grid>
      <Text textAlign="center">Posts end here!</Text>
    </>
  );
};

export default GridPostRender;
