# Coding Style

## 1. General

### 1.1. No negations in ternary operators

Don't negate the condition in ternary operators as the `!` is easy to overlook.

Do

```jsx
paddingTop={title ? 0 : 5}
```

Don't

```jsx
paddingTop={!title ? 5 : 0}
```

### 1.2. Keep UI state local if possible

For the UI, prefer local React state via `useState` over Redux state.

### 1.4. No destructuring in function signatures

Destructure parameters like this.

Do

```jsx
const UserProfile = ({ name }) => {
  return <>{name}</>;
};
```

Don't

```jsx
const UserProfile = (props) => {
  const { name } = props;
  return <>{name}</>;
};
```

### 1.5. Only pass needed properties to helpers

Helper functions tend to not need all the props that are passed into a component; use variables or separate types to pass the required data to helper functions.

Do

```tsx
const UserProfile = (props) => {
  const { id } = props;
  const { name } = getUserName(id);
  return <>{name}</>;
};
```

Don't

```tsx
const UserProfile = (props) => {
  const { name } = getUserName(props);
  return <>{name}</>;
};
```

## 2. Naming

### 2.1. Folder names

Folder names should use **`camelCase`** except the folders, which exports React-Native component or screen, for that case **`PascalCase`** should be used.

### 2.2. File names

- **2.2.1** Use **`camelCase.js`** for all files that do not define a React Native component;
- **2.2.2** custom hooks should use **`camelCase.js`** and should be in utiles folder;
- **2.2.3** Use **`PascalCase.js`** for files that define a React Native component;

### 2.3. Variable and function names

- **2.3.1** Use meaningful names;
- **2.3.2** Don't shorten obvious variables like `event` to `ev`;
- **2.3.3** Prefix booleans with `is` or `has` (exceptions like `should` or `can` are allowed if it improves the name; also see below);
- **2.3.4** Name booleans in a positive way;
- **2.3.5** Prefix permissions with `can`, e.g. `canShareWebcam`;
- **2.3.7** Avoid postfixes like `Prop` at the end of variable names (bad example: `opacityProp`);
- **2.3.8** Handlers are prefixed with `handle` → `handleClick`;
- **2.3.9** Only prefix custom hook functions with `use`. Hook functions include React hook functions like `useEffect`, `useState` and also custom hooks.;
- **2.3.10** Avoid the `get` prefix for functions returning booleans, i.e. don't write `getIs…` or `getHas…`;
- **2.3.11** For components please use functional export to differ it from regular arrow functions;

Do

```js
const isVisible = true;
const isPasswordCorrect = true;
const isYellowColorScheme = true;

const canShareWebcam = true;

// arrays
const hasFruits = ["apple", "banana"].length > 0;

// functions
const onClick = (event) => event.target.value;

// hooks
const useUserProfile = (user) => {
  const [profile, userProfile] = useState();

  useEffect(() => {
    // do something here…
  }, [user.id]);
  // …
};
```

Don't

```tsx
const visible = true;
const isWrongPassword = true;
const colorSchemeIsYellow = true;

const isWebcamSharingPossible = true;

// arrays
const containsFruits = ["apple", "banana"].length > 0;

// functions
const click = (ev) => ev.target.value;

// hooks
const useUserProfile = (user) => {
  const profile = user.profile; // <- actually no hook
  // ...
};
```

### 2.4. Constant names

The team needs to follow next unified way:

- **2.4.1.** For project common constants (`domain`, `drawer height`, `list limits`, etc.) you need to use **`SNAKE_UPPER_CASE`**;

Do

```js
const DOMAIN = "…";
const DRAWER_HEIGHT = "…";
const LIST_LIMIT = "…";
```

Don't

```js
const Domain = "…";
const Drawer_Height = "…";
const list_limit = "…";
```

**`Those constants define main parameters and options for the whole application.`**

- **2.4.2.** For file constants (`function names`, `states`, etc.) you need to use **`camelCase`**;

Do

```js
const [userList] = useState( … );
const canUserViewList = useSelector( … );
const handlePressViewMore = () => { … };
```

Don't

```js
const [USER_LIST] = useState( … );
const user_has_permissions = useSelector( … );
const pressmore = () => { … };
```

## 3. Imports / exports

### 3.1. No default exports

Avoid export defaults, prefer named exports instead. This has the following advantages:

- it helps IDEs and thus the developers with auto-imports
- you can search for the exported item by name and not only indirectly via the module name

Do

```js
// export
export function UserProfile() {}

// import
import { UserProfile } from "./UserProfile";
```

Don't

```tsx
// export
const UserProfile = () => {};
export default UserProfile;

// import
import UserProfile from "./UserProfile";
```

### 3.2. Group exports

- **3.2.1** Exports should be located below all the imports;
- **3.2.2** Exports should be grouped if necessary (e.g. in the `index.ts` file);
- **3.2.3** Don't use exports to group stuff inside a folder as this will make IDEs propose multiple import paths and can lead to importing a whole folder without the need to do so;

### 3.3. Wildcard exports

Wildcard exports (`export *`) should be used with caution, you might export stuff involuntarily, which could be confusing at best and a security issue at worst.

Do

```tsx
export { UserProfile } from "./UserProfile";
```

Don't

```tsx
export * from "./UserProfile";
```

## 4. UI

### 4.1. Components

- **4.1.1** One component per file;
- **4.1.2** Remove unused properties;

### 4.2. Colors

All theme parameters are stored in `/constants/color` file.

### 4.3. Styles

on the Project we use `StyleSheet.create()`. usually in the same file structure

Do

```tsx
const styles = StyleSheet.create({
    …
});
```

### 4.4. Sizes

- **4.4.1.** Prefer theme units or design tokens over pixel values; in particular do not blindly copy pixel values from the design specs (abstract etc);
- **4.4.2.** No odd or half (`"0.5px"`) pixel values (this might for example lead to blurry borders)
- **4.4.3.** 0 is always `0` and not `"0"` or `"0px"`

## Summary

- **`camelCase`** for folders and file names (except 2 points below)\
  (e.g. `constants/colors.js`)

* **`PascalName`** for folders which exports React-Native component as a main export variable \
  (e.g. `components/AppButton.js`)

- **`PascalName`** for React-Native file components\
  (e.g. `Button.js`)

* Function names should start from **`handle`**\
  (`handlePressSend`)

- Boolean variables should start with **`is`** / **`can`** / **`should`** / **`has`**\
  (e.g. `isVisible` / `canView` etc.)

* Use **`export function/const`** instead of `export default`\
  (e.g. `export const Button = ...`)

## Useful comments

- express yourself with better names for variables, functions and properties
- rather simplify your code
- move the code to a function and provide a meaningful name with meaningful parameters and return types
- Add jsdoc to provide additional information to the code, when its API would be hard to understand (and further simplification isn't possible)
- sometimes a `why[did I do this]` comment makes sense (e.g. mention a related github issue)
- there never should be a `what[did I do]` comment, because that's part of your code.
