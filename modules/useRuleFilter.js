import moment from "moment";
import { intervalToDuration } from "date-fns";
import _ from "lodash";
import useDataStore from "@/state/data";
import shallow from "zustand/shallow";

const useRuleFilter = (rules) => {
  const { tei, event, enr, events } = useDataStore(
    (state) => ({
      tei: state.tei,
      enr: state.enr,
      event: state.event,
      events: state.events,
    }),
    shallow
  );

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
        newActions.push(_.cloneDeep(action));
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

  const resultRules = runCompare();

  return resultRules;
};

export default useRuleFilter;
