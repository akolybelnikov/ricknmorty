# Project structure

## Frontend

A React.js application bootstrapped with [https://vitejs.dev/](https://vitejs.dev/)

Why Vite? Because it's made with Go, and it's the fastest tool out there. From the documentation:
>   Vite is a build tool for web projects.
    It serves the code in development using ECMAScript Module imports.
    In production, vite bundles the code using Rollup.
    Vite is a lightweight solution that can be 100-150x times faster
    than alternatives such as Webpack or Parcel.
    This enormous speed gain is possible thanks to esbuild,
    a new TypeScript/JavaScript bundler written using the Go programming language.

### Components

#### GenericList

The app features a generic component capable of rendering a list of any elements of type ReactNode. 
The component is using the advantage of TypeScript generics and offers a simple API interface for 
the data to be rendered and a rendering method for each element of the data as well as a maximal number of
elements to be rendered on the page.

- `data` - an array of objects
- `renderItem` - a React component to be used as a rendering template for each object in the data array
- `max` - maximum number of elements to render at once

Example:
```tsx
<GenericList renderItem={(item: Interface) => <Item {...item} />} data={data} max={2}/>
```

#### Item
The React component to be rendered by the GenericList component, i.e. a list item. It can be any element 
of React node type, and it can define its own rendering elements in accordance with the rendered data properties
In our case we're rendering characters from Rock and Morty API hence Item is a Character interface implementation.

```tsx
interface Character {
    id: number;
    name: string;
    species: string;
    location: Location;
    image: string;
}
```

## Data Layer

We don't have a backend, but we render the data that we fetch from the API with a lightweight and versatile GraphQL client: [urql](https://formidable.com/open-source/urql/docs/basics/react-preact/).
The library allows us to define a query and fetch the data with the `useQuery` hook in React components.

## Run the app with Docker

`docker build -t ricknmorty .`

`docker run --rm -it -p 8080:80 ricknmorty`

Navigate to `localhost:8080` in the browser to open the app.

To stop the container execute ctrl-C in the terminal.


## To be improved / added (if I had more time)
