export default (reducer) => {
  return (prevState, { type, payload }) => {
    console.group(type);

    console.log('Prev state: ', prevState);

    const newState = reducer(prevState, { type, payload });

    console.log('Next state: ', newState);

    console.groupEnd();

    return newState;
  };
};
