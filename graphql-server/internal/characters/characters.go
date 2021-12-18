package characters

import (
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/episodes"
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/info"
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/locations"
	rnm "github.com/pitakill/rickandmortyapigowrapper"
	"log"
)

type Character struct {
	ID       *string             `json:"id"`
	Name     *string             `json:"name"`
	Status   *string             `json:"status"`
	Species  *string             `json:"species"`
	Type     *string             `json:"type"`
	Gender   *string             `json:"gender"`
	Origin   *locations.Location `json:"origin"`
	Location *locations.Location `json:"location"`
	Image    *string             `json:"image"`
	Episode  []*episodes.Episode `json:"episode"`
	Created  *string             `json:"created"`
}

type Characters struct {
	Info    *info.Info   `json:"info"`
	Results []*Character `json:"results"`
}

func GetById(id int) *rnm.Character {
	character, err := rnm.GetCharacter(id)
	if err != nil {
		log.Fatal(err)
	}

	return character
}
