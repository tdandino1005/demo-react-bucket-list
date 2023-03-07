# React 🪣 List Demo

This is a demo of a React list component.

![dependency graph 🉐](./dependency-graph.svg).

---

## Move Data to Local Storage

```json
[
  { "id": "1", "text": "Learn React", "importance": 1 },
  { "id": "2", "text": "Learn HTML/CSS", "importance": 2, "isCompleted": true }
]
```

Put this in your browser's local storage. Use the 🔑 'buckets' 🪣.

Then, add this **outside of your component code 💭** in `App.jsx`: `const buckets = JSON.parse(localStorage.getItem("buckets"));`

---

## `useReducer` Hook

We have an array of objects as our 'database.' It can be thought of as our **data store** ergo a single source of truth for our entire app. 1️⃣ way to manage this is to use the `useReducer` 🪝.

This is coming up in a couple of weeks anyway, so we'll use it here.

[📝](https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer)

### The Reducer

Create a file in `src`: `bucket-list-reducer.js`. This will be our **reducer**. It will be a function that takes 2 arguments: the **current state** and an **action**. It will return the **new state**.

```js
export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_BUCKET": {
      const next = [...state, action.payload];

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
```

Note ☝️ - **no mutations of state allowed ⛔️**. We must return a new array.

### Move From `useState` to `useReducer`

```diff

Δ src/App.jsx
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

─────┐
• 1: │
─────┘
                                                              import { useReducer } from "react";
                                                              import reducer from "./bucket-list-reducer";
import Bucket from "./components/Bucket";                     import Bucket from "./components/Bucket";
import Form from "./components/BucketForm";                   import Form from "./components/BucketForm";
import { useState } from "react";

const buckets = JSON.parse(localStorage.getItem("buckets"));  const buckets = JSON.parse(localStorage.getItem("buckets"));

function App() {                                              function App() {
  const [bucketList, setBucketList] = useState(buckets);        const [state, dispatch] = useReducer(reducer, buckets);

  return (                                                      return (
    <>                                                            <>
```

---

## Create

1. To add `onSubmit` to your form in React, define a function that will be called when the form is submitted. This function should take an event object as its argument. Note that `onSubmit` is a **React Synthetic Event,** not the native DOM event.
2. But...how will that function update the parent's **state**? We need to pass a function to the child component that will update the parent's state. This function will be called when the child component's state is updated. This is called **lifting state up**. The child component will call this function and pass the new state as an argument. The parent component will then update its state with the new state.

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  const newBucket = {
    id: (state.length + 1).toString(),
    text: e.target["bucket-text"].value,
    importance: e.target.importance.value,
  };

  dispatch({ type: "ADD_BUCKET", payload: newBucket });
};
```

## Toggle

```javascript
const handleToggle = (e) => {
  const id = e.target.id;
  dispatch({ type: "TOGGLE_BUCKET", payload: id });
};
```

## Update 😓

### Identify the 🪣

Whenever we click the _Edit_ button, we need to determine the `id` of the associated 🪣. Hence, we will use a **`data-id`** attribute on the **button** 💭.

```javascript
<Button text="Edit ✏️" colorClass="bg-orange-500" id={bucket.id} />
<Button text="🔥" colorClass="bg-red-500" id={bucket.id} />
```

And in `Button.jsx` we receive the **prop** and use it in the `button`: `data-id={id}`

### Populate the Form

Using the `state` array, we can pass in a 🪣 to the `Form`. This will populate the form with the 🪣's data.

`const [bucket2Edit, setBucket2Edit] = useState(null);`

`<Form bucket={bucket2Edit} handleSubmit={handleSubmit} />`

### Update `bucket2Edit`

```javascript
const handleClick = (e) => {
  const clickedBtn = e.target;
  setBucket2Edit(state.find((bucket) => bucket.id === clickedBtn.dataset.id));
};
```

Do you remember 🇧🇱🇧🇱🇧🇱 HTML/JS? We need to use [`dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#examples) to access the `data-id` attribute.

### Update the 🪣

```javascript
const updatedBucket = {
  id: bucket2Edit.id,
  text: e.target["bucket-text"].value,
  importance: e.target.importance.value,
};

dispatch({ type: "UPDATE_BUCKET", payload: updatedBucket });
```

How will you differentiate between a submitted 🪣 that is new and one that is being updated? You will see if `bucket2Edit` is `null` or not.

⚠️ Don't forget to dispatch the setter for `bucket2Edit` to `null` after the 🪣 is updated.

### Delete

```javascript
const handleDelete = (e) => {
  const id = e.target.id;
  dispatch({ type: "REMOVE_BUCKET", payload: id });
};
```

Where does this go? 💭

### Disable Buttons for Completed 🪣

Use **conditional rendering.** `Button.jsx` will need another **prop.**

```javascript
className={`h-8 w-16 rounded ${isDisabled ? "bg-gray-500" : colorClass}`}
      data-id={id}
      disabled={isDisabled}
```

### Anything Else?

🤷🏾‍♀️ ⌛
