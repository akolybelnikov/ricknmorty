package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"log"
	"strconv"

	"github.com/akolybelnikov/ricknmorty/graphql-server/graph/generated"
	"github.com/akolybelnikov/ricknmorty/graphql-server/graph/model"
	"github.com/akolybelnikov/ricknmorty/graphql-server/http"
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/characters"
	"github.com/mitchellh/mapstructure"
)

func (r *queryResolver) Character(ctx context.Context, id string) (*model.Character, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Characters(ctx context.Context, page *int, filter *model.FilterCharacter) (*model.Characters, error) {
	options := make(map[string]interface{})
	if page != nil {
		options["page"] = strconv.Itoa(*page)
	}
	if filter != nil {
		if filter.Name != nil {
			options["name"] = *filter.Name
		}
		if filter.Type != nil {
			options["type"] = *filter.Type
		}
		if filter.Gender != nil {
			options["gender"] = *filter.Gender
		}
		if filter.Species != nil {
			options["species"] = *filter.Species
		}
		if filter.Status != nil {
			options["status"] = *filter.Status
		}
	}
	data, err := http.FetchData(http.BaseURL+http.EndpointCharacter, options)
	if err != nil {
		log.Printf("Cannot get characters %v", err)
		return &model.Characters{}, nil
	}

	var httpCharacters characters.Characters

	if err = mapstructure.Decode(data, &httpCharacters); err != nil {
		log.Printf("Cannot map characters from JSON data %v", err)
		return &model.Characters{}, nil
	}

	cs := new(model.Characters)

	info := &model.Info{
		Count: &httpCharacters.Info.Count,
		Pages: &httpCharacters.Info.Pages,
		Next:  &httpCharacters.Info.Next,
		Prev:  &httpCharacters.Info.Prev,
	}

	cs.Info = info

	var chars []*model.Character

	for _, character := range httpCharacters.Results {
		origin := &model.Location{}
		if character.Origin.URL == "" {
			origin = nil
		} else {
			originData, err := http.FetchData(character.Origin.URL, map[string]interface{}{})
			if err != nil {
				log.Printf("Cannot fetch origin %v", err)
			}
			if err = mapstructure.Decode(originData, &origin); err != nil {
				log.Printf("Cannot map origin from JSON data %v", err)
				return &model.Characters{}, nil
			}
		}

		location := &model.Location{}
		if character.Location.URL == "" {
			location = nil
		} else {
			locationData, err := http.FetchData(character.Location.URL, map[string]interface{}{})
			if err != nil {
				log.Printf("Cannot fetch location %v", err)
			}
			if err = mapstructure.Decode(locationData, &location); err != nil {
				log.Printf("Cannot map location from JSON data %v", err)
				return &model.Characters{}, nil
			}
		}

		var episodes []*model.Episode
		if len(character.Episode) > 0 {
			var episode model.Episode
			episodeData, err := http.FetchData(character.Episode[0], map[string]interface{}{})
			if err != nil {
				log.Printf("Cannot fetch episode %v", err)
			}
			if err = mapstructure.Decode(episodeData, &episode); err != nil {
				log.Printf("Cannot map episode from JSON data %v", err)
				return &model.Characters{}, nil
			}

			episodes = append(episodes, &episode)
		}

		c := new(model.Character)
		ID := character.ID
		c.ID = &ID
		name := character.Name
		c.Name = &name
		status := character.Status
		c.Status = &status
		species := character.Species
		c.Species = &species
		ctype := character.Type
		c.Type = &ctype
		gender := character.Gender
		c.Gender = &gender
		c.Origin = origin
		c.Location = location
		c.Episode = episodes
		image := character.Image
		c.Image = &image
		created := character.Created
		c.Created = &created
		chars = append(chars, c)
	}
	cs.Results = chars
	return cs, nil
}

func (r *queryResolver) CharactersByIds(ctx context.Context, ids []string) ([]*model.Character, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Location(ctx context.Context, id string) (*model.Location, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Locations(ctx context.Context, page *int, filter *model.FilterLocation) (*model.Locations, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) LocationsByIds(ctx context.Context, ids []string) ([]*model.Location, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Episode(ctx context.Context, id string) (*model.Episode, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Episodes(ctx context.Context, page *int, filter *model.FilterEpisode) (*model.Episodes, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) EpisodesByIds(ctx context.Context, ids []string) ([]*model.Episode, error) {
	panic(fmt.Errorf("not implemented"))
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
