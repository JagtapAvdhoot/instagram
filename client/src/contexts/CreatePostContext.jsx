import { createContext, useState } from "react";

export const CreatePostContext = createContext({});

const CreatePostProvider = ({ children }) => {
  const [isDiscardModalActive, setIsDiscardModalActive] = useState(false);
  const [modalStage, setModalStage] = useState("first");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [media, setMedia] = useState([]);
  const [hideStats, setHideStats] = useState(false);
  const [hideComments, setHideComments] = useState(false);
  const [imgAlt, setImgAlt] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const charLimit = 1500;

  const clearModal = () => {
    setIsDiscardModalActive(false);
    setModalStage("first");
    setSelectedFiles([]);
    setDescription("");
    setLocation("");
    setMedia([]);
    setHideStats(false);
    setHideComments(false);
    setImgAlt("");
  };

  return (
    <CreatePostContext.Provider
      value={{
        isDiscardModalActive,
        setIsDiscardModalActive,
        modalStage,
        setModalStage,
        selectedFiles,
        setSelectedFiles,
        description,
        setDescription,
        location,
        setLocation,
        hideStats,
        setHideStats,
        hideComments,
        setHideComments,
        imgAlt,
        setImgAlt,
        charLimit,
        media,
        setMedia,
        clearModal,
        activeImage,
        setActiveImage,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};

export default CreatePostProvider;