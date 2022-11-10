import { useEffect, useState } from "react";
import moment from "moment";
import { intervalToDuration } from "date-fns";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import useDataStore from "@/state/data";
import useMetadataStore from "@/state/metadata";
import shallow from "zustand/shallow";
import useRuleStore from "@/state/rule";
import { pushDataValue } from "@/api/data";

const sendRequestsAsync = async (requests) => {
  for (let i = 0; i < requests.length; i++) {
    const { sendRequest } = requests[i];

    if (sendRequest) {
      await sendRequest();
    }
  }
};

const baseValueTypeCheck = (dataItem, value, t) => {
  const errors = [];
  const { valueType, mandatory } = dataItem;
  if (!value && mandatory) {
    errors.push(t("thisFieldIsRequired"));
  }
  if (!value) return errors;
  switch (valueType) {
    case "INTEGER":
      if (isNaN(value) || value > 999999999 || value < -999999999) {
        errors.push(t("valueMustBeInteger"));
      }
      break;
    case "NUMBER":
      if (
        isNaN(value) ||
        value > 99999999999999999999 ||
        value < -99999999999999999999
      ) {
        errors.push(t("valueMustBeNumber"));
      }
      break;
    case "PERCENTAGE":
      if (isNaN(value) || value > 100 || value < 0) {
        errors.push(t("valueMustBeBetween0And100"));
      }
      break;
    case "INTEGER_POSITIVE":
      if (isNaN(value) || value > 999999999 || value < 1) {
        errors.push(t("valueMustBePositiveInteger"));
      }
      break;
    case "INTEGER_NEGATIVE":
      if (isNaN(value) || value > -1 || value < -999999999) {
        errors.push(t("valueMustBeNegativeInteger"));
      }
      break;
    case "INTEGER_ZERO_OR_POSITIVE ":
      if (isNaN(value) || value > 999999999 || value < 0) {
        errors.push(t("valueMustBeZeroOrPositiveInteger"));
      }
      break;
    case "PHONE_NUMBER ":
      if (isNaN(value)) {
        errors.push(t("valueMustBePhoneNumber"));
      }
      break;
    case "EMAIL":
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        errors.push(t("valueMustBeEmail"));
      }
      break;
    case "COORDINATES":
    case "UNIT_INTERVAL":
    case "FILE_RESOURCE":
    case "LETTER":
    case "IMAGE":
    case "URL":
    case "USERNAME":
      errors.push(t("unsupportedValueType") + " " + dataItem.valueType);
      break;
    default:
      break;
  }
  return errors;
};

