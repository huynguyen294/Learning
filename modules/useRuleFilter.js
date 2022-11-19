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

  const foundEvent = events.find((ev) => ev.event === event.event);

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
    if (
      foundEvent.dataValues[dataElement] === value ||
      (foundEvent.dataValues[dataElement] === undefined && value === "")
    ) {
      return false;
    }

    return true;
  };

  const actionFilter = (actions) => {
    const newActions = _.cloneDeep(actions);

    return newActions.filter((action) => {
      const dataElement = action.target;
      const value = runExpression(action.value);

      if (action.type !== "ASSIGN_VALUE") {
        return true;
      }

      const valid = compareValue(dataElement, value);

      if (valid) {
        return true;
      }

      return false;
    });
  };

  const newRules = _.cloneDeep(rules);

  return newRules
    .map((rule) => {
      let result = runExpression(rule.expression);
      if (result !== "true") {
        return;
      }

      const newActions = actionFilter(rule.actions);
      return {
        ...rule,
        actions: newActions,
      };
    })
    .filter(Boolean);
};

export default useRuleFilter;
