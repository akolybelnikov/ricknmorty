# Project structure

## Frontend

A React.js application bootstrapped with [https://vitejs.dev/](https://vitejs.dev/)

Why Vite? Because it's made with Go, and it's the fastest tool out there. From the documentation:
> Vite is a build tool for web projects.
It serves the code in development using ECMAScript Module imports.
In production, vite bundles the code using Rollup.
Vite is a lightweight solution that can be 100-150x times faster
than alternatives such as Webpack or Parcel.
This enormous speed gain is possible thanks to esbuild,
a new TypeScript/JavaScript bundler written using the Go programming language.

### Components

#### GenericList

The app features a generic component capable of rendering a list of any elements of type ReactNode. The component is using the advantage of TypeScript generics and offers a simple API interface for the data to be rendered and a rendering method for each element of the data.

- `data` - an array of objects
- `renderItem` - a React component to be used as a rendering template for each object in the data array
- `max` - maximum number of elements to render at once

Example:
```tsx
<GenericList renderItem={(item: Type) => <Item {...item} />} data={data} max={2}/>
```