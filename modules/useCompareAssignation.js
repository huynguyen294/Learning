import { useEffect, useState } from "react";
import moment from "moment";
import { intervalToDuration } from "date-fns";
import _ from "lodash";
import useDataStore from "@/state/data";
import shallow from "zustand/shallow";

const useCompareAssignation = (rules) => {
  const { tei, event, enr, events } = useDataStore(
    (state) => ({
      tei: state.tei,
      event: state.event,
      events: state.events,

  const [compareResults, setCompareResults] = useState([]);

  const runExpression = (expression) => {
    let compiled = _.template(`<%= ${expression} %>`, {
      imports: {
        event,
        tei,
        enr,
        moment,
        intervalToDuration,
      },
    });

    return compiled();
  };

  const compareValue = (dataElement, value) => {
    const foundEvent = events.find((ev) => ev.event === event.event);

    if (
      foundEvent.dataValues[dataElement] === value ||
      (foundEvent.dataValues[dataElement] === undefined && value === "")
    ) {
      return false;
    }

    return true;
  };

  const compareActions = (actions) => {
    let newActions = [];
    actions.forEach((action) => {
      const dataElement = action.target;
      const value = runExpression(action.value);
      const valid = compareValue(dataElement, value);

      if (valid) {
        newActions.push(action);
      }
    });

    return newActions;
  };

  const runCompare = () => {
    let resultRules = [];

    rules.forEach((rule) => {
      let result = runExpression(rule.expression);
      if (result === "true") {
        resultRules.push(_.cloneDeep(rule));
      }
    });

    resultRules.forEach((rule, idx) => {
      rule.actions = compareActions(rule.actions);
    });

    return resultRules;
  };

  useEffect(() => {
    const resultRules = runCompare();
    setCompareResults(resultRules);
  }, [
    JSON.stringify(tei),
    JSON.stringify(enr),
    JSON.stringify(event),
    JSON.stringify(events),
  ]);

  return compareResults;
};

export default useCompareAssignation;
