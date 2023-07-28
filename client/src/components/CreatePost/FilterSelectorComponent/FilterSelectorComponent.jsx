import { memo, useContext } from "react";
import { Box, Grid } from "@chakra-ui/react";

import { CreatePostContext } from "../../../contexts/CreatePostContext";

import FilterGridItem from "../FilterGridItem/FilterGridItem";
import { useQuery } from "@tanstack/react-query";
import { getFilter } from "../../../services/post.service";
import { postFilterKey } from "../../../react-query";

const FilterSelectorComponent = memo(() => {
  // TODO: change this to media first upload and then select filter
  const { selectedFiles, media } = useContext(CreatePostContext);

  const { data = {filters : []}, isLoading, isError } = useQuery({
    queryKey: [postFilterKey],
    queryFn: () => getFilter()
  })

  if (isLoading) return <div>Loading ...</div>;

  const filterClickHandler = (filterName, activePost) => { };

  return (
    <>
      <Box
        w="100%"
        h="385px"
        overflowY="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            width: "0",
          },
        }}
      >
        <Grid position="relative" templateColumns="repeat(3,auto)">
          {data.filters.map(({ filter, name }, index) => (
            <FilterGridItem
              key={index}
              onClick={() => filterClickHandler(name)}
              filter={filter}
              name={name}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
});

export default FilterSelectorComponent;
