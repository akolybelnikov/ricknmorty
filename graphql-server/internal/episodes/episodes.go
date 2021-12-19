package episodes

import (
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/info"
)

type Episode struct {
	ID         float64  `json:"id"`
	Name       string   `json:"name"`
	AirDate    string   `json:"air_date"`
	Episode    string   `json:"episode"`
	Characters []string `json:"characters"`
	Created    string   `json:"created"`
}

type Episodes struct {
	Info    *info.Info `json:"info"`
	Results []*Episode `json:"results"`
}
