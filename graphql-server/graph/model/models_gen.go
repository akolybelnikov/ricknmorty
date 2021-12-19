// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

import (
	"fmt"
	"io"
	"strconv"
)

type Character struct {
	ID       *float64   `json:"id"`
	Name     *string    `json:"name"`
	Status   *string    `json:"status"`
	Species  *string    `json:"species"`
	Type     *string    `json:"type"`
	Gender   *string    `json:"gender"`
	Origin   *Location  `json:"origin"`
	Location *Location  `json:"location"`
	Image    *string    `json:"image"`
	Episode  []*Episode `json:"episode"`
	Created  *string    `json:"created"`
}

type Characters struct {
	Info    *Info        `json:"info"`
	Results []*Character `json:"results"`
}

type Episode struct {
	ID         *float64  `json:"id"`
	Name       *string   `json:"name"`
	AirDate    *string   `json:"air_date"`
	Episode    *string   `json:"episode"`
	Characters []*string `json:"characters"`
	Created    *string   `json:"created"`
}

type Episodes struct {
	Info    *Info      `json:"info"`
	Results []*Episode `json:"results"`
}

type FilterCharacter struct {
	Name    *string `json:"name"`
	Status  *string `json:"status"`
	Species *string `json:"species"`
	Type    *string `json:"type"`
	Gender  *string `json:"gender"`
}

type FilterEpisode struct {
	Name    *string `json:"name"`
	Episode *string `json:"episode"`
}

type FilterLocation struct {
	Name      *string `json:"name"`
	Type      *string `json:"type"`
	Dimension *string `json:"dimension"`
}

type Info struct {
	Count *int    `json:"count"`
	Pages *int    `json:"pages"`
	Next  *string `json:"next"`
	Prev  *string `json:"prev"`
}

type Location struct {
	ID        *float64  `json:"id"`
	Name      *string   `json:"name"`
	Type      *string   `json:"type"`
	Dimension *string   `json:"dimension"`
	Residents []*string `json:"residents"`
	Created   *string   `json:"created"`
}

type Locations struct {
	Info    *Info       `json:"info"`
	Results []*Location `json:"results"`
}

type CacheControlScope string

const (
	CacheControlScopePublic  CacheControlScope = "PUBLIC"
	CacheControlScopePrivate CacheControlScope = "PRIVATE"
)

var AllCacheControlScope = []CacheControlScope{
	CacheControlScopePublic,
	CacheControlScopePrivate,
}

func (e CacheControlScope) IsValid() bool {
	switch e {
	case CacheControlScopePublic, CacheControlScopePrivate:
		return true
	}
	return false
}

func (e CacheControlScope) String() string {
	return string(e)
}

func (e *CacheControlScope) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CacheControlScope(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CacheControlScope", str)
	}
	return nil
}

func (e CacheControlScope) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
