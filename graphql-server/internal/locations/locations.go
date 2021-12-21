package locations

import (
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/info"
)

type Location struct {
	Name      string      `json:"name"`
	URL      string      `json:"url"`
}

type Locations struct {
	Info    info.Info       `json:"info"`
	Results []*Location `json:"results"`
}

