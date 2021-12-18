package locations

import (
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/info"
)

type Location struct {
	ID        *string      `json:"id"`
	Name      *string      `json:"name"`
	Type      *string      `json:"type"`
	Dimension *string      `json:"dimension"`
	Residents []*string `json:"residents"`
	Created   *string      `json:"created"`
}

type Locations struct {
	Info    *info.Info       `json:"info"`
	Results []*Location `json:"results"`
}
