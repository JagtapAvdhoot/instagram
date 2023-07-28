import React, { useEffect, useState } from "react";
import { useToast,createStandaloneToast } from "@chakra-ui/react";

const useGlobalToast = () => {
  const [toast, setToast] = useState(null);
  const toastInstance = useToast();

  if(toast === null){
    setToast(toastInstance);
  }

  return { toast };
};

export default useGlobalToast;
