package http

import (
	"encoding/json"
	"log"
	"net/http"
)

const (
	BaseURL           = "https://rickandmortyapi.com/api/"
	EndpointCharacter = "character/"
	EndpointLocation  = "location/"
	EndpointEpisode   = "episode/"
)

type Endpoints struct {
	Characters string `json:"characters"`
	Locations  string `json:"locations"`
	Episodes   string `json:"episodes"`
}

func FetchData(endpoint string, options map[string]interface{}) (interface{}, error) {
	client := &http.Client{}

	hasParams := false

	req, err := http.NewRequest(http.MethodGet, endpoint, nil)
	if err != nil {
		log.Printf("Cannot create an HTTP request %s: %v", endpoint, err)
		return nil, err
	}

	q := req.URL.Query()

	if options != nil && len(options) > 0 {
		hasParams = true
	}

	if hasParams {
		for key, value := range options {
			q.Add(key, value.(string))
		}

		req.URL.RawQuery = q.Encode()
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var response interface{}

	err = json.NewDecoder(res.Body).Decode(&response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