const useRuleEngineCopy = (context, rules) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const {
    tei,
    enr,
    event,
    events,
    setTeiAttribute,
    setEventDataValue,
    updateEventDataValue,
  } = useDataStore(
    (state) => ({
      enr: state.enr,
      tei: state.tei,
      event: state.event,
      events: state.events,
      setTeiAttribute: state.setTeiAttribute,
      setEventDataValue: state.setEventDataValue,
      updateEventDataValue: state.updateEventDataValue,
    }),
    shallow
  );
  const { program, teas } = useMetadataStore(
    (state) => ({ program: state.program, teas: state.teas }),
    shallow
  );
  const setRule = useRuleStore((state) => state.setRule);

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

  const runProfileContext = () => {
    const status = {
      valid: true,
      errors: [],
      warnings: [],
      helpers: [],
      hiddenFields: [],
      hiddenOptions: [],
      disabledOptions: [],
      assignations: [],
      disabledFields: [],
    };
    let errors = [];
    teas.forEach((tea) => {
      const currentErrors = baseValueTypeCheck(tea, tei.attributes[tea.id], t);
      errors = errors.concat(
        currentErrors.map((error) => ({ value: error, target: tea.id }))
      );
    });
    status.errors = [...errors];
    rules.forEach((rule) => {
      let result = runExpression(rule.expression);
      if (result === "true") {
        rule.actions.forEach((action) => {
          switch (action.type) {
            case "ERROR":
              status.errors.push({
                target: action.target,
                value: t(action.value),
              });
              break;
            case "WARNING":
              status.warnings.push({
                target: action.target,
                value: t(action.value),
              });
              break;
            case "HELPER":
              status.helpers.push({
                target: action.target,
                value: t(action.value),
              });
              break;
            case "HIDE_FIELD":
              status.hiddenFields.push({ target: action.target });
              break;
            case "ASSIGN_VALUE":
              status.assignations.push({
                target: action.target,
                value: runExpression(action.value),
              });
              break;
            case "DISABLE_FIELD":
              status.disabledFields.push({ target: action.target });
              break;
            case "HIDE_OPTIONS":
              status.hiddenOptions.push({
                target: action.target,
                options: action.options,
              });
              break;
            default:
              break;
          }
        });
      }
    });
    if (status.errors.length > 0) {
      status.valid = false;
    }

    status.assignations.forEach((a) => {
      setTeiAttribute(a.target, a.value);
    });

    status.hiddenFields.forEach((hf) => {
      setTeiAttribute(hf.target, "");
    });
    status.hiddenOptions.forEach((ho) => {
      ho.options.forEach((option) => {
        if (tei.attributes[ho.target] === option) {
          setTeiAttribute(ho.target, "");
        }
      });
    });
    setRule("profile", status);
  };

  const runEventContext = () => {
    const status = {
      valid: true,
      errors: [],
      warnings: [],
      helpers: [],
      hiddenFields: [],
      hiddenFieldAsyncs: [],
      hiddenOptions: [],
      hiddenOptionAsyncs: [],
      disabledOptions: [],
      assignations: [],
      assignationAsyncs: [],
      disabledFields: [],
    };
    let errors = [];
    const programStage = program.programStages.find(
      (ps) => ps.id === event.programStage
    );
    programStage.programStageDataElements.forEach((psde) => {
      const dataElement = { ...psde.dataElement };
      dataElement.mandatory = psde.mandatory;
      const currentErrors = baseValueTypeCheck(
        dataElement,
        event.dataValues[dataElement.id],
        t
      );
      errors = errors.concat(
        currentErrors.map((error) => ({ value: error, target: dataElement.id }))
      );
    });

    status.errors = [...errors];
    rules.forEach((rule) => {
      let result = runExpression(rule.expression);
      if (result === "true") {
        rule.actions.forEach((action) => {
          switch (action.type) {
            case "ERROR":
              status.errors.push({
                target: action.target,
                value: t(action.value),
              });
              break;
            case "WARNING":
              status.warnings.push({
                target: action.target,
                value: t(action.value),
              });
              break;
            case "HELPER":
              status.helpers.push({
                target: action.target,
                value: t(action.value),
              });
              break;
            case "HIDE_FIELD":
              status.hiddenFields.push({ target: action.target });
              break;
            case "HIDE_FIELD_ASYNC":
              status.hiddenFieldAsyncs.push({ target: action.target });
              break;
            case "ASSIGN_VALUE":
              status.assignations.push({
                target: action.target,
                value: runExpression(action.value),
              });
              break;
            case "ASSIGN_VALUE_ASYNC":
              status.assignationAsyncs.push({
                target: action.target,
                value: runExpression(action.value),
              });
              break;
            case "DISABLE_FIELD":
              status.disabledFields.push({ target: action.target });
              break;
            case "HIDE_OPTIONS":
              status.hiddenOptions.push({
                target: action.target,
                options: action.options,
              });
              break;
            case "HIDE_OPTIONS_ASYNC":
              status.hiddenOptionAsyncs.push({
                target: action.target,
                options: action.options,
              });
              break;
            case "DISABLE_OPTIONS":
              status.disabledOptions.push({
                target: action.target,
                options: action.options,
              });
              break;
            default:
              break;
          }
        });
      }
    });

    if (status.errors.length > 0) {
      status.valid = false;
    }

    const saveDataValue = (dataElement, value) => {
      const foundEvent = events.find((ev) => ev.event === event.event);
      if (
        foundEvent.dataValues[dataElement] === value ||
        (foundEvent.dataValues[dataElement] === undefined && value === "")
      ) {
        return;
      }

      return async () => {
        const result = await pushDataValue(event, dataElement, value);

        if (result.ok) {
          updateEventDataValue(dataElement, value);
        }

        return result;
      };
    };

    const promises = [];
    status.assignationAsyncs.forEach((a) => {
      setEventDataValue(a.target, a.value);
      promises.push({
        target: a.target,
        value: a.value,
        sendRequest: saveDataValue(a.target, a.value),
      });
    });

    status.hiddenFieldAsyncs.forEach((hf) => {
      setEventDataValue(hf.target, "");
      promises.push({
        target: hf.target,
        value: "",
        sendRequest: saveDataValue(hf.target, ""),
      });
    });

    status.hiddenOptionAsyncs.forEach((ho) => {
      ho.options.forEach((option) => {
        if (event.dataValues[ho.target] === option) {
          setEventDataValue(ho.target, "");
          promises.push({
            target: ho.target,
            value: "",
            sendRequest: saveDataValue(ho.target, ""),
          });
        }
      });
    });

    setRequests(promises);

    status.assignations.forEach((a) => {
      setEventDataValue(a.target, a.value);
      saveDataValue(a.target, a.value)?.();
    });

    status.hiddenFields.forEach((hf) => {
      setEventDataValue(hf.target, "");
      saveDataValue(hf.target, "")?.();
    });

    status.hiddenOptions.forEach((ho) => {
      ho.options.forEach((option) => {
        if (event.dataValues[ho.target] === option) {
          setEventDataValue(ho.target, "");
          saveDataValue(ho.target, "")?.();
        }
      });
    });

    status.assignations = status.assignations.concat(status.assignationAsyncs);
    status.hiddenFields = status.hiddenFields.concat(status.hiddenFieldAsyncs);
    status.hiddenOptions = status.hiddenOptions.concat(
      status.hiddenOptionAsyncs
    );

    setRule("event", status);
  };

  useEffect(async () => {
    if (requests.length) {
      setLoading(true);
      await sendRequestsAsync(requests);
      setLoading(false);
    }
  }, [
    JSON.stringify(requests.map(({ target, value }) => ({ target, value }))),
  ]);

  useEffect(
    () => {
      if (context === "profile") {
        runProfileContext();
      } else {
        runEventContext();
      }
    },
    context === "profile"
      ? [JSON.stringify(tei), JSON.stringify(enr)]
      : [JSON.stringify(tei), JSON.stringify(event), JSON.stringify(enr)]
  );

  return loading;
};

export default useRuleEngineCopy;
