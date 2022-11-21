//custom form env
const useAllowFutureDateStore = () => {
  // import useMetadataStore from "@/state/metadata";
  // import _ from "lodash";
  // import { useEffect, useState } from "react";
  // import shallow from "zustand/shallow";

  const [allowFutureDateList, setAllowFutureDateList] = useState([]);
  const program = useMetadataStore((state) => state.program, shallow);

  const currentProgramStage = _.cloneDeep(
    program.programStages.find((ps) => ps.id === programStageId)
  );

  const run = () => {
    const allowFutureDateListTemp =
      currentProgramStage.programStageDataElements.filter(
        (de) => de.allowFutureDate === true
      );

    return allowFutureDateListTemp.map((item) => item.dataElement.id);
  };

  useEffect(() => {
    const allowFutureDateListTemp = run();
    setAllowFutureDateList(allowFutureDateListTemp);
  }, [JSON.stringify(currentProgramStage)]);

  return allowFutureDateList;
};

const programStageId = "jhpemxd4Tl6";
