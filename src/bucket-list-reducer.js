export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_BUCKET": {
      // creates a new array with the new bucket added to the end
      const next = [...state, action.payload];
      // sets the bucket list to local storage
      localStorage.setItem("buckets", JSON.stringify(next));
      return next;
    }
    case "REMOVE_BUCKET": {
      const next = state.filter((bucket) => bucket.id !== action.payload);

      localStorage.setItem("buckets", JSON.stringify(next));
      return next;
    }
    case "TOGGLE_BUCKET": {
      const next = state.map((bucket) => {
        if (bucket.id === action.payload) {
          return { ...bucket, isCompleted: !bucket.isCompleted };
        }
        return bucket;
      });

      localStorage.setItem("buckets", JSON.stringify(next));
      return next;
    }
    case "UPDATE_BUCKET": {
      const next = state.map((bucket) => {
        if (bucket.id === action.payload.id) {
          return action.payload;
        }
        return bucket;
      });

      localStorage.setItem("buckets", JSON.stringify(next));
      return next;
    }
    default:
      return state;
  }
}
