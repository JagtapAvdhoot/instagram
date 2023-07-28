import { memo, useContext } from "react";
import { Spinner } from "@chakra-ui/react";

import { CreatePostContext } from "../../../contexts/CreatePostContext";

import CustomImageCarousel from "../../ImageCarousel/ImageCarousel";

const CreateModalImageRender = memo(() => {
    const { selectedFiles, media, modalStage, setActiveImage } =
      useContext(CreatePostContext);
    
    return (
      <>
        {modalStage === "first" ? (
          <CustomImageCarousel images={selectedFiles} selectorKey={null} />
        ) : media.length === 0 ? (
          <Spinner size="lg" />
        ) : (
          <CustomImageCarousel
            images={media}
            setActiveImage={setActiveImage}
            selectorKey="secureUrl"
          />
        )}
      </>
    );
  });

  export default CreateModalImageRender;