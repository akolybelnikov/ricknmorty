package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/akolybelnikov/ricknmorty/graphql-server/graph"
	"github.com/akolybelnikov/ricknmorty/graphql-server/graph/generated"
	"github.com/go-chi/chi"
	"github.com/rs/cors"
)

const defaultPort = "8080"

//func cors(h http.HandlerFunc) http.HandlerFunc {
//	return func(w http.ResponseWriter, r *http.Request) {
//		w.Header().Set("Access-Control-Allow-Origin", "*")
//		w.Header().Set("Access-Control-Allow-Methods", "*")
//		w.Header().Set("Access-Control-Allow-Headers", "*")
//		h(w, r)
//	}
//}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods: []string{"POST", "GET"},
		AllowedHeaders: []string{"*"},
		Debug:            true,
	}).Handler)

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	router.Handle("/", playground.Handler("Rick and Morty", "/query"))
	router.Handle("/query", srv)
	router.Handle("/api", srv)

	log.Printf("connect to http://localhost:%s/ for Rick and Morty playground", port)
	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Fatal(err)
	}
}
