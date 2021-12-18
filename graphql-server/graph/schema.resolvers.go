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
	"github.com/akolybelnikov/ricknmorty/graphql-server/helpers"
	"github.com/akolybelnikov/ricknmorty/graphql-server/internal/characters"
	rnm "github.com/pitakill/rickandmortyapigowrapper"
)

func (r *queryResolver) Character(ctx context.Context, id string) (*model.Character, error) {
	i, err := strconv.Atoi(id)
	if err != nil {
		log.Printf("Cannot convert character id: %v", err)
	}
	character := characters.GetById(i)

	origin := &model.Location{}
	if character.Origin.URL == "" {
		origin = nil
	} else {
		originID := helpers.GetLastElementSplitBy(character.Origin.URL, "/")
		origin, err = r.Location(ctx, originID)
	}

	location := &model.Location{}
	if character.Location.URL == "" {
		location = nil
	} else {
		locationID := helpers.GetLastElementSplitBy(character.Location.URL, "/")
		location, err = r.Location(ctx, locationID)
	}

	var episodes []*model.Episode
	rnmEpisodes, err := character.GetEpisodes()
	if err != nil {
		log.Printf("Cannot get episodes %v", err)
	}

	var characters []*string

	for _, rnmEpisode := range *rnmEpisodes {
		ID := strconv.Itoa(rnmEpisode.ID)
		for _, rnmCharacter := range rnmEpisode.Characters {
			characters = append(characters, &rnmCharacter)
		}
		episode := model.Episode{
			ID:         &ID,
			Name:       &rnmEpisode.Name,
			AirDate:    &rnmEpisode.Air_Date,
			Episode:    &rnmEpisode.Episode,
			Characters: characters,
			Created:    &rnmEpisode.Created,
		}
		episodes = append(episodes, &episode)
	}

	ID := strconv.Itoa(character.ID)
	return &model.Character{
		ID:       &ID,
		Name:     &character.Name,
		Status:   &character.Status,
		Species:  &character.Species,
		Type:     &character.Type,
		Gender:   &character.Gender,
		Origin:   origin,
		Location: location,
		Image:    &character.Image,
		Episode:  episodes,
		Created:  &character.Created,
	}, err
}

func (r *queryResolver) Characters(ctx context.Context, page *int, filter *model.FilterCharacter) (*model.Characters, error) {
	id := "1"
	name := "Rick Sanchez"
	status := "Alive"
	species := "Human"
	stype := ""
	gender := "Male"
	oid := "1"
	oname := "Earth (C-137)"
	otype := "Planet"
	odimension := "Dimension C-137"
	ocreated := "2017-11-10T12:42:04.162Z"
	lid := "3"
	lname := "Citadel of Ricks"
	ltype := "Space station"
	ldimension := "unknown"
	lcreated := "2017-11-10T13:08:13.191Z"
	origin := model.Location{
		ID:        &oid,
		Name:      &oname,
		Type:      &otype,
		Dimension: &odimension,
		Created:   &ocreated,
	}
	location := model.Location{
		ID:        &lid,
		Name:      &lname,
		Type:      &ltype,
		Dimension: &ldimension,
		Created:   &lcreated,
	}
	eid := "1"
	ename := "Pilot"
	airDate := "December 2, 2013"
	eEpisode := "S01E01"
	eCreated := "2017-11-10T12:56:33.798Z"
	episode := model.Episode{
		ID:      &eid,
		Name:    &ename,
		AirDate: &airDate,
		Episode: &eEpisode,
		Created: &eCreated,
	}
	image := "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
	created := "2017-11-04T18:48:46.250Z"
	episodes := []*model.Episode{&episode}
	dummyCharacter := model.Character{
		ID:       &id,
		Name:     &name,
		Status:   &status,
		Species:  &species,
		Type:     &stype,
		Gender:   &gender,
		Origin:   &origin,
		Location: &location,
		Image:    &image,
		Episode:  episodes,
		Created:  &created,
	}
	return &model.Characters{
		Results: []*model.Character{&dummyCharacter},
	}, nil
}

func (r *queryResolver) CharactersByIds(ctx context.Context, ids []string) ([]*model.Character, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Location(ctx context.Context, id string) (*model.Location, error) {
	intId, err := strconv.Atoi(id)
	if err != nil {
		log.Printf("Cannot convert location id %v", err)
	}
	rnmLocation, err := rnm.GetLocation(intId)
	if err != nil {
		log.Printf("Cannot get location %v", err)
	}
	lId := strconv.Itoa(rnmLocation.ID)
	rnmResidents, err := rnmLocation.GetResidents()
	if err != nil {
		log.Printf("Cannot get residents %v", err)
	}

	var residents []*string
	for _, resident := range *rnmResidents {
		resId := strconv.Itoa(resident.ID)
		residents = append(residents, &resId)
	}

	location := &model.Location{
		ID:        &lId,
		Name:      &rnmLocation.Name,
		Type:      &rnmLocation.Type,
		Dimension: &rnmLocation.Dimension,
		Residents: residents,
		Created:   &rnmLocation.Created,
	}
	return location, err
}

func (r *queryResolver) Locations(ctx context.Context, page *int, filter *model.FilterLocation) (*model.Locations, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) LocationsByIds(ctx context.Context, ids []string) ([]*model.Location, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Episode(ctx context.Context, id string) (*model.Episode, error) {
	intId, err := strconv.Atoi(id)
	if err != nil {
		log.Printf("Cannot convert episode id %v", err)
	}
	rnmEpisode, err := rnm.GetEpisode(intId)
	episodeID := strconv.Itoa(rnmEpisode.ID)
	var characters []*string
	for _, c := range rnmEpisode.Characters {
		characters = append(characters, &c)
	}

	episode := &model.Episode{
		ID:         &episodeID,
		Name:       &rnmEpisode.Name,
		AirDate:    &rnmEpisode.Air_Date,
		Episode:    &rnmEpisode.Episode,
		Characters: characters,
		Created:    &rnmEpisode.Created,
	}

	return episode, err
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
