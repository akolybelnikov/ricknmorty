# Project set-up

## Frontend

A React.js application bootstrapped with [https://vitejs.dev/](https://vitejs.dev/)

### Components

#### GenericList

The app features a generic component capable of rendering a list of any elements of type ReactNode. The component is using the advantage of TypeScript generics and offers a simple API interface for the data to be rendered and a rendering method for each element of the data.

- `data` - an array of objects
- `renderItem` - a React component to be used as a rendering template for each object in the data array