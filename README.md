# **use-element-on-screen**

`use-element-on-screen` is a React hook that tracks the visibility of an element within the viewport. It uses the Intersection Observer API to detect when an element enters or leaves the screen, enabling you to trigger animations, lazy loading, or other actions based on the element's visibility.

## Installation

You can install the package using **npm**, **yarn**, or **pnpm**.

```bash
pnpm add use-element-on-screen

yarn install use-element-on-screen

npm install use-element-on-screen
```

## Usage

### useElementOnScreen Hook

The main hook that combines intersection observer functionality with visibility state management.

```tsx
import React from "react";
import { useElementOnScreen } from "use-element-on-screen";

const MyComponent = () => {
  const [ref, isVisible] = useElementOnScreen<HTMLDivElement>();

  return (
    <div>
      <div style={{ height: "100vh" }}>
        Scroll down to see the target element
      </div>
      <div
        ref={ref}
        style={{
          padding: "20px",
          backgroundColor: isVisible ? "green" : "red",
          color: "white",
        }}
      >
        {isVisible ? "Element is visible!" : "Element is not visible"}
      </div>
    </div>
  );
};
```

### useIntersectionObserver Hook

Lower-level hook for custom intersection observer logic.

```tsx
import React, { useState } from "react";
import { useIntersectionObserver } from "use-element-on-screen";

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    setIsVisible(entry.isIntersecting);
    setIntersectionRatio(entry.intersectionRatio);
  };

  const ref = useIntersectionObserver<HTMLDivElement>(callback, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "0px",
  });

  return (
    <div>
      <div style={{ height: "100vh" }}>
        Scroll down to see the target element
      </div>
      <div ref={ref} style={{ padding: "20px", backgroundColor: "lightblue" }}>
        <p>Visible: {isVisible ? "Yes" : "No"}</p>
        <p>Intersection Ratio: {Math.round(intersectionRatio * 100)}%</p>
      </div>
    </div>
  );
};
```

### Configuration Options

Both hooks accept standard `IntersectionObserverInit` options:

- `root`: The element that is used as the viewport for checking visibility
- `rootMargin`: Margin around the root (default: `"-20% 0% -75%"`)
- `threshold`: Number or array of numbers indicating visibility percentage when the callback should be executed (default: `0`)

```tsx
const [ref, isVisible] = useElementOnScreen<HTMLDivElement>({
  rootMargin: "10px",
  threshold: 0.5, // Trigger when 50% visible
});
```

## Features

- 🎯 **Easy to use**: Simple hooks with minimal setup
- 🚀 **TypeScript support**: Full TypeScript support with proper type definitions
- 📱 **React 18+ compatible**: Works with the latest React versions
- 🔧 **Configurable**: Flexible options for root, rootMargin, and threshold
- 🎨 **Animation-friendly**: Perfect for triggering animations on scroll
- 📦 **Lightweight**: Minimal bundle size with zero dependencies (except React)
- ♿ **Accessible**: Built with accessibility in mind

## API Reference

### `useElementOnScreen<T>(options?: IntersectionObserverInit)`

Returns a tuple `[ref, isVisible]` where:

- `ref`: React ref to attach to the target element
- `isVisible`: Boolean indicating if the element is currently visible

### `useIntersectionObserver<T>(callback, options?)`

Returns a ref to attach to the target element and calls the callback with intersection entries.

**Parameters:**

- `callback`: Function called with `IntersectionObserverEntry[]`
- `options`: `IntersectionObserverInit` options (optional)

## Common Use Cases

### Lazy Loading Images

```tsx
import { useElementOnScreen } from "use-element-on-screen";

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [ref, isVisible] = useElementOnScreen<HTMLDivElement>({
    rootMargin: "100px", // Start loading 100px before entering viewport
  });

  return (
    <div ref={ref}>
      {isVisible ? (
        <img src={src} alt={alt} />
      ) : (
        <div
          style={{ width: "100%", height: "200px", backgroundColor: "#f0f0f0" }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};
```

### Scroll Animations

```tsx
import { useElementOnScreen } from "use-element-on-screen";

const AnimatedBox = () => {
  const [ref, isVisible] = useElementOnScreen<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.6s ease-in-out",
      }}
    >
      This box animates into view!
    </div>
  );
};
```

### Analytics Tracking

```tsx
import { useIntersectionObserver } from "use-element-on-screen";

const TrackableSection = ({ sectionName }: { sectionName: string }) => {
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Track section view
        analytics.track("section_viewed", { section: sectionName });
      }
    });
  };

  const ref = useIntersectionObserver<HTMLDivElement>(callback, {
    threshold: 0.5, // Track when 50% visible
  });

  return (
    <div ref={ref}>
      <h2>{sectionName}</h2>
      {/* Section content */}
    </div>
  );
};
```

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/use-element-on-screen
